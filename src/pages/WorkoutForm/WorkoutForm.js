import React from "react";
import "./workoutForm.css";
import { Link } from "react-router-dom";

// imports
import WorkoutForm from "../../components/WorkoutForm";

const Home = () => {
  return (
    <div>
      <div className="header">
        <h1>Workout Log App</h1>
      </div>

      <div className="workoutForm">
        <p>Get saved workouts!!!&nbsp;<Link to="/">Click Here!</Link></p>
      </div>

      <div className="row">
        <div className="col-4">
          
        </div>
        <div className="col-3">
          
        </div>
        <div className="col-5">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
