"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './register.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [person, setPerson] = useState(1);
    const [surface, setSurface] = useState(80);
    const [heating_system, setheating_system] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    // const limit_notif = {"80": 0, "100": 0, "120": 0, "140": 0};

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        const url = process.env.BACKEND_URL;
        console.log(process.env.BACKEND_URL);
        console.log(url);
        // Here you would typically send a request to your backend to register the user
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            const statRes = await fetch(`${process.env.BACKEND_URL}/api/stats/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: data.userId, person, surface, heating_system}),
            });

            const statData = await statRes.json();
            if (!statRes.ok) {
                console.error('Erreur lors de la création des statistiques :', statData.message);
            }

            alert('Inscription réussie ! Vous allez être redirigé vers la page de connexion.');
            setTimeout(() => {
                    router.push('/login');
                }, 2000);
        } else {
            alert('Erreur d\'inscription : ' + data.message);
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <Image src="/images/logo_lumea_rect_transp.png" alt="logo" width={0} height={0} sizes="30vw" style={{ width: '30vw', height: 'auto' }} />
            </div>

            <form onSubmit={handleRegister} className={styles.form}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Nom" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Mot de passe" />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Confirmer le mot de passe" />
                <input type="number" value={person} onChange={e => setPerson(Number(e.target.value))} required placeholder="1" />
                <select value={surface} onChange={e => setSurface(Number(e.target.value))} required>
                    <option value="" disabled>Surface du logement (m²)</option>
                    <option value={80}>80</option>
                    <option value={100}>100</option>
                    <option value={120}>120</option>
                    <option value={140}>140</option>
                </select>
                <select value={heating_system} onChange={e => setheating_system(e.target.value)} required>
                    <option value="" disabled>Type de chauffage</option>
                    <option value="électrique">Électrique</option>
                    <option value="autre">Autre</option>
                </select>
                <button type="submit">S&apos;inscrire</button>
            </form>
            Déjà inscrit ? <Link href="/login">Connectez-vous</Link>
        </div>
    );
}