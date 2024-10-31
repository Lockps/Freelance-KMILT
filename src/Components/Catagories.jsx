import React, { useContext, useState } from "react";
import { ChooseContext } from "../Context/ChooseContext";
import "./Catagories.css";

const Catagories = () => {
  const { choose, setChoose } = useContext(ChooseContext);
  const [isClicked, setClicked] = useState(false);

  const ChangeChoice = (choice) => {
    setChoose(choice);
    setClicked(!isClicked);
  };

  return (
    <div className={isClicked ? "Cata-ContainerClicked" : "Cata-Container"}>
      <div className="Cata-Select">
        {isClicked ? (
          <div className="Cata-Choice">
            <div className="Cata-Home" onClick={() => ChangeChoice("Home")}>
              Home
            </div>
            <div className="Cata-Review" onClick={() => ChangeChoice("Review")}>
              Review
            </div>
            <div
              className="Cata-Courses"
              onClick={() => ChangeChoice("Courses")}
            >
              Courses
            </div>
            <div
              className="Cata-Favorite"
              onClick={() => ChangeChoice("Favorite")}
            >
              Favorite
            </div>
          </div>
        ) : (
          <div className="Cata-Unclick">
            <div
              className="Cata-Button"
              onClick={() => {
                setClicked(!isClicked);
              }}
            >
              asdasd
            </div>
            <h1>{choose}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catagories;
