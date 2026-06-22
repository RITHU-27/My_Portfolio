import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiLayers } from "react-icons/fi";
import { fetchProjects } from "../api/client.js";
import { sampleProjects } from "../data/projects.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isFallback, setIsFallback] = useState(false);

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

        <div className="projects__grid">
          {projects.map((project, i) => (
            <motion.article
              className="project-card"
              key={project._id || project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
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
          ))}
        </div>
      </div>
    </section>
  );
}
