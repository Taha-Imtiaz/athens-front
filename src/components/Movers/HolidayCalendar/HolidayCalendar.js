import React, { useState, useEffect } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import style from "./HolidayCalendar.module.css";

import { holidayCalender } from "../../../Redux/Mover/moverActions";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "react-bootstrap";
import {Button} from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { showMessage } from "../../../Redux/Common/commonActions";
import { connect } from "react-redux";

// function handleDayClick(e) {
//   console.log(e.toString())
// }
import { clone, cloneDeep } from "lodash";

function renderDay(day) {
  const date = day.getDate();
  const dateStyle = {
    position: "absolute",
    color: "lightgray",
    top: 0,
    right: 0,
    fontSize: 20,
  };
  const birthdayStyle = { fontSize: "0.8em", bottom: 0, left: 0 };
  const cellStyle = {
    height: 70,
    width: 100,
    position: "relative",
  };
  return (
    <div style={cellStyle}>
      <div style={dateStyle}>{date}</div>
      <div style={birthdayStyle}>
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
      </div>
    </div>
  );
}

function Example(props) {
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [dates, setDates] = useState([]);
  const [emptyReasonError, setEmptyReasonError] = useState("")
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setEmptyReasonError("")
    setShow(false);
  };
  const handleDayClick = (e) => {
    let newDates = cloneDeep(dates);
    let index = newDates.findIndex((x) => x == e.toString());
    if (index != -1) {
      newDates.splice(index, 1);
      setDates(newDates);
    } else {
      setDates([...newDates, e.toString()]);
    }
  };

  const addNote = () => {
    let { showMessage } = props;
    if (dates.length > 0 && note.length > 0) {
      let obj = {
        dates,
        reason: note,
      };
      holidayCalender(obj).then((res) => {
        if (res.data.status == 200) {
          setShow(false);
          showMessage(res.data.message);
        }
      });
    }
    else if(note.length === 0) {
      setEmptyReasonError("Error")
    }
  };


  const handleAddNote = (e) => {
    setNote(e.target.value);
    if (note === "") {
    }
  };
  return (
    <>
      <div
        className="btnalign"
        style={{ float: "right", marginRight: "20px", marginTop: "20px" }}
      >
           <Button
                    type="button"
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                      // float: "right",
                      margin: "1rem 0rem",
                    }}
          
          onClick={handleShow}
          type="submit"
          // className={`btn btn-primary ${style.btnCustom}`}
        >
          Add Reason
        </Button>
      </div>
      <DayPicker
        canChangeMonth={true}
        renderDay={renderDay}
        onDayClick={(e) => handleDayClick(e)}
        className={style.position}
      />
      <Modal
        dialogClassName={`${style.modal}`}
        show={show}
        onHide={handleClose}
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div>
         <textarea
            name=""
            id=""
            cols="65"
            rows="5"
            name="note"
            value={note}
         style={{border: emptyReasonError !== "" ? "1px solid red": "1px solid black"  }}

            onChange={handleAddNote}
          ></textarea>
         
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            style={{
              background: "#00ADEE",
              textTransform: "none",
              color: "#FFF",
              fontFamily: "sans-serif",
              float: "right",
            }}
            onClick={handleClose}
          >
            Close
          </Button>

          <Button
            type="button"
            style={{
              background: "#00ADEE",
              textTransform: "none",
              color: "#FFF",
              fontFamily: "sans-serif",
              marginLeft:"0.5rem",
              float: "right",
            }}
            onClick={addNote}
          >
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
var actions = {
  showMessage,
};

export default connect(null, actions)(Example);
