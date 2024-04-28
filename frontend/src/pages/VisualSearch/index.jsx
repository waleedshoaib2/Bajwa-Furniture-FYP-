// import React from "react";

// import Filter from "./components/Filter";
// import Sort from "./components/Sort";
// import Listing from "./components/Listing";
// import { useSearchParams } from "react-router-dom";
// import Meta from "../../components/Meta";
// import Paginate from "../../components/Paginate/index.jsx";
// import { useState, useEffect } from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// export default function AllProducts() {
//   const [searchParams] = useSearchParams();
//   const [productss, setProduct] = useState("");

//   let productListInfo = {};
//   if (productlist) {
//     productListInfo = JSON.parse(productlist);
//   }

//   const { products, page, pages } = productListInfo;
//   useEffect(() => {
//     const { visualproduct } = location.state || {};
//     console.log(visualproduct);
//     if (visualproduct) {
//       setProduct(visualproduct);
//     }
//   }, [location]);

//   return (
//     <div className="allproducts">
//       {products ? (
//         <div className="allproducts__title__search">
//           <Meta title="Search Result" />
//           <div>Show Search Result:</div>
//           <div>Related Products</div>
//         </div>
//       ) : (
//         <div className="allproducts__title">
//           <Meta title="All Products" />
//           <h1>All Products</h1>
//           <LazyLoadImage
//             wrapperClassName="allproducts__title__image"
//             alt="recommend_product"
//             effect="blur"
//             src="https://d2c0vv5h4nuw6w.cloudfront.net/images/b670bb1fd0ff3f29.jpg"
//             placeholderSrc="https://d2c0vv5h4nuw6w.cloudfront.net/images/b670bb1fd0ff3f29.jpg"
//           />
//         </div>
//       )}
//       <Sort />
//       <div className="allproducts__listings">
//         <div className="allproducts__leftPanelFilter__container">
//           <Filter />
//         </div>
//         <Listing products={products || []} />
//       </div>
//       <Paginate page={page} pages={pages} />
//     </div>
//   );
// }

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
