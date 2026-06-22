import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [statusText, setStatusText] = useState("MUTATING GENETIC SEQUENCE...");
  const [cameraZoom, setCameraZoom] = useState("wide"); // 'wide', 'zoom-in', 'fly-through'

  useEffect(() => {
    const statuses = [
      "SYNAPSE: SECURE BOOT INITIALIZED...",
      "MUTATING GENETIC CODE SEQUENCE...",
      "CELLULAR NODES: REACT / NODE / MONGO / DESIGN / AI...",
      "CONSTRUCTING SKILL DISTRICTS...",
      "LOCATING REACT TOWER [HW.01]...",
      "SYNCHRONIZING BACKEND HUB [DB.02]...",
      "SECTOR SCAN: AI NEURAL LAB ACTIVE...",
      "CAMERA ALIGNMENT: 3D FLY-THROUGH STAGE...",
      "LANDING ENGINE FIRED. WELCOME USER."
    ];

    let statusIdx = 0;
    const interval = setInterval(() => {
      if (statusIdx < statuses.length - 1) {
        statusIdx++;
        setStatusText(statuses[statusIdx]);
      }
    }, 400);

    // Zoom phases
    const zoomTimer = setTimeout(() => setCameraZoom("zoom-in"), 1200);
    const flyTimer = setTimeout(() => setCameraZoom("fly-through"), 2600);

    const completeTimer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 600); // Allow exit transition
    }, 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(zoomTimer);
      clearTimeout(flyTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Generate DNA Helix Nodes for the animation
  const numDnaNodes = 12;
  const dnaNodes = Array.from({ length: numDnaNodes }).map((_, idx) => {
    const ratio = idx / (numDnaNodes - 1);
    const yPos = 80 + ratio * 240; // Vertical span
    return { id: idx, ratio, yPos };
  });

  const getDnaPath = (isStrandB) => {
    const points = [];
    const amplitude = 35;
    const frequency = 2; // turns
    for (let y = 80; y <= 320; y += 10) {
      const angle = (y / 240) * Math.PI * 2 * frequency + (isStrandB ? Math.PI : 0);
      const x = 250 + Math.sin(angle) * amplitude;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  // ViewBox values simulating camera flight
  const getViewBox = () => {
    if (cameraZoom === "wide") return "0 0 500 400";
    if (cameraZoom === "zoom-in") return "100 80 300 240";
    return "200 160 100 80"; // Tight zoom / fly-through center
  };

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "#040209",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            overflow: "hidden",
            color: "var(--primary)"
          }}
        >
          {/* Cyberpunk Grid Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(0, 240, 255, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 240, 255, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              opacity: 0.6,
              transform: cameraZoom === "fly-through" ? "scale(2.2)" : cameraZoom === "zoom-in" ? "scale(1.4)" : "scale(1.0)",
              transition: "transform 2s cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 1,
              pointerEvents: "none"
            }}
          />

          {/* Perspective grid overlay (ground grid for flight effect) */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              backgroundImage: `
                linear-gradient(to top, rgba(255, 0, 127, 0.15), transparent),
                linear-gradient(rgba(0, 240, 255, 0.08) 1.5px, transparent 1.5px),
                linear-gradient(90deg, rgba(0, 240, 255, 0.08) 1.5px, transparent 1.5px)
              `,
              backgroundSize: "100% 100%, 30px 30px, 30px 30px",
              transform: "perspective(300px) rotateX(75deg)",
              transformOrigin: "bottom center",
              opacity: 0.8,
              zIndex: 2
            }}
          />

          {/* HUD Border Sheet */}
          <div
            style={{
              position: "absolute",
              inset: "24px",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              zIndex: 10,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "16px",
              boxShadow: "inset 0 0 40px rgba(0, 240, 255, 0.05)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "9px" }}>
              <span>GENE_MUTATION_STATE // STABLE</span>
              <span>SYS_FLIGHT_ALIGN // AR_Z_9841</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "var(--font-mono)", fontSize: "9px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>DNA CITY GENOME INITIALIZER</span>
                <span style={{ color: "var(--primary-2)", textShadow: "0 0 5px var(--primary-2)", fontWeight: "bold" }}>
                  {statusText}
                </span>
              </div>
              <span>COORDS: X={cameraZoom === "wide" ? "0" : cameraZoom === "zoom-in" ? "241" : "480"} Y={cameraZoom === "wide" ? "0" : cameraZoom === "zoom-in" ? "189" : "330"}</span>
            </div>
          </div>

          {/* Master Animated Flying Camera Canvas */}
          <motion.svg
            animate={{ viewBox: getViewBox() }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "90%",
              maxWidth: "850px",
              height: "75%",
              zIndex: 5,
              position: "relative"
            }}
          >
            {/* Spinning DNA Helix Segment in Center */}
            <g>
              {/* Helix Strand A */}
              <motion.path
                d={getDnaPath(false)}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />

              {/* Helix Strand B */}
              <motion.path
                d={getDnaPath(true)}
                fill="none"
                stroke="var(--primary-2)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />

              {/* Connecting Helix Nodes & Rungs */}
              {dnaNodes.map((node) => {
                const angleOffset = node.ratio * Math.PI * 2 * 2;
                return (
                  <g key={node.id}>
                    {/* Rotating Rung Line */}
                    <motion.line
                      stroke="rgba(0, 240, 255, 0.4)"
                      strokeWidth="1"
                      y1={node.yPos}
                      y2={node.yPos}
                      animate={{
                        x1: [
                          250 + Math.sin(angleOffset) * 35,
                          250 + Math.sin(angleOffset + Math.PI) * 35,
                          250 + Math.sin(angleOffset + Math.PI * 2) * 35
                        ],
                        x2: [
                          250 + Math.sin(angleOffset + Math.PI) * 35,
                          250 + Math.sin(angleOffset + Math.PI * 2) * 35,
                          250 + Math.sin(angleOffset) * 35
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Node A Dot */}
                    <motion.circle
                      r="3.5"
                      fill="var(--primary)"
                      cy={node.yPos}
                      animate={{
                        cx: [
                          250 + Math.sin(angleOffset) * 35,
                          250 + Math.sin(angleOffset + Math.PI) * 35,
                          250 + Math.sin(angleOffset + Math.PI * 2) * 35
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Node B Dot */}
                    <motion.circle
                      r="3.5"
                      fill="var(--primary-2)"
                      cy={node.yPos}
                      animate={{
                        cx: [
                          250 + Math.sin(angleOffset + Math.PI) * 35,
                          250 + Math.sin(angleOffset + Math.PI * 2) * 35,
                          250 + Math.sin(angleOffset) * 35
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </g>
                );
              })}
            </g>

            {/* Mutated / Branching City Buildings Sketch */}
            {/* Sector A (Left Far): MongoDB Data Vault */}
            <g style={{ opacity: cameraZoom === "fly-through" ? 0.2 : 0.8 }}>
              {/* Linking mutation line from DNA strand node at y=120 */}
              <motion.line x1="215" y1="120" x2="80" y2="100" stroke="var(--primary)" strokeWidth="0.8" strokeDasharray="3 3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }} />
              {/* Cyber Vault Cylinder Cylinder outlines */}
              <motion.path d="M60,100 L100,100 L100,150 L60,150 Z" fill="none" stroke="var(--primary)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.9 }} />
              <motion.ellipse cx="80" cy="100" rx="20" ry="6" fill="none" stroke="var(--primary)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.1 }} />
              <motion.ellipse cx="80" cy="125" rx="20" ry="6" fill="none" stroke="var(--primary)" strokeWidth="0.8" strokeDasharray="2 2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3 }} />
              <motion.ellipse cx="80" cy="150" rx="20" ry="6" fill="none" stroke="var(--primary)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />
              <motion.text x="80" y="165" textAnchor="middle" fill="var(--text-muted)" fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.5">
                MONGO_VAULT
              </motion.text>
            </g>

            {/* Sector B (Left Mid): React Tower */}
            <g style={{ opacity: cameraZoom === "fly-through" ? 0.3 : 0.9 }}>
              {/* Connecting mutation vector from DNA strand node at y=220 */}
              <motion.line x1="215" y1="220" x2="140" y2="180" stroke="var(--primary)" strokeWidth="0.8" strokeDasharray="3 3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
              {/* React Tower Isometric Prism */}
              {/* Back edge */}
              <motion.path d="M140,120 L160,100 L180,120 L180,240 L140,240 Z" fill="none" stroke="var(--primary)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.8 }} />
              {/* Front edge */}
              <motion.line x1="160" y1="100" x2="160" y2="240" stroke="var(--primary)" strokeWidth="1.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.9 }} />
              {/* Diagonal frame grids */}
              <motion.line x1="140" y1="160" x2="160" y2="180" stroke="var(--primary)" strokeWidth="0.7" strokeDasharray="1 1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1 }} />
              <motion.line x1="160" y1="180" x2="180" y2="160" stroke="var(--primary)" strokeWidth="0.7" strokeDasharray="1 1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />
              {/* Ascending transmitter rings */}
              <motion.ellipse cx="160" cy="85" rx="10" ry="3" fill="none" stroke="var(--primary-2)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4 }} />
              <motion.ellipse cx="160" cy="75" rx="6" ry="2" fill="none" stroke="var(--primary-2)" strokeWidth="0.7"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6 }} />
              <motion.text x="160" y="255" textAnchor="middle" fill="var(--text-muted)" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.8">
                REACT_TOWER
              </motion.text>
            </g>

            {/* Sector C (Right Mid): Node.js Backend Hub */}
            <g style={{ opacity: cameraZoom === "fly-through" ? 0.3 : 0.9 }}>
              {/* Mutation path from DNA strand node at y=200 */}
              <motion.line x1="285" y1="200" x2="340" y2="220" stroke="var(--primary-2)" strokeWidth="0.8" strokeDasharray="3 3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7 }} />
              {/* Node.js Block schematic */}
              <motion.path d="M330,150 L370,130 L410,150 L410,240 L330,240 Z" fill="none" stroke="var(--primary)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.8 }} />
              <motion.line x1="370" y1="130" x2="370" y2="240" stroke="var(--primary)" strokeWidth="1.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.9 }} />
              {/* Data conduits mapping */}
              <motion.path d="M340,170 H400 M340,190 H400 M340,210 H400" fill="none" stroke="var(--primary-2)" strokeWidth="0.8" strokeDasharray="3 3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />
              <motion.text x="370" y="255" textAnchor="middle" fill="var(--text-muted)" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.8">
                BACKEND_HUB
              </motion.text>
            </g>

            {/* Sector D (Right Far): UI/UX Design District */}
            <g style={{ opacity: cameraZoom === "fly-through" ? 0.2 : 0.8 }}>
              {/* Mutation line from DNA node at y=140 */}
              <motion.line x1="285" y1="140" x2="420" y2="120" stroke="var(--primary-2)" strokeWidth="0.8" strokeDasharray="3 3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />
              {/* Bezier drafting outline */}
              <motion.path d="M420,130 Q450,90 480,130" fill="none" stroke="var(--primary)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.0 }} />
              <motion.rect x="447" y="107" width="6" height="6" fill="none" stroke="var(--primary)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />
              <motion.line x1="450" y1="110" x2="430" y2="90" stroke="var(--primary-2)" strokeWidth="0.8"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3 }} />
              <motion.circle cx="430" cy="90" r="1.5" fill="none" stroke="var(--primary-2)" strokeWidth="0.8"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4 }} />
              {/* Framing box */}
              <motion.rect x="420" y="100" width="60" height="50" fill="none" stroke="var(--primary)" strokeWidth="0.8" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1 }} />
              <motion.text x="450" y="165" textAnchor="middle" fill="var(--text-muted)" fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.5">
                DESIGN_DIST
              </motion.text>
            </g>

            {/* Sector E (Center Top): AI Neural Lab */}
            <g style={{ opacity: cameraZoom === "fly-through" ? 0.4 : 0.95 }}>
              {/* Synapse connections from DNA top node */}
              <motion.line x1="250" y1="80" x2="250" y2="40" stroke="var(--primary)" strokeWidth="0.8" strokeDasharray="2 2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.0 }} />
              {/* Synaptic nodes */}
              <motion.circle cx="250" cy="35" r="4" fill="none" stroke="var(--primary)" strokeWidth="1.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1 }} />
              <motion.circle cx="230" cy="20" r="3" fill="none" stroke="var(--primary)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />
              <motion.circle cx="270" cy="20" r="3" fill="none" stroke="var(--primary)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />
              <motion.line x1="250" y1="35" x2="230" y2="20" stroke="var(--primary)" strokeWidth="0.8"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3 }} />
              <motion.line x1="250" y1="35" x2="270" y2="20" stroke="var(--primary)" strokeWidth="0.8"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3 }} />
              <motion.text x="250" y="12" textAnchor="middle" fill="var(--text-muted)" fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="1.2">
                AI_NEURAL_LAB
              </motion.text>
            </g>
          </motion.svg>

          {/* Central Tagline box that fades in */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1.0 }}
            style={{
              position: "absolute",
              width: "90%",
              maxWidth: "460px",
              background: "rgba(4, 2, 9, 0.94)",
              border: "1px solid var(--border)",
              boxShadow: "0 0 30px rgba(0, 240, 255, 0.2)",
              padding: "24px 16px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              zIndex: 20
            }}
          >
            {/* Corner Bracket Decorations */}
            <div style={{ position: "absolute", top: -6, left: -6, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>+</div>
            <div style={{ position: "absolute", top: -6, right: -6, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>+</div>
            <div style={{ position: "absolute", bottom: -12, left: -8, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>+</div>
            <div style={{ position: "absolute", bottom: -12, right: -8, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>+</div>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1.0 }}
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "1.6rem",
                fontWeight: "800",
                letterSpacing: "2px",
                color: "#fff",
                textShadow: "0 0 10px rgba(0, 240, 255, 0.4)",
                marginBottom: "4px"
              }}
            >
              RITHANYAA VARAD HARAJAN
            </motion.div>

            <div
              style={{
                height: "1px",
                width: "80%",
                background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                margin: "8px 0"
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                style={{ color: "var(--primary-2)", textShadow: "0 0 4px var(--primary-2)" }}
              >
                BUILT INTO MY CODE.
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 2.6 }}
                style={{ color: "var(--text)", fontSize: "0.75rem", letterSpacing: "0.5px" }}
              >
                Crafting Code. Designing Experiences.
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
