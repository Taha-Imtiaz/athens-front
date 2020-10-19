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
  status: "pending",
  note: [],
  assigneesId: [],
  add: 1,
  locations: [ {from: '', to: ''}],
  fromTo: []
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
  timeOptions = [
    { name: "01:00 am", id: 1 },
    { name: "02:00 am", id: 2 },
    { name: "03:00 am", id: 3 },
    { name: "04:00 am", id: 4 },
    { name: "05:00 am", id: 5 },
    { name: "06:00 am", id: 6 },
    { name: "07:00 am", id: 7 },
    { name: "08:00 am", id: 8 },
    { name: "09:00 am", id: 9 },
    { name: "10:00 am", id: 10 },
    { name: "11:00 am", id: 11 },
    { name: "12:00 am", id: 12 },
    { name: "01:00 pm", id: 13 },
    { name: "02:00 pm", id: 14 },
    { name: "03:00 pm", id: 15 },
    { name: "04:00 pm", id: 16 },
    { name: "05:00 pm", id: 17 },
    { name: "06:00 pm", id: 18 },
    { name: "07:00 pm", id: 19 },
    { name: "08:00 pm", id: 20 },
    { name: "09:00 pm", id: 21 },
    { name: "10:00 pm", id: 22 },
    { name: "11:00 pm", id: 23 },
    { name: "12:00 pm", id: 24 },
  ];

  state = initialState;
  componentDidMount = () => {
    console.log('Create', this.props)
    getAllMovers()
      .then((res) => {
        var moverId = res.data.movers.map((mover) => mover._id);
        console.log(this.props.location);
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
    console.log(this.state.add)
this.setState({locations: [...this.state.locations, {from: null, to: null}]});
  }

  hanldeLocationInput = (i, e) => { 
    console.log(this.state.locations, i)
    let updateLocation = this.state.locations.slice();
    updateLocation[i].from = e.target.value
    this.setState({locations: updateLocation});
  }

  hanldeLocationInputTo = (i, e) => { 
    console.log(this.state.locations, i)
    let updateLocation = this.state.locations.slice();
    updateLocation[i].to = e.target.value
    this.setState({locations: updateLocation});
  }


  showLocation = (i) => {
    return <><div className="col-4">
                <div class="form-group">
                  
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
                    value={this.state.locations[i].from}
                    onChange={(e) => this.hanldeLocationInput(i,e)}
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
                  value={this.state.locations[i].to}
                  onChange={(e) => this.hanldeLocationInputTo(i,e)}
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
    console.log(this.state.from)
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
        locations,
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
        locations,
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

  onStartTimeSelect = (selectedList, selectedTimeItem) => {
   console.log(selectedTimeItem);
    let selectedTime = selectedTimeItem.name;
    console.log(selectedTime);
    let newState = { ...this.state };
    newState.startTime = selectedTime;
    this.setState({ startTime: newState.startTime });
  };

  onEndTimeSelect = (selectedList, selectedTimeItem) => {
   console.log(selectedTimeItem);
    let selectedTime = selectedTimeItem.name;
    console.log(selectedTime);
    let newState = { ...this.state };
    newState.endTime = selectedTime;
    this.setState({ endTime: newState.endTime });
  };
  render() {

console.log(this.state.locations[0].from.length)
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
               <Multiselect
                className={style.multi}
                options={this.timeOptions} // Options to display in the dropdown
                onSelect={this.onStartTimeSelect} // Function will trigger on select event
                displayValue="name" // Property name to display in the dropdown options
                class="form-control"
                value={this.state.startTime}
                id="starttime"

                placeholder={this.state.startTime.length > 0 ? null : 'select time'}
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
                 <Multiselect
                className={style.multi}
                options={this.timeOptions} 
                 onSelect={this.onEndTimeSelect} 
                displayValue="name" 
                class="form-control"
                value={this.state.endTime}
                id="time"
              
                placeholder={this.state.endTime.length > 0 ? null : 'select time'}
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
              <div className="col-12">
                <div class="form-group">
                  <label className={style.l1}>Location:</label>
                </div>
              </div>
              
             
              {this.state.locations.map( (ll, i) => {
              return this.showLocation(i)} ) }
            </div>

            <div class="form-group">
              <div style={{float: 'right'}}>
                <input type="button" className="btn btn-primary" name="Add Location" value="Add Location" onClick={this.state.locations[0].from.length>0 && this.state.locations[0].to.length>0 && this.addLocation} />
              </div>
            </div><br />


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
