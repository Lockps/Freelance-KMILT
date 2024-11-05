import React, { useEffect, useState } from "react";
import "./Course.css";
import dataScienceImg from "../asset/datascience.jpg";
import Actuary from "../asset/Actuary.jpg";
import logis from "../asset/logistic.jpg";
import teacher from "../asset/Teacher.jpeg";

const Course = () => {
  const [courses, setCourses] = useState([]); 
  const [selectedCareer, setSelectedCareer] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [loading, setLoading] = useState(true); 

  const careerMap = {
    1: "Data Science",
    2: "Actuary",
    3: "Logistic Officer",
    4: "Teacher",
  };

  const careerImages = {
    1: dataScienceImg,
    2: Actuary,
    3: logis,
    4: teacher,
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/getCareer");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false); 
      }
    };

    fetchCourses();
  }, []);

  const handleCareerClick = (careerId) => {
    setSelectedCareer(careerId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCareer(null);
  };

  const getCoursesForCareer = (careerId) => {
    return courses
      .filter((course) => course.career_id === careerId)
      .map((course) => (
        <tr key={course.id}>
          <td>{course.course_id}</td>
          <td>{course.course_name}</td>
        </tr>
      ));
  };

  return (
    <div className="Course-Container">
      {/* Career options */}
      <div className="Course-Box" onClick={() => handleCareerClick(1)} style={{ backgroundImage: `url(${dataScienceImg})` }}>
        <div className="Course-Label">Data Science</div>
      </div>
      <div className="Course-Box" onClick={() => handleCareerClick(2)} style={{ backgroundImage: `url(${Actuary})` }}>
        <div className="Course-Label">Actuary</div>
      </div>
      <div className="Course-Box" onClick={() => handleCareerClick(3)} style={{ backgroundImage: `url(${logis})` }}>
        <div className="Course-Label">Logistic Officer</div>
      </div>
      <div className="Course-Box" onClick={() => handleCareerClick(4)} style={{ backgroundImage: `url(${teacher})` }}>
        <div className="Course-Label">Teacher</div>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading">Loading...</div> 
        </div>
      )}

      {isModalOpen && !loading && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{careerMap[selectedCareer]} Courses</h2>
            <table>
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                </tr>
              </thead>
              <tbody>
                {getCoursesForCareer(selectedCareer)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
