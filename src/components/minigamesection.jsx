import React from "react";

const MINIGAME_URL = "https://prodigalsminigame.vercel.app/";

export default function MinigameSection() {
  return (
    <section
      id="minigame"
      style={{
        width: "100%",
        padding: "64px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 820,
          borderRadius: 20,
          padding: "32px 24px",
          background:
            "linear-gradient(180deg, rgba(17, 22, 38, 0.92) 0%, rgba(8, 10, 18, 0.96) 100%)",
          border: "1px solid rgba(37, 137, 255, 0.4)",
          boxShadow: "0 14px 36px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: "#60a5fa",
          }}
        >
          PRODIGAL$ ARCADE
        </span>

        <h2
          style={{
            margin: 0,
            fontSize: "clamp(24px, 4.5vw, 34px)",
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          Play Our Fun Minigame
        </h2>

        <p
          style={{
            margin: 0,
            maxWidth: 560,
            fontSize: "clamp(13px, 2.5vw, 15px)",
            lineHeight: 1.6,
            color: "#cbd5e1",
          }}
        >
          Dodge incoming kicks, rack up high scores on the global leaderboard, and
          unlock Cris, Vench, and Carl as you push past 2,000, 3,000, and 5,000
          points.
        </p>

        <img
          src="/images/minigamelogo.png"
          alt="Prodigal$ Runner Minigame"
          style={{
            width: "min(280px, 72vw)",
            height: "auto",
            objectFit: "contain",
            margin: "6px 0",
            filter: "drop-shadow(0 8px 24px rgba(37, 137, 255, 0.45))",
          }}
        />

        <a
          href={MINIGAME_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 4,
            padding: "12px 32px",
            borderRadius: 999,
            textDecoration: "none",
            background: "linear-gradient(90deg, #2589ff, #38bdf8)",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.6,
            boxShadow: "0 6px 22px rgba(37, 137, 255, 0.45)",
          }}
        >
          PLAY MINIGAME
        </a>
      </div>
    </section>
  );
}