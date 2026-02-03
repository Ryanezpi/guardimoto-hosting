import { Routes, Route } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

const APK_PATH =
  "https://storage.googleapis.com/guard-imoto-project.firebasestorage.app/app/guardimoto-app.apk" +
  "?response-content-disposition=attachment%3B%20filename%3Dguardimoto-app.apk" +
  "&response-content-type=application%2Fvnd.android.package-archive" +
  "&v=20260203";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #a20c7a 0%, #120a12 65%, #000000 100%)",
    padding: "clamp(20px, 5vw, 36px) 16px clamp(28px, 7vw, 56px)",
    fontFamily: "\"SF Pro Text\", \"Segoe UI\", system-ui, sans-serif",
    color: "#f4f5f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  shell: {
    width: "100%",
    maxWidth: 720,
    margin: "0 auto",
    textAlign: "center" as const,
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  headerBar: {
    width: "100%",
    padding: "clamp(10px, 2.8vw, 12px) clamp(12px, 4vw, 16px)",
    borderRadius: 16,
    background: "rgba(0, 0, 0, 0.28)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
    position: "sticky" as const,
    top: 0,
    zIndex: 5,
    backdropFilter: "blur(6px)",
  },
  logo: {
    width: "clamp(34px, 10vw, 44px)",
    height: "clamp(34px, 10vw, 44px)",
  },
  title: {
    fontSize: "clamp(20px, 5.4vw, 26px)",
    fontWeight: 800,
    letterSpacing: 0.2,
  },
  card: {
    background: "#f5f5f5",
    borderRadius: 22,
    padding: "clamp(16px, 4vw, 20px)",
    border: "1px solid #e0e0e0",
    boxShadow: "0 10px 26px rgba(0,0,0,0.28)",
    color: "#1f2428",
    textAlign: "center" as const,
  },
  cardTitle: {
    fontSize: "clamp(18px, 4.6vw, 20px)",
    fontWeight: 800,
    marginBottom: 6,
  },
  muted: {
    color: "#5f6368",
    lineHeight: 1.5,
  },
  qrWrap: {
    background: "#ffffff",
    display: "inline-block",
    padding: 14,
    borderRadius: 16,
    border: "1px solid #eee",
  },
  warning: {
    marginTop: 14,
    background: "#ffefc1",
    borderRadius: 12,
    padding: "12px 14px",
    color: "#7a3b12",
    display: "flex",
    gap: 10,
    alignItems: "center",
    textAlign: "center" as const,
    justifyContent: "center",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid #d6d6d6",
    background: "#ffffff",
    textAlign: "center" as const,
    textDecoration: "none",
    color: "#5f6368",
    fontWeight: 700,
  },
  buttonPrimary: {
    display: "block",
    width: "100%",
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid #8e0a6a",
    background: "#a20c7a",
    textAlign: "center" as const,
    textDecoration: "none",
    color: "#ffffff",
    fontWeight: 800,
    boxShadow: "0 8px 16px rgba(162,12,122,0.35)",
  },
  sectionSpacer: { height: 14 },
  link: { color: "#a20c7a", fontWeight: 700 },
};

function Home() {
  const downloadUrl = APK_PATH;
  const [qrSize, setQrSize] = useState(220);

  useEffect(() => {
    const update = () => {
      const next = Math.min(240, Math.max(160, window.innerWidth - 140));
      setQrSize(next);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.headerBar}>
          <div style={styles.brandRow}>
            <img src="/assets/main-logo.png" alt="GuardiMoto logo" style={styles.logo} />
            <div style={styles.title}>GuardiMoto</div>
          </div>
        </div>
        <div style={styles.sectionSpacer} />

        <div style={styles.card}>
          <div style={styles.cardTitle}>APK Download</div>
          <p style={styles.muted}>Scan this QR to download the APK.</p>

          <div style={styles.qrWrap}>
            <QRCodeCanvas value={downloadUrl} size={qrSize} includeMargin />
          </div>

          <p style={{ marginTop: 12 }}>
            Or open:{" "}
            <a style={styles.link} href="/download">
              GuardiMoto
            </a>
          </p>

          <div style={styles.warning}>
            <div>⚠️</div>
            <div>
              To prevent accidental changes, please confirm before applying. If Android blocks installs, enable{" "}
              <b>Install unknown apps</b> for your browser after download.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Download() {
  const [status, setStatus] = useState<"downloading" | "downloaded">("downloading");

  useEffect(() => {
    window.location.href = APK_PATH;

    const timer = window.setTimeout(() => setStatus("downloaded"), 2200);
    // setTimeout(() => navigate("/"), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.headerBar}>
          <div style={styles.brandRow}>
            <img src="/assets/main-logo.png" alt="GuardiMoto logo" style={styles.logo} />
            <div style={styles.title}>GuardiMoto</div>
          </div>
        </div>
        <div style={styles.sectionSpacer} />

        <div style={styles.card}>
          <div style={styles.cardTitle}>
            {status === "downloading" ? "Downloading…" : "Downloaded"}
          </div>
          <p style={styles.muted}>
            If your download didn’t start or failed, tap the button below.
          </p>

          <div style={styles.sectionSpacer} />

          <a href={APK_PATH} style={styles.buttonPrimary} target="_blank" rel="noreferrer">
            Download
          </a>

          <div style={styles.sectionSpacer} />

          <ol style={{ ...styles.muted, listStylePosition: "inside", textAlign: "center" }}>
            <li>Open the downloaded APK</li>
            <li>If blocked: Settings → Security → Install unknown apps → allow your browser</li>
            <li>Install</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/download" element={<Download />} />
    </Routes>
  );
}
