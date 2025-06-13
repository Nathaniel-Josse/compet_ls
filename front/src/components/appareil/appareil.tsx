import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './appareil.module.css';

type ViewType = "accueil" | "appareils" | "autres";

type Appareil = {
    id: number;
    name: string;
    power: number;
    bgColor: string;
    borderColor: string;
};

export default function Appareils() {
    const [currentView, setCurrentView] = useState<ViewType>("accueil");

    // Liste de tous les appareils
    const appareils: Appareil[] = [
        {
            id: 1,
            name: 'Climatisation',
            power: 180,
            bgColor: '#482b2f',
            borderColor: '#374151',
        },
        {
            id: 2,
            name: 'Télévision',
            power: 120,
            bgColor: '#1b2a45',
            borderColor: '#374151',
        },
        {
            id: 3,
            name: 'Réfrégirateur',
            power: 45,
            bgColor: '#3b482a',
            borderColor: '#374151',
        },
        {
            id: 4,
            name: 'Machine à laver',
            power: 200,
            bgColor: '#482b2f',
            borderColor: '#374151',
        },
        // Tu peux ajouter d'autres appareils ici si besoin
    ];

    useEffect(() => {
        const view = localStorage.getItem('currentView');
        if (view === "accueil" || view === "appareils" || view === "autres") {
            setCurrentView(view);
        } else {
            setCurrentView("accueil");
        }
    }, []);

    // En fonction de currentView, on sélectionne les appareils à afficher
    const appareilsToShow =
        currentView === 'appareils' ? appareils : appareils.slice(0, 3);

    if (!currentView) {
        return null;
    }

    return (
        <div className={styles.containerMajor}>
            <div className={styles.title}>Appareils les plus consommateurs</div>
            {appareilsToShow.map(({ id, name, power, bgColor, borderColor }) => (
                <div key={id} className={styles.containerMinor}>
                    <div
                        className={styles.type}
                        style={{ backgroundColor: bgColor, borderColor: borderColor }}
                    >
                        <Image
                            src="/images/rotate-ccw.svg"
                            alt="Profil"
                            width={16}
                            height={16}
                        />
                    </div>
                    <div>
                        {name}
                        <br />
                        <div style={{ color: '#b8b8b8' }}>{power}W</div>
                    </div>
                    <div className={styles.power}>
                        {name === 'Réfrégirateur' ? (
                            <button>
                                <Image
                                    src="/images/power.svg"
                                    alt="Profil"
                                    width={16}
                                    height={16}
                                />
                            </button>
                        ) : (
                            <Image
                                src="/images/power.svg"
                                alt="Profil"
                                width={16}
                                height={16}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
