import React, { useState, useEffect } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import style from "./HolidayCalendar.module.css";

import { holidayCalendar } from "../../../Redux/Mover/moverActions";
import { Modal } from "react-bootstrap";
import { Button, TextareaAutosize } from "@material-ui/core";
import { showMessage } from "../../../Redux/Common/commonActions";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";

function renderDay(day) {
  const date = day.getDate();

  return (
    <div className={style.cellStyle}>
      <div className={style.dateStyle}>{date}</div>
      <div className={style.birthdayStyle}>
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
      </div>
    </div>
  );
}

function RequestHolidays(props) {
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [dates, setDates] = useState([]);
  const [emptyReasonError, setEmptyReasonError] = useState("");
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setEmptyReasonError("");
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
      holidayCalendar(obj).then((res) => {
        if (res.data.status == 200) {
          setShow(false);
          showMessage(res.data.message);
        }
      });
    } else if (note.length === 0) {
      setEmptyReasonError("Error");
    }
  };

  const handleAddNote = (e) => {
    setNote(e.target.value);
  };
  return (
    <div className={style.holidayCalendarContainer}>
      <div className={style.buttons}>
        <Button className={style.button} onClick={handleShow} type="submit">
          Add Reason
        </Button>
      </div>
      <div className={style.calender}>
        <DayPicker
          canChangeMonth={true}
          renderDay={renderDay}
          onDayClick={(e) => handleDayClick(e)}
          className={style.flex}
        />
      </div>
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
            <TextareaAutosize
              name=""
              id=""
              rows="5"
              name="note"
              value={note}
              className={
                emptyReasonError !== "" ? style.redBorder : style.blackBorder
              }
              onChange={handleAddNote}
            ></TextareaAutosize>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={style.modalBtn}>
            <Button
              className={style.button}
              type="button"
              onClick={handleClose}
            >
              Close
            </Button>

            <Button className={style.button} type="button" onClick={addNote}>
              Send Request
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
var actions = {
  showMessage,
};

export default connect(null, actions)(RequestHolidays);
