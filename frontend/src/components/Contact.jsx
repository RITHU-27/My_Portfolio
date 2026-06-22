import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { sendMessage } from "../api/client.js";
import { profile } from "../data/portfolio.js";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", text: "Sending…" });
    try {
      await sendMessage(form);
      setStatus({ type: "success", text: "Thanks! Your message has been sent." });
      setForm(initialForm);
    } catch (err) {
      const text =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setStatus({ type: "error", text });
    }
  };

  return (
    <section className="section section--alt">
      <div className="container contact">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section__eyebrow">Let&apos;s talk</p>
          <h2 className="section__title">Get In Touch</h2>
          <p className="contact__lead">
            Have a project in mind or just want to say hi? Send me a message and
            I&apos;ll get back to you at <strong>{profile.email}</strong>.
          </p>
        </motion.div>

        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact__row">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject (optional)"
            value={form.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="btn btn--primary"
            disabled={status.type === "loading"}
          >
            <FiSend /> {status.type === "loading" ? "Sending…" : "Send Message"}
          </button>

          {status.type !== "idle" && status.type !== "loading" && (
            <p className={`contact__status contact__status--${status.type}`}>
              {status.text}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
