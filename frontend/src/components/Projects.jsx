import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiLayers } from "react-icons/fi";
import { fetchProjects } from "../api/client.js";
import { sampleProjects } from "../data/projects.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isFallback, setIsFallback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const rowHeight = 420;
  const cardRefs = useRef([]);

  useEffect(() => {
    let active = true;

    fetchProjects()
      .then((data) => {
        if (!active) return;

        if (data?.length > 0) {
          setProjects(data);
        } else {
          setProjects(sampleProjects);
          setIsFallback(true);
        }

        setStatus("done");
      })
      .catch(() => {
        if (!active) return;
        setProjects(sampleProjects);
        setIsFallback(true);
        setStatus("done");
      });

    return () => {
      active = false;
    };
  }, []);

  // Focus project based on viewport center
  useEffect(() => {
    if (status !== "done") return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });

        if (best) {
          setActiveIndex(Number(best.target.dataset.index));
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-35% 0px -35% 0px",
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [status, projects]);

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section__eyebrow">Some things I’ve built</p>
          <h2 className="section__title">Featured Projects</h2>
        </motion.div>

        {isFallback && (
          <div className="projects__msg">
            <FiLayers /> Running local project cache...
          </div>
        )}

        <div className="dna-container">
          {/* DNA strand */}
          <div className="dna-strand">
            <div className="dna-backbone dna-backbone--left"></div>
            <div className="dna-backbone dna-backbone--right"></div>

            {projects.map((_, i) => {
              const isActive = i === activeIndex;

              return (
                <motion.div
                  key={i}
                  className={`dna-base-pair ${isActive ? "is-active" : ""}`}
                  animate={{
                    rotateY: isActive ? 0 : i % 2 === 0 ? 180 : -180,
                    scale: isActive ? 1.2 : 1,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    top: `${i * rowHeight + 120}px`,
                  }}
                >
                  <div className="dna-base dna-base--a"></div>
                  <div className="dna-rung"></div>
                  <div className="dna-base dna-base--t"></div>
                </motion.div>
              );
            })}
          </div>

          {/* Project cards */}
          <div className="dna-projects">
            {projects.map((project, i) => {
              const isActive = i === activeIndex;

              return (
                <motion.div
                  key={project._id || project.title}
                  ref={(el) => (cardRefs.current[i] = el)}
                  data-index={i}
                  className={`dna-mutation dna-mutation--${
                    i % 2 === 0 ? "left" : "right"
                  } ${isActive ? "is-active" : ""}`}
                  initial={{
                    opacity: 0,
                    x: i % 2 === 0 ? -100 : 100,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                  }}
                  style={{
                    top: `${i * rowHeight}px`,
                  }}
                >
                  <div className="dna-connector"></div>

                  <motion.article
                    className="project-card"
                    animate={{
                      scale: isActive ? 1.06 : 0.95,
                      rotateZ: isActive ? 0 : i % 2 === 0 ? -4 : 4,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    {project.imageUrl && (
                      <div className="project-card__media">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          loading="lazy"
                        />
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
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FiGithub /> Code
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FiExternalLink /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}