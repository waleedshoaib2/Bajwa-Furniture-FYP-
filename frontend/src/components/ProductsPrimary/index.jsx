import React from "react";
import Ratings from "../Ratings";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ProductsPrimary({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="productCard_primary"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <LazyLoadImage
        width="100%"
        height="90%"
        src={product.images}
        placeholderSrc={product.image}
      />
      <h2>{product.name}</h2>

      <h2>Rupees {product.price}</h2>
    </div>
  );
}
