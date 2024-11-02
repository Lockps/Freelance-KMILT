import React from "react";
import image from "../asset/logo1.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Nav-Container">
      <div className="Nav-dec">
        <li></li>
        <li></li>
        <li></li>
      </div>
      <img src={image} className="Nav-img" />
    </div>
  );
};

export default Navbar;
