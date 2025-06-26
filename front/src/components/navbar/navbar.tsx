import Image from "next/image";
import React from "react"
import styles from "./navbar.module.css"

type ViewType = "accueil" | "appareils" | "stats" | "profil" | "blog" | "autre";
type NavbarProps = {
    getButtonClass: (view: ViewType) => string;
    changeView: (view: ViewType) => void;
    currentView: ViewType;
};

const Navbar: React.FC<NavbarProps> = ({ getButtonClass, changeView, currentView }) => {
    return (
        <div className={styles.navbar}>
            <button className={getButtonClass("accueil")} onClick={() => changeView("accueil")}>
                <div className={styles.iconWithText}>
                    <Image src={currentView === "accueil" ? "/images/home_white.svg" : "/images/home.svg"} alt="Home" width={16} height={16}/>
                {currentView === "accueil" && <div>Accueil</div>}
                </div> 
            </button>
            <button className={getButtonClass("appareils")} onClick={() => changeView("appareils")}>
                <div className={styles.iconWithText}>
                    <Image src={currentView === "appareils" ? "/images/appareil_white.svg" : "/images/appareil.svg"} alt="Appareil" width={16} height={16}/>
                {currentView === "appareils" && <div>Appareils</div>}
                </div>
            </button>
            <button className={getButtonClass("stats")} onClick={() => changeView("stats")}>
                <div className={styles.iconWithText}>
                    <Image src={currentView === "stats" ? "/images/conso_white.svg" : "/images/conso.svg"} alt="Stat" width={16} height={16}/>
                    {currentView === "stats" && <div>Statistiques</div>}
                </div>
            </button>
            <button className={getButtonClass("blog")} onClick={() => changeView("blog")}>
                <div className={styles.iconWithText}>
                    <Image src={currentView === "blog" ? "/images/blog_white.svg" : "/images/blog.svg"} alt="Blog" width={16} height={16}/>
                    {currentView === "blog" && <div>Blog</div>}
                </div>
            </button>
            <button className={getButtonClass("profil")} onClick={() => changeView("profil")}>
                <div className={styles.iconWithText}>
                    <Image src="/images/user.svg" alt="Profil" width={16} height={16}/>
                    {currentView === "profil" && <div>Profil</div>}
                </div>
            </button>
        </div>
    )
}

export default Navbar;
