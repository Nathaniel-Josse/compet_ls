import React from "react";
import styles from "./privacy.module.css";

export default function PrivacyPage() {
    return (
        <main className={styles.privacyContainer}>
            <h1 className={styles.privacyTitle}>Politique de confidentialité</h1>
            <div className={styles.privacyText}><strong>Introduction</strong></div>
            <div className={styles.privacyText}>
                Devant le développement des nouveaux outils de communication, il est nécessaire de porter une attention particulière à la protection de la vie privée. C&apos;est pourquoi, nous nous engageons à respecter la confidentialité des renseignements personnels que nous collectons.
            </div>
            <section>
                <h2 className={styles.privacySectionTitle}>Collecte des renseignements personnels</h2>
                <ul className={styles.privacyList}>
                    <li>Prénom</li>
                </ul>
                <div className={styles.privacyText}>
                    Les renseignements personnels que nous collectons sont recueillis au travers de formulaires et grâce à l’interactivité établie entre vous et notre site Web. Nous utilisons également, comme indiqué dans la section suivante, des fichiers témoins et/ou journaux pour réunir des informations vous concernant.
                </div>
            </section>
            <section>
                <h2 className={styles.privacySectionTitle}>Formulaires&nbsp;et interactivité:</h2>
                <div className={styles.privacyText}>Vos renseignements personnels sont collectés par le biais de formulaire, à savoir :</div>
                <ul className={styles.privacyList}>
                    <li>Formulaire d&apos;inscription au site Web</li>
                </ul>
                <div className={styles.privacyText}>
                    Nous utilisons les renseignements ainsi collectés pour les finalités suivantes :
                </div>
                <ul className={styles.privacyList}>
                    <li>Informations / Offres promotionnelles</li>
                    <li>Statistiques</li>
                    <li>Contact</li>
                </ul>
                <div className={styles.privacyText}>
                    Vos renseignements sont également collectés par le biais de l&apos;interactivité pouvant s&apos;établir entre vous et notre site Web et ce, de la façon suivante:
                </div>
                <div className={styles.privacyText}>
                    Nous utilisons les renseignements ainsi collectés pour les finalités suivantes :
                </div>
            </section>
            <section>
                <h2 className={styles.privacySectionTitle}>Droit d&apos;opposition et de retrait</h2>
                <div className={styles.privacyText}>
                    Nous nous engageons à vous offrir un droit d&apos;opposition et de retrait quant à vos renseignements personnels.
                </div>
                <div className={styles.privacyText}>
                    Le droit d&apos;opposition s&apos;entend comme étant la possiblité offerte aux internautes de refuser que leurs renseignements personnels soient utilisées à certaines fins mentionnées lors de la collecte.
                </div>
                <div className={styles.privacyText}>
                    Le droit de retrait s&apos;entend comme étant la possiblité offerte aux internautes de demander à ce que leurs renseignements personnels ne figurent plus, par exemple, dans une liste de diffusion.
                </div>
                <div className={styles.privacyText}><strong>Pour pouvoir exercer ces droits, vous pouvez :</strong></div>
                <ul className={styles.privacyList}>
                    <li>Code postal : 75000</li>
                    <li>Courriel : <a href="mailto:lumea.dc@gmail.com">lumea.dc@gmail.com</a></li>
                    <li>Téléphone : 06 00 00 00 00</li>
                    <li>
                        Section du site web :{" "}
                        <a href="https://lumea-tz4v.onrender.com/feedback" target="_blank" rel="noopener noreferrer">
                            https://lumea-tz4v.onrender.com/feedback
                        </a>
                    </li>
                </ul>
            </section>
            <section>
                <h2 className={styles.privacySectionTitle}>Droit d&apos;accès</h2>
                <div className={styles.privacyText}>
                    Nous nous engageons à reconnaître un droit d&apos;accès et de rectification aux personnes concernées désireuses de consulter, modifier, voire radier les informations les concernant.
                </div>
                <div className={styles.privacyText}><strong>L&apos;exercice de ce droit se fera :</strong></div>
                <ul className={styles.privacyList}>
                    <li>Code postal : 75000</li>
                    <li>Courriel : <a href="mailto:lumea.dc@gmail.com">lumea.dc@gmail.com</a></li>
                    <li>Téléphone : 06 00 00 00 00</li>
                    <li>
                        Section du site web :{" "}
                        <a href="https://lumea-tz4v.onrender.com/feedback" target="_blank" rel="noopener noreferrer">
                            https://lumea-tz4v.onrender.com/feedback
                        </a>
                    </li>
                </ul>
            </section>
            <section>
                <h2 className={styles.privacySectionTitle}>Sécurité</h2>
                <div className={styles.privacyText}>
                    Les renseignements personnels que nous collectons sont conservés dans un environnement sécurisé. Les personnes travaillant pour nous sont tenues de respecter la confidentialité de vos informations.
                </div>
                <div className={styles.privacyText}>
                    Pour assurer la sécurité de vos renseignements personnels, nous avons recours aux mesures suivantes :
                </div>
                <ul className={styles.privacyList}>
                    <li>Protocole SSL</li>
                    <li>Identifiant / mot de passe</li>
                </ul>
                <div className={styles.privacyText}>
                    Nous nous engageons à maintenir un haut degré de confidentialité en intégrant les dernières innovations technologiques permettant d&apos;assurer la confidentialité de vos transactions. Toutefois, comme aucun mécanisme n&apos;offre une sécurité maximale, une part de risque est toujours présente lorsque l&apos;on utilise Internet pour transmettre des renseignements personnels.
                </div>
            </section>
            <section>
                <h2 className={styles.privacySectionTitle}>Législation</h2>
                <div className={styles.privacyText}>
                    Nous nous engageons à respecter les dispositions législatives énoncées dans :
                </div>
                <div className={styles.privacyText}>
                    Législation:  Le Règlement général sur la protection des données (RGPD – UE 2016/679) et la Loi Informatique et Libertés (n°78-17 du 6 janvier 1978, modifiée)
                </div>
                <div className={styles.privacyText}>
                    <strong>Généré avec </strong>
                    <a href="https://www.politiquedeconfidentialite.ca" target="_blank" rel="noopener noreferrer">
                        <strong>un générateur de Politique de confidentialité</strong>
                    </a>
                </div>
            </section>
        </main>
    );
}