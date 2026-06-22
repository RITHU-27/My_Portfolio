import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiLayers } from "react-icons/fi";
import { fetchProjects } from "../api/client.js";
import { sampleProjects } from "../data/projects.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isFallback, setIsFallback] = useState(false);
  const rowHeight = 420;

  useEffect(() => {
    let active = true;
    fetchProjects()
      .then((data) => {
        if (!active) return;
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(sampleProjects);
          setIsFallback(true);
        }
        setStatus("done");
      })
      .catch(() => {
        if (!active) return;
        // Graceful failover to local static projects
        setProjects(sampleProjects);
        setStatus("done");
        setIsFallback(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section__eyebrow">Some things I&apos;ve built</p>
          <h2 className="section__title">Featured Projects</h2>
        </motion.div>

        {isFallback && (
          <div 
            style={{ 
              border: "1px dashed var(--border)", 
              padding: "10px 16px", 
              marginBottom: "24px", 
              fontSize: "0.75rem", 
              fontFamily: "var(--font-mono)",
              color: "var(--primary)",
              background: "rgba(0, 240, 255, 0.04)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FiLayers />
            <span>[ SYSTEM: LOCAL SCHEMA ACTIVE - RENDERING CACHED SPECIFICATIONS ]</span>
          </div>
        )}

        {status === "loading" && <p className="projects__msg">Loading blueprint schematics…</p>}
        {status === "done" && projects.length === 0 && (
          <p className="projects__msg">No schematics registered. Add some to seed file.</p>
        )}

        <div className="dna-container">
          {/* DNA Strand */}
          <div className="dna-strand">
            <div className="dna-backbone dna-backbone--left"></div>
            <div className="dna-backbone dna-backbone--right"></div>
            {projects.map((_, i) => (
              <div key={i} className="dna-base-pair" style={{ top: `${i * rowHeight + 120}px` }}>
                <div className="dna-base dna-base--a"></div>
                <div className="dna-base dna-base--t"></div>
              </div>
            ))}
          </div>

          {/* Project Mutations */}
          <div className="dna-projects">
            {projects.map((project, i) => (
              <motion.div
                key={project._id || project.title}
                className={`dna-mutation dna-mutation--${i % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ top: `${i * rowHeight}px` }}
              >
                <div className="dna-connector"></div>
                <motion.article
                  className="project-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {project.imageUrl && (
                    <div className="project-card__media">
                      <img src={project.imageUrl} alt={project.title} loading="lazy" />
                    </div>
                  )}
                  <div className="project-card__body">
                    <h3 style={{ fontFamily: "var(--font-title)", letterSpacing: "0.5px" }}>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul className="project-card__tags">
                      {project.techStack?.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <div className="project-card__links">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">
                          <FiGithub /> Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer">
                          <FiExternalLink /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
