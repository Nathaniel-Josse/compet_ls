'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Home from './home/home';
import { subscribeUser } from '../utils/subscribeToPush';
import classNames from "classnames";
import Navbar from "@/components/navbar/navbar";
import styles from "@/components/navbar/navbar.module.css";

type ViewType = "accueil" | "appareils" | "stats" | "profil" | "blog" | "autre";
import classNames from "classnames";
import Navbar from "@/components/navbar/navbar";
import styles from "@/components/navbar/navbar.module.css";

type ViewType = "accueil" | "appareils" | "stats" | "profil" | "blog" | "autre";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>("accueil");
  
  const [currentView, setCurrentView] = useState<ViewType>("accueil");
  

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        router.push('/login');
        return;
      }
      // localStorage.removeItem("currentView");
        const savedView = localStorage.getItem("currentView") as ViewType | null;
        if (savedView) setCurrentView(savedView);
      setIsAuthenticated(true);
      return;
    };

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      subscribeUser();
    }

    checkAuth();
  }, []);

  const changeView = (view: ViewType) => {
        setCurrentView(view);
        localStorage.setItem("currentView", view);
    };

    const getButtonClass = (view: ViewType) =>
    classNames("footerButton", {
    [styles.activeButton]: currentView === view,
    });

  return isAuthenticated ? 
  <div>
     <Home currentView={currentView}/>
            <nav className={styles.navbar}>
                <Navbar getButtonClass={getButtonClass} changeView={changeView} currentView={currentView}/>
            </nav>
  </div>
  : <div>Chargement...</div>;
  // return (
  //   <div><Home/></div>
  // );
}
