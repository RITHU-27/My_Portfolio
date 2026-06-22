import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode, SiHackerrank } from "react-icons/si";
import { profile, socials } from "../data/portfolio.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">{profile.name}</p>

        <div className="footer__socials">
          {/* GitHub */}
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>

          {/* LinkedIn */}
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>

          {/* LeetCode */}
          <a
            href={socials.leetcode}
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
          >
            <SiLeetcode />
          </a>

          {/* HackerRank */}
          <a
            href={socials.hackerrank}
            target="_blank"
            rel="noreferrer"
            aria-label="HackerRank"
          >
            <SiHackerrank />
          </a>

          {/* Email */}
          <a href={socials.email} aria-label="Email">
            <FiMail />
          </a>
        </div>

        <p className="footer__copy">
          © {new Date().getFullYear()} {profile.name}. Built with the MERN stack.
        </p>
      </div>
    </footer>
  );
}