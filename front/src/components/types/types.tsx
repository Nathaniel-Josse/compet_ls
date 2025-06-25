import styles from './types.module.css';
import Image from 'next/image';

const devices = [
  {
    icon: "/images/darklightbulb.svg",
    title: "Lumières",
    value: "345 Kwh",
    location: "Salon, Cuisine",
    duration: "5h 3Min"
  },
  {
    icon: "/images/sound.svg",
    title: "Son",
    value: "248 Kwh",
    location: "Salon, Cuisine",
    duration: "2h 5Min"
  },
  {
    icon: "/images/lock.svg",
    title: "Sécurité",
    value: "125 Kwh",
    location: "Salon, Cuisine",
    duration: "1h 3Min"
  },
  {
    icon: "/images/prise.svg",
    title: "Prises connectées",
    value: "41 Kwh",
    location: "Salon, Cuisine",
    duration: "4h 3Min"
  }
];

export default function Types() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Utilisation des appareils</h2>
      <div className={styles.list}>
        {devices.map((d, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.icon}>
            <Image src={d.icon} alt="default" width={32} height={32}/>
            </div>
            <div className={styles.info}>
              <div className={styles.header}>
                <span className={styles.name}>{d.title}</span>
                <span className={styles.value}>{d.value}</span>
              </div>
              <div className={styles.location}>{d.location}</div>
              <div className={styles.duration}>{d.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}