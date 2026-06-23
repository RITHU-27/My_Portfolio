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
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          {profile.name.split(" ")[0]}
          <span>.SYS</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Main Links */}
          <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={location.pathname === link.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
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
    </header>
  );
}
