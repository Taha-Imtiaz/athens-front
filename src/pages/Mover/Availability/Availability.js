import React, { useEffect, useState } from "react";

import style from "./Availability.module.css";
import { setAvailability } from "../../../Redux/Mover/moverActions";
import { cloneDeep } from "lodash";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const Availability = (props) => {
  const [state, setState] = useState({
    days: "",
    user: "",
    weeklySchedule: [],
    update: true,
  });

  let {user} = props
  
  useEffect(() => {
    if (user) {
      setState({
        ...state,
        user: user,
        weeklySchedule: user.weeklySchedule,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e) => {
    let newData = cloneDeep(state);
    let index = newData.weeklySchedule.findIndex(
      (x) => x.day === e.target.value
    );
    newData.weeklySchedule[index].status = !newData.weeklySchedule[index]
      .status;
    setState({ ...newData });
  };

  const handleSubmit = (e) => {
    let {setAvailability } = props;
    e.preventDefault();
    let obj = {
      weeklySchedule: state.weeklySchedule,
    };
    setAvailability(obj, state.user._id)
  };


  return (
    <div className={style.availabilityContainer}>
      <div className={`${style.availabilityHeader} ${style.flex}`}>
        <h3>Select Your Availability</h3>
      </div>
      <div className={style.availabilitySchedule}>
        { state.weeklySchedule && state.weeklySchedule.map((list, i) => {
          return (
            <div className={`${style.scheduleContainer}`} key={i}>
              <div className={`${style.schedule}`}>
                <div className={style.checkbox}>
                  <input
                    checked={list.status}
                    type="checkbox"
                    name={list.day}
                    onChange={handleChange}
                    value={list.day}
                    id="defaultCheck1"
                  />
                </div>
                <div className={style.dayName}>
                  <h5>{list.day}</h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${style.saveBtn} ${style.flex}`}>
        <Button
          className={style.button}
          type="button"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

var actions = {
  setAvailability,
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps, actions)(Availability);
