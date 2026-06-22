import { motion } from "framer-motion";
import { skills } from "../data/portfolio.js";

export default function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section__eyebrow">What I work with</p>
          <h2 className="section__title">Skills &amp; Technologies</h2>
        </motion.div>

        <div className="skills__grid">
          {skills.map((skill, i) => (
            <motion.div
              className="skill"
              key={skill.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="skill__head">
                <span>{skill.name}</span>
                <span className="skill__pct">{skill.level}%</span>
              </div>
              <div className="skill__bar">
                <motion.div
                  className="skill__fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
