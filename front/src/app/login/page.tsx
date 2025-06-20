'use client';
import { useState } from 'react';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dataApp from '@/app/data/appareils.json';

export default function Login({}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

        const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send a request to your backend to authenticate the user
        const res = await fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('tokenRefresh', data.refreshToken);

            if (!localStorage.getItem('appareils')) {
                 localStorage.setItem('appareils', JSON.stringify(dataApp));
            }

            alert('Connexion réussie !');
            setTimeout(() => {
                    router.push('/');
                }, 2000);
        } else {
            alert('Erreur de connexion : ' + data.message);
        }
    }
    return (
        <div className={styles.container}>
            <div>
                <Image src="/images/logo_lumea_rect_transp.webp" alt="logo" width={0} height={0} sizes="30vw" style={{ width: '30vw', height: 'auto' }} />
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email"/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Mot de passe"/>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}