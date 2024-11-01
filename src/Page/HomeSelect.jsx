import React, { useContext } from "react";
import "./HomeSelect.css";
import Navbar from "../Components/Navbar";
import Catagories from "../Components/Catagories";
import { ChooseContext } from "../Context/ChooseContext";
import Home from "./Home";
import Review from "./Review";
import Course from "./Course";
import Favorite from "./Favorite";

const HomeSelect = () => {
  const { choose } = useContext(ChooseContext);

  let content;
  switch (choose) {
    case "Home":
      content = <Home />;
      break;
    case "Review":
      content = <Review />;
      break;
    case "Courses":
      content = <Course />;
      break;
    case "Favorite":
      content = <Favorite />;
      break;
    default:
      content = <Favorite />;
      break;
  }

  return (
    <div className="Select-Container">
      <Navbar />
      <div className="Select-Cata">
        <Catagories />
      </div>
      <div className="Content-Display">{content}</div>
    </div>
  );
};

export default HomeSelect;
