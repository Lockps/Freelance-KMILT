import React, { useContext, useState } from "react";
import { ChooseContext } from "../Context/ChooseContext";
import "./Catagories.css";
import { RxHamburgerMenu } from "react-icons/rx";
import Home from "../asset/Home.webp";
import review from "../asset/review.jpg";
import Fav from "../asset/Fav.jpg";
import Book from "../asset/Books.jpg";

const Catagories = () => {
  const { choose, setChoose } = useContext(ChooseContext);
  const [isClicked, setClicked] = useState(false);

  const symbol = [
    { name: "Home", img: Home },
    { name: "Review", img: review },
    { name: "Courses", img: Book },
    { name: "Favorite", img: Fav },
  ];

  const ChangeChoice = (choice) => {
    setChoose(choice);
    setClicked(!isClicked);
  };

  return (
    <div className={isClicked ? "Cata-ContainerClicked" : "Cata-Container"}>
      <div className="Cata-Select">
        {isClicked ? (
          <div className="Cata-Choice">
            {symbol.map((item) => (
              <div
                key={item.name}
                className={`Cata-${item.name}`}
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                }}
                onClick={() => ChangeChoice(item.name)}
              >
                <div className="Cata-Name">{item.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="Cata-Unclick">
            <div
              className="Cata-Button"
              onClick={() => {
                setClicked(!isClicked);
              }}
            >
              <RxHamburgerMenu />
            </div>
            <h1>{choose}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catagories;
