import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeLanding() {
  const navigate = useNavigate();

  return (
    <div className="home__landing">
      <div
        className="home__landing__content"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="home__landing__title">
          Transform your envisioned space into reality with our exquisite
          furniture collection
        </h1>
      </div>

      <img
        className="home__landing__image"
    src="https://images.pexels.com/photos/4857759/pexels-photo-4857759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

      />
    </div>
  );
}
