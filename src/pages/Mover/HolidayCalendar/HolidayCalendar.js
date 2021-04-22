import React, { useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import style from "./HolidayCalendar.module.css";

import { holidayCalendar } from "../../../Redux/Mover/moverActions";
import { Button, TextareaAutosize, Modal } from "@material-ui/core";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { showMessage } from "../../../Redux/Common/commonActions";

// function renderDay(day) {
//   const date = day.getDate();

//   return (
//     <div className={style.cellStyle}>
//       <div className={style.dateStyle}>{date}</div>
//       <div className={style.birthdayStyle}>
//         <input
//           type="checkbox"
//           className="form-check-input"
//           id="exampleCheck1"
//         />
//       </div>
//     </div>
//   );
// }

function RequestHolidays(props) {
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [dates, setDates] = useState([]);
  const [emptyReasonError, setEmptyReasonError] = useState("");

  const handleShow = () => {
    if (dates.length < 1) {
      let { showMessage } = props;
      showMessage("Please choose any date.");
    } else {
      setShow(true);
    }
  };

  const handleClose = () => {
    setEmptyReasonError("");
    setShow(false);
    setNote("");
  };

  // const handleDayClick = (e) => {
  //   let newDates = cloneDeep(dates);
  //   let index = newDates.findIndex((x) => x === e.toString());
  //   if (index !== -1) {
  //     newDates.splice(index, 1);
  //     setDates(newDates);
  //   } else {
  //     setDates([...newDates, e.toString()]);
  //   }
  // };

  const handleDayClick = (day, { selected }) => {
    const selectedDates = cloneDeep(dates);
    if (selected) {
      const selectedIndex = selectedDates.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDates.splice(selectedIndex, 1);
    } else {
      selectedDates.push(day);
    }
    setDates(selectedDates);
  };

  const addNote = () => {
    const stringDates = dates.map((x) => new Date(x).toString());
    let { holidayCalendar } = props;
    if (stringDates.length > 0 && note.length > 0) {
      let obj = {
        dates: stringDates,
        reason: note,
      };
      holidayCalendar(obj, (res) => {
        setNote("");
        setShow(false);
        setDates([]);
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
          selectedDays={dates}
          canChangeMonth={true}
          // renderDay={renderDay}
          onDayClick={handleDayClick}
          className={`${style.calenderContent} ${style.flex}`}
          fromMonth={new Date()}
        />
      </div>
      <Modal
        open={show}
        onClose={handleClose}
        // scrollable
        // centered
        className={style.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className={"bg-light p-3"}>
            <h3>Add Reason</h3>
            <div>
              <TextareaAutosize
                id=""
                cols="65"
                rows="5"
                name="note"
                value={note}
                className={
                  emptyReasonError !== "" ? style.redBorder : style.blackBorder
                }
                onChange={handleAddNote}
              ></TextareaAutosize>
            </div>
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
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
var actions = {
  holidayCalendar,
  showMessage,

};

export default connect(null, actions)(RequestHolidays);
