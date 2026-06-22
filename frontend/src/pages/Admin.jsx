import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section__title">Messages Received</h2>
        </motion.div>

        {status === "loading" && <p>Loading messages...</p>}
        {status === "error" && <p style={{ color: "red" }}>Error loading messages</p>}

        {status === "done" && messages.length === 0 && (
          <p>No messages yet.</p>
        )}

        {status === "done" && messages.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            {messages.map((msg, i) => (
              <motion.div
                key={msg._id}
                className="message-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  border: "1px solid #ddd",
                  padding: "1.5rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong>{msg.name}</strong> ({msg.email})
                </div>
                {msg.subject && (
                  <div style={{ marginBottom: "0.5rem", fontStyle: "italic" }}>
                    Subject: {msg.subject}
                  </div>
                )}
                <div style={{ marginBottom: "0.5rem" }}>{msg.message}</div>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
