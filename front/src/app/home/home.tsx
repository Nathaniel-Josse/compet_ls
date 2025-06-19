import Image from "next/image";
import styles from "./home.module.css";
import Consommation from "@/components/consommation/consommation";
import Appareils from "@/components/appareil/appareil";
import {useEffect, useState } from "react";
import classNames from "classnames";
import Efficacite from "@/components/efficacite_energie/efficacite_energie";
import Profil from "@/components/profil/profil";
import Graph_bar from "@/components/graph_bar/graph_bar";

type ViewType = "accueil" | "appareils" | "stats" | "profil" | "autres";
export default function Home() {
    const [currentView, setCurrentView] = useState<ViewType>("accueil");

    useEffect(() => {
        localStorage.removeItem("currentView");
        const savedView = localStorage.getItem("currentView") as ViewType | null;
        if (savedView) setCurrentView(savedView);
    }, []);

    const changeView = (view: ViewType) => {
        setCurrentView(view);
        localStorage.setItem("currentView", view);
    };

    const getButtonClass = (view: ViewType) =>
    classNames("footerButton", {
    [styles.activeButton]: currentView === view,
    });
    const renderContent = () => {
        switch (currentView) {
            case "appareils":
                return (
                    <div>
                    <h1 className={styles.welcome}>Vos appareils connectés</h1>
                    <h2 className={styles.text}>Gérez et contrôlez tous vos équipements</h2>
                    <Appareils />
                    <div className={styles.text}>PLACEHOLDER...</div></div>
                );
            case "stats":
                return (
                    <div>
                        <h1 className={styles.welcome}>Statistiques</h1>
                    <Consommation />
                    <Efficacite />
                    <Graph_bar />
                    <div className={styles.text}>PLACEHOLDER...</div></div>
                );
            case "profil":
                return <div>
                    <Profil />
                    </div>;
            case "autres":
                return <div>Autres</div>;
            default:
                return (
                    <div>
                        <div>
                            
                        </div>
                        <div>
                            {/* Add later the other components */}  
                            <Graph_bar />
                            <Consommation />
                            <Appareils />
                            <Efficacite />
                        </div>
                    </div>
                );
        }
    };


return (
        <div>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                <h2 className={styles.text}>Bonjour.</h2>
                <h1 className={styles.welcome}>PLACEHOLDER</h1>
                </div>
                <button className={styles.iconContainer} onClick={() => changeView("autres")}>
                    <Image
                    src="/images/settings.svg"
                    alt="Paramètres"
                    fill
                    sizes="(max-width: 600px) 24px, 6vw"
                    style={{ objectFit: "contain" }}
                    />
                </button>
            </header>
            <main>
                <div>{renderContent()}</div>
            </main>
            <footer className={styles.footer}>
                <button className={getButtonClass("accueil")} onClick={() => changeView("accueil")}>
                    <div><Image src="/images/house.svg" alt="Home" width={16} height={16} color="#E8E8E8"/></div>
                    <div>Accueil</div>
                </button>
                <button className={getButtonClass("appareils")} onClick={() => changeView("appareils")}>
                    <div><Image src="/images/house.svg" alt="Appareil" width={16} height={16} color="#E8E8E8"/></div>
                    <div>Appareil</div>
                </button>
                <button className={getButtonClass("stats")} onClick={() => changeView("stats")}>
                    <Image src="/images/house.svg" alt="Stat" width={16} height={16} color="#E8E8E8"/> Statistique
                </button>
                <button className={getButtonClass("profil")} onClick={() => changeView("profil")}>
                    <Image src="/images/user.svg" alt="Stat" width={16} height={16} color="#E8E8E8"/> Profil
                </button>
            </footer>
        </div>
  );
}