import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import CalendarApp from '../../../components/CalendarApp/CalendarApp'
import style from "./MoverCalendar.module.css"

const MoverCalendar = () => {
  return (
    <div className={style.calenderContainer}>
      <div className={style.availibityBtns}>
        <div className={`${style.buttons}`}>
          <Link className={style.link} to="/mover/availability">
            <Button type="button" className={style.button}>
              Set Availability
                </Button>
          </Link>

          <Link className={style.link} to="/mover/holidaycalendar">
            <Button type="button" className={style.button}>
              Request Holidays
                </Button>
          </Link>
        </div>
      </div>
      <div className={style.calenderContent}>
        <CalendarApp />
      </div>
    </div>
  )
}

export default MoverCalendar
