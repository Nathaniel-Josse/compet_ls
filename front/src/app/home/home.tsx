import Image from "next/image";
import styles from "./home.module.css";
import Consommation from "@/components/consommation/consommation";
import Appareils from "@/components/appareil/appareil";
import {useEffect, useState } from "react";
import classNames from "classnames";
import Efficacite from "@/components/efficacite_energie/efficacite_energie";
import Profil from "@/components/profil/profil";
import Graph_bar from "@/components/graph_bar/graph_bar";

type ViewType = "accueil" | "appareils" | "stats" | "profil" | "blog";
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
            <footer className={styles.footer}>
                    <button className={getButtonClass("accueil")} onClick={() => changeView("accueil")}>
                        <div className={styles.iconWithText}>
                            <Image src="/images/gauge.svg" alt="Home" width={16} height={16} color="#E8E8E8"/>
                        {currentView === "accueil" && <div>Accueil</div>}
                        </div> 
                    </button>
                    <button className={getButtonClass("appareils")} onClick={() => changeView("appareils")}>
                        <div className={styles.iconWithText}>
                            <Image src="/images/smartphone.svg" alt="Appareil" width={16} height={16} color="#E8E8E8"/>
                        {currentView === "appareils" && <div>Appareils</div>}
                        </div>
                    </button>
                    <button className={getButtonClass("stats")} onClick={() => changeView("stats")}>
                        <div className={styles.iconWithText}>
                            <Image src="/images/lightbulb.svg" alt="Stat" width={16} height={16} color="#E8E8E8"/>
                            {currentView === "stats" && <div>Statistiques</div>}
                        </div>
                        
                    </button>
                    <button className={getButtonClass("blog")} onClick={() => changeView("blog")}>
                        <div className={styles.iconWithText}>
                            <Image src="/images/book.svg" alt="Blog" width={16} height={16} color="#E8E8E8"/>
                            {currentView === "blog" && <div>Blog</div>}
                        </div>
                    
                    </button>
                    <button className={getButtonClass("profil")} onClick={() => changeView("profil")}>
                        <div className={styles.iconWithText}>
                            <Image src="/images/user.svg" alt="Profil" width={16} height={16} color="#E8E8E8"/>
                            {currentView === "profil" && <div>Profil</div>}
                        </div>
                    </button>
            </footer>
        </div>
  );
}