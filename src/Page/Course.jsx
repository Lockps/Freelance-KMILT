import React from "react";
import "./Course.css";

const Course = () => {
  const data = [{ name: "asd", img: "/" }, {}, {}, {}, {}, {}];
  return (
    <div className="Course-Container">
      {data.map((item) => (
        <div className="Course-Box"></div>
      ))}
    </div>
  );
};

export default Course;
