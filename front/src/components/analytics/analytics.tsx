import { useEffect, useState } from "react";

// Extend the Window interface to include gtag and dataLayer
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_KEY; // Remplace par ton ID

export default function AnalyticsConsent() {
  const [showPopup, setShowPopup] = useState(false);

  // Define loadGAScript outside useEffect to avoid redeclaration and logic errors
  const loadGAScript = () => {
    if (typeof window.gtag === "function") return;
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) { window.dataLayer.push(args); }
    window.gtag = gtag;
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  };

  useEffect(() => {
    const consent = localStorage.getItem("ga_consent");
    if (consent === null) setShowPopup(true);
    else if (consent === "granted") loadGAScript();
  }, []);

  if (!showPopup) return null;

    function handleConsent(granted: boolean): void {
        localStorage.setItem("ga_consent", granted ? "granted" : "denied");
        setShowPopup(false);
        if (granted) loadGAScript();
    }

  return (
    <div style={{
      position: "fixed", left: 0, right: 0, bottom: 0, top: 0,
      background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000
    }}>
      <div style={{
        background: "#fff", padding: 24, borderRadius: 8, maxWidth: 350, width: "90vw", textAlign: "center"
      }}>
        <p className="text-black">
          Ce site utilise Google Analytics pour analyser uniquement les clics et interactions.<br />
          Acceptez-vous la collecte anonyme de ces données ?
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button
            style={{
              flex: 1,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "12px 0",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer"
            }}
            onClick={() => handleConsent(true)}
          >
            Accepter
          </button>
          <button
            style={{
              flex: 1,
              background: "#4A4A4A",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "12px 0",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer"
            }}
            onClick={() => handleConsent(false)}
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}