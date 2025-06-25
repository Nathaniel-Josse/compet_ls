import React from 'react';
import styles from './progressbar.module.css';


interface ProgressBarProps { value: number; limit: number; }

const ProgressBar: React.FC<ProgressBarProps> = ({ value, limit }) => {
    const clampedValue = Math.min(100, Math.max(0, (value / limit) * 100));
    return (
      <div className="w-full h-2 bg-black rounded-full relative flex items-center">
        <div
          className={styles.bar + " transition-all duration-300"}
          style={{ width: `${clampedValue}%`, height: '8px', borderRadius: '999px'}}
        />
        <div
          className={styles.thumb}
          style={{
            left: `calc(${clampedValue}% - 8px)`,
            top: '50%',
            transform: 'translateY(-50%)',
            position: 'absolute',
          }}
        />
      </div>
  );
}

export default ProgressBar;