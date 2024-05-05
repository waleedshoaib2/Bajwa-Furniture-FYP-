import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
export default function RecommendationComponent({ userId }) {
  const userInfo = useSelector((state) => state.user);

  const [recommendations, setRecommendations] = useState([]);
  const fetchRecommendations = async () => {
    try {
      const token = userInfo.userInfo.token;
      const response = await fetch("http://localhost:4000/recommendation", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const recommendations = await response.json();
      console.log("Recommendations:", recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [userId]);

  return (
    <div>
      <h2>Recommendations:</h2>
      <ul>
        {recommendations.map((productId) => (
          <li key={productId}>{productId}</li>
        ))}
      </ul>
    </div>
  );
}
