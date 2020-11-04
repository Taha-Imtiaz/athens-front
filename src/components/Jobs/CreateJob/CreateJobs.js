import React, { Component } from "react";
import style from "./CreateJobs.module.css";
import { Multiselect } from "multiselect-react-dropdown";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import API from "../../../utils/api";
import { getAllMovers, createJob } from "../../../Redux/Job/jobActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { clone, cloneDeep } from "lodash"
import { InputLabel, Menu, MenuItem, Button, Select, TextareaAutosize, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { FormControl } from "react-bootstrap";


class CreateJobs extends Component {


  initialState = {
    title: "",
    description: "",
    services: [],
    customerId: "",
    startDate: "",
    dates: [new Date()],
    startTime: "",
    anchorEl: "",
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
    jobType: "fixed",
    status: "pending",
    note: [],
    assigneesId: [],
    add: 1,
    locations: [{ from: '', to: '' }],
    fromTo: [],
    assigneeRequiredError: '',
    selectedDate: new Date()
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
  jobTypeOptions = ""
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
  ;
  state = this.initialState;


  //  useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
  // }));

  // classes = this.useStyles();
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

  handleChange = (event) => {
    this.setState({
      jobTypeOptions: event.target.value
    })
  };
  MaterialUIPickers = () => {
    // The first commit of Material-UI
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  }



  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  }
  handleDateChange = (date) => {
    console.log(date)
    //  this.setState({
    //    dates:date
    //  })
  };
  addLocation = () => {
    if (this.state.locations[0].from.length > 0 && this.state.locations[0].to.length > 0) {
      this.setState({ locations: [...this.state.locations, { from: null, to: null }] });
    }
  }

  addDate = () => {
    if (this.state.dates[0]) {
      this.setState({ dates: [...this.state.dates, new Date()] });
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
    return <>
      <div className="col-4">
        <div className="form-group">
          <TextField
            variant="outlined"
            margin="normal"
            required
            
            size="small"
            id="from"
            label="Pickup"
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          
          size="small"
          id="to"
          label="Drop Off"
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
    console.log(name, value)
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
        selectedDate,
        assigneeRequired,
        jobType
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
        assigneeRequired,
        customerId,
        userId: loggedInUser._id,
        jobType
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
      <div style ={{background:"#e9ecef"}}>
        <ToastContainer position="bottom-right" />
        

        <div className={`${style.tron}`}>
          <div className={`${style.form}`}>
            <h3 className={style.head}>Create New Job</h3>
          <form onSubmit={this.mySubmitHandler}>
            <div>
              {/* <label htmlFor="">Customer Email</label>
              <input
                type="input"
                className="form-control"
                id="jobTitle"
                name="customerId"
                value={this.state.customerId}
                onChange={this.handleFormInput}
              // disabled
              /> */}
              <TextField
                variant="outlined"
               style ={{margin:"1rem 2rem", width:"90%"}}
                required
                
                size="small"
                id="customerId"
                label="Cutomer Email"
                name="customerId"
                autoComplete="customerId"
                autoFocus
                value={this.state.customerId} onChange={this.handleFormInput}
              />
            </div>

            <div>
              <TextField
                variant="outlined"
              
                required
                style ={{margin:"1rem 2rem", width:"90%"}}
                size="small"
                id="title"
                label="Job Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={this.state.title} onChange={this.handleFormInput}
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
              <TextareaAutosize
                className={style.textarea}
                style ={{margin:"1rem 2rem", width:"90%"}}
                rowsMin={4}
                id="ta"
                // rows="4"
                placeholder="Job Description"
                name="description"
                value={this.state.description}
                onChange={this.handleFormInput}
              ></TextareaAutosize>
            </div>

            {this.state.descriptionError ? (
              <div
                className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                role="alert"
              >
                {this.state.descriptionError}
              </div>
            ) : null}

            <div className="form-group"  style ={{margin:"1rem 2rem", width:"90%"}}>

              {/* <InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">{this.servicesOptions}</MenuItem>

</Select> */}
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
                  <div className="form-group col-3"    style ={{margin:"1rem 2rem", width:"90%"}}>
                    {/* <DatePicker
                      className={style.to}
                      selected={this.state.dates[i]}
                      onChange={(e) => this.handleStartDate(e, i)}
                      placeholderText="Choose Dates"
                      className="form-control"
                    /> */}

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          margin="normal"
                          
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          value={this.state.dates[i]}
                          onChange={(e) => this.handleStartDate(e, i)}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
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
                <i className="fa fa-plus" style={{ transform: "translateY(2.2rem)" }}></i>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-3" style={{ margin: "1rem" }}>
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

              <div className={`form-group col-4`} >
                <TextField
                  type="number"
                  variant="outlined"
                  margin="normal"
                  required
                  
                  size="small"
                  id="assigneeRequired"
                  label="Movers Required"
                  autoComplete="Number of movers required"
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

              <div className={`form-group col-4`}>
                {/* <FormControl className={this.classes.formControl}>
        <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.jobTypeOptions}
          onChange={this.handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}

                <div className="form-group" style={{ marginTop: "1rem" }}>

                  <select className="form-control" value={this.state.jobType} id="sel1" name="jobType" onChange={this.handleFormInput}>
                    <option >Fixed</option>
                    <option>Hourly based</option>

                  </select>
                </div>
              </div>
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
              <div className="col-3"    style ={{margin:" 1rem", width:"90%"}}>
                <h5>Location:</h5>
                
              </div>


              {this.state.locations.map((ll, i) => {
                return this.showLocation(i)
              })}
            </div>

            <div className="form-group">
              <div style={{ float: 'right' }}>
                <input type="button" className="btn btn-primary" style={{ background: "#00ADEE",marginRight:"1rem" }} name="Add Location" value="Add Location" onClick={this.addLocation} />
              </div>
            </div><br />


            <div className="form-group">
              <div className={style.btnsubmit}>
                <button className="btn btn-primary" onClick={this.mySubmitHandler} >Submit</button>
              </div>
            </div>
          </form>
        </div>
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
