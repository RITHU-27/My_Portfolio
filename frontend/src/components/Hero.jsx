import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiExternalLink, FiCpu, FiCornerDownRight, FiUser, FiActivity, FiLayers, FiCompass } from "react-icons/fi";
import { profile } from "../data/portfolio.js";

const DISTRICT_DETAILS = {
  react: {
    title: "React Glowing Tower",
    tag: "SYS.HARDWARE",
    level: "80%",
    concept: "Complex state machinery, component grids, and high-performance layouts.",
    skills: ["React.js", "Vite", "framer-motion", "Component Lifecycle"],
    slogan: "GENETIC CORE: STRUCTURING RESPONSIVE FRONTLINES"
  },
  node: {
    title: "Node.js Backend Hub",
    tag: "SYS.LOGIC",
    level: "75%",
    concept: "Server routers, REST API grid pipelines, and event gateways.",
    skills: ["Node.js", "Express.js", "API routing", "Middleware modules"],
    slogan: "GENETIC CORE: STREAMING LOGICAL BACKEND CONDUITS"
  },
  mongodb: {
    title: "MongoDB Data Vault",
    tag: "SYS.DATABASE",
    level: "80%",
    concept: "Encrypted collections, indexing matrices, and persistent schema stores.",
    skills: ["MongoDB", "Mongoose ORM", "Aggregations", "JSON structures"],
    slogan: "GENETIC CORE: ENCRYPTING IMMUTABLE SPECIFICATIONS"
  },
  design: {
    title: "UI/UX Design District",
    tag: "SYS.VIEWPORT",
    level: "89%",
    concept: "Typography grids, vector pen handles, layout rules, and interactive micro-animations.",
    skills: ["Figma Design", "Typography", "CSS Grid/Flexbox", "Wireframing"],
    slogan: "GENETIC CORE: DRAFTING SYMMETRICAL EXPERIENCES"
  },
  ai: {
    title: "AI Neural Lab",
    tag: "SYS.NEURAL",
    level: "85%",
    concept: "NLP text processing, Streamlit prototyping, and IBM Watson Text-to-Speech synaptic flows.",
    skills: ["Python", "Natural Language Processing", "Streamlit", "AI TTS"],
    slogan: "GENETIC CORE: TRAINING MUTATIVE LOGIC LATTICES"
  }
};


