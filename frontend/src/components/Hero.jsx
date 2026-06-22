import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiExternalLink, FiCompass, FiCpu, FiCornerDownRight } from "react-icons/fi";
import { profile } from "../data/portfolio.js";

export default function Hero() {
  return (
    <section className="hero">
      {/* Decorative Technical Blueprint Marks */}
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
        <div>LAT_COORD // 12.9716 N</div>
        <div>LNG_COORD // 79.1588 E</div>
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
        <div>RENDER_METHOD = VECTORS</div>
        <div>BUILD_VERSION = 1.0.0</div>
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
            Hi there, I&apos;m
          </p>
          <h1 className="hero__name">{profile.name}</h1>
          <h2 className="hero__title">{profile.title}</h2>
          <p className="hero__tagline">
            <FiCornerDownRight style={{ verticalAlign: "middle", marginRight: "6px", color: "var(--primary)" }} />
            {profile.tagline}
          </p>

          {/* Stats Section */}
          <div className="hero__stats">
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

        <motion.div
          className="hero__avatar"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hero__avatar-ring">
            <img src={profile.avatarUrl.replace("frontend/", "")} alt={profile.name} />
          </div>
        </motion.div>
      </div>

      {/* Decorative Technical Dimension Guidelines */}
      <div 
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "100px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontFamily: "var(--font-mono)",
          fontSize: "8px",
          color: "var(--primary)",
          opacity: 0.4,
          pointerEvents: "none"
        }}
      >
        <FiCompass />
        <span>[ DRAG TO ROTATE SCHEMATICS ]</span>
      </div>
    </section>
  );
}
