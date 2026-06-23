import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiLayers, FiGitBranch } from "react-icons/fi";
import { fetchProjects } from "../api/client.js";
import { sampleProjects } from "../data/projects.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isFallback, setIsFallback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [evolutionStage, setEvolutionStage] = useState(0);

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

  // Evolution stages animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEvolutionStage((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getEvolutionBadge = (stage) => {
    const stages = [
      { label: "GENESIS", color: "#ff007f" },
      { label: "MUTATION", color: "var(--primary)" },
      { label: "EVOLUTION", color: "#00ff88" },
      { label: "APEX", color: "#ffaa00" }
    ];
    return stages[stage];
  };

  return (
    <section className="section" style={{ position: "relative" }}>
      {/* Blueprint Coordinates */}
      <div 
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          color: "var(--primary)",
          opacity: 0.5,
          lineHeight: "1.4",
          pointerEvents: "none"
        }}
      >
        <div>PROJECT_MATRIX // LOADED</div>
        <div>MUTATION_STAGE // {getEvolutionBadge(evolutionStage).label}</div>
        <div>DNA_INTEGRITY // STABLE</div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section__eyebrow">Some things I&apos;ve built</p>
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

          {/* Project cards with evolution indicators */}
          <div className="dna-projects">
            {projects.map((project, i) => {
              const isActive = i === activeIndex;
              const evolution = getEvolutionBadge(i % 4);

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
                    style={{
                      border: isActive ? `2px solid ${evolution.color}` : "1px solid var(--border)",
                      boxShadow: isActive ? `0 0 30px ${evolution.color}40` : "none"
                    }}
                  >
                    {/* Evolution Badge */}
                    <div style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "4px 10px",
                      background: `${evolution.color}20`,
                      border: `1px solid ${evolution.color}`,
                      borderRadius: "12px",
                      fontSize: "10px",
                      fontFamily: "var(--font-mono)",
                      fontWeight: "bold",
                      color: evolution.color,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      <FiGitBranch style={{ fontSize: "10px" }} />
                      {evolution.label}
                    </div>

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
                          <li key={tech} style={{
                            background: `${evolution.color}15`,
                            border: `1px solid ${evolution.color}40`
                          }}>{tech}</li>
                        ))}
                      </ul>

                      <div className="project-card__links">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ borderColor: evolution.color }}
                          >
                            <FiGithub /> Code
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ borderColor: evolution.color }}
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