import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const Container = styled.div`
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

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const fetchData = async () => {
    if (date[0] && date[1]) {
      const response = await fetch(
        `/api/user/workout/search?startDate=${date[0]}&endDate=${date[1]}`,
        { method: "GET" }
      );

      const json = await response.json();
      if (response.ok) {
        console.log("Search Results:", json);
      }
    }
  };

  return (
    <Container>
          <Calendar
            onChange={setDate}
            value={date}
            selectRange={true}
            maxDate={new Date()}
            minDate={new Date(2022, 6, 1)}
          />
      {date.length > 0 ? (
        <p>
          <span style={{fontWeight: 'bolder'}}>Selected Date Ranges:</span><br />
          <span style={{fontWeight: 'bolder'}}>Start:</span> {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span style={{fontWeight: 'bolder'}}>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p>
          <span style={{fontWeight: 'bolder'}}>Date:</span> {date.toDateString()}
        </p>
      )}

      <Button onClick={fetchData}>Search</Button>
    </Container>
  );
};

export default Calender;
