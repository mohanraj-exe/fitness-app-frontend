import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 455px;
  height: 450px;
  border: 1.5px solid lightgrey;
  border-radius: 1.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const H2 = styled.h2`
  text-align: center;
`;

const Inputs = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  height: 35px;
  width: 80px;
  color: white;
  background-color: blue;
  border-radius: 35px;
  font-size: 15px;
  cursor: pointer;
`;

const Error = styled.span`
  background-color: red;
  color: white;
`;

const WorkoutForm = () => {
  const [muscleGroup, setMuscleGroup] = useState("");
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { muscleGroup, title, load, sets, reps, comments };

    const response = await fetch("/api/user/workout", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setMuscleGroup("");
      setTitle("");
      setLoad("");
      setSets("");
      setReps("");
      setComments("");
      setError("");
      console.log("new workout added:", json);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <H2>Workout Form</H2>

        <Inputs>
          <input
            type="text"
            onChange={(e) => setMuscleGroup(e.target.value)}
            name="muscleGroup"
            value={muscleGroup}
            placeholder="Muscle Group...Eg: Chest,Triceps,Biceps"
            style={{ margin: "10px", height: '35px'}}
          />

          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
            placeholder="Workout Name...Eg: Flat Bench Press,Tricep Extensions"
            style={{ margin: "10px" ,height: '35px'}}
          />

          <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            name="load"
            value={load}
            placeholder="Load...Eg: 315,275,125 lbs"
            style={{ margin: "10px" ,height: '35px'}}
          />

          <input
            type="number"
            onChange={(e) => setSets(e.target.value)}
            name="sets"
            value={sets}
            placeholder="Sets...Eg: 1,2,3 sets"
            style={{ margin: "10px" ,height: '35px'}}
          />

          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            name="reps"
            value={reps}
            placeholder="Reps...Eg: 12,10,8,6 reps"
            style={{ margin: "10px" ,height: '35px'}}
          />

          <textarea
            onChange={(e) => setComments(e.target.value)}
            name="comments"
            value={comments}
            placeholder="Comments...Eg: Easy, Medium, Hard etc.."
            style={{ margin: "10px" ,height: '35px'}}
          />
        </Inputs>

        <ButtonContainer>
          <Button>Save</Button>
        </ButtonContainer>
        
        <Error>{error && <div className="error">{error}</div>}</Error>
      </form>
    </Container>
  );
};

export default WorkoutForm;
