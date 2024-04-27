import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalBody from "./ModalBody";
import axios from "axios";
import { FaUpload, FaSearch } from "react-icons/fa";

export default function SearchModal({ openModal, setOpenModal }) {
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState("");
  const [file, setFile] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      console.log("the data is of ", searchResults);
      setOpenModal(false);
      navigate("/visualsearchshop", {
        state: { visualproduct: searchResults },
      });
    }
  }, [searchResults, navigate]);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setOpenModal(false);
    if (searchProduct) {
      console.log(searchProduct);
      navigate(`/shop?search=${searchProduct}`);
    }
  };

  const handleRedirect = (url) => {
    setOpenModal(false);
    navigate(url);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/search",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const response2 = await axios.post(
        "http://localhost:4000/product/getProductsByProductNos",
        response.data
      );

      console.log("the result is ", response2.data);
      setSearchResults(response2.data.products);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <ModalBody open={openModal}>
        <>
          <form className="search-modal__header" onSubmit={handleSearchInput}>
            <input
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <div>
              {/* Icon for selecting a file */}
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                <FaUpload />
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>

              {/* Search icon */}
              <button
                style={{ marginLeft: "20px" }}
                onClick={handleUploadImage}
              >
                <FaSearch />
              </button>
            </div>
            <img
              className="icon-medium margin-inline-end-36"
              src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/close.png"
              alt="close_modal"
              onClick={() => setOpenModal(false)}
            />
          </form>
          <div className="search-modal__body">
            <h1>Popular Search</h1>
            <div className="search-modal__popular-search">
              <div onClick={() => handleRedirect("/shop?search=chair")}>
                Chair3
              </div>
              <div onClick={() => handleRedirect("/shop?search=lamp")}>
                Lamp
              </div>
              <div onClick={() => handleRedirect("/shop?search=bench")}>
                Bed
              </div>
              <div onClick={() => handleRedirect("/shop?search=table%20decor")}>
                Table Decor
              </div>
            </div>
          </div>

          <div>
            <h2>Search Results:</h2>
            <ul>
              {searchResults.map((product) => (
                <li key={product._id}>{product.name}</li>
              ))}
            </ul>
          </div>
        </>
      </ModalBody>
    </div>
  );
}
