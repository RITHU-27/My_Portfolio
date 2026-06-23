import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMessageSquare } from "react-icons/fi";
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
    <section className="section section--alt" style={{ position: "relative" }}>
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
        <div>COMM_PROTOCOL // ACTIVE</div>
        <div>ENCRYPTION // ENABLED</div>
        <div>SIGNAL_STRENGTH // 100%</div>
      </div>

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

        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
          {/* Left Side - Blueprint Decoration */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{ flex: 1, minWidth: "250px" }}
          >
            <div style={{
              border: "1px dashed var(--border)",
              background: "var(--surface)",
              padding: "24px",
              borderRadius: "8px",
              position: "relative"
            }}>
              <div style={{ position: "absolute", top: -6, left: -6, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>+</div>
              <div style={{ position: "absolute", bottom: -10, right: -6, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>+</div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <FiMessageSquare style={{ color: "var(--primary)" }} />
                <h3 style={{ color: "var(--text)", margin: 0 }}>Transmission Log</h3>
              </div>
              
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "8px" }}>STATUS: ONLINE</div>
                <div style={{ marginBottom: "8px" }}>LATENCY: LOW</div>
                <div style={{ marginBottom: "8px" }}>UPTIME: 99.9%</div>
                <div style={{ marginBottom: "8px" }}>ENCRYPTION: AES-256</div>
                <div>PROTOCOL: SECURE</div>
              </div>
            </div>

            <div style={{
              marginTop: "20px",
              padding: "16px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--surface)"
            }}>
              <h4 style={{ color: "var(--text)", marginBottom: "12px", fontSize: "14px" }}>Contact Info</h4>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                <div style={{ marginBottom: "8px" }}>EMAIL: {profile.email}</div>
                <div>LOCATION: {profile.location}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            style={{ flex: 2, minWidth: "350px" }}
          >
            <div className="contact__row">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)"
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)"
                }}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject (optional)"
              value={form.subject}
              onChange={handleChange}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)"
              }}
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)"
              }}
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
      </div>
    </section>
  );
}
