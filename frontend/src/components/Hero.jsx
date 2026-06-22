import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { profile } from "../data/portfolio.js";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="hero__greeting">Hi there, I&apos;m</p>
          <h1 className="hero__name">{profile.name}</h1>
          <h2 className="hero__title">{profile.title}</h2>
          <p className="hero__tagline">{profile.tagline}</p>

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
              <p>Problems Solved</p>
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
            <img src={profile.avatarUrl} alt={profile.name} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
