import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { fetchProjects } from "../api/client.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    fetchProjects()
      .then((data) => {
        if (!active) return;
        setProjects(data);
        setStatus("done");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
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

        {status === "loading" && <p className="projects__msg">Loading projects…</p>}
        {status === "error" && (
          <p className="projects__msg">
            Couldn&apos;t load projects. Make sure the backend is running.
          </p>
        )}
        {status === "done" && projects.length === 0 && (
          <p className="projects__msg">No projects yet. Run the seed script to add some!</p>
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
                <h3>{project.title}</h3>
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
