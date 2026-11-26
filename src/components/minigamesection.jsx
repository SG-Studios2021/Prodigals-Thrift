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
      <style>{`
        @keyframes prodigalRainbowFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .prodigal-minigame-card {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .prodigal-minigame-card:hover {
          transform: translateY(-5px);
          border-color: rgba(96, 165, 250, 0.8);
          box-shadow: 0 20px 44px rgba(0, 0, 0, 0.72), 0 0 28px rgba(37, 137, 255, 0.22);
        }

        .prodigal-minigame-card:hover .prodigal-minigame-logo {
          transform: scale(1.04);
          filter: drop-shadow(0 10px 28px rgba(56, 189, 248, 0.65));
        }

        .prodigal-minigame-logo {
          transition: transform 0.25s ease, filter 0.25s ease;
        }

        .prodigal-hot-badge {
          background: linear-gradient(
            120deg,
            #ff2a5f,
            #ff8a00,
            #ffe600,
            #18e078,
            #1ca3ff,
            #9d4edd,
            #ff2a5f
          );
          background-size: 300% 300%;
          animation: prodigalRainbowFlow 3.2s ease infinite;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .prodigal-minigame-card:hover .prodigal-hot-badge {
          transform: rotate(14deg) scale(1.08);
          box-shadow: 0 8px 22px rgba(255, 105, 180, 0.45);
        }

        .prodigal-play-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .prodigal-play-btn:hover {
          transform: translateY(-2px) scale(1.03);
          filter: brightness(1.08);
          box-shadow: 0 10px 28px rgba(56, 189, 248, 0.6);
        }

        .prodigal-play-btn:active {
          transform: translateY(0) scale(0.99);
        }
      `}</style>

      <div
        className="prodigal-minigame-card"
        style={{
          position: "relative",
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
        {/* Tilted Rainbow Flowing "HOT!" Badge */}
        <div
          className="prodigal-hot-badge"
          aria-label="Hot minigame"
          style={{
            position: "absolute",
            top: -12,
            right: -10,
            transform: "rotate(11deg)",
            padding: "6px 14px",
            borderRadius: 999,
            color: "#090b12",
            fontWeight: 900,
            fontSize: 12,
            letterSpacing: 1.1,
            textTransform: "uppercase",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.45)",
            border: "2px solid rgba(255, 255, 255, 0.85)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          HOT!
        </div>

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
          className="prodigal-minigame-logo"
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
          className="prodigal-play-btn"
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