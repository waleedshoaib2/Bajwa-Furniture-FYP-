import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalBody from "./ModalBody";

export default function SearchModal({ openModal, setOpenModal }) {
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState(""); // Changed setSearch to setSearchProduct

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Handle file upload logic here
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setOpenModal(false);
    navigate(`/shop?search=${searchProduct}`);
  };

  const handleRedirect = (url) => {
    setOpenModal(false);
    navigate(url);
  };

  return (
    <div>
      <ModalBody open={openModal}>
        <>
          <form className="search-modal__header" onSubmit={handleSearchInput}>
            <input onChange={(e) => setSearchProduct(e.target.value)} />
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                className="icon-medium margin-inline-end-36"
                src="https://www.svgrepo.com/show/437538/camera-viewfinder.svg"
                alt="close_modal"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
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
                Chair
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
        </>
      </ModalBody>
    </div>
  );
}
