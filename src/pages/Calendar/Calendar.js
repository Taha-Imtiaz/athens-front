import React from "react";
import CalendarApp from "../../components/CalendarApp/CalendarApp";
import style from "./Calendar.module.css";

const Calendar = () => {
  return (
    <div className={style.calendarContainer}>
      <CalendarApp />
    </div>
  );
};

export default Calendar;
