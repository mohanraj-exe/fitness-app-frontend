import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation } from 'react-router-dom';

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const {search} = useLocation();
  const sp = new URLSearchParams(search)
  const startDate = sp.get(date[0])
  const endDate = sp.get(date[1])

  useEffect(() =>{
    const fetchData = async () => {
  
      if (startDate && endDate) {
        const response = await fetch(`/api/user/workout/search?startDate=${startDate}&endDate=${endDate}`,{method: "GET"}
        );
  
        const json = await response.json();
        if (response.ok) {
          console.log("fetched data:", json);
        }
      }
    }
    fetchData();
  },[startDate, endDate])

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
