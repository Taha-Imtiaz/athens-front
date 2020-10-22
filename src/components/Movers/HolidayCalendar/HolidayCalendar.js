import React, { useState, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import style from './HolidayCalendar.module.css'

import { holidayCalender } from '../../../Redux/Mover/moverActions'
import { v4 as uuidv4 } from "uuid";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// function handleDayClick(e) {
//   console.log(e.toString())
// }

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
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
      </div>
    </div>
  );
}

export default function Example() {
  const [show, setShow] = useState(false)
  const [note, setNote] = useState('')
  const [dates, setDates] = useState([])




  const handleShow = () => {
    console.log('hi')
    setShow(true)
  };
  const handleClose = () => {

    setShow(false)

  };
  const handleDayClick = (e) => {
    setDates([...dates, e.toString()])
    console.log(e.toString())
  }

  const addNote = () => {
    let obj = {
      dates,
      reason: note,
      _id: '5f907f70bc2d090017901d68'
    }
    console.log(obj)
     holidayCalender(obj);
  };
  const handleAddNote = (e) => {
    setNote(e.target.value)
  };
  return (
    <>


      <div className="btnalign" style={{ float: 'right' }}>
        <button
          onClick={handleShow}
          type="submit"
          className={`btn btn-primary ${style.btnCustom}`}
        >
          Add Reason
    </button>
      </div>
      <DayPicker
        canChangeMonth={true}
        renderDay={renderDay}
        onDayClick={(e) => handleDayClick(e)}
        className={style.position}

      />
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            name=""
            id=""
            cols="65"
            rows="5"
            name="note"
            value={note}
            onChange={handleAddNote}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={addNote}>
            Add Reason
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}