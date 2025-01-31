import { motion } from 'framer-motion';
import { memo } from 'react';
import { classNames } from '~/utils/classNames';
import { genericMemo } from '~/utils/react';

interface SliderOption<T> {
  value: T;
  text: string;
}

interface SliderProps<T> {
  selected: T;
  options: SliderOptions<T>;
  setSelected?: (selected: T) => void;
}

export const Slider = genericMemo(<T,>({ selected, options, setSelected }: SliderProps<T>) => {
  const isLeftSelected = selected === options.left.value;

  return (
    <div className="flex items-center bg-muted overflow-hidden rounded-full p-1 gap-1">
      <SliderButton selected={isLeftSelected} setSelected={() => setSelected?.(options.left.value)}>
        {options.left.text}
      </SliderButton>
      <SliderButton selected={!isLeftSelected} setSelected={() => setSelected?.(options.right.value)}>
        {options.right.text}
      </SliderButton>
    </div>
  );
});

const SliderButton = memo(({ selected, children, setSelected }: SliderButtonProps) => {
  return (
    <button
      onClick={setSelected}
      className={classNames(
        'relative px-3 py-1.5 text-sm rounded-full transition-colors',
        selected ? 'text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <span className="relative z-10">{children}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-0 bg-accent rounded-full"
        />
      )}
    </button>
  );
});
