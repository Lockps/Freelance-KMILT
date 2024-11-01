import React from "react";
import "./Favorite.css";

const Favorite = () => {
  const data = [
    {
      no: "1",
      name: "Test",
      prof: "test1",
    },
    {
      no: "2",
      name: "Test",
      prof: "test2",
    },
    {
      no: "3",
      name: "Test",
      prof: "test3",
    },
    {
      no: "4",
      name: "Test",
      prof: "test4",
    },
    {
      no: "5",
      name: "Test",
      prof: "test4",
    },
    {
      no: "6",
      name: "Test",
      prof: "test4",
    },
  ];
  return (
    <div className="Fav-Container">
      <div className="Fav-Grid">
        {data.map((item) => (
          <div className="Fav-item">{item.no}</div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
