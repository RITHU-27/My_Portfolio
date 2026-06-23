export default function DNAHelix({ items, color, secondaryColor, title, icon }) {
  return (
    <div style={{ flex: 1, minWidth: "300px", maxWidth: "500px" }}>
      <h3 style={{ color: color, marginBottom: "20px", textAlign: "center" }}>
        {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
        {title}
      </h3>
      {items.map((item) => (
        <div key={item.title || item.name} style={{ 
          background: "var(--surface)", 
          border: `1px solid ${color}`, 
          padding: "16px", 
          marginBottom: "12px",
          borderRadius: "8px"
        }}>
          <h4 style={{ color: "var(--text)", marginBottom: "8px" }}>{item.title || item.name}</h4>
          {item.issuer && <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{item.issuer}</p>}
          {item.organization && <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{item.organization}</p>}
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{item.date}</p>
        </div>
      ))}
    </div>
  );
}
