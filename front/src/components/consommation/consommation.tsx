'use client';
import Image from 'next/image';
import styles from './consommation.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"

type StatsData = {
    currentConsumption: number;
    dailyConsumption: number;
    monthlyConsumption: number;
};

export default function Consommation() {
    const [data, setData] = useState<StatsData | null>(null);

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

            try {
                const profileRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!profileRes.ok) {
                    const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`, {
                        headers: {
                            Authorization: `Bearer ${tokenRefresh }`,
                        },
                    });
                    if (!newRes.ok) {
                        throw new Error("Failed to fetch user profile");
                        logoff();
                    }

                    const newData = await newRes.json();
                    localStorage.setItem("token", newData.token);
                     // Retry fetching user profile with new token
                    return fetchStats();
                }

                const profileData = await profileRes.json();
                const signupData = profileData?.user_date;

                if (!signupData) {
                    console.error("No signup data found in profile");
                    return;
                }

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
                console.log(statsRes);
                const data = await statsRes.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }
        fetchStats();
    }
    , []);

    return (
        <div>
            <div    className={styles.containerMajor}>
                <div className={styles.title}>Consommation actuelle</div>
                <div className={styles.consoNumber}>{data ? `${data.currentConsumption}W` : 'Chargement...'}</div>
                <div className={styles.minitext}>
                    <div><Image src="/images/trending-up.svg" alt="Profil" className={styles.icon} width={16} height={16}/> </div>
                    <div>+12% par rapport à hier</div>
                </div>
            </div>
            <div className='superContainer'>
                <div className={styles.containerMinor}>
                    <div className={styles.type} style={{backgroundColor: "#3b482a", borderColor: "#374151"}}>
                        <Image src="/images/rotate-ccw.svg" alt="Profil" width={16} height={16} color="#bdff5f"/>
                    </div>
                    <div>Aujourd&apos;hui<h1>{data ? `${data.dailyConsumption}kWh` : 'Chargement...'}</h1></div>
                </div>
                <div className={styles.containerMinor}>
                    <div className={styles.type} style={{backgroundColor: "#453a1e", borderColor: "#374151"}}>
                        <Image src="/images/house.svg" alt="Profil" width={16} height={16} color="#E8E8E8"/>
                    </div>
                    <div>Ce mois-ci<h1>{data ? `${data.monthlyConsumption}kWh` : 'Chargement...'}</h1></div>
                </div>
            </div>
        </div>
    );
}