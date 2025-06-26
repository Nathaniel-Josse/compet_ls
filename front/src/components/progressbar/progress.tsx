import React, { useState, useEffect } from 'react';
// import styles from './progressbar.module.css';

interface ProgressSliderProps {
  limit: number; // valeur reçue du backend
  onChange?: (value: number) => void; // fonction de rappel pour la valeur modifiée
}

const ProgressBar: React.FC<ProgressSliderProps> = ({ limit, onChange }) => {
  const roundedMin = Math.ceil(limit / 10) * 10;
  const max = roundedMin * 3;

  const [value, setValue] = useState(roundedMin);

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value, onChange]);  

  // const clampedValue = Math.min(100, Math.max(0, ((value - roundedMin) / (max - roundedMin)) * 100));

  return (
    <div className="w-full">

      <input
        type="range"
        min={roundedMin}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
    </div>
  );
};

export default ProgressBar;
