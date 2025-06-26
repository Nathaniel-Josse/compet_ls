import BlogPage from "../blog/page";
import styles from "./home.module.css";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation"
import Types from "@/components/types/types";
import Profil from "@/components/profil/profil";
import Appareils from "@/components/appareil/appareil";
import Graph_bar from "@/components/graph_bar/graph_bar";
import Alert_conso from "@/components/altert_conso/alert_conso";
import Consommation from "@/components/consommation/consommation";
import Efficacite from "@/components/efficacite_energie/efficacite_energie";

type ViewType = "accueil" | "appareils" | "stats" | "profil" | "blog" | "autre";
type HomeProps = {
    currentView: ViewType;
}

type UserStats = {
    name: string;
}

type StatsData = {
    stats : {
        limit: number;
    }
    dailyConsumption: number;
};



export default function Home({currentView}: HomeProps) {
    const [data, setData] = useState<StatsData | null>(null);
    const [user, setUser] = useState<UserStats | null>(null);

    const router = useRouter();

    const logoff = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };
    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            const tokenRefresh = localStorage.getItem('tokenRefresh');
            if (!token) return;

            const statsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stats/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!statsRes.ok) {
                const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`, {
                    headers: {
                        Authorization: `Bearer ${tokenRefresh }`,
                    },
                });
                if (!newRes.ok) {
                    logoff();
                    throw new Error("Failed to fetch user stats");
                }

                const newData = await newRes.json();
                localStorage.setItem("token", newData.token); // Retry fetching user profile with new token
                return fetchStats();
            }
            const data = await statsRes.json();
            setData(data);
        }

        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const tokenRefresh = localStorage.getItem('tokenRefresh');
            if (!token) return;
            const userRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!userRes.ok) {
                    const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`, {
                        headers: {
                            Authorization: `Bearer ${tokenRefresh }`,
                        },
                    });
                    if (!newRes.ok) {
                        logoff();
                        throw new Error("Failed to fetch user profile");
                    }

                    const newData = await newRes.json();
                    localStorage.setItem("token", newData.token);
                     // Retry fetching user profile with new token
                    return fetchUser();
                }
                const data = await userRes.json();
                setUser(data);
        }
        fetchUser();
        fetchStats();
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
                        <header className={styles.header}>
                                <div className={styles.logoContainer}>
                                <h1 className={styles.welcome}>Ma Consommation</h1>
                                <h2 className={styles.text}>Surveillez votre conso et son coût</h2>
                                </div>
                        </header>
                        <Alert_conso />
                        <Graph_bar />
                        <Types />
                    </div>
                );
            case "profil":
                return <div>
                    <Profil />
                    </div>;
            case "blog":
                return <div>
                    <BlogPage />
                </div>;
            default:
                console.log(data?.dailyConsumption);
                return (
                    <div>
                        <div>
                            <header className={styles.header}>
                                <div className={styles.logoContainer}>
                                    <h2 className={styles.text}>Bonjour,</h2>
                                    <h1 className={styles.welcome}>{user?.name}</h1>
                                </div>
                            </header>
                                <div>
                                    {data && <Efficacite limit_value={data.stats.limit}/>}
                                    <Graph_bar />
                                    <Appareils />
                                    <Consommation />
                                </div>
                        </div>
                    </div>
                );
        }
    };


return (
        <div>
            {renderContent()}
        </div>
);
}