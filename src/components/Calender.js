import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calender = () => {

    const [date, setDate] = useState(new Date());
    const fetchData = async () => {
   
      if (date[0] && date[1]) {
        const response = await fetch(`/api/user/workout/search?startDate=${date[0]}&endDate=${date[1]}`,
        {method: "GET"});
  
        const json = await response.json();
        if (response.ok) {
          console.log("fetched data:", json);
        }
      }
    }

  return (
    <>
      <Calendar
        onChange={setDate}
        value={date}
        selectRange={true}
        maxDate={new Date()}
        minDate={new Date(2022, 6, 1)}
      />

      {date.length > 0 ? (
        <p className="text-center">
          <span className="bold">Start:</span> {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className="bold">End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className="text-center">
          <span className="bold">Date:</span> {date.toDateString()}
        </p>
      )}

      <button onClick={fetchData}>Fetch data</button>
    </>
  );
};

export default Calender;
