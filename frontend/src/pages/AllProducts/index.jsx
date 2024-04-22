import React from "react";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import Listing from "./components/Listing";
import { useSearchParams } from "react-router-dom";
import Meta from "../../components/Meta";
import Paginate from "../../components/Paginate/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../redux/action/apiProductList.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function AllProducts() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const { productListInfo } = productList;

  React.useEffect(() => {
    getProductList(dispatch, searchQuery);
  }, [dispatch, searchQuery]);

  return (
    <div className="allproducts">
      {searchQuery ? (
        <div className="allproducts__title__search">
          <Meta title={searchQuery} />
          <div>Show Search Result:</div>
          <div>{searchQuery}</div>
        </div>
      ) : (
        <div className="allproducts__title">
          <LazyLoadImage
            wrapperClassName="allproducts__title__image"
            alt={"recommend_product"}
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            placeholderSrc="https://d2c0vv5h4nuw6w.cloudfront.net/images/b670bb1fd0ff3f29.jpg"
          />
          <Meta title="All Products" />
          <h1>Products</h1>
        </div>
      )}
      <div className="allproducts__listings">
        <div className="allproducts__leftPanelFilter__container">
          <Filter />
        </div>
        <div className="allproducts__products">
          <Listing products={productListInfo.products} />
        </div>
      </div>
      <Paginate page={productListInfo.page} pages={productListInfo.pages} />
    </div>
  );
}
