import React, { Component } from "react";

import style from "./Availability.module.css";
import { setAvailability } from "../../../Redux/Mover/moverActions";
import { cloneDeep } from "lodash";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import { Button } from "@material-ui/core";
class Availability extends Component {
  state = {
    days: "",
    user: "",
    weeklySchedule: [],
    update: true,
  };

  handleChange = (e) => {
    let newData = cloneDeep(this.state);
    let index = newData.weeklySchedule.findIndex(
      (x) => x.day === e.target.value
    );
    newData.weeklySchedule[index].status = !newData.weeklySchedule[index]
      .status;
    this.setState(newData);
  };

  handleSubmit = (e) => {
    var { showMessage } = this.props;
    e.preventDefault();
    let obj = {
      weeklySchedule: this.state.weeklySchedule,
    };
    setAvailability(obj, this.state.user._id).then((res) => {
      showMessage(res.data.message);
    });
  };

  componentDidMount() {
    if (this.props.loggedinUser) {
      this.setState({
        user: this.props.loggedinUser,
        weeklySchedule: this.props.loggedinUser.weeklySchedule,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedinUser !== prevProps.loggedinUser) {
      this.setState({
        user: this.props.loggedinUser,
        weeklySchedule: this.props.loggedinUser.weeklySchedule,
      });
    }
  }

  render() {
    return (
      <div className={style.availabilityContainer}>
        <div className={`${style.availabilityHeader} ${style.flex}`}>
          <h3>Select Your Availability</h3>
        </div>
        <div className={style.availabilitySchedule}>
          {this.state.weeklySchedule.map((list,i) => {
            return (
              <div className={`${style.scheduleContainer}`} key = {i}>
                <div className={`${style.schedule}`}>
                  <div className={style.checkbox}>
                    <input
                      checked={list.status}
                      type="checkbox"
                      name={list.day}
                      onChange={this.handleChange}
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
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

var actions = {
  showMessage,
};

var mapStateToProps = (state) => ({
  loggedinUser: state.users.user,
});

export default connect(mapStateToProps, actions)(Availability);
