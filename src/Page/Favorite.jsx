import React, { useEffect, useState } from "react";
import "./Favorite.css";
import { HiHeart } from "react-icons/hi2";

const Favorite = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/fav", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await res.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching favorite courses:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Fav-Container">
      <div className="Fav-Grid">
        {data.map((item) => (
          <div key={item.course_no} className="Fav-item">
            <HiHeart className="Heart" />
            <h3>{item.name}</h3>
            <p>Course No: {item.course_no}</p>
            <p>Credits: {item.credit}</p>
            <p>Professor: {item.prof}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
