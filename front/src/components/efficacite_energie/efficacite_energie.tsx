import Image from 'next/image';
import styles from './efficacite_energie.module.css';
import ProgressBar from '../progressbar/progress';

interface EfficaciteProps {
    limit_value: number;
    daily : number;
}

export default function Efficacite({limit_value, daily}: EfficaciteProps) {
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
                                <Image src='images/power.svg' alt='Default' width={16} height={16} />
                            </span>
                        </span>
                    </label>
                </div>
            </div>
            <div className={styles.barContainer}>
                <div className={styles.row}>
                    <div className="mb-2">Seuil de consommation</div>
                    <div>{limit_value} kWh</div>
                </div>
                <div>
                    <ProgressBar value={daily} limit={limit_value}/>
                </div>
            </div>
            <div className={styles.containerMinor}>
                Vous recevrez une notification lorsque votre consommation dépassera {limit_value} kWh.
            </div>
        </div>
    );
}