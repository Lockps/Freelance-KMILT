import React, { useEffect, useState } from "react";
import "./Favorite.css";
import { HiHeart } from "react-icons/hi2";

const Favorite = () => {
  const [favData, setFavData] = useState([]); 
  const [unfavData, setUnfavData] = useState([]); 

  const getData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/fav", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await res.json();
      setFavData(jsonData); 
    } catch (error) {
      console.error("Error fetching favorite courses:", error);
    }
  };

  const toggleFavorite = (course_no) => {
    const courseToToggle = favData.find((item) => item.course_no === course_no);

    if (courseToToggle) {
      setFavData((prevData) => prevData.filter((item) => item.course_no !== course_no));
      setUnfavData((prevUnfavData) => [...prevUnfavData, { ...courseToToggle, isFavorited: false }]);
    } else {
      const courseToReAdd = unfavData.find((item) => item.course_no === course_no);
      if (courseToReAdd) {
        setUnfavData((prevUnfavData) => prevUnfavData.filter((item) => item.course_no !== course_no));
        setFavData((prevFavData) => [...prevFavData, { ...courseToReAdd, isFavorited: true }]);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Fav-Container">
      <div className="Fav-Grid">
        {favData.map((item) => (
          <div key={item.course_no} className="Fav-item">
            <button
              className="HeartButton"
              onClick={() => toggleFavorite(item.course_no)}
            >
              <HiHeart className={`Heart favorited`} />
            </button>
            <h3>{item.name}</h3>
            <p>Course No: {item.course_no}</p>
            <p>Credits: {item.credit}</p>
            <p>Professor: {item.prof}</p>
          </div>
        ))}
        
        {unfavData.map((item) => (
          <div key={item.course_no} className="Fav-item">
            <button
              className="HeartButton"
              onClick={() => toggleFavorite(item.course_no)}
            >
              <HiHeart className="unlike-heart"/>
            </button>
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
