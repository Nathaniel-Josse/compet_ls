import Link from "next/link";
// import Image from "next/image";
import styles from "./profil.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Profil() {
    const [user, setUser] = useState<{ email: string; name: string } | null>(null);

        const router = useRouter();

    const logoff = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            const tokenRefresh = localStorage.getItem("tokenRefresh");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:5000/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const newRes = await fetch("http://localhost:5000/api/auth/refresh-token", {
                        headers: {
                            Authorization: `Bearer ${tokenRefresh }`,
                        },
                    });
                    if (!newRes.ok) {
                        throw new Error("Failed to fetch user profile");
                    }

                    const newData = await newRes.json();
                    localStorage.setItem("token", newData.token);
                    fetchUser(); // Retry fetching user profile with new token
                    return;
                }

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Mon Profil</h1> <br />
            {/* <Image className={styles.icon} src="/images/user.svg" alt="User Icon" width={100} height={100} /> */}
            {user ? (
                <div>
                    <div className={styles.profile}>
                    <p>Nom: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
                    <div className={styles.links}>
                        Retour utilisateur ? <Link href="/feedback">Laissez-en un</Link>
                    </div>
                    <br />
                </div>
            ) : (
                <p>Chargement...</p>
            )}
            <button onClick={logoff}>Se déconnecter</button>
        </div>
    );
}