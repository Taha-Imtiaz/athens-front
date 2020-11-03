import React, { Component } from "react";
import style from "./CreateJobs.module.css";
import { Multiselect } from "multiselect-react-dropdown";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from "../../Button/Button";
import API from "../../../utils/api";
import { getAllMovers, createJob } from "../../../Redux/Job/jobActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { clone, cloneDeep } from "lodash"

class CreateJobs extends Component {
  initialState = {
    title: "",
    description: "",
    services: [],
    customerId: "",
    startDate: "",
    dates: [''],
    startTime: "",
    meetTime: "",
    assigneeRequired: '',
    from: "",
    to: "",
    titleError: "",
    descriptionError: "",
    multiError: "",
    dateError: "",
    timeError: "",
    assigneeError: "",
    locationfromError: "",
    locationtoError: "",
    assigneeList: [],
    status: "pending",
    note: [],
    assigneesId: [],
    add: 1,
    locations: [{ from: '', to: '' }],
    fromTo: [],
    assigneeRequiredError: ''
  };
  // assigneeOptions = [{ name: 'Person1', id: 1 , value: "00:00:00"}, { name: 'Person2', id: 2 , value: "00:00:00"}]
  options = [
    { name: "Srigar", id: 1 },
    { name: "Sam", id: 2 },
  ];
  servicesOptions = [
    { id: 1, name: "Pakaging" },
    { id: 2, name: "Loading" },
    { id: 3, name: "Unloading" },
    { id: 4, name: "Grand Piano" },
    { id: 5, name: "Baby" },
    { id: 6, name: "Hot Tub" },
  ];
  timeOptions = [
    { name: "01:00 am", id: 1, value: "01:00:00" },
    { name: "02:00 am", id: 2, value: "02:00:00" },
    { name: "03:00 am", id: 3, value: "03:00:00" },
    { name: "04:00 am", id: 4, value: "04:00:00" },
    { name: "05:00 am", id: 5, value: "05:00:00" },
    { name: "06:00 am", id: 6, value: "06:00:00" },
    { name: "07:00 am", id: 7, value: "07:00:00" },
    { name: "08:00 am", id: 8, value: "08:00:00" },
    { name: "09:00 am", id: 9, value: "09:00:00" },
    { name: "10:00 am", id: 10, value: "10:00:00" },
    { name: "11:00 am", id: 11, value: "11:00:00" },
    { name: "12:00 pm", id: 12, value: "12:00:00" },
    { name: "01:00 pm", id: 13, value: "13:00:00" },
    { name: "02:00 pm", id: 14, value: "14:00:00" },
    { name: "03:00 pm", id: 15, value: "15:00:00" },
    { name: "04:00 pm", id: 16, value: "16:00:00" },
    { name: "05:00 pm", id: 17, value: "17:00:00" },
    { name: "06:00 pm", id: 18, value: "18:00:00" },
    { name: "07:00 pm", id: 19, value: "19:00:00" },
    { name: "08:00 pm", id: 20, value: "20:00:00" },
    { name: "09:00 pm", id: 21, value: "21:00:00" },
    { name: "10:00 pm", id: 22, value: "22:00:00" },
    { name: "11:00 pm", id: 23, value: "23:00:00" },
    { name: "12:00 am", id: 24, value: "00:00:00" },
  ];

