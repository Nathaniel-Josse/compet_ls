import Image from "next/image";
import styles from "./home.module.css";
import Consommation from "@/components/consommation/consommation";
import Appareils from "@/components/appareil/appareil";
import {useEffect, useState } from "react";
import Efficacite from "@/components/efficacite_energie/efficacite_energie";
import Profil from "@/components/profil/profil";
import Graph_bar from "@/components/graph_bar/graph_bar";

type ViewType = "accueil" | "appareils" | "stats" | "profil" | "blog" | "autre";

export default function Home() {
    const [currentView, setCurrentView] = useState<ViewType>("accueil");

    useEffect(() => {
        const view = localStorage.getItem('currentView');
        if (view === "accueil" || view === "appareils" || view === "stats" || view ==="profil" || view ==="blog") {
            setCurrentView(view);
        } else {
            setCurrentView("autre");
        }
    }, []);
    const renderContent = () => {
        switch (currentView) {
            case "appareils":
                return (
                    <div>
                    <Appareils />
                    <div className={styles.text}>PLACEHOLDER...</div></div>
                );
            case "stats":
                return (
                    <div>
                        <h1 className={styles.welcome}>Statistiques</h1>
                        <Graph_bar />
                    <Consommation />
                    <Efficacite />
                    <div className={styles.text}>PLACEHOLDER...</div></div>
                );
            case "profil":
                return <div>
                    <Profil />
                    </div>;
            case "blog":
                return <div>Articles</div>;
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
                <h2 className={styles.text}>Bonjour,</h2>
                <h1 className={styles.welcome}>PLACEHOLDER</h1>
                </div>
                <button className={styles.iconContainer}>
                    <Image
                    src="/images/settings.svg"//
                    alt="Paramètres"
                    fill
                    sizes="(max-width: 600px) 24px, 6vw"
                    style={{ objectFit: "contain" }}
                    />
                </button>
            </header>
            <main className={styles.main}>
                <div>{renderContent()}</div>
            </main>
        </div>
  );
}