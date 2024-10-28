import React from "react";
import image from "../asset/logo1.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Nav-Container">
      <img src={image} className="Nav-img" />
    </div>
  );
};

export default Navbar;
