import React, { useState } from "react";
import "./Review.css";

const Review = () => {
  const [isClick, setClick] = useState(false);
  const [Choice, setChoice] = useState("");
  const [isLoad, setLoad] = useState(true);

  const handleClick = (choice) => {
    setChoice(choice);
    setClick(!isClick);
  };

  const data = [
    { id: 1, name: "John Doe", age: 28, occupation: "Engineer" },
    { id: 2, name: "Jane Smith", age: 34, occupation: "Designer" },
    { id: 3, name: "Mike Johnson", age: 45, occupation: "Manager" },
  ];

  return (
    <div className="Review-Container">
      {isClick ? (
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
        <div className="Review-Border">
          <h1>หมวดวิชา</h1>
          <div className="Review-ChoiceBox">
            <div className="Review-a" onClick={() => handleClick("a")}>
              asd
            </div>
            <div className="Review-b" onClick={() => handleClick("b")}>
              asd
            </div>
            <div className="Review-c" onClick={() => handleClick("c")}>
              asd
            </div>
            <div className="Review-d" onClick={() => handleClick("d")}>
              asd
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
