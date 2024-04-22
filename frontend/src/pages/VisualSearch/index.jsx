import React from "react";
import { useLocation } from "react-router-dom";
import Filter from "./components/Filter";
import Listing from "./components/Listing";

const VisualSearchShop = () => {
  const location = useLocation();
  console.log("Location state:", location.state);
  const visualproduct = location.state?.visualproduct;
  console.log("the product is ", visualproduct);

  return (
    <div className="visual-search-shop">
      <h1>Visual Search Results</h1>
      <div className="product-grid">
        <div className="allproducts__listings">
          <Listing visualproduct={visualproduct} />
          {visualproduct && visualproduct.length > 0 ? (
            visualproduct.map((product, index) => <div key={index}></div>)
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualSearchShop;
