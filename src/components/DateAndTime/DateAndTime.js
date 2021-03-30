import React, { useState } from 'react'
import style from "./DateAndTime.module.css"
import { cloneDeep } from "lodash";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
} from "@material-ui/pickers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";


const DateAndTime = (props) => {

    let setParentDates = props.setDates;
    const initialState = props.dates;
    console.log(initialState)
    const [dates, setDates] = useState(initialState)
    //add new Date
    const addDate = () => {
        if (dates[0].date && dates[0].time) {
            setDates([...dates, { date: new Date(), time: new Date().setHours(9, 0, 0, 0) }]);
            setParentDates([...dates, { date: new Date(), time: new Date() }])
        }
    };
    //remove the selected Date
    const removeDate = (i) => {
        let datesArr = cloneDeep(dates);
        datesArr.splice(i, 1);
        setDates(datesArr);
        setParentDates(datesArr)
    };
    //onChange handler of dates
    const handleStartDate = (date, i) => {
        let newState = cloneDeep(dates);
        newState[i].date = date;
        setDates(newState);
        setParentDates(newState)
    };

    //onChange handler of time
    const handleTimeSelect = (date, i) => {
        let newState = cloneDeep(dates);
        newState[i].time = date;
        setDates(newState);
        setParentDates(newState)
    };

    return (
        <div className={style.DateAndTime}>
            {/* date and time */}
            <hr />
            <div className={style.DateTimeInput}>
                {dates && dates.map((x, i) => {
                    return (
                        <div className={style.mainDate} key={i}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid>
                                    <KeyboardDatePicker
                                        minDate={new Date()}
                                        inputVariant="outlined"
                                        required
                                        fullWidth
                                        // margin="normal"
                                        size="small"
                                        id="date-picker-dialog"
                                        format="MM/dd/yyyy"
                                        className={style.styleFormFields}
                                        value={dates[i].date}
                                        onChange={(e) => handleStartDate(e, i)}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        // margin="normal"
                                        required
                                        fullWidth
                                        inputVariant="outlined"
                                        id="time-picker"
                                        size="small"
                                        // className={style.styleFormFields}
                                        // label="Time picker"
                                        value={dates[i].time}
                                        onChange={(e) => handleTimeSelect(e, i)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                    {i != 0 ?
                                        <div className={style.centeredIcon}
                                            onClick={() => removeDate(i)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </div> : null}
                                </Grid>
                            </MuiPickersUtilsProvider>

                        </div>
                    );
                })}
                <div className="d-flex justify-content-end">
                    <div onClick={addDate}
                        className={`${style.plusIcon} ${style.alignRight}`}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>

            </div>
            <hr />
        </div>
    )
}
export default DateAndTime
