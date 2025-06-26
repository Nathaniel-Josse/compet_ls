import Image from 'next/image';
import {useState, useEffect} from 'react';
import styles from './alert_conso.module.css';

type Appareil = {
    id: number;
    name: string;
    filename: string;
    brand: string;
    value: string;
    state: string;
};

export default function Alert_conso() {
    const [appareils, setAppareils] = useState<Appareil[]>([]);
    const [color, setColor] = useState<string>("");
    const [trend, setTrend] = useState<string>("");
    const [toast, setToast] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    const [background, setBackground] = useState<string>("");
    
    useEffect(() => {
        const localData = localStorage.getItem('appareils');
        setAppareils(localData ? JSON.parse(localData) : []);
    }, []);

    useEffect(() => {
        if (appareils.length > 0) {
        checkConso();
    }
    }, [appareils]);

    function checkConso() {
        const eco = appareils.filter(a => a.state === "Éco").length
        const confo = appareils.filter(a => a.state === "Confort").length
        const eteint = appareils.filter(a => a.state === "Éteint").length
        if (eco > confo && eteint <= 4) {

            setValue("-5");
            setToast(true);
            setColor("vert 🌿");
            setTrend("down");
            setBackground("17A34A");
        } else if (eco < confo && eteint <= 4) {
            setTrend("up");
            setValue("+5");
            setToast(true);
            setColor("rouge ⚡");
            setBackground("de1717");

        } else {
            
        }
    }

    return toast ? 
        <div className={styles.container} style={{backgroundColor: `#${background}50`, borderColor: `#${background}`}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className={styles.alertConsoIcon}>
                        <Image src={`/images/trending-${trend}.svg`} alt={`trending-${trend}`} height={32} width={32}/>
                </div>
                <div className={styles.alertConsoLeft}>
                    <div className={styles.alertConsoTitle}>
                        Vous êtes dans le {color}
                    </div>
                    <div className={styles.alertConsoSubtitle}>
                        Moyenne nationnalle : 25 kWh/jour
                    </div>
                </div>
            </div> 
            <div  className={styles.alertConsoValue} style={{color: `#${background}`}}>
                {value} kWh
            </div>
        </div>
    : null;
}