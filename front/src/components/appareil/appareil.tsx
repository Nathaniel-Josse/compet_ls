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
        if (currentView !== 'appareils') return;
        const updated = appareils.map(app =>
            app.id === id ? { ...app, isOn: !app.isOn } : app
        );
        setAppareils(updated);
        localStorage.setItem('appareils', JSON.stringify(updated));
    };

    return (
        <div className={styles.containerMajor}>
            {currentView === 'appareils' && (
                <div className={styles.counters}>
                    <div>Total : {total}</div>
                    <div>Total : {allumes}</div>
                    <div>Total : {eteints}</div>
                </div>
                
            )}
            {appareilsToShow.map(({ id, name, value, isOn }) => (
                <div key={id} className={styles.containerMinor}>
                    <div> <Image src={`/images/appareils/${name}.png`} alt='Default' width={16} height={16}/> </div>
                    <div> {value} </div>
                    <div> {name} </div>
                    <div>
                        <input type="checkbox" checked={isOn} onChange={() => toggleAppareil(id)}/>
                    </div>
                </div>
            ))}
        </div>
    );
}
