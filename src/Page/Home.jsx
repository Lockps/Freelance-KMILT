import React, { useState } from "react";
import "./Home.css";
import { BiArrowBack } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const Home = () => {
  const [isFind, setFind] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [returnedData, setReturnedData] = useState([]);

  const handleCheckboxChangeYear = (num) => {
    setSelectedYears((prev) => {
      if (prev.includes(num)) {
        return prev.filter((year) => year !== num);
      } else {
        return [...prev, num];
      }
    });
  };

  const handleCheckboxChangeSemester = (num) => {
    setSelectedSemesters((prev) => {
      if (prev.includes(num)) {
        return prev.filter((sem) => sem !== num);
      } else {
        return [...prev, num];
      }
    });
  };

  const handleClick = async () => {
    console.log("Selected Years:", selectedYears);
    console.log("Selected Semesters:", selectedSemesters);

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
      {isFind ? (
        isLoad ? (
          <h1>Loading...</h1>
        ) : (
          <div className="Home-table">
            <div className="Home-arrow">
              <BiArrowBack
                className="arrow"
                onClick={() => {
                  setFind(false);
                  setLoad(false);
                  setSelectedYears([]);
                  setSelectedSemesters([]);
                }}
              />
            </div>
            {Object.keys(groupedCourses).map((type) => (
              <div key={type} className="Home-TypeTable">
                <h4 className="Home-margin">{type}</h4>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Credit</th>
                      <th>Professor</th>
                      <th>Year</th>
                      <th>Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedCourses[type]
                      .filter(
                        (item) =>
                          selectedYears.includes(item.year) &&
                          selectedSemesters.includes(item.semester)
                      )
                      .map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.credit}</td>
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
                        type="checkbox"
                        onChange={() => handleCheckboxChangeYear(year)}
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
                        type="checkbox"
                        onChange={() => handleCheckboxChangeSemester(sem)}
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
