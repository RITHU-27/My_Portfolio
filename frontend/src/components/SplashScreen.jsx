import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [statusText, setStatusText] = useState("INITIALIZING COMPONENT DRAFTING...");

  useEffect(() => {
    const statuses = [
      "INITIALIZING COMPONENT DRAFTING...",
      "CALIBRATING VIEWPORT COORDINATES...",
      "DRAWING HARDWARE SCHEMATICS...",
      "DRAFTING UI MOCKUPS...",
      "COMPILING SYSTEM LOGIC...",
      "RENDERING EXPERIENCE LAYER...",
      "SYSTEM DEPLOYMENT SUCCESSFUL."
    ];

    let currentStatusIdx = 0;
    const interval = setInterval(() => {
      if (currentStatusIdx < statuses.length - 1) {
        currentStatusIdx++;
        setStatusText(statuses[currentStatusIdx]);
      }
    }, 350);

    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 600); // Allow exit animation to finish
    }, 3800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const pathTransition = {
    duration: 2.0,
    ease: "easeInOut",
  };

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "#030816",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            overflow: "hidden",
            padding: "20px"
          }}
        >
          {/* Blueprint Drafting Sheet Grid Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(0, 240, 255, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 240, 255, 0.08) 1px, transparent 1px),
                linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
              zIndex: 1,
              pointerEvents: "none"
            }}
          />

          {/* Technical Drawing Border Sheet Frame */}
          <div
            style={{
              position: "absolute",
              inset: "20px",
              border: "1px solid rgba(0, 240, 255, 0.3)",
              zIndex: 2,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "10px"
            }}
          >
            {/* Top Sheet Annotations */}
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--primary)", opacity: 0.6 }}>
              <span>DWG NO: CSD-PORTFOLIO-2026</span>
              <span>SCALE: 1:1</span>
              <span>UNIT: METRIC (MM)</span>
            </div>

            {/* Bottom Sheet Annotations */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--primary)", opacity: 0.6 }}>
              <span>DRAFTED BY: RITHANYAA V.</span>
              <span style={{ fontSize: "10px", color: "var(--primary)", fontWeight: "bold" }}>{statusText}</span>
              <span>SHEET 1 OF 1</span>
            </div>
          </div>

          {/* Blueprint Layout Grid for the SVGs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: "40px",
              width: "100%",
              maxWidth: "800px",
              height: "100%",
              maxHeight: "550px",
              position: "relative",
              zIndex: 3,
              margin: "auto"
            }}
          >
            {/* Box 1: Laptop Schematic (Top Left) */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 10, left: 10, fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--primary)", opacity: 0.4 }}>REF: HW.01</div>
              <svg viewBox="0 0 100 80" style={{ width: "80%", maxHeight: "110px" }}>
                {/* Screen Outline */}
                <motion.rect x="15" y="10" width="70" height="42" rx="1" fill="none" stroke="var(--primary)" strokeWidth="1.2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={pathTransition} />
                {/* Screen Inner Grid */}
                <motion.rect x="18" y="13" width="64" height="36" fill="none" stroke="var(--primary)" strokeWidth="0.6" strokeDasharray="2 2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...pathTransition, delay: 0.3 }} />
                {/* Base Outline */}
                <motion.path d="M5,52 L95,52 L90,62 L10,62 Z" fill="none" stroke="var(--primary)" strokeWidth="1.2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={pathTransition} />
                {/* Trackpad */}
                <motion.rect x="42" y="55" width="16" height="5" rx="0.5" fill="none" stroke="var(--primary)" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...pathTransition, delay: 0.5 }} />
                {/* Laptop Label */}
                <motion.text x="50" y="73" textAnchor="middle" fill="var(--text-muted)" fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="1.2"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.2 }}>
                  [ LAPTOP_SCHEMATIC ]
                </motion.text>
              </svg>
            </div>

            {/* Box 2: Mobile UI Wireframe (Top Right) */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 10, right: 10, fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--primary)", opacity: 0.4 }}>REF: UX.02</div>
              <svg viewBox="0 0 100 80" style={{ width: "80%", maxHeight: "110px" }}>
                {/* Phone Shell */}
                <motion.rect x="36" y="4" width="28" height="58" rx="3" fill="none" stroke="var(--primary)" strokeWidth="1.2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={pathTransition} />
                {/* Screen Inner */}
                <motion.rect x="39" y="8" width="22" height="50" rx="1" fill="none" stroke="var(--primary)" strokeWidth="0.6" strokeDasharray="3 3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...pathTransition, delay: 0.2 }} />
                {/* Speaker */}
                <motion.line x1="47" y1="6" x2="53" y2="6" fill="none" stroke="var(--primary)" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...pathTransition, delay: 0.4 }} />
                {/* Home Indicator */}
                <motion.line x1="46" y1="56" x2="54" y2="56" fill="none" stroke="var(--primary)" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...pathTransition, delay: 0.4 }} />
                {/* UI Elements */}
                <motion.rect x="42" y="12" width="16" height="10" rx="0.5" fill="none" stroke="var(--primary)" strokeWidth="0.7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
                <motion.circle cx="46" cy="30" r="2.5" fill="none" stroke="var(--primary)" strokeWidth="0.7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7 }} />
                <motion.line x1="51" y1="29" x2="58" y2="29" fill="none" stroke="var(--primary)" strokeWidth="0.7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }} />
                <motion.line x1="51" y1="31" x2="56" y2="31" fill="none" stroke="var(--primary)" strokeWidth="0.7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />
                <motion.rect x="42" y="38" width="16" height="15" rx="0.5" fill="none" stroke="var(--primary)" strokeWidth="0.7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.0 }} />
                {/* UI Label */}
                <motion.text x="50" y="73" textAnchor="middle" fill="var(--text-muted)" fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="1.2"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.2 }}>
                  [ MOBILE_VIEWPORT_UX ]
                </motion.text>
              </svg>
            </div>

            {/* Box 3: Coding Symbols (Bottom Left) */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", bottom: 10, left: 10, fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--primary)", opacity: 0.4 }}>REF: CS.03</div>
              <svg viewBox="0 0 100 80" style={{ width: "80%", maxHeight: "110px" }}>
                {/* Compiler Frame */}
                <motion.rect x="15" y="10" width="70" height="48" rx="1.5" fill="none" stroke="var(--primary)" strokeWidth="1.2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={pathTransition} />
                {/* Header Window Dots */}
                <motion.circle cx="21" cy="15" r="1.2" fill="none" stroke="var(--primary)" strokeWidth="0.7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
                <motion.circle cx="26" cy="15" r="1.2" fill="none" stroke="var(--primary)" strokeWidth="0.7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 }} />
                <motion.circle cx="31" cy="15" r="1.2" fill="none" stroke="var(--primary)" strokeWidth="0.7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
                <motion.line x1="15" y1="20" x2="85" y2="20" fill="none" stroke="var(--primary)" strokeWidth="0.7"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
                {/* Brackets < /> */}
                <motion.path d="M37,28 L27,36 L37,44" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.6 }} />
                <motion.line x1="46" y1="48" x2="54" y2="24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.8 }} />
                <motion.path d="M63,28 L73,36 L63,44" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.7 }} />
                {/* Code Label */}
                <motion.text x="50" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="1.2"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.2 }}>
                  [ LOGIC_SRC.EXE ]
                </motion.text>
              </svg>
            </div>

            {/* Box 4: Design Bezier Curve (Bottom Right) */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", bottom: 10, right: 10, fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--primary)", opacity: 0.4 }}>REF: DS.04</div>
              <svg viewBox="0 0 100 80" style={{ width: "80%", maxHeight: "110px" }}>
                {/* Curve */}
                <motion.path d="M15,48 Q50,12 85,48" fill="none" stroke="var(--primary)" strokeWidth="1.2" strokeDasharray="3 3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={pathTransition} />
                {/* Anchor Squares */}
                <motion.rect x="12" y="45" width="5" height="5" fill="none" stroke="var(--primary)" strokeWidth="1"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
                <motion.rect x="47.5" y="27.5" width="5" height="5" fill="none" stroke="var(--primary)" strokeWidth="1"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 }} />
                <motion.rect x="83" y="45" width="5" height="5" fill="none" stroke="var(--primary)" strokeWidth="1"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
                {/* Tangent lines */}
                <motion.line x1="50" y1="30" x2="35" y2="18" fill="none" stroke="var(--primary)" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
                <motion.circle cx="35" cy="18" r="1.5" fill="none" stroke="var(--primary)" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7 }} />
                <motion.line x1="50" y1="30" x2="65" y2="42" fill="none" stroke="var(--primary)" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }} />
                <motion.circle cx="65" cy="42" r="1.5" fill="none" stroke="var(--primary)" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />
                {/* Pen tool tip */}
                <motion.path d="M50,30 L58,16 L54,13 L51,15 Z" fill="none" stroke="var(--primary)" strokeWidth="1"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.0 }} />
                {/* Design Label */}
                <motion.text x="50" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="1.2"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.2 }}>
                  [ UX_VECTOR_PEN ]
                </motion.text>
              </svg>
            </div>

            {/* Central Overlay Box: "Crafting Code. Designing Experiences." */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                maxWidth: "460px",
                background: "rgba(3, 8, 22, 0.96)",
                border: "2px solid var(--primary)",
                boxShadow: "0 0 30px rgba(0, 240, 255, 0.25)",
                padding: "24px 16px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px"
              }}
            >
              {/* Technical Box Crosshairs */}
              <div style={{ position: "absolute", top: -8, left: -8, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>+</div>
              <div style={{ position: "absolute", top: -8, right: -8, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>+</div>
              <div style={{ position: "absolute", bottom: -12, left: -8, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>+</div>
              <div style={{ position: "absolute", bottom: -12, right: -8, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>+</div>

              {/* Title brand */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  fontFamily: "var(--font-title)",
                  fontSize: "1.8rem",
                  fontWeight: "800",
                  letterSpacing: "1px",
                  color: "#fff",
                  textShadow: "0 0 10px rgba(0, 240, 255, 0.4)",
                  marginBottom: "8px"
                }}
              >
                RITHANYAA V.
              </motion.div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 0.9, duration: 1.2, ease: "easeInOut" }}
                style={{
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                  marginBottom: "12px"
                }}
              />

              {/* Main slogan: "Crafting Code. Designing Experiences." */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
                    color: "var(--primary)",
                    textTransform: "uppercase"
                  }}
                >
                  Crafting Code.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.8 }}
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
                    color: "var(--primary)",
                    textTransform: "uppercase"
                  }}
                >
                  Designing Experiences.
                </motion.div>
              </div>

              {/* Coordinate label */}
              <div
                style={{
                  marginTop: "16px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  color: "var(--text-muted)",
                  opacity: 0.5,
                  display: "flex",
                  gap: "10px"
                }}
              >
                <span>X: 1920.00</span>
                <span>Y: 1080.00</span>
                <span>Z: 0.00</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
