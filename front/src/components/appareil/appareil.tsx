import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './appareil.module.css';

type ViewType = "accueil" | "appareils" | "autres";

type Appareil = {
    id: number;
    name: string;
    filename: string;
    brand: string;
    value: string;
    state: string;
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

        const name = localStorage.getItem('user_name');

        const data = localStorage.getItem(`appareils_${name}`) || localStorage.getItem('appareils');
        if(data) {
            setAppareils(JSON.parse(data));
        }
    }, []);

    const total = appareils.length;
    const eteints = appareils.filter(a => a.state === "Éteint").length;
    const allumes = total-eteints;

    // En fonction de currentView, on sélectionne les appareils à afficher
    const appareilsToShow =
        currentView === 'appareils' ? appareils : appareils.slice(0, 3);

    if (!currentView) {
        return null;
    }

    const changeButtonStyle = (id: number) => {
        const states = ["Auto", "Éco", "Confort", "Éteint"];
        const updated = appareils.map(app =>
            app.id === id
            ? {
                ...app,
                state: states[
                (states.indexOf(app.state || "Auto") + 1) % states.length
                ]
            }
            : app
        );
        setAppareils(updated);
        localStorage.setItem('appareils', JSON.stringify(updated));
    };

    const getStateColor = (state: string) => {
    switch (state) {
        case "Éco":
            return "#4EC34F"; // vert
        case "Confort":
            return "#0065FF"; // bleu
        case "Éteint":
            return "#4A4A4A"; // gris
        case "Auto":
            return "#4A4A4A"; // gris
        default :
            return "#0065FF"; // gris
    }
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
                                <Image src='/images/appareil_all.svg' alt='computerIcon' width={16} height={16}/>
                                {total} Appareils
                            </div>
                            <div className={styles.infoBlock}>
                                <Image src='/images/appareil_on.svg' alt='computerIcon' width={16} height={16}/>
                                {allumes} Appareils
                            </div>
                            <div className={styles.infoBlock}>
                                <Image src='/images/appareil_off.svg' alt='computerIcon' width={16} height={16}/>
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
                {appareilsToShow.map(({ id, name, filename, value, brand, state }) => (
                <div key={id} className={styles.block}>
                    <div className={styles.topRow}> 
                        <Image src={`/images/appareils/${filename}.webp`} alt='Default' width={64} height={64}/>
                        <span className={styles.value}> {value} </span>
                    </div>
                    <div className={styles.middleRow}>
                        <div className="flex-1 min-w-0">
                            <span className="block font-medium text-white truncate whitespace-nowrap overflow-hidden"> {name} </span>
                            <span className="block text-sm text-gray-400 truncate whitespace-nowrap overflow-hidden"> {brand} </span>
                        </div>
                    </div>
                    <div className={styles.bottomRow}>
                        <button className={styles.button} onClick={() => changeButtonStyle(id)} style={{background: getStateColor(state)}}>{state}</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}
