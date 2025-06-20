import Image from "next/image";
import styles from "./home.module.css";
import Consommation from "@/components/consommation/consommation";
import Appareils from "@/components/appareil/appareil";
import {useEffect} from "react";
import Efficacite from "@/components/efficacite_energie/efficacite_energie";
import Profil from "@/components/profil/profil";
import Graph_bar from "@/components/graph_bar/graph_bar";

type ViewType = "accueil" | "appareils" | "stats" | "profil" | "blog" | "autre";
type HomeProps = {
    currentView: ViewType;
}

export default function Home({currentView}: HomeProps) {

    useEffect(() => {
    }, []);
    const renderContent = () => {
        switch (currentView) {
            case "appareils":
                return (
                    <Appareils />
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
            case "blog":
                return <div>Articles</div>;
            default:
                return (
                    <div>
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