  state = this.initialState;
  componentDidMount = () => {
    getAllMovers()
      .then((res) => {
        var moverId = res.data.movers.map((mover) => mover._id);
        this.setState({
          assigneeList: res.data.movers,
          customerId: this.props.location.customerId,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addLocation = () => {
    if (this.state.locations[0].from.length > 0 && this.state.locations[0].to.length > 0) {
      this.setState({ locations: [...this.state.locations, { from: null, to: null }] });
    }
  }

  addDate = () => {
    if (this.state.dates[0]) {
      this.setState({ dates: [...this.state.dates, ''] });
    }
  }
  componentWillUnmount() {
  }

  hanldeLocationInput = (i, e) => {
    let updateLocation = this.state.locations.slice();
    updateLocation[i].from = e.target.value
    this.setState({ locations: updateLocation });
  }

  hanldeLocationInputTo = (i, e) => {
    let updateLocation = this.state.locations.slice();
    updateLocation[i].to = e.target.value
    this.setState({ locations: updateLocation });
  }


  showLocation = (i) => {
    return <><div className="col-4">
      <div className="form-group">

      </div>
    </div>
      <div className="col-4">
        <div className="form-group">
          <input
            type="input"
            className="form-control"
            id="from"
            placeholder="Pickup"
            name="from"
            value={this.state.locations[i].from}
            onChange={(e) => this.hanldeLocationInput(i, e)}
          />
        </div>
        {this.state.locationfromError ? (
          <div
            className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
            role="alert"
          >
            {this.state.locationfromError}
          </div>
        ) : null}
      </div>
      <div className="col-4">
        <input
          type="input"
          className="form-control"
          id="to"
          placeholder="Drop Off"
          name="to"
          value={this.state.locations[i].to}
          onChange={(e) => this.hanldeLocationInputTo(i, e)}
        />
        {this.state.locationtoError ? (
          <div
            className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
            role="alert"
          >
            {this.state.locationtoError}
          </div>
        ) : null}
      </div></>
  }


  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
    if (value == "") {
      this.setState({ [name + "Error"]: "Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };

  validate = () => {
    let titleError = "";
    let descriptionError = "";
    let multiError = "";
    // let startDateError = "";
    let timeError = "";
    let assigneeError = "";
    let locationfromError = "";
    let locationtoError = "";
    let assigneeRequiredError = "";
    if (!this.state.title) {
      titleError = "Title should not be empty";
    }

    if (!this.state.description) {
      descriptionError = "Description should not be empty";
    }

    if (this.state.services.length === 0) {
      multiError = "Services Should not be empty";
    }

    // if (this.state.assigneesId.length === 0) {
    //   assigneeError = "Assignee Should not be empty";
    // }

    // if (!this.state.startDate) {
    //   startDateError = "Date should not be empty";
    // }

    if (!this.state.startTime) {
      timeError = "Time should not be empty";
    }

    // if (!this.state.meetTime) {
    //   timeError = "Time should not be empty";
    // }

    if (!this.state.assigneeList) {
      assigneeError = "Assignee should not be empty";
    }

    if (!this.state.assigneeRequired) {
      assigneeRequiredError = "Required count should not be empty";
    }

    if (!this.state.locations[0].from) {
      locationfromError = "Location should not be empty";
    }

    if (!this.state.locations[0].to) {
      locationtoError = "Location should not be empty";
    }

    if (
      titleError ||
      descriptionError ||
      multiError ||
      // startDateError ||
      timeError ||
      // assigneeError ||
      locationfromError ||
      locationtoError || assigneeRequiredError
    ) {
      this.setState({
        titleError,
        descriptionError,
        multiError,
        // startDateError,
        timeError,
        // assigneeError,
        locationfromError,
        locationtoError,
        assigneeRequiredError
      });
      return false;
    }

    return true;
  };

  handleStartDate = (date, i) => {
    let newState = cloneDeep(this.state)
    newState.dates[i] = date;
    this.setState({
      dates: newState.dates
    });
  };


  onSelect = (selectedList, selectedItem) => {
    let serviceItem = selectedItem;
    let newState = { ...this.state };
    newState.services.push(serviceItem);
    this.setState({ services: newState.services });
  };

  onRemove = (selectedList, removedItem) => {
    let newState = { ...this.state };
    let removeItem = removedItem;
    var updatedState = newState.services.findIndex(
      (service) => service === removeItem
    );
    newState.services.splice(updatedState, 1);

    this.setState({ newState });
  };

  onAssigneeSelect = (selectedList, selectedItem) => {
    let assigneeItem = selectedItem._id;
    let newState = { ...this.state };
    newState.assigneesId.push(assigneeItem);
    this.setState({ assigneesId: newState.assigneesId });
  };

  onAssigneeRemove = (selectedList, removedItem) => {
    let newState = { ...this.state };
    let removeItem = removedItem._id;
    var updatedState = newState.assigneesId.findIndex(
      (assigneeId) => assigneeId === removeItem
    );
    newState.assigneesId.splice(updatedState, 1);

    this.setState({ newState });
    // newState.assigneesId.pus, value: "00:00:00"h(assigneeItem)
    // this.setState({ assignee: removedItem })
  };

  onStartTimeSelect = (selectedList, selectedTimeItem) => {
    let selectedTime = selectedTimeItem.value;
    let newState = { ...this.state };
    newState.startTime = selectedTime;
    this.setState({ startTime: newState.startTime });
  };

  onEndTimeSelect = (selectedList, selectedTimeItem) => {
    let selectedTime = selectedTimeItem.value;
    let newState = { ...this.state };
    newState.meetTime = selectedTime;
    this.setState({ meetTime: newState.meetTime });
  };

  mySubmitHandler = (event) => {
    var { createJob, history, loggedInUser } = this.props
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        ...this.state,
      });
      var {
        title,
        description,
        services,
        startDate,
        dates,
        startTime,
        meetTime,
        locations,
        status,
        note,
        assigneesId,
        customerId,
      } = this.state;

      let stringDates = dates.map(x => x.toDateString())
      var createJobObj = {
        title,
        description,
        services,
        // startDate: startDate.toString(),
        dates: stringDates,
        startTime,
        // meetTime,
        locations,
        status,
        note,
        assigneesId,
        customerId,
        userId: loggedInUser._id
      };
      console.log(createJobObj)
      // var { history } = this.props;
      createJob(createJobObj)
        .then((res) => {
          history.push("/job");
        })
        .catch((error) => {
        });

    }

  };
  render() {
    return (
      <div>
        <ToastContainer position="bottom-right" />
        <h3 className={style.head}>Create New Job</h3>

        <div className={`${style.tron}`}>
          <form onSubmit={this.mySubmitHandler}>
            <div className={`form-group ${style.input}`}>
              <label htmlFor="">Customer Email</label>
              <input
                type="input"
                className="form-control"
                id="jobTitle"
                name="customerId"
                value={this.state.customerId}
                onChange={this.handleFormInput}
              // disabled
              />
            </div>

            <div className={`form-group ${style.input}`}>
              <input
                type="input"
                className="form-control"
                id="jobTitle"
                placeholder="Job Title"
                name="title"
                value={this.state.title}
                onChange={this.handleFormInput}
              />
            </div>

            {this.state.titleError ? (
              <div
                className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                role="alert"
              >
                {this.state.titleError}
              </div>
            ) : null}

            <div className="form-group">
              <textarea
                className={style.textarea}
                id="ta"
                rows="4"
                placeholder="Job Description"
                name="description"
                value={this.state.description}
                onChange={this.handleFormInput}
              ></textarea>
            </div>

            {this.state.descriptionError ? (
              <div
                className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                role="alert"
              >
                {this.state.descriptionError}
              </div>
            ) : null}

            <div className="form-group">
              <Multiselect
                className={style.multi}
                // selectedValues = {this.servicesOptions}
                options={this.servicesOptions} // Options to display in the dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                className="form-control"
                placeholder="Services"
              />
            </div>

            {this.state.multiError ? (
              <div
                className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                role="alert"
              >
                {this.state.multiError}
              </div>
            ) : null}

            <div className="row">
              {this.state.dates.map((x, i) => {
                return (
                  <div className="form-group col-3">
                    <DatePicker
                      className={style.to}
                      selected={this.state.dates[i]}
                      onChange={(e) => this.handleStartDate(e, i)}
                      placeholderText="Choose Dates"
                      className="form-control"
                    />
                  </div>
                )
              })}

              {/* {this.state.startDateError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.startDateError}
                </div>
              ) : null} */}

              <div className="form-group col-3 my-0" onClick={this.addDate}>
                <i className="fa fa-plus"></i>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-5" style={{ marginTop: "1rem" }}>
                <Multiselect
                  className={style.multi}
                  options={this.timeOptions} // Options to display in the dropdown
                  onSelect={this.onStartTimeSelect} // Function will trigger on select event
                  displayValue="name" // Property name to display in the dropdown options
                  className="form-control"
                  value={this.state.startTime}
                  id="starttime"
                  placeholder={this.state.startTime.length > 0 ? null : 'Start Time'}
                />
              </div>
              {this.state.timeError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.timeError}
                </div>
              ) : null}
              {/* <div className="form-group col-3" style={{ marginTop: "1rem" }}>
                <Multiselect
                  className={style.multi}
                  options={this.timeOptions}
                  onSelect={this.onEndTimeSelect}
                  displayValue="name"
                  className="form-control"
                  value={this.state.meetTime}
                  id="time"
                  placeholder={this.state.meetTime.length > 0 ? null : 'Meet Time'}
                />
              </div> */}

              {/* {this.state.timeError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.timeError}
                </div>
              ) : null} */}

              <div className={`form-group col-5`} style={{ marginTop: "1rem" }}>
                <input
                  type="number"
                  className="form-control"
                  id="assigneeRequired"
                  placeholder="Number of movers required"
                  name="assigneeRequired"
                  value={this.state.assigneeRequired}
                  onChange={this.handleFormInput}
                />
              </div>

              {this.state.assigneeRequiredError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.assigneeRequiredError}
                </div>
              ) : null}
            </div>

            {/* <div className="form-group">
              <Multiselect
                className={style.multi}
                options={this.state.assigneeList} // Options to display in the dropdown
                onSelect={this.onAssigneeSelect} // Function will trigger on select event
                onRemove={this.onAssigneeRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                className="form-control"
                placeholder="Select Assignee"
              />
            </div> */}

            {/* {this.state.assigneeError ? (
              <div
                className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                role="alert"
              >
                {this.state.assigneeError}
              </div>
            ) : null} */}

            <div className="row">
              <div className="col-12">
                <h5>Location:</h5>
              </div>


              {this.state.locations.map((ll, i) => {
                return this.showLocation(i)
              })}
            </div>

            <div className="form-group">
              <div style={{ float: 'right' }}>
                <input type="button" className="btn btn-primary" style={{ background: "#00ADEE" }} name="Add Location" value="Add Location" onClick={this.addLocation} />
              </div>
            </div><br />


            <div className="form-group">
              <div className={style.btnsubmit}>
                <Button name="Submit" onClick={this.mySubmitHandler} />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

var actions = {
  createJob
}


var mapStateToProps = (state) => ({
  loggedInUser: state.users.user
});

export default connect(mapStateToProps, actions)(CreateJobs);
// export default CreateJobs;
