'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Home from './home/home';
import classNames from "classnames";
import Navbar from "@/components/navbar/navbar";
import styles from "@/components/navbar/navbar.module.css";

type ViewType = "accueil" | "appareils" | "stats" | "profil" | "blog" | "autre";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
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
      setCurrentView("accueil");
      localStorage.setItem("currentView", "accueil");
      setIsAuthenticated(true);
      return;
    };

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
    <Navbar getButtonClass={getButtonClass} changeView={changeView} currentView={currentView}/>
  </div>
  : <div>Chargement...</div>;
  // return (
  //   <div><Home/></div>
  // );
}
