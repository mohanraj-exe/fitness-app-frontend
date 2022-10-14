import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);

  const fetchData = async () => {
    if (date[0] && date[1]) {
      const response = await fetch(
        `/api/user/workout/search?startDate=${date[0]}&endDate=${date[1]}`,
        { method: "GET" }
      );

      const json = await response.json();
      if (response.ok) {
        setData(json);
        console.log("Search Results:", json);
      }
    }
  };

  return (
    <>
      <header className="header">
      <h1>Workout Log App</h1>
      </header>

      <div className="nav-info">
        <span>
          Want to save your today's workout?&nbsp;
          <Link to="/workoutForm"><button className="click-here hover-style">Click Here!</button></Link>
        </span>
      </div>

      <div className="search-info">
        <span>
          Please select the specific dates range and click <i style={{fontWeight: 'bold'}}>Search</i> button. 
          Saved workouts will be displayed below.
        </span>
      </div>

      <div className="row">
        <div className="col-8">
          <table>
            {data.length > 0 ? (
              <thead>
                <tr>
                  <td>Muscle Group</td>
                  <td>Title</td>
                  <td>Load in lbs</td>
                  <td>Sets</td>
                  <td>Reps</td>
                  <td>Comments</td>
                  <td>Date and Time</td>
                </tr>
              </thead>
            ) : (
              ""
            )}
            <tbody>
              {data.map((data) => (
                <tr key={data._id}>
                  <td>{data.muscleGroup}</td>
                  <td>{data.title}</td>
                  <td>{data.load}</td>
                  <td>{data.sets}</td>
                  <td>{data.reps}</td>
                  <td>{data.comments}</td>
                  <td>{data.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-4">
          <div>
            <Calendar
              onChange={setDate}
              value={date}
              selectRange={true}
              maxDate={new Date()}
              minDate={new Date(2022, 6, 1)}
            />
          </div>
          {date.length > 0 ? (
            <p>
              <span style={{ fontWeight: "bolder" }}>
                Selected Date Ranges:
              </span>
              <br />
              <span style={{ fontWeight: "bolder" }}>Start:</span>{" "}
              {date[0].toDateString()}
              &nbsp;|&nbsp;
              <span style={{ fontWeight: "bolder" }}>End:</span>{" "}
              {date[1].toDateString()}
            </p>
          ) : (
            <p>
              <span style={{ fontWeight: "bolder" }}>Date:</span>{" "}
              {date.toDateString()}
            </p>
          )}

          <button onClick={fetchData} className="search-button hover-style">Search</button>
        </div>
      </div>
    </>
  );
};

export default Home;
