import { useState } from "react";
import API from "../api";

function Recommendation() {
  const [recommendation, setRecommendation] = useState("");

  const handleRecommendation = async () => {
    try {
      const res = await API.post("/ai/recommend");

      setRecommendation(res.data.recommendation);
    } catch (error) {
      alert("AI recommendation failed");
    }
  };

  return (
    <section className="card">
      <h2>AI Recommendation Display Page</h2>

      <button onClick={handleRecommendation}>
        Generate AI Recommendation
      </button>

      {recommendation && (
        <div className="recommendation-box">
          <pre>{recommendation}</pre>
        </div>
      )}
    </section>
  );
}

export default Recommendation;