export default function Hero() {
  const [viewMode, setViewMode] = useState("schematic"); // 'schematic' or 'biometric'
  const [selectedNode, setSelectedNode] = useState(null); // 'react', 'node', 'mongodb', 'design', 'ai' or null
  const [helixAngle, setHelixAngle] = useState(0);
    // ===== TERMINAL EFFECT STATE (ADD HERE) =====
  const terminalLines = [
    "UI-UX DESIGNER",
    "FULL STACK DEVELOPER",
    "AI ENTHUSIAST",
    "DATA ANALYST",
    "CREATIVE CODER",
    "PROBLEM SOLVER"
  ];

  const [terminalIndex, setTerminalIndex] = useState(0);
  const [terminalText, setTerminalText] = useState("");

  // Terminal typing effect
  useEffect(() => {
    const currentLine = terminalLines[terminalIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setTerminalText(currentLine.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTerminalIndex((prev) => (prev + 1) % terminalLines.length);
          setTerminalText("");
        }, 500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [terminalIndex]);

  // Rotate DNA Helix continuously in schematic mode
  useEffect(() => {
    let id;
    if (viewMode === "schematic") {
      id = setInterval(() => {
        setHelixAngle((prev) => (prev + 2) % 360);
      }, 50);
    }
    return () => clearInterval(id);
  }, [viewMode]);

  // Compute DNA positions dynamically based on angle
  const getHelixNodeCoords = (yOffset, anglePhase) => {
    const rad = ((helixAngle + anglePhase) * Math.PI) / 180;
    const xPos = 140 + Math.sin(rad) * 35;
    const zIndex = Math.cos(rad) > 0 ? 10 : 1;
    const opacity = Math.cos(rad) > 0 ? 1.0 : 0.4;
    const scale = Math.cos(rad) > 0 ? 1.2 : 0.8;
    return { xPos, zIndex, opacity, scale };
  };

  const nodes = [
    { key: "ai", label: "AI Neural Lab", y: 35, phase: 0 },
    { key: "react", label: "React Tower", y: 85, phase: 72 },
    { key: "design", label: "Design District", y: 135, phase: 144 },
    { key: "node", label: "Backend Hub", y: 185, phase: 216 },
    { key: "mongodb", label: "Data Vault", y: 235, phase: 288 }
  ];

  return (
    <section className="hero">
      {/* Decorative Blueprint/Cyberpunk Coordinates */}
      <div 
        style={{
          position: "absolute",
          top: "100px",
          left: "20px",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          color: "var(--primary)",
          opacity: 0.5,
          lineHeight: "1.4",
          pointerEvents: "none"
        }}
      >
        <div>SYS_ALIGN // OK</div>
        <div>MUTATION_RATIO // 9:27</div>
        <div>TAG // BUILT INTO MY CODE.</div>
      </div>

      <div 
        style={{
          position: "absolute",
          bottom: "40px",
          right: "20px",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          color: "var(--primary)",
          opacity: 0.5,
          lineHeight: "1.4",
          textAlign: "right",
          pointerEvents: "none"
        }}
      >
        <div>GRID_UNIT = 20PX</div>
        <div>VIEWPORT = AUTONOMOUS</div>
        <div>THEME = DUAL_VAR_SYS</div>
      </div>

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="hero__greeting">
            <FiCpu style={{ verticalAlign: "middle", marginRight: "6px" }} />
            COMPUTER SCIENCE AND DESIGN STUDENT
          </p>
          <h1 className="hero__name">{profile.name}</h1>
                    {/* TERMINAL EFFECT BELOW NAME */}
          <div
            style={{
              marginTop: "12px",
              fontFamily: "monospace",
              fontSize: "14px",
              color: "var(--primary)",
              letterSpacing: "1px",
              background: "rgba(0, 0, 0, 0.6)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "10px 14px",
              display: "inline-block",
              minWidth: "300px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "var(--primary-2)" }}>$</span>
              <span>{terminalText}</span>
              <span style={{ opacity: 0.7, animation: "blink 1s infinite" }}>█</span>
            </div>
          </div>
          <p style={{ opacity: 0.85, fontSize: "0.95rem", margin: "10px 0 20px" }}>
            {profile.tagline}
          </p>

          {/* District details modal (inline rendering overlay) */}
          <div style={{ minHeight: "135px", marginBottom: "20px" }}>
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    border: "1px dashed var(--primary)",
                    background: "var(--surface)",
                    padding: "16px",
                    borderRadius: "var(--radius)",
                    position: "relative"
                  }}
                >
                  {/* Technical Crosshairs */}
                  <div style={{ position: "absolute", top: -6, left: -6, color: "var(--primary)", fontSize: "12px" }}>+</div>
                  <div style={{ position: "absolute", bottom: -10, right: -6, color: "var(--primary)", fontSize: "12px" }}>+</div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", color: "var(--primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                      [{DISTRICT_DETAILS[selectedNode].tag}] DISTRICT_SCHEMA
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--primary-2)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                      DEV_MUTATION: {DISTRICT_DETAILS[selectedNode].level}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "4px" }}>
                    {DISTRICT_DETAILS[selectedNode].title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "8px" }}>
                    {DISTRICT_DETAILS[selectedNode].concept}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {DISTRICT_DETAILS[selectedNode].skills.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: "9px",
                          fontFamily: "var(--font-mono)",
                          border: "1px solid var(--border)",
                          padding: "2px 6px",
                          color: "var(--primary)"
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div 
                    onClick={() => setSelectedNode(null)}
                    style={{ 
                      position: "absolute", 
                      top: "6px", 
                      right: "10px", 
                      fontSize: "9px", 
                      fontFamily: "var(--font-mono)", 
                      cursor: "pointer", 
                      color: "var(--primary-2)",
                      textTransform: "uppercase"
                    }}
                  >
                    [ close ]
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default-stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", gap: "20px" }}
                >
                  {/* Default Stats Cards */}
                  <div className="stat-card">
                    <h3>{profile.cgpa}</h3>
                    <p>CGPA</p>
                  </div>

                  <div className="stat-card">
                    <h3>{profile.projectsCount}+</h3>
                    <p>Projects</p>
                  </div>

                  <div className="stat-card">
                    <h3>{profile.problemsSolved}+</h3>
                    <p>Solved</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hero__actions">
            <a
              href={profile.codolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              View Codolio <FiExternalLink />
            </a>
            <Link to="/projects" className="btn btn--primary">
              View My Work
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Get In Touch
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Interactive DNA Helix / Avatar switcher */}
        <motion.div
          className="hero__avatar"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flexDirection: "column", gap: "16px" }}
        >
          {/* Mode Switcher console tabs */}
          <div 
            style={{ 
              display: "flex", 
              border: "1px solid var(--border)", 
              borderRadius: "var(--radius)",
              background: "rgba(0, 240, 255, 0.03)",
              padding: "2px",
              width: "100%",
              maxWidth: "280px"
            }}
          >
            <button
              onClick={() => setViewMode("schematic")}
              style={{
                flex: 1,
                background: viewMode === "schematic" ? "var(--surface-2)" : "none",
                border: "none",
                borderRadius: "var(--radius)",
                color: viewMode === "schematic" ? "var(--primary)" : "var(--text-muted)",
                padding: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: "bold",
                cursor: "pointer",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px"
              }}
            >
              <FiLayers /> SCHEMATICS
            </button>
            <button
              onClick={() => setViewMode("biometric")}
              style={{
                flex: 1,
                background: viewMode === "biometric" ? "var(--surface-2)" : "none",
                border: "none",
                borderRadius: "var(--radius)",
                color: viewMode === "biometric" ? "var(--primary)" : "var(--text-muted)",
                padding: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: "bold",
                cursor: "pointer",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px"
              }}
            >
              <FiUser /> BIOMETRICS
            </button>
          </div>

          <div style={{ position: "relative", width: "280px", height: "280px" }}>
            <AnimatePresence mode="wait">
              {viewMode === "schematic" ? (
                <motion.div
                  key="dna-map"
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 20 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid var(--border)",
                    borderRadius: "50%",
                    background: "var(--surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Holographic Radar Line Scanning */}
                  <div
                    style={{
                      position: "absolute",
                      width: "200%",
                      height: "2px",
                      background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                      top: "50%",
                      left: "-50%",
                      opacity: 0.15,
                      animation: "scanLine 4s linear infinite",
                      pointerEvents: "none"
                    }}
                  />

                  {/* Interactive DNA Helix Draw */}
                  <svg viewBox="0 0 280 280" style={{ width: "100%", height: "100%" }}>
                    {/* Helix background circle */}
                    <circle cx="140" cy="140" r="130" fill="none" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
                    
                    {/* Interactive Clickable Nodes */}
                    {nodes.map((node) => {
                      const { xPos, zIndex, opacity, scale } = getHelixNodeCoords(node.y, node.phase);
                      const isHovered = selectedNode === node.key;
                      
                      return (
                        <g 
                          key={node.key} 
                          style={{ cursor: "pointer", zIndex }}
                          onClick={() => setSelectedNode(node.key)}
                        >
                          {/* Anchor lines branching out from DNA Center */}
                          {isHovered && (
                            <line 
                              x1={xPos} 
                              y1={node.y} 
                              x2={140} 
                              y2={140} 
                              stroke="var(--primary)" 
                              strokeWidth="1" 
                              strokeDasharray="2 2"
                            />
                          )}

                          {/* Node Dot Ring */}
                          <circle
                            cx={xPos}
                            cy={node.y}
                            r={isHovered ? 11 : 7}
                            fill="none"
                            stroke={isHovered ? "var(--primary-2)" : "var(--primary)"}
                            strokeWidth={isHovered ? 2.5 : 1}
                            style={{ opacity }}
                          />

                          {/* Central Solid Node Dot */}
                          <circle
                            cx={xPos}
                            cy={node.y}
                            r={isHovered ? 6 : 4}
                            fill={isHovered ? "var(--primary-2)" : "var(--primary)"}
                            style={{ opacity }}
                          />

                          {/* Text label overlay */}
                          {scale > 1.0 && (
                            <text
                              x={xPos > 140 ? xPos + 12 : xPos - 12}
                              y={node.y + 3}
                              fill="var(--text)"
                              fontSize="8"
                              fontFamily="var(--font-mono)"
                              fontWeight="bold"
                              textAnchor={xPos > 140 ? "start" : "end"}
                              style={{ opacity: opacity * 0.95 }}
                            >
                              {node.label.toUpperCase()}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Secondary helix lines */}
                    <path
                      d="M 140,25 C 90,85 190,145 140,205 C 90,265 190,285 140,320"
                      fill="none"
                      stroke="rgba(0, 240, 255, 0.15)"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="avatar-photo"
                  className="hero__avatar-ring"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid var(--primary)",
                    boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)"
                  }}
                >
                  <img
                    src={profile.avatarUrl.replace("frontend/", "")}
                    alt={profile.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scanLine {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </section>
  );
}
