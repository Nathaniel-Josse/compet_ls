import React from 'react';
import styles from './progressbar.module.css';


interface ProgressBarProps { value: number;}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    return (
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={styles.bar + " transition-all duration-300"}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
  );
}

export default ProgressBar;