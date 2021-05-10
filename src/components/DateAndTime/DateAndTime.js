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
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";


const DateAndTime = (props) => {

    let setParentDates = props.setDates;
    const initialState = props.dates;
    const [dates, setDates] = useState(initialState)
    //add new Date
    const addDate = () => {
        if (dates[0].date && dates[0].time) {
            let defaulTime = new Date()
            defaulTime.setHours(9);
            defaulTime.setMinutes(0);
            defaulTime.setSeconds(0);
            setDates([...dates, { date: new Date(), time: defaulTime }]);
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
        console.log(date)
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
                                        required
                                        fullWidth
                                        inputVariant="outlined"
                                        id="time-picker"
                                        size="small"
                                        value={dates[i].time}
                                        onChange={(e) => handleTimeSelect(e, i)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                    {i !== 0 ?
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
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </div>
                </div>

            </div>
            <hr />
        </div>
    )
}
export default DateAndTime
