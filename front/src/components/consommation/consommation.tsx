'use client';
import Image from 'next/image';
import styles from './consommation.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"

type StatsData = {
    stats: {
        total_consumed: [number, number[], number[], number[]];
    };
    currentConsumption: number;
    dailyConsumption: number;
    monthlyConsumption: number;
};

export default function Consommation() {
    const [data, setData] = useState<StatsData | null>(null);

    const router = useRouter();
    const dailyPrice = 0.2016;

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
        fetchStats();
    }
    , []);

    function formatTotalTime(listDays: number[]): string {
        if (listDays.length < 31) {
            return `${listDays.length} jour${listDays.length > 1 ? 's' : ''}`;
        }
        const months = Math.floor(listDays.length / 30);
        const days = listDays.length % 30;
        console.log(months, days);
        let result = `${months} mois`;
        if (days > 0) result += ` et ${days} jour${days > 1 ? 's' : ''}`;
        return result;
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Consommation Électrique
            </div>
            <div className={styles.card}>
                <div className={styles.row}>
                    <div className={styles.label}>
                        <Image src="/images/consommation.svg" alt="alt" width={16} height={16} />
                        <span>Consommation</span>
                    </div>
                    <div className={styles.value}>{data ? data.dailyConsumption : null} kWh</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>
                        <Image src="/images/money.svg" alt="alt" width={16} height={16} />
                        <span>Estimation Cout</span> 
                    </div>
                    <div className={styles.value}>{data ? ((data.dailyConsumption * dailyPrice).toFixed(2)) : null} €</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>
                        <Image src="/images/time.svg" alt="alt" width={16} height={16} />
                        <span>Durée d&apos;Usage</span> 
                    </div>
                    <div className={styles.value}>{formatTotalTime(data ? data.stats.total_consumed[2] : [])}</div>
                </div>
            </div>
           
        </div>
    );
}