import styles from './styles.module.scss';

const BackgroundRays = () => {
  return (
    <div className="ray-container">
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className={`ray ray-${i + 1}`}
          data-theme-aware
        />
      ))}
    </div>
  );
};

export default BackgroundRays;
