import Image from 'next/image';
import styles from './efficacite_energie.module.css';
import ProgressBar from '../progressbar/progress';
import { useState } from 'react';

interface EfficaciteProps {
    limit_value: number;
}

export default function Efficacite({limit_value}: EfficaciteProps) {
    const [value, setValue] = useState(limit_value);

    return (
        <div className={styles.containerMajor}>
            <div>
                <div className={styles.title}>
                    <Image src="/images/notif.svg" alt="alt" width={16} height={16} /> Notifications</div>
                <div className={styles.sliderWrapper}>
                    <label className={styles.switch}>
                        <input type="checkbox" defaultChecked/>
                        <span className={styles.slider}>
                            <span className={styles.powerIcon}>
                            </span>
                        </span>
                    </label>
                </div>
            </div>
            <div className={styles.barContainer}>
                <div className={styles.row}>
                    <div className="mb-2">Seuil de consommation</div>
                    <div>{value} kWh</div>
                </div>
                <div>
                    <ProgressBar limit={limit_value} onChange={setValue}/>
                </div>
            </div>
            <div className={styles.containerMinor}>
                Vous recevrez une notification lorsque votre consommation dépassera {value} kWh.
            </div>
        </div>
    );
}