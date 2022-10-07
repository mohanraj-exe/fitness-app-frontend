import { useState } from "react";

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
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <td>Muscle Group</td>
              <td>Title</td>
              <td>Load</td>
              <td>Sets</td>
              <td>Reps</td>
              <td>Comments</td>
            </tr>
          </thead>
          <tbody id="workout_row">
            <tr>
              <td>
                <input
                  type="text"
                  onChange={(e) => setMuscleGroup(e.target.value)}
                  name="muscleGroup"
                  value={muscleGroup}
                  placeholder="Ex: Chest, Triceps, Biceps"
                />
              </td>

              <td>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  value={title}
                  placeholder="Ex: Flat Bench Press, Tricep Extensions"
                />
              </td>

              <td>
                <input
                  type="number"
                  onChange={(e) => setLoad(e.target.value)}
                  name="load"
                  value={load}
                  placeholder="Ex: 315, 275, 155"
                />
              </td>

              <td>
                <input
                  type="number"
                  onChange={(e) => setSets(e.target.value)}
                  name="sets"
                  value={sets}
                  placeholder="Ex: 1, 2, 3"
                />
              </td>

              <td>
                <input
                  type="number"
                  onChange={(e) => setReps(e.target.value)}
                  name="reps"
                  value={reps}
                  placeholder="Ex: 12, 10, 8, 6"
                />
              </td>

              <td>
                <textarea
                  onChange={(e) => setComments(e.target.value)}
                  name="comments"
                  value={comments}
                  placeholder="Ex: A bit tougher than the last session..."
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>Save</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default WorkoutForm;
