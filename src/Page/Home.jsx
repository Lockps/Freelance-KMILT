import React, { useState } from "react";
import "./Home.css";
import { BiArrowBack, BiPlus } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

const Popup = ({ onClose }) => {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [professor, setProfessor] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const handleClick = () => {
    alert(selectedSemester)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      courseId,
      courseName,
      professor,
      year: selectedYear,
      semester: selectedSemester,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/add_course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        console.log(courseData);

        throw new Error("Failed to add course");
      }

      const result = await response.json();
      console.log(result.message);

      setCourseId("");
      setCourseName("");
      setProfessor("");
      setSelectedYear("");
      setSelectedSemester("");
      onClose();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };


  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-close">
          <CgClose onClick={onClose} />
        </div>
        <h2>Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="popup-first">
            <div className="">

              <label>Course ID:</label>
              <input
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Course Name:</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="popup-ndline">

            <div className="popup-prof">
              <label>Professor:</label>
              <input
                type="text"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                required
              />
            </div>
            <div className="popup-hide">
              <label>Professosss:</label>
              <input
                type="text"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="popup-dropdown">
            <div className="">

              <label>Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                required
              >
                <option value="">Select Year</option>
                {[1, 2, 3, 4].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Semester:</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                required
              >
                <option value="">Select Semester</option>
                {[1, 2].map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="popup-button">
            <button type="submit" onClick={handleClick} className="">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};



const Home = () => {
  const [isFind, setFind] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [returnedData, setReturnedData] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleRadioChangeYear = (year) => {
    setSelectedYear(year);
  };

  const handleRadioChangeSemester = (semester) => {
    setSelectedSemester(semester);
  };

  const handleClick = async () => {
    console.log("Selected Year:", selectedYear);
    console.log("Selected Semester:", selectedSemester);

    setFind(true);
    setLoad(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/studyplan", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Returned Data:", data);
      setReturnedData(data);
    } catch (error) {
      console.error("Error fetching study plan:", error);
    } finally {
      setLoad(false);
    }
  };

  const courseTypeMap = {
    1: "Gened",
    2: "เสรี",
    3: "บังคับเลือก",
    4: "เลือก",
  };

  const groupedCourses = returnedData.reduce((acc, course) => {
    const type = course.type_id;
    const typeName = courseTypeMap[type] || "Unknown";

    if (!acc[typeName]) {
      acc[typeName] = [];
    }
    acc[typeName].push(course);
    return acc;
  }, {});

  return (
    <div className="Home-Container">
      {isPopupVisible && <Popup onClose={() => setPopupVisible(false)} />}
      {isFind ? (
        isLoad ? (
          <div className="Loading">
            <ul>

              <li />
              <li />
              <li />
            </ul>
          </div>
        ) : (
          <div className="Home-table">
            <div className="Home-arrow">
              <BiArrowBack
                className="arrow"
                onClick={() => {
                  setFind(false);
                  setLoad(false);
                  setSelectedYear(null);
                  setSelectedSemester(null);
                }}
              />
              <BiPlus className="Home-Plus" onClick={() => setPopupVisible(true)} />
            </div>
            {Object.keys(groupedCourses).map((type) => (
              <div key={type} className="Home-TypeTable">
                <h4 className="Home-margin">{type}</h4>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Professor</th>
                      <th>Year</th>
                      <th>Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedCourses[type]
                      .filter(
                        (item) =>
                          item.year === selectedYear &&
                          item.semester === selectedSemester
                      )
                      .map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.prof}</td>
                          <td>{item.year}</td>
                          <td>{item.semester}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="Home-NotFind">
          <div className="Home-SelectBorder">
            <div className="Home-DashBorder">
              <div className="Home-year">
                <h1 className="Home-Label">
                  <FaStar className="Star" /> ปีการศึกษา
                </h1>
                <div className="Home-Checkbox">
                  {[1, 2, 3, 4].map((year) => (
                    <label key={year}>
                      <input
                        type="radio"
                        checked={selectedYear === year}
                        onChange={() => handleRadioChangeYear(year)}
                      />
                      ปี {year}
                    </label>
                  ))}
                </div>
              </div>
              <div className="Home-Line"></div>
              <div className="Home-Semester">
                <h1 className="Home-Label">
                  <FaStar className="Star" />
                  ภาคการศึกษา
                </h1>
                <div className="Home-CheckBox2">
                  {[1, 2].map((sem) => (
                    <label key={sem}>
                      <input
                        type="radio"
                        checked={selectedSemester === sem}
                        onChange={() => handleRadioChangeSemester(sem)}
                      />
                      ภาค {sem}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="Home-Button" onClick={handleClick} disabled={isLoad}>
            FIND
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
