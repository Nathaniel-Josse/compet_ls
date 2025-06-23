import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './appareil.module.css';

type ViewType = "accueil" | "appareils" | "autres";

type Appareil = {
    id: number;
    name: string;
    brand: string;
    value: string;
    isOn: boolean;
};

export default function Appareils() {
    const [currentView, setCurrentView] = useState<ViewType>("accueil");
    const [appareils, setAppareils] = useState<Appareil[]>([]);

    // Liste de tous les appareils



    useEffect(() => {
        const view = localStorage.getItem('currentView');
        if (view === "accueil" || view === "appareils" || view === "autres") {
            setCurrentView(view);
        } else {
            setCurrentView("accueil");
        }

        const data = localStorage.getItem('appareils');
        if(data) {
            setAppareils(JSON.parse(data));
        }
    }, []);

    const total = appareils.length;
    const allumes = appareils.filter(a => a.isOn).length;
    const eteints = appareils.filter(a => !a.isOn).length;

    // En fonction de currentView, on sélectionne les appareils à afficher
    const appareilsToShow =
        currentView === 'appareils' ? appareils : appareils.slice(0, 3);

    if (!currentView) {
        return null;
    }

    const toggleAppareil = (id: number) => {
        const updated = appareils.map(app =>
            app.id === id ? { ...app, isOn: !app.isOn } : app
        );
        setAppareils(updated);
        localStorage.setItem('appareils', JSON.stringify(updated));
    };


    return (
        <div className={styles.container}>
            {currentView === 'appareils' && (
                <>
                    <div className={styles.headerRow}>
                        <div>
                            <h1 className={styles.title}>Gestion des appareils</h1>
                            <h2 className={styles.subtitle}>Gérez vos appareils et leur conso</h2>
                        </div>
                        <button className={styles.addButton}>+ Appareil</button>
                    </div>
                    <div className={styles.blocksRow}>
                            <div className={styles.infoBlock}>
                                <Image src='/images/power.svg' alt='computerIcon' width={16} height={16}/>
                                {total} Appareils
                            </div>
                            <div className={styles.infoBlock}>
                                <Image src='/images/power.svg' alt='computerIcon' width={16} height={16}/>
                                {allumes} Appareils
                            </div>
                            <div className={styles.infoBlock}>
                                <Image src='/images/power.svg' alt='computerIcon' width={16} height={16}/>
                                {eteints} Appareils
                            </div>
                    </div>
                    <div className="flex items-center justify-between mt-6 mb-2">
                        <div className="text-lg font-semibold">Appareils Connectés</div>
                        <button className="text-xs font-medium">Tous les appareils</button>
                    </div>
                </>
            )}
            <div className={styles.blocksGrid}>
                {appareilsToShow.map(({ id, name, value, brand, isOn }) => (
                <div key={id} className={styles.block}>
                    <div className={styles.topRow}> 
                        <Image src={`/images/appareils/${name}.png`} alt='Default' width={16} height={16}/>
                        <span className={styles.value}> {value} </span>
                    </div>
                    <div className={styles.middleRow}>
                        <div className="flex flex-col gap-1">
                            <span> {name} </span>
                            <span> {brand} </span>
                        </div>
                        <div className={styles.sliderWrapper}>
                            <label className={styles.switch}>
                                <input type="checkbox" checked={isOn} onChange={() => toggleAppareil(id)}/>
                                <span className={styles.slider} >
                                    <span className={styles.powerIcon}><Image src='images/power.svg' alt='Default' width={16} height={16}  /></span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}
