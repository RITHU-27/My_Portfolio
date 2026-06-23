import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { profile } from "../data/portfolio.js";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [helixAngle, setHelixAngle] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHelixAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getHelixNodeCoords = (idx, total) => {
    const phase = (idx / total) * 360;
    const rad = ((helixAngle + phase) * Math.PI) / 180;
    const scale = Math.cos(rad) > 0 ? 1.2 : 0.8;
    const opacity = Math.cos(rad) > 0 ? 1.0 : 0.5;
    return { scale, opacity };
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} style={{ position: "relative" }}>
      {/* DNA Helix Background in Navbar */}
      <svg viewBox="0 0 800 60" style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "60px", 
        pointerEvents: "none",
        opacity: 0.3,
        zIndex: 0
      }}>
        {[false, true].map((isStrandB) => {
          const points = [];
          for (let x = 50; x <= 750; x += 15) {
            const angle = (x / 700) * Math.PI * 2 + (isStrandB ? Math.PI : 0);
            const y = 30 + Math.sin(angle + (helixAngle * Math.PI / 180)) * 15;
            points.push(`${x},${y}`);
          }
          return (
            <path
              key={isStrandB ? "strandB" : "strandA"}
              d={`M ${points.join(" L ")}`}
              fill="none"
              stroke={isStrandB ? "var(--primary-2)" : "var(--primary)"}
              strokeWidth="1"
            />
          );
        })}
        
        {/* Base pair lines */}
        {Array.from({ length: 20 }).map((_, idx) => {
          const x = 70 + idx * 33;
          const angle = (x / 700) * Math.PI * 2;
          const y1 = 30 + Math.sin(angle + (helixAngle * Math.PI / 180)) * 15;
          const y2 = 30 + Math.sin(angle + Math.PI + (helixAngle * Math.PI / 180)) * 15;
          const opacity = Math.abs(Math.cos(angle + (helixAngle * Math.PI / 180))) * 0.5;
          return (
            <line
              key={`rung-${idx}`}
              x1={x}
              y1={y1}
              x2={x}
              y2={y2}
              stroke="var(--border)"
              strokeWidth="0.5"
              style={{ opacity }}
            />
          );
        })}
      </svg>

      <div className="container navbar__inner" style={{ position: "relative", zIndex: 1 }}>
        <Link to="/" className="navbar__brand" style={{ position: "relative" }}>
          {profile.name.split(" ")[0]}
          <span>.SYS</span>
          {/* DNA node on brand */}
          <div style={{
            position: "absolute",
            right: "-8px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--primary)",
            boxShadow: "0 0 10px var(--primary)",
            animation: "pulse 2s infinite"
          }} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Main Links with DNA nodes */}
          <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
            {links.map((link, idx) => {
              const { scale, opacity } = getHelixNodeCoords(idx, links.length);
              const isActive = location.pathname === link.href;
              const isHovered = hoveredIndex === idx;
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={isActive ? "active" : ""}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  {/* DNA node indicator */}
                  <div style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: isActive ? "var(--primary-2)" : "var(--primary)",
                    transform: `scale(${isHovered || isActive ? 1.5 : scale})`,
                    opacity: isHovered || isActive ? 1 : opacity,
                    transition: "all 0.2s ease",
                    boxShadow: (isHovered || isActive) ? `0 0 8px ${isActive ? "var(--primary-2)" : "var(--primary)"}` : "none"
                  }} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Cyberpunk Theme Toggle Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme Mode"
            style={{
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              color: "var(--primary)",
              padding: "6px 12px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
              boxShadow: "0 0 10px rgba(0, 240, 255, 0.05)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 240, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 240, 255, 0.05)";
            }}
          >
            {theme === "dark" ? <FiSun style={{ fontSize: "14px" }} /> : <FiMoon style={{ fontSize: "14px" }} />}
            <span style={{ letterSpacing: "1px" }}>{theme === "dark" ? "LIGHT" : "DARK"}</span>
          </button>

          {/* Responsive Mobile Menu Toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateY(-50%) scale(0.8); }
        }
      `}</style>
    </header>
  );
}
