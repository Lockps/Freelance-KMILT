import React from "react";
import "./Course.css";
import dataScienceImg from "../asset/datascience.jpg";
import Actuary from "../asset/Actuary.jpg";
import Eng from "../asset/Engineer.webp";
import Food from "../asset/Foodsci.jpg";
import logis from "../asset/logistic.jpg";
import teacher from "../asset/Teacher.jpeg";

const Course = () => {
  const data = [
    { name: "Data Scientist", img: dataScienceImg },
    { name: "Actuary", img: Actuary },
    { name: "Engineer", img: Eng },
    { name: "Food Scientist", img: Food },
    { name: "Logistic Officer", img: logis },
    { name: "Teacher", img: teacher },
  ];

  return (
    <div className="Course-Container">
      {data.map((item, index) => (
        <div
          key={index}
          className="Course-Box"
          style={{
            backgroundImage: `url(${
              item.img || "https://via.placeholder.com/150"
            })`, // Fallback image
            backgroundSize: "cover",
            backgroundPosition: "20%",
          }}
        >
          <div className="Course-Label">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Course;
