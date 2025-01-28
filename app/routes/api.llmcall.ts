import { type ActionFunctionArgs } from '@remix-run/cloudflare';
import { streamText } from '~/lib/.server/llm/stream-text';
import { generateText } from 'ai';
import { getModelList, PROVIDER_LIST } from '~/utils/constants';
import { MAX_TOKENS } from '~/lib/.server/llm/constants';
import type { IProviderSetting, ProviderInfo } from '~/types/model';

export async function action(args: ActionFunctionArgs) {
    return llmCallAction(args);
}

function parseCookies(cookieHeader: string) {
    const cookies: Record<string, string> = {};
    const items = cookieHeader.split(';').map((cookie) => cookie.trim());
    
    items.forEach((item) => {
        const [name, ...rest] = item.split('=');
        if (name && rest) {
            const decodedName = decodeURIComponent(name.trim());
            const decodedValue = decodeURIComponent(rest.join('=').trim());
            cookies[decodedName] = decodedValue;
        }
    });
    
    return cookies;
}

async function llmCallAction({ context, request }: ActionFunctionArgs) {
    const { system, message, model, provider, streamOutput } = await request.json<{
        system: string;
        message: string;
        model: string;
        provider: ProviderInfo;
        streamOutput?: boolean;
    }>();

    const { name: providerName } = provider;

    if (!model || typeof model !== 'string') {
        throw new Response('Invalid or missing model', {
            status: 400,
            statusText: 'Bad Request',
        });
    }

    if (!providerName || typeof providerName !== 'string') {
        throw new Response('Invalid or missing provider', {
            status: 400,
            statusText: 'Bad Request',
        });
    }

    const cookieHeader = request.headers.get('Cookie');
    const apiKeys = JSON.parse(parseCookies(cookieHeader || '').apiKeys || '{}');
    const providerSettings: Record<string, IProviderSetting> = JSON.parse(
        parseCookies(cookieHeader || '').providers || '{}'
    );

    if (streamOutput) {
        try {
            const result = await streamText({
                options: { system },
                messages: [{
                    role: 'user',
                    content: `${message}`,
                }],
                env: context.cloudflare.env,
                apiKeys,
                providerSettings,
            });

            return new Response(result.textStream, {
                status: 200,
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                },
            });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error && error.message?.includes('API key')) {
                throw new Response('Invalid or missing API key', {
                    status: 401,
                    statusText: 'Unauthorized',
                });
            }
            throw new Response(null, {
                status: 500,
                statusText: 'Internal Server Error',
            });
        }
    } else {
        try {
            const MODEL_LIST = await getModelList({ 
                apiKeys, 
                providerSettings, 
                serverEnv: context.cloudflare.env 
            });

            const modelDetails = MODEL_LIST.find((m) => m.name === model);
            if (!modelDetails) {
                throw new Error('Model not found');
            }

            const dynamicMaxTokens = modelDetails.maxTokenAllowed || MAX_TOKENS;
            const providerInfo = PROVIDER_LIST.find((p) => p.name === provider.name);
            
            if (!providerInfo) {
                throw new Error('Provider not found');
            }

            const result = await generateText({
                system,
                messages: [{
                    role: 'user',
                    content: `${message}`,
                }],
                model: providerInfo.getModelInstance({
                    model: modelDetails.name,
                    serverEnv: context.cloudflare.env,
                    apiKeys,
                    providerSettings,
                }),
                maxTokens: dynamicMaxTokens,
                toolChoice: 'none',
            });

            return new Response(JSON.stringify(result), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error && error.message?.includes('API key')) {
                throw new Response('Invalid or missing API key', {
                    status: 401,
                    statusText: 'Unauthorized',
                });
            }
            throw new Response(null, {
                status: 500,
                statusText: 'Internal Server Error',
            });
        }
    }
}
