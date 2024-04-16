import React from "react";
import NavigationText from "./NavigationText";
import BrandIcon from "./BrandIcon";
import { useNavigate } from "react-router-dom";

export default function HeaderLeftMenu() {
  const navigate = useNavigate();

  function navigateHandler(url) {
    window.scrollTo(0, 0);
    navigate(url);
  }

  return (
    <div className="header__container">
      <img className="logo-bf" src="./logo.svg" alt="logo" />
      <NavigationText text={"Home"} url="/" />
      <NavigationText text={"Blogs"} url="/blogs" />
      <NavigationText text={"Products"} url="/shop" />
      <NavigationText text={"About Us"} url="/aboutus" />
    </div>
  );
}
