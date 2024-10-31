import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [isFind, setFind] = useState(false);
  const [isLoad, setLoad] = useState(true);

  const handleCheckboxChange = (num) => {
    console.log(num);
  };

  const handleClick = () => {
    setFind(true);
  };

  const data = [
    { id: 1, name: "John Doe", age: 28, occupation: "Engineer" },
    { id: 2, name: "Jane Smith", age: 34, occupation: "Designer" },
    { id: 3, name: "Mike Johnson", age: 45, occupation: "Manager" },
  ];

  return (
    <div className="Home-Container">
      {isFind ? (
        isLoad ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Occupation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.occupation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>Loading</h1>
        )
      ) : (
        <div className="Home-NotFind">
          <div className="Home-SelectBorder">
            <div className="Home-DashBorder">
              <div className="Home-year">
                <h1 className="Home-Label">ปีการศึกษา</h1>
                <div className="Home-Checkbox">
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(1)}
                    />
                    ปี 1
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(2)}
                    />
                    ปี 2
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(3)}
                    />
                    ปี 3
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(4)}
                    />
                    ปี 4
                  </label>
                </div>
              </div>
              <div className="Home-Line"></div>
              <div className="Home-Semester">
                <h1 className="Home-Label">ภาคการศึกษา</h1>
                <div className="Home-CheckBox2">
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(1)}
                    />
                    ภาค 1
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(2)}
                    />
                    ภาค 2
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              handleClick();
            }}
          >
            asdasd
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
