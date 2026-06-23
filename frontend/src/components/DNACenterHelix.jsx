import { useState, useEffect } from "react";

export default function DNACenterHelix({ certifications, achievements }) {
  const [helixAngle, setHelixAngle] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHelixAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getHelixNodeCoords = (yOffset, anglePhase, side) => {
    const rad = ((helixAngle + anglePhase) * Math.PI) / 180;
    const xOffset = side === "left" ? -80 : 80;
    const xPos = 250 + Math.sin(rad) * 30 + xOffset;
    const opacity = Math.cos(rad) > 0 ? 1.0 : 0.4;
    const scale = Math.cos(rad) > 0 ? 1.3 : 0.7;
    return { xPos, opacity, scale };
  };

  const isCertification = selectedItem && selectedItem.issuer;

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      {/* Instruction Text */}
      <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 10 }}>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "0" }}>
          Click on nodes to see details
        </p>
      </div>

      <svg viewBox="0 0 500 500" style={{ width: "100%", height: "100%" }}>
        {/* Central DNA Helix */}
        {[false, true].map((isStrandB) => {
          const points = [];
          for (let y = 50; y <= 450; y += 10) {
            const angle = (y / 400) * Math.PI * 2 + (isStrandB ? Math.PI : 0);
            const x = 250 + Math.sin(angle + (helixAngle * Math.PI / 180)) * 40;
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

        {/* Base Pair Lines (rungs) between strands */}
        {Array.from({ length: 20 }).map((_, idx) => {
          const y = 60 + idx * 20;
          const angle = (y / 400) * Math.PI * 2;
          const x1 = 250 + Math.sin(angle + (helixAngle * Math.PI / 180)) * 40;
          const x2 = 250 + Math.sin(angle + Math.PI + (helixAngle * Math.PI / 180)) * 40;
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

        {/* Certification Nodes - Left Side */}
        {certifications.map((cert, idx) => {
          const phase = (idx / certifications.length) * 360;
          const y = 80 + (idx / certifications.length) * 340;
          const { xPos, opacity, scale } = getHelixNodeCoords(y, phase, "left");
          const isSelected = selectedItem === cert;
          
          return (
            <g key={cert.title} style={{ cursor: "pointer" }} onClick={() => setSelectedItem(isSelected ? null : cert)}>
              {isSelected && (
                <line x1={xPos} y1={y} x2={250} y2={y} stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 3" />
              )}
              <circle cx={xPos} cy={y} r={isSelected ? scale * 12 : scale * 10} fill="var(--primary)" style={{ opacity }} />
              {scale > 1.0 && (
                <text
                  x={xPos - 10}
                  y={y + 4}
                  fill="var(--text)"
                  fontSize="7"
                  fontFamily="var(--font-mono)"
                  textAnchor="end"
                  style={{ opacity }}
                >
                  {cert.title.substring(0, 10)}...
                </text>
              )}
            </g>
          );
        })}

        {/* Achievement Nodes - Right Side */}
        {achievements.map((achievement, idx) => {
          const phase = (idx / achievements.length) * 360;
          const y = 80 + (idx / achievements.length) * 340;
          const { xPos, opacity, scale } = getHelixNodeCoords(y, phase, "right");
          const isSelected = selectedItem === achievement;
          
          return (
            <g key={achievement.title} style={{ cursor: "pointer" }} onClick={() => setSelectedItem(isSelected ? null : achievement)}>
              {isSelected && (
                <line x1={xPos} y1={y} x2={250} y2={y} stroke="#ff007f" strokeWidth="1" strokeDasharray="3 3" />
              )}
              <circle cx={xPos} cy={y} r={isSelected ? scale * 12 : scale * 10} fill="#ff007f" style={{ opacity }} />
              {scale > 1.0 && (
                <text
                  x={xPos + 10}
                  y={y + 4}
                  fill="var(--text)"
                  fontSize="7"
                  fontFamily="var(--font-mono)"
                  textAnchor="start"
                  style={{ opacity }}
                >
                  {achievement.title.substring(0, 10)}...
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Detail Panel - Positioned based on item type */}
      {selectedItem && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: isCertification ? "20px" : "auto",
          right: !isCertification ? "20px" : "auto",
          transform: "translateY(-50%)",
          width: "300px",
          background: "var(--surface)",
          border: `1px solid ${isCertification ? "var(--primary)" : "#ff007f"}`,
          borderRadius: "12px",
          padding: "24px",
          boxShadow: `0 0 40px ${isCertification ? "var(--primary)" : "#ff007f"}40`,
          zIndex: 100
        }}>
          <button
            onClick={() => setSelectedItem(null)}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: "1"
            }}
          >
            ×
          </button>
          <h4 style={{ color: "var(--text)", marginBottom: "12px", fontSize: "16px" }}>{selectedItem.title}</h4>
          {selectedItem.issuer && <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "8px" }}>{selectedItem.issuer}</p>}
          {selectedItem.organization && <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "8px" }}>{selectedItem.organization}</p>}
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "12px" }}>{selectedItem.date}</p>
          {selectedItem.description && <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.5" }}>{selectedItem.description}</p>}
          {selectedItem.category && (
            <div style={{
              display: "inline-block",
              padding: "4px 12px",
              background: `${isCertification ? "var(--primary)" : "#ff007f"}20`,
              border: `1px solid ${isCertification ? "var(--primary)" : "#ff007f"}`,
              borderRadius: "12px",
              fontSize: "10px",
              color: isCertification ? "var(--primary)" : "#ff007f",
              marginTop: "8px"
            }}>
              {selectedItem.category}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--primary)" }} />
          <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>Certifications</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff007f" }} />
          <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>Achievements</span>
        </div>
      </div>
    </div>
  );
}
