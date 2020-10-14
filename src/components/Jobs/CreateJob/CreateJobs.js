import React, { Component } from "react";
import style from "./CreateJobs.module.css";
import { Multiselect } from "multiselect-react-dropdown";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from "../../Button/Button";
import API from "../../../utils/api";
import { getAllMovers, createJob } from "../../../Redux/Job/jobActions";

const initialState = {
  title: "",
  description: "",
  services: [],
  customerId: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",

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
  status: "start",
  note: [],
  assigneesId: [],
};

class CreateJobs extends Component {
  // assigneeOptions = [{ name: 'Person1', id: 1 }, { name: 'Person2', id: 2 }]
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

  state = initialState;
  componentDidMount = () => {
    getAllMovers()
      .then((res) => {
        var moverId = res.data.mover.map((mover) => mover._id);
        console.log(this.state);
        this.setState({
          assigneeList: res.data.mover,
          customerId: this.props.location.customerId,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    let startDateError = "";
    let EndDateError = "";
    let timeError = "";
    let assigneeError = "";
    let locationfromError = "";
    let locationtoError = "";

    if (!this.state.title) {
      titleError = "Title should not be empty";
    }

    if (!this.state.description) {
      descriptionError = "Description should not be empty";
    }

    if (this.state.services.length === 0) {
      multiError = "Services Should not be empty";
    }

    if (this.state.assigneesId.length === 0) {
      assigneeError = "Assignee Should not be empty";
    }

    if (!this.state.startDate) {
      startDateError = "Date should not be empty";
    }
    if (!this.state.endDate) {
      EndDateError = "Date should not be empty";
    }

    if (!this.state.startTime) {
      timeError = "Time should not be empty";
    }

    if (!this.state.endTime) {
      timeError = "Time should not be empty";
    }

    if (!this.state.assigneeList) {
      assigneeError = "Assignee should not be empty";
    }

    if (!this.state.from) {
      locationfromError = "Location should not be empty";
    }

    if (!this.state.to) {
      locationtoError = "Location should not be empty";
    }

    if (
      titleError ||
      descriptionError ||
      multiError ||
      startDateError ||
      EndDateError ||
      timeError ||
      assigneeError ||
      locationfromError ||
      locationtoError
    ) {
      this.setState({
        titleError,
        descriptionError,
        multiError,
        startDateError,
        EndDateError,
        timeError,
        assigneeError,
        locationfromError,
        locationtoError,
      });
      return false;
    }

    return true;
  };

  handleStartDate = (date) => {
    console.log(typeof date, date.toString());
    this.setState({
      startDate: date
    });
  };

  handleEndDate = (date) => {
    this.setState({
      endDate: date
    });
  };
  mySubmitHandler = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState({
        ...this.state,
      });
      var {
        title,
        description,
        services,
        startDate,
        endDate,
        startTime,
        endTime,
        from,
        to,
        status,
        note,
        assigneesId,
        customerId,
      } = this.state;

      var createJobObj = {
        title,
        description,
        services,
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        startTime,
        endTime,
        from,
        to,
        status,
        note,
        assigneesId,
        customerId,
      };
      console.log(createJobObj);
      var { history } = this.props;
      createJob(createJobObj)
        .then((res) => {
          history.push("/job");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  onSelect = (selectedList, selectedItem) => {
    let serviceItem = selectedItem;
    console.log(serviceItem);
    let newState = { ...this.state };
    console.log(newState);
    newState.services.push(serviceItem);
    this.setState({ services: newState.services });
  };

  onRemove = (selectedList, removedItem) => {
    let newState = { ...this.state };
    let removeItem = removedItem;
    console.log(removeItem);
    var updatedState = newState.services.findIndex(
      (service) => service === removeItem
    );
    newState.services.splice(updatedState, 1);

    this.setState({ newState });
  };

  onAssigneeSelect = (selectedList, selectedItem) => {
    console.log(selectedItem);
    let assigneeItem = selectedItem._id;
    console.log(assigneeItem);
    let newState = { ...this.state };
    newState.assigneesId.push(assigneeItem);
    this.setState({ assigneesId: newState.assigneesId });
  };

  onAssigneeRemove = (selectedList, removedItem) => {
    let newState = { ...this.state };
    let removeItem = removedItem._id;
    console.log(removeItem);
    // console.log(newState.assigneesId)
    var updatedState = newState.assigneesId.findIndex(
      (assigneeId) => assigneeId === removeItem
    );
    console.log(updatedState);
    newState.assigneesId.splice(updatedState, 1);

    this.setState({ newState });
    console.log(newState);

    // newState.assigneesId.push(assigneeItem)
    // this.setState({ assignee: removedItem })
  };
  render() {
    return (
      <div>
        <h3 className={style.head}>Create New Job</h3>

        <div className={`${style.tron}`}>
          <form onSubmit={this.mySubmitHandler}>
            <div className={`form-group ${style.input}`}>
              <label htmlFor="">Customer Id</label>
              <input
                type="input"
                class="form-control"
                id="jobTitle"
                name="customerId"
                value={this.state.customerId}
                onChange={this.handleFormInput}
                disabled
              />
            </div>

            <div className={`form-group ${style.input}`}>
              <input
                type="input"
                class="form-control"
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

            <div class="form-group">
              <textarea
                className={style.textarea}
                id="ta"
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

            <div class="form-group">
              <Multiselect
                className={style.multi}
                // selectedValues = {this.servicesOptions}
                options={this.servicesOptions} // Options to display in the dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                class="form-control"
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
              <div class="form-group col-3">
                <DatePicker
                  className={style.to}
                  selected={this.state.startDate}
                  onChange={this.handleStartDate}
                  placeholderText="Start Date"
                  class="form-control"
                />
              </div>

              {this.state.startDateError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.startDateError}
                </div>
              ) : null}

              <div class="form-group col-3">
                <DatePicker
                  className={style.to}
                  selected={this.state.endDate}
                  onChange={this.handleEndDate}
                  placeholderText="End Date"
                  class="form-control"
                />
              </div>

              {this.state.EndDateError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.EndDateError}
                </div>
              ) : null}
            </div>

            <div className="row">
              <div class="form-group col-3" style={{ marginTop: "1rem" }}>
                <input
                  type="input"
                  class="form-control"
                  id="time"
                  placeholder="Start Time"
                  name="startTime"
                  value={this.state.startTime}
                  onChange={this.handleFormInput}
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
              <div class="form-group col-3" style={{ marginTop: "1rem" }}>
                <input
                  type="input"
                  class="form-control"
                  id="time"
                  placeholder="End Time"
                  name="endTime"
                  value={this.state.endTime}
                  onChange={this.handleFormInput}
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
            </div>
            <div class="form-group">
              <Multiselect
                className={style.multi}
                options={this.state.assigneeList} // Options to display in the dropdown
                onSelect={this.onAssigneeSelect} // Function will trigger on select event
                onRemove={this.onAssigneeRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                class="form-control"
                placeholder="Select Assignee"
              />
            </div>

            {this.state.assigneeError ? (
              <div
                className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                role="alert"
              >
                {this.state.assigneeError}
              </div>
            ) : null}

            <div className="row">
              <div className="col-4">
                <div class="form-group">
                  <label className={style.l1}>Location:</label>
                </div>
              </div>
              <div className="col-4">
                <div class="form-group">
                  <input
                    type="input"
                    class="form-control"
                    id="from"
                    placeholder="From"
                    name="from"
                    value={this.state.from}
                    onChange={this.handleFormInput}
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
                  class="form-control"
                  id="to"
                  placeholder="To"
                  name="to"
                  value={this.state.to}
                  onChange={this.handleFormInput}
                />
                {this.state.locationtoError ? (
                  <div
                    className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                    role="alert"
                  >
                    {this.state.locationtoError}
                  </div>
                ) : null}
              </div>
            </div>

            <div class="form-group">
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

export default CreateJobs;
