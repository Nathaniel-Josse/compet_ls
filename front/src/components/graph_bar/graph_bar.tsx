'use client';
import styles from './graph_bar.module.css';
import { useEffect, useState } from "react";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import Image from 'next/image';

// Define the StatsData type according to expected data structure
type StatsData = {
    stats: {
        total_consumed: [number, [number], [number], [number]];
        updated_at: Timestamp
    };
    dailyConsumption: number;
};

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler );

type GraphType = "aujourd'hui" | "semaine" | "mois" | "année";
type ViewType = "accueil" | "stats" | "autres";

export default function Graph_bar() {
    const [currentGraph, setCurrentGraph] = useState<GraphType>("aujourd'hui")
    const [currentView, setCurrentView] = useState<ViewType>("accueil");
    const [data, setData] = useState<StatsData | null>(null);

    const date = new Date();

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            const tokenRefresh = localStorage.getItem('tokenRefresh');
            if (!token) return;

            try {
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
                        throw new Error("Failed to fetch user stats");
                    }

                    const newData = await newRes.json();
                    localStorage.setItem("token", newData.token); // Retry fetching user profile with new token
                    return fetchStats();
                }
                const data = await statsRes.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }
        fetchStats();

        const view = localStorage.getItem('currentView');
        if (view === "accueil" || view === "stats" || view === "autres") {
            setCurrentView(view);
        } else {
            setCurrentView("accueil");
        }
    }
    , []);

    const getChartData = () => {
    if (!data?.stats?.total_consumed || !data.stats.updated_at) return null;

    const updatedAt = new Date(data.stats.updated_at); // timestamp en format Date
    let selectedData: number[] = [];
    let labels: string[] = [];

    switch (currentGraph) {
        case "aujourd'hui":
            selectedData = data.stats.total_consumed[1];
            labels = selectedData.map((_, idx) => {
                const date = new Date(updatedAt);
                date.setHours((updatedAt.getHours() - (selectedData.length - 1 - idx)))
                return `${date.toLocaleTimeString(undefined, { hour: '2-digit', hour12: false })}`;
            });
            break;

        case "semaine":
            selectedData = data.stats.total_consumed[2].slice(-7).concat(data.stats.total_consumed[1].reduce((a, b) => a + b, 0));
            labels = selectedData.map((_, idx) => {
                const date = new Date(updatedAt);
                date.setDate(updatedAt.getDate() - (6 - idx));
                return date.toLocaleDateString(undefined, { weekday: 'short' }); // ex: "lun.", "mar."
            });
            break;

        case "mois":
            selectedData = data.stats.total_consumed[2].concat(data.stats.total_consumed[1].reduce((a, b) => a + b, 0));
            const totalDays = selectedData.length;
            labels = selectedData.map((_, idx) => {
                const date = new Date(updatedAt);
                date.setDate(updatedAt.getDate() - (totalDays - 1 - idx));
                return date.getDate().toString(); // juste le jour du mois
            });
            break;

        case "année":
            selectedData = data.stats.total_consumed[3];
            labels = selectedData.map((_, idx) => {
                const date = new Date(updatedAt);
                date.setMonth(updatedAt.getMonth() - (12 - idx));
                return date.toLocaleDateString(undefined, { month: 'short' }); // ex: "janv.", "févr."
            });
            break;
    }

    const barColors = selectedData.map((_, idx, arr) =>
        idx === arr.length - 1 ? '#458FFF' : '#4A4A4A'
    );

    return {
        labels,
        datasets: [{
            label: 'Consommation',
            data: selectedData,
            backgroundColor: barColors,
            borderRadius: 4,
        }]
    };
};
    const toggleButtonMenu = () => {
        if(currentView === 'stats') {
            return (<div className={styles.toggleButtons}>
                {["aujourd'hui", "semaine", "mois", "année"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setCurrentGraph(type as GraphType)}
                        className={currentGraph === type ? styles.activeButton : ""}
                    >
                        {type}
                    </button>
                ))}
            </div>)
        } else {
            return (
                <div className={styles.toggleButtons}>
                    <button
                        onClick={() => setCurrentGraph("aujourd'hui")}
                        className={styles.activeButton}
                    >
                        Aujourd&apos;hui
                    </button>
            </div>
            )
        }
    }

    const chartData = getChartData();

    return (
        <>
        <div className={styles.container}>
            {currentView === "accueil" && (
                <div className={styles.titre}>
                    Consommation Journalière
                </div>
            )}
            <div className={styles.sujet}>
                <div>
                    <div>
                        {date.toLocaleDateString("fr-FR", { weekday: "long" }).charAt(0).toUpperCase() + date.toLocaleDateString("fr-FR", { weekday: "long" }).slice(1)}
                    </div>
                    <div className={styles.date}>
                        {date.toLocaleDateString("fr-FR", {year: "numeric", month: "long", day: "numeric",})}
                    </div>
                </div>
                <div className="min-w-[56px] h-[80px] rounded-xl overflow-hidden shadow flex flex-col ml-auto">
                    <div className="flex-1 flex items-end justify-center bg-[#2c2c2c] text-white text-2xl font-medium px-4 py-1 w-auto">
                        {data ? `${data.dailyConsumption}` : 'Chargement...'}
                    </div>
                    <div className="h-8 flex items-center justify-center bg-[#181818] text-[#2976f6] text-base font-medium">
                        kWh
                    </div>
                </div>
            </div>
            <div>
                {toggleButtonMenu()}
                <div style={{ color: 'white' }}>
                    {chartData ? (
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                    title: { display: true }
                                },
                                scales: {
                                    y: { display: false }, // Masquer l'axe Y
                                }
                            }}
                        />
                    ) : (
                        <p>Chargement des données...</p>
                    )}
                </div>
            </div>
            <div>
            </div>
            {currentView === "stats" && (
                
                <div className="flex flex-col items-center mt-">
                    <hr></hr>
                    <br></br>
                    <Image  src="/images/graph_national.webp" alt="line_graph" height={1020} width={375}/>
                </div>
            )}
        </div>
     </>
    );
}