import React, { useState, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import style from './HolidayCalendar.module.css'

import { holidayCalender } from '../../../Redux/Mover/moverActions'
import { v4 as uuidv4 } from "uuid";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { showMessage } from '../../../Redux/Common/commonActions'
import { connect } from "react-redux";

// function handleDayClick(e) {
//   console.log(e.toString())
// }
import { clone, cloneDeep } from "lodash"

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

function Example(props) {
  const [show, setShow] = useState(false)
  const [note, setNote] = useState('')
  const [dates, setDates] = useState([])

  const handleShow = () => {
    setShow(true)
  };
  const handleClose = () => {
    setShow(false)
  };
  const handleDayClick = (e) => {
    let newDates = cloneDeep(dates)
    let index = newDates.findIndex(x => x == e.toString())
    if (index != -1) {
      newDates.splice(index, 1)
      setDates(newDates)
    } else {
      setDates([...newDates, e.toString()])
    }
  }

  const addNote = () => {
    let { showMessage } = props;
    if (dates.length > 0 && note.length > 0) {
      let obj = {
        dates,
        reason: note
      }
      holidayCalender(obj).then(res => {
        if (res.data.status == 200) {
          setShow(false)
          showMessage(res.data.message)
        }
      });
    }
  };

  const handleAddNote = (e) => {
    setNote(e.target.value)
  };
  return (
    <>
      <div className="btnalign" style={{ float: 'right', marginRight: '20px', marginTop: '20px' }}>
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
      <Modal show={show} onHide={handleClose} centered>
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
            Send Request
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
var actions = {
  showMessage
};

export default connect(null, actions)(Example);
