import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiDownload } from "react-icons/fi";
import { profile, experience } from "../data/portfolio.js";

export default function About() {
  return (
    <section className="section">
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

        <div className="about__grid">
          {/* Left Side */}
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Image */}
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

            {/* Skills Preview */}
            {profile.skills && (
              <div className="about__skills">
                {profile.skills.map((skill) => (
                  <span key={skill} className="skill__tag">
                    {skill}
                  </span>
                ))}
              </div>
            )}

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

          {/* Right Side Timeline */}
          <motion.div
            className="about__timeline"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {experience.length > 0 ? (
              experience.map((item, idx) => (
                <div
                  className="timeline__item"
                  key={`${item.role}-${item.company}-${idx}`}
                >
                  <div className="timeline__dot" />
                  <div className="timeline__content">
                    <span className="timeline__period">{item.period}</span>
                    <h3>{item.role}</h3>
                    <p className="timeline__company">{item.company}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No experience added yet.</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}