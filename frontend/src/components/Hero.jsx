import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowDown } from "react-icons/fi";
import { SiLeetcode, SiHackerrank } from "react-icons/si";
import { profile, socials } from "../data/portfolio.js";

export default function Hero() {
  return (
    <section id="home" className="hero">
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

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn--ghost">
              Get In Touch
            </a>
          </div>

          <div className="hero__socials">
            <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">
              <SiLeetcode />
            </a>
            <a href={socials.hackerrank} target="_blank" rel="noreferrer" aria-label="HackerRank">
              <SiHackerrank />
            </a>
            <a href={socials.email} aria-label="Email">
              <FiMail />
            </a>
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

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <FiArrowDown />
      </a>
    </section>
  );
}
