import React, { useEffect, useState } from "react";
import "./Review.css";
import { BiArrowBack, BiBook } from "react-icons/bi";
import a from "../asset/a.jpg";
import b from "../asset/b.png";
import c from "../asset/c.jpg";
import d from "../asset/d.jpg";
import Star from "../Components/Star";
import { CgComment } from "react-icons/cg";
import Comment from "./Comment";
import { BsBack } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

const Review = () => {
  const [isClick, setClick] = useState(false);
  const [choice, setChoice] = useState("");
  const [isLoad, setLoad] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(null);

  const [contentFeedback, setContentFeedback] = useState("");
  const [professorFeedback, setProfessorFeedback] = useState("");
  const [examFeedback, setExamFeedback] = useState("");

  const [isShowComment, setShowComment] = useState(false)
  const [comments, setcomments] = useState([])

  const [isLoadComment, setLoadComment] = useState(false)



  const showComment = async (course) => {
    try {

      setLoadComment(true)
      const response = await fetch("http://127.0.0.1:5000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: course.no }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setcomments(data);
        setShowComment(true)
        setLoadComment(false)
      } else {
        alert("Failed to fetch comments.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const uniqueCourses = new Set();

  const [file, setfile] = useState(null)

  const handleFileChange = (e) => {
    console.log("asdasdsad");

    setfile(e.target.files[0])
    console.log(file);

  }

  const handleSubmit = async () => {
    if (!selectedCourse) {
      alert("Please select a course before submitting.");
      return;
    }

    try {
      console.log(selectedCourse);

      const response = await fetch("http://127.0.0.1:5000/add_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: selectedCourse.no,
          contentFeedback: contentFeedback,
          profFeedback: professorFeedback,
          examFeedback: examFeedback,
          rating: rating,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Review submitted successfully!");
        setContentFeedback("");
        setProfessorFeedback("");
        setExamFeedback("");
        setRating(null);
        setModalOpen(false);
      } else {
        alert("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };


  const handleClick = (selectedChoice) => {
    setChoice(selectedChoice);
    setClick(true);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
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

  if (isLoadComment) {
    return <div className="Loading">
      <ul>
        <li />
        <li />
        <li />
      </ul>
    </div>
  }

  if (isShowComment) {
    return (
      <div className="Review-CommentContainer">
        <div className="Review-Back">
          <IoArrowBack onClick={() => {
            setShowComment(false)
            setModalOpen(false)
          }} />
          <h1>{comments.length > 0 ? "COURSE ID: " + comments[0].course_id : "Doesn't have any review yet"}</h1>
        </div>
        <div className="Review-Grid">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="Review-item">

                <h3>{comment.title}</h3>

                <p><strong>Content Feedback:</strong> {comment.contentFeedback}</p>
                <p><strong>Professor Feedback:</strong> {comment.profFeedback}</p>
                <p><strong>Exam Feedback:</strong> {comment.examFeedback}</p>

                {/* Rating */}
                <div className="rating">Rating: {comment.rating}</div>
              </div>
            ))
          ) : (
            <div className="Loading">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </div>
    );

  }

  return (
    <div className="Review-Container">
      {isClick ? (
        isLoad ? (
          <div className="Loading">
            <ul>
              <li />
              <li />
              <li />
            </ul>
          </div>
        ) : (
          <div className="Review-table">
            <div className="Review-Arrow">
              <div className="Review-type">
                <BiArrowBack
                  className="arrow"
                  onClick={() => {
                    setClick(false);
                    setChoice("");
                  }} G
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
                    <th>Year</th>
                    <th>Professor</th>
                    <th className="th-comment">comment</th>
                  </tr>
                </thead>
                <tbody>
                  {courses
                    .filter((course) => course.type_id === getTypeId(choice))
                    .filter((course) => {
                      if (!uniqueCourses.has(course.id)) {
                        uniqueCourses.add(course.id);
                        return true;
                      }
                      return false;
                    })
                    .map((course) => (
                      <tr
                        key={course.id}
                        onClick={() => handleRowClick(course)}
                      >
                        <td>{course.id}</td>
                        <td>{course.name}</td>
                        <td>{course.year}</td>
                        <td>{course.prof}</td>
                        <td className="th-comment">
                          <CgComment onClick={() => showComment(course)} />
                        </td>
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
                        ด้านเนื้อหา
                        <textarea
                          value={contentFeedback}
                          onChange={(e) => setContentFeedback(e.target.value)}
                        />
                      </div>
                      <div>
                        ด้านอาจารย์
                        <textarea
                          value={professorFeedback}
                          onChange={(e) => setProfessorFeedback(e.target.value)}
                        />
                      </div>
                      <div>
                        ด้านการสอบ
                        <textarea
                          value={examFeedback}
                          onChange={(e) => setExamFeedback(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="modal-star">
                      Review Star
                      <Star onRatingChange={handleRatingChange} />
                      <div className="modal-file">
                        <input type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                    <div className="modal-Submit">
                      <button onClick={handleSubmit}>Submit</button>
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
