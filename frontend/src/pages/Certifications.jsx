import DNACenterHelix from "../components/DNACenterHelix.jsx";
import { certifications, achievements } from "../data/portfolio.js";

export default function Certifications() {
  return (
    <section className="section">
      <div
        className="container"
        style={{ padding: "40px 20px", color: "white" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Certifications & Achievements
        </h2>

        <DNACenterHelix 
          certifications={certifications}
          achievements={achievements}
        />
      </div>
    </section>
  );
}