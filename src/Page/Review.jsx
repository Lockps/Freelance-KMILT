import React, { useEffect, useState } from "react";
import "./Review.css";
import { BiArrowBack } from "react-icons/bi";
import a from "../asset/a.jpg";
import b from "../asset/b.png";
import c from "../asset/c.jpg";
import d from "../asset/d.jpg"; // Fixed incorrect file extension

const Review = () => {
  const [isClick, setClick] = useState(false);
  const [choice, setChoice] = useState("");
  const [isLoad, setLoad] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = (selectedChoice) => {
    setChoice(selectedChoice);
    setClick(true);
  };

  const handleCourses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/studyplan", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data:", data);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching study plan:", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    handleCourses();
  }, []);

  const courseTypeMap = {
    1: "Gened",
    2: "เสรี",
    3: "บังคับเลือก",
    4: "เลือก",
  };

  const getTypeId = (choice) => {
    switch (choice) {
      case "a":
        return 1;
      case "b":
        return 2;
      case "c":
        return 3;
      case "d":
        return 4;
      default:
        return null;
    }
  };

  const handleRowClick = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="Review-Container">
      {isClick ? (
        isLoad ? (
          <h1>Loading...</h1>
        ) : (
          <div className="Review-table">
            <div className="Review-Arrow">
              <div className="Review-type">
                <BiArrowBack
                  className="arrow"
                  onClick={() => {
                    setClick(false);
                    setChoice("");
                  }}
                />
                {courseTypeMap[getTypeId(choice)]}
              </div>
            </div>
            <div className="Review-Header">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Credits</th>
                    <th>Professor</th>
                  </tr>
                </thead>
                <tbody>
                  {courses
                    .filter((course) => course.type_id === getTypeId(choice))
                    .map((course) => (
                      <tr
                        key={course.id}
                        onClick={() => handleRowClick(course)}
                      >
                        <td>{course.id}</td>
                        <td>{course.name}</td>
                        <td>{course.credit}</td>
                        <td>{course.prof}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {isModalOpen && selectedCourse && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>{selectedCourse.name}</h2>
                    <p>
                      <strong>ID:</strong> {selectedCourse.id}
                    </p>
                    <p>
                      <strong>Credits:</strong> {selectedCourse.credit}
                    </p>
                    <p>
                      <strong>Professor:</strong> {selectedCourse.prof}
                    </p>
                    <div className="modal-Form">
                      <div>
                        ด้านเนื้อหา <textarea />
                      </div>
                      <div>
                        ด้านอาจารย์ <textarea />
                      </div>
                      <div>
                        ด้านการสอบ <textarea />
                      </div>
                    </div>
                    <div className="modal-Submit">
                      <button>Submit</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="Review-Border">
          <h1>หมวดวิชา</h1>
          <div className="Review-ChoiceBox">
            <div
              className="Review-a"
              onClick={() => handleClick("a")}
              style={{
                backgroundImage: `url(${a})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
              }}
            >
              <div className="Review-Text">Gened</div>
            </div>
            <div
              className="Review-b"
              onClick={() => handleClick("b")}
              style={{
                backgroundImage: `url(${b})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
              }}
            >
              <div className="Review-Text">วิชาเสรี</div>
            </div>
            <div
              className="Review-c"
              onClick={() => handleClick("c")}
              style={{
                backgroundImage: `url(${c})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
              }}
            >
              <div className="Review-Text">วิชาบังคับเลือก</div>
            </div>
            <div
              className="Review-d"
              onClick={() => handleClick("d")}
              style={{
                backgroundImage: `url(${d})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
              }}
            >
              <div className="Review-Text">วิชาเลือก</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
