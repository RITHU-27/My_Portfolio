import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/portfolio.js";

export default function Skills() {
  const [helixAngle, setHelixAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHelixAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate genetic sequence for each skill
  const generateGeneticCode = (skillName) => {
    const bases = ['A', 'T', 'C', 'G'];
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += bases[Math.floor(Math.random() * 4)];
    }
    return code;
  };

  const skillCategories = [
    { key: "languages", label: "Core Compiler Languages", color: "var(--primary)" },
    { key: "frontend", label: "React Tower District (Frontend)", color: "#00d4ff" },
    { key: "backend", label: "Backend Hub Network (Logic & DB)", color: "#ff6b35" },
    { key: "tools", label: "Design District & Neural Utilities", color: "#ff007f" },
  ];

  return (
    <section className="section section--alt" style={{ position: "relative" }}>
      {/* Blueprint Coordinates */}
      <div 
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          color: "var(--primary)",
          opacity: 0.5,
          lineHeight: "1.4",
          pointerEvents: "none"
        }}
      >
        <div>SKILL_MATRIX // LOADED</div>
        <div>DISTRICT_COUNT // 4</div>
        <div>MUTATION_READY // TRUE</div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section__eyebrow">DISTRICT SPECIFICATIONS</p>
          <h2 className="section__title">Skills &amp; Cyber-Grid Assets</h2>
        </motion.div>

        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
          {/* DNA Helix Visualization */}
          <div style={{ flex: 1, minWidth: "300px", position: "relative" }}>
            <svg viewBox="0 0 300 500" style={{ width: "100%", height: "500px" }}>
              {/* Helix strands */}
              {[false, true].map((isStrandB) => {
                const points = [];
                for (let y = 50; y <= 450; y += 10) {
                  const angle = (y / 400) * Math.PI * 2 + (isStrandB ? Math.PI : 0);
                  const x = 150 + Math.sin(angle + (helixAngle * Math.PI / 180)) * 40;
                  points.push(`${x},${y}`);
                }
                return (
                  <path
                    key={isStrandB ? "strandB" : "strandA"}
                    d={`M ${points.join(" L ")}`}
                    fill="none"
                    stroke={isStrandB ? "var(--primary-2)" : "var(--primary)"}
                    strokeWidth="2"
                  />
                );
              })}

              {/* Base pair lines */}
              {Array.from({ length: 20 }).map((_, idx) => {
                const y = 60 + idx * 20;
                const angle = (y / 400) * Math.PI * 2;
                const x1 = 150 + Math.sin(angle + (helixAngle * Math.PI / 180)) * 40;
                const x2 = 150 + Math.sin(angle + Math.PI + (helixAngle * Math.PI / 180)) * 40;
                const opacity = Math.abs(Math.cos(angle + (helixAngle * Math.PI / 180))) * 0.6;
                return (
                  <line
                    key={`rung-${idx}`}
                    x1={x1}
                    y1={y}
                    x2={x2}
                    y2={y}
                    stroke="var(--border)"
                    strokeWidth="1"
                    style={{ opacity }}
                  />
                );
              })}

              {/* Skill nodes on helix */}
              {skillCategories.map((category, idx) => {
                const phase = (idx / skillCategories.length) * 360;
                const y = 100 + (idx / skillCategories.length) * 300;
                const rad = ((helixAngle + phase) * Math.PI) / 180;
                const xPos = 150 + Math.sin(rad) * 40;
                const opacity = Math.cos(rad) > 0 ? 1.0 : 0.4;
                const scale = Math.cos(rad) > 0 ? 1.3 : 0.7;
                
                return (
                  <g key={category.key}>
                    <circle cx={xPos} cy={y} r={scale * 8} fill={category.color} style={{ opacity }} />
                    {scale > 1.0 && (
                      <text
                        x={xPos > 150 ? xPos + 12 : xPos - 12}
                        y={y + 3}
                        fill="var(--text)"
                        fontSize="7"
                        fontFamily="var(--font-mono)"
                        textAnchor={xPos > 150 ? "start" : "end"}
                        style={{ opacity }}
                      >
                        {category.label.split(" ")[0].toUpperCase()}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Skills Grid */}
          <div className="skills__container" style={{ flex: 2 }}>
            {skillCategories.map((category) => (
              <div key={category.key} className="skills__category" style={{ 
                border: `1px solid ${category.color}40`,
                background: `${category.color}08`,
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px"
              }}>
                <h3 className="skills__category-title" style={{ color: category.color, marginBottom: "12px" }}>
                  {category.label}
                </h3>
                <div className="skills__grid">
                  {skills[category.key]?.map((skill, i) => (
                    <motion.div
                      className="skill"
                      key={skill.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      style={{ 
                        border: `1px solid ${category.color}30`,
                        background: "var(--surface)",
                        position: "relative"
                      }}
                    >
                      {/* Genetic Code Display */}
                      <div style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "8px",
                        color: category.color,
                        opacity: 0.7,
                        letterSpacing: "1px"
                      }}>
                        {generateGeneticCode(skill.name)}
                      </div>
                      
                      <div className="skill__head">
                        <span>{skill.name}</span>
                        <span className="skill__pct" style={{ color: category.color }}>{skill.level}%</span>
                      </div>
                      <div className="skill__bar" style={{ background: `${category.color}20` }}>
                        <motion.div
                          className="skill__fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          style={{ background: category.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
