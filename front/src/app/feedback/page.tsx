'use client';
import Image from "next/image";
import styles from "./feedback.module.css";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Feedback() {
    const [object, setObject] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const tokenRefresh = localStorage.getItem('tokenRefresh');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({object, content }),
            });

            if (res.ok) {
                alert('Feedback submitted successfully!');
                setObject('');
                setContent('');
                router.push('/');
            } else {
                const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenRefresh}`,
                    },
                });
                if (!newRes.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const newData = await newRes.json();
                localStorage.setItem("token", newData.token);
                handleSubmit(e); // Retry fetching user profile with new token
                const data = await res.json();
                alert('Error submitting feedback: ' + data.message);
                return;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting feedback.');
        }
    };

    return (
        <div>
            <Image src="/images/logo_lumea_rect_transp.png" alt="alt" width={100} height={100} />
            <form className={styles.form} onSubmit={handleSubmit}>
                <select value={object} onChange={e => setObject(e.target.value)} required>
                    <option value="" disabled>Choisissez un objet</option>
                    <option value="Retour sur l'application">Problème de connexion</option>
                    <option value="Bug">Bug</option>
                    <option value="Amélioration">Amélioration</option>
                    <option value="Autre">Autre</option>
                </select>
                <input type="textarea" value={content} onChange={e => setContent(e.target.value)} required placeholder="Votre retour..."/>
                <button type="submit" ></button>
            </form>
            <Link href="/">Retour à l&apos;accueil </Link>
        </div>
    )
}
