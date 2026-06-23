import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiInbox, FiClock } from "react-icons/fi";
import { fetchMessages } from "../api/client.js";

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    fetchMessages()
      .then((data) => {
        if (!active) return;
        setMessages(data);
        setStatus("done");
      })
      .catch((err) => {
        if (!active) return;
        console.error(err);
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

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
        <div>ADMIN_CONSOLE // ACTIVE</div>
        <div>MESSAGE_COUNT // {messages.length}</div>
        <div>ACCESS_LEVEL // AUTHENTICATED</div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <FiInbox style={{ color: "var(--primary)" }} />
            <p className="section__eyebrow">Message Database</p>
          </div>
          <h2 className="section__title">Messages Received</h2>
        </motion.div>

        {status === "loading" && (
          <div style={{ 
            padding: "40px", 
            textAlign: "center", 
            border: "1px dashed var(--border)",
            background: "var(--surface)",
            borderRadius: "8px"
          }}>
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>LOADING_TRANSMISSIONS...</p>
          </div>
        )}
        
        {status === "error" && (
          <div style={{ 
            padding: "40px", 
            textAlign: "center", 
            border: "1px solid #ff4444",
            background: "rgba(255, 68, 68, 0.1)",
            borderRadius: "8px"
          }}>
            <p style={{ color: "#ff4444" }}>ERROR: Failed to load messages</p>
          </div>
        )}

        {status === "done" && messages.length === 0 && (
          <div style={{ 
            padding: "40px", 
            textAlign: "center", 
            border: "1px dashed var(--border)",
            background: "var(--surface)",
            borderRadius: "8px"
          }}>
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>NO_TRANSMISSIONS_RECEIVED</p>
          </div>
        )}

        {status === "done" && messages.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            {messages.map((msg, i) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  border: "1px solid var(--border)",
                  padding: "1.5rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  backgroundColor: "var(--surface)",
                  position: "relative",
                  borderLeft: `3px solid var(--primary)`
                }}
              >
                <div style={{ position: "absolute", top: -6, left: -6, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>+</div>
                <div style={{ position: "absolute", bottom: -10, right: -6, color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>+</div>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div>
                    <strong style={{ color: "var(--text)" }}>{msg.name}</strong>
                    <span style={{ color: "var(--text-muted)", marginLeft: "8px" }}>({msg.email})</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    <FiClock />
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
                
                {msg.subject && (
                  <div style={{ 
                    marginBottom: "12px", 
                    padding: "8px 12px",
                    background: "var(--surface-2)",
                    borderRadius: "4px",
                    fontSize: "13px",
                    color: "var(--primary)",
                    fontFamily: "var(--font-mono)"
                  }}>
                    SUBJECT: {msg.subject}
                  </div>
                )}
                
                <div style={{ 
                  marginBottom: "12px", 
                  color: "var(--text)",
                  lineHeight: "1.6"
                }}>
                  {msg.message}
                </div>
                
                <div style={{ 
                  borderTop: "1px solid var(--border)",
                  paddingTop: "8px",
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)"
                }}>
                  TRANSMISSION_ID: {msg._id}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
