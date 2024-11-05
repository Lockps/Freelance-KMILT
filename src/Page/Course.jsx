import React from "react";
import "./Course.css";
import dataScienceImg from "../asset/datascience.jpg";
import Actuary from "../asset/Actuary.jpg";
import logis from "../asset/logistic.jpg";
import teacher from "../asset/Teacher.jpeg";

const Course = () => {
  const data = [
    { name: `123123 Statistics\n234234 Data-Mining`, img: dataScienceImg },
    { name: "23142 Math\n221344 Excel", img: Actuary },
    { name: "092311 Logistic\n 231453 Stock Management", img: logis },
    { name: "345123 Calculus 2\n 291237 Communication", img: teacher },
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
