import React from "react";
import styles from "./terms.module.css";

export default function TermsPage() {
    return (
        <main className={styles.termsContainer}>
            <h1 className={styles.termsTitle}>MENTIONS LÉGALES</h1>
            <p className={styles.termsText}>
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique, il est précisé aux utilisateurs du site Luméa l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>
            <section className={styles.termsSection}>
                <h2 className={styles.termsSectionTitle}>Edition du site</h2>
                <p className={styles.termsText}>
                    Le présent site, accessible à l’URL{" "}
                    <a href="https://lumea-tz4v.onrender.com/">https://lumea-tz4v.onrender.com/</a> (le « Site »), est édité par :
                </p>
                <p className={styles.termsText}>
                    Luméa, société au capital de 0 euros, inscrite au R.C.S. de PARIS sous le numéro RCS PARIS C 000 000 000, dont le siège social est situé au 1 rue de notre projet 75000 PARIS, représenté(e) par Projet D&apos;Equol dûment habilité(e)
                </p>
                <p className={styles.termsText}>
                    Le numéro individuel TVA de l&apos;éditeur est : FR 40 123456789.
                </p>
            </section>
            <section className={styles.termsSection}>
                <h2 className={styles.termsSectionTitle}>Hébergement</h2>
                <p className={styles.termsText}>
                    Le Site est hébergé par la société Render, situé 2 rue de notre projet 75000 PARIS, (contact téléphonique ou email : +33600000000).
                </p>
            </section>
            <section className={styles.termsSection}>
                <h2 className={styles.termsSectionTitle}>Directeur de publication</h2>
                <p className={styles.termsText}>
                    Le Directeur de la publication du Site est Projet D&apos;Equol.
                </p>
            </section>
            <section className={styles.termsSection}>
                <h2 className={styles.termsSectionTitle}>Nous contacter</h2>
                <ul className={styles.termsList}>
                    <li>Par téléphone : +33600000000</li>
                    <li>
                        Par email : <a href="mailto:lumea.dc@gmail.com">lumea.dc@gmail.com</a>
                    </li>
                    <li>Par courrier : 3 rue de notre projet 75000 PARIS</li>
                </ul>
            </section>
            <section className={styles.termsSection}>
                <h2 className={styles.termsSectionTitle}>Données personnelles</h2>
                <p className={styles.termsText}>
                    Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section &quot;Charte de Protection des Données Personnelles&quot;, conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).
                </p>
                <p className={styles.termsText}>
                    Génération des mentions légales par Legalstart.
                </p>
            </section>
        </main>
    );
}