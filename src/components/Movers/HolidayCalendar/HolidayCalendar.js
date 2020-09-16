import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import style from './HolidayCalendar.module.css'

function handleDayClick(e) {
    console.log(e)
}

function renderDay(day) {
  const date = day.getDate();
  const dateStyle = {
    position: 'absolute',
    color: 'lightgray',
    top: 0,
    right: 0,
    fontSize: 20,
  };
  const birthdayStyle = { fontSize: '0.8em', bottom: 0, left: 0 };
  const cellStyle = {
    height: 70,
    width: 100,
    position: 'relative',
  };
  return (
    <div style={cellStyle}>
      <div style={dateStyle}>{date}</div>
          <div style={birthdayStyle}>
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
          </div>
    </div>
  );
}

export default function Example() {
  return (
    <DayPicker
      canChangeMonth={true}
      renderDay={renderDay}
      onDayClick={handleDayClick}
      className = {style.position}
    />
  );
}