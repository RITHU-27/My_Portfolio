import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiDownload, FiActivity } from "react-icons/fi";
import { profile, experience } from "../data/portfolio.js";

export default function About() {
  const [helixAngle, setHelixAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHelixAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section" style={{ position: "relative" }}>
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
        <div>BIO_DATA // LOADED</div>
        <div>MUTATION_COUNT // {experience.length}</div>
        <div>DNA_SEQUENCE // ACTIVE</div>
      </div>

      <div className="container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section__eyebrow">Get to know me</p>
          <h2 className="section__title">About Me</h2>
        </motion.div>

        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
          {/* About Section - Left */}
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{ flex: 1, minWidth: "300px" }}
          >
            {/* Profile Image with DNA Ring */}
            {profile.avatarUrl && (
              <div 
                style={{ 
                  position: "relative",
                  marginBottom: "24px",
                  border: "1px solid var(--border)",
                  padding: "4px",
                  background: "var(--surface)",
                  maxWidth: "200px"
                }}
              >
                <div style={{ position: "absolute", top: -6, left: -6, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>+</div>
                <div style={{ position: "absolute", bottom: -10, right: -6, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>+</div>
                <img
                  src={profile.avatarUrl.replace("frontend/", "")}
                  alt={profile.name}
                  style={{
                    width: "100%",
                    height: "auto"
                  }}
                />
              </div>
            )}

            <p>{profile.about}</p>

            <ul className="about__facts">
              <li>
                <FiMapPin /> {profile.location}
              </li>
              <li>
                <FiMail />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
            </ul>

            {/* Resume Button */}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                className="btn btn--primary"
                target="_blank"
                rel="noreferrer"
              >
                <FiDownload /> Download Resume
              </a>
            )}
          </motion.div>

          {/* DNA Helix Separator - Center */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            flex: 0,
            minWidth: "100px"
          }}>
            <svg viewBox="0 0 100 400" style={{ width: "100px", height: "400px" }}>
              {/* Helix strands */}
              {[false, true].map((isStrandB) => {
                const points = [];
                for (let y = 20; y <= 380; y += 10) {
                  const angle = (y / 360) * Math.PI * 2 + (isStrandB ? Math.PI : 0);
                  const x = 50 + Math.sin(angle + (helixAngle * Math.PI / 180)) * 20;
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
                const y = 30 + idx * 17;
                const angle = (y / 360) * Math.PI * 2;
                const x1 = 50 + Math.sin(angle + (helixAngle * Math.PI / 180)) * 20;
                const x2 = 50 + Math.sin(angle + Math.PI + (helixAngle * Math.PI / 180)) * 20;
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
            </svg>
          </div>

          {/* Achievements Timeline - Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{ flex: 1, minWidth: "300px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <FiActivity style={{ color: "var(--primary)" }} />
              <h2 style={{ color: "var(--text)", margin: 0 }}>Achievements Timeline</h2>
            </div>

            <div style={{ position: "relative", paddingLeft: "30px" }}>
              {/* Timeline Items */}
              {experience.length > 0 ? (
                experience.map((item, idx) => (
                  <motion.div
                    key={`${item.role}-${item.company}-${idx}`}
                    className="timeline__item"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    style={{
                      marginBottom: "32px",
                      position: "relative",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      padding: "16px",
                      borderRadius: "8px",
                      borderLeft: `3px solid var(--primary)`
                    }}
                  >
                    <div style={{ 
                      position: "absolute", 
                      left: "-34px", 
                      top: "16px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "var(--primary)",
                      border: "2px solid var(--surface)",
                      boxShadow: "0 0 10px var(--primary)"
                    }} />
                    <span style={{ 
                      fontSize: "11px", 
                      color: "var(--primary)", 
                      fontFamily: "var(--font-mono)",
                      display: "block",
                      marginBottom: "8px"
                    }}>
                      {item.period}
                    </span>
                    <h3 style={{ color: "var(--text)", marginBottom: "4px" }}>{item.role}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "8px" }}>{item.company}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.5" }}>{item.description}</p>
                  </motion.div>
                ))
              ) : (
                <p>No experience added yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}