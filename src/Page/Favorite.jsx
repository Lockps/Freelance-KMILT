import React, { useEffect, useState } from "react";
import "./Favorite.css";
import { HiHeart } from "react-icons/hi2";

const Favorite = () => {
  const [favData, setFavData] = useState([]);
  const [unfavData, setUnfavData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourse = async () => {
    setLoading(true); 
    try {
      const res = await fetch("http://127.0.0.1:5000/courses", {
        method: "GET",
      });
      
      const jsonData = await res.json();
      console.log(jsonData);
      setCourses(jsonData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false); 
    }
  };

  const getData = async () => {
    setLoading(true); 
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
    } finally {
      setLoading(false); 
    }
  };

  const toggleFavorite = async (course_no) => {
    const courseToToggle = favData.find((item) => item.course_no === course_no);

    if (courseToToggle) {
      setFavData((prevData) => prevData.filter((item) => item.course_no !== course_no));

      await fetch(`http://127.0.0.1:5000/fav/${course_no}`, {
        method: "DELETE",
      });
    } else {
      const courseToAdd = unfavData.find((item) => item.no === course_no);
      if (courseToAdd) {
        setUnfavData((prevUnfavData) => prevUnfavData.filter((item) => item.no !== course_no));
        setFavData((prevFavData) => [...prevFavData, { ...courseToAdd, course_no: courseToAdd.no }]);

        await fetch("http://127.0.0.1:5000/fav", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ course_no: courseToAdd.no }),
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getData(), getCourse()]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unfavorites = courses.filter(
      (course) => !favData.some((fav) => fav.course_no === course.no)
    );
    setUnfavData(unfavorites);
  }, [favData, courses]);

  return (
    <div className="Fav-Container">
      {loading ? ( 
        <div className="Loading">
          <div className="spinner"></div> 
        </div>
      ) : (
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
            <div key={item.no} className="Fav-item">
              <button
                className="HeartButton"
                onClick={() => toggleFavorite(item.no)}
              >
                <HiHeart className="unlike-heart" />
              </button>
              <h3>{item.name}</h3>
              <p>Course No: {item.no}</p>
              <p>Credits: {item.credit}</p>
              <p>Professor: {item.prof}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
