import React from "react";
import Link from "next/link";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <Link href="/privacy" legacyBehavior>
                    <a className={styles.link}>Politique de confidentialité</a>
                </Link>
                <span className={styles.separator}>|</span>
                <Link href="/terms" legacyBehavior>
                    <a className={styles.link}>Mentions légales</a>
                </Link>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Luméa. Tous droits réservés.
            </div>
        </footer>
    );
};

export default Footer;