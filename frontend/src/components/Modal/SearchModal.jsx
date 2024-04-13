import React from "react";
import { useNavigate } from "react-router-dom";
import ModalBody from "./ModalBody";
import axios from "axios";

export default function SearchModal({ openModal, setOpenModal }) {
  const navigate = useNavigate();
  const [searchProduct, setSearch] = React.useState("");
  const [file, setFile] = React.useState(null);

  const handleSearchInput = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    if (searchProduct) {
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
      console.log(response.data);
      // Handle response data as needed
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
              onChange={(e) => setSearch(e.target.value)}
            />
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
          <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadImage}>Upload Image</button>
          </div>
        </>
      </ModalBody>
    </div>
  );
}
