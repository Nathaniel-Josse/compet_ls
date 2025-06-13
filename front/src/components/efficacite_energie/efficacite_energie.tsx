import Image from 'next/image';
import styles from './efficacite_energie.module.css';
import ProgressBar from '../progressbar/progress';

export default function Efficacite() {
    return (
        <div className={styles.containerMajor}>
            <div className={styles.title}>Efficacité énergétique</div>
            <div className={styles.barContainer}>
                <div className={styles.row}>
                    <div>Score d&apos;efficacité</div>
                    <div>85%</div>
                </div>
                <div>
                    <ProgressBar value={85} />
                </div>
            </div>
            <div className={styles.containerMinor}>
                <Image src="/images/lightbulb.svg" alt="lightbulb" width={16} height={16} /> Conseil : Éteignez la climatisation quand vous n&apos;êtes pas à la maison pour économiser jusqu&apos;à 30% d&apos;énergie.
            </div>
        </div>
    );
}