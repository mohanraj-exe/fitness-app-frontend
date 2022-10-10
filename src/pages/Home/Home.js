import React from "react";
import "./home.css";
import {Link} from 'react-router-dom';

// imports
import Calender from "../../components/Calender";

const Home = () => {
  return (
    <div>
      <div className="header">
        <h1>Workout Log App</h1>
      </div>

      <div className="workoutForm">
        <p>Want to save your today's workout?&nbsp;<Link to="/workoutForm">Click Here!</Link></p>
      </div>

      <div className="row">
        <div className="col-4">

        </div>
        <div className="col-4">

        </div>
        <div className="col-4">
          <Calender />
        </div>
      </div>
    </div>
  );
};

export default Home;
