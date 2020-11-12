import React, { Component } from "react";
import style from "./JobEditDetails.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";
import { getJob, getAllMovers, updateJob } from "../../../Redux/Job/jobActions";
import { showMessage } from "../../../Redux/Common/commonActions";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { clone, cloneDeep, uniqBy } from "lodash";
import "date-fns";
import Grid from "@material-ui/core/Grid";

import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Chip,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

class JobEditDetails extends Component {
  servicesOptions = [
    { id: 1, name: "Pakaging" },
    { id: 2, name: "Loading" },
    { id: 3, name: "Unloading" },
    { id: 4, name: "Grand Piano" },
    { id: 5, name: "Baby" },
    { id: 6, name: "Hot Tub" },
  ];

  state = {
    services: [],
    assignee: [],
    assigneeList: [],
    startDate: "",
    dates: [""],
    endDate: "",
    startTime: "",
    meetTime: "",
    jobType: "fixed",
    title: "",
    titleError: "",
    descriptionError: "",
    servicesError: "",
    assigneeError: "",
    moversError: "",
    locationFromError: "",
    locationToError: "",
    job: null,
    Note: "",
    customerId: "",
    statusOptions: ["Booked", "Completed", "Pending"],
    status: "",
    assigneeRequired: "",
  };

  handleStartDate = (date, i) => {
    let newState = cloneDeep(this.state);
    newState.dates[i] = date;
    this.setState({
      dates: newState.dates,
    });
  };
  handleValidation = () => {
    var {
      title,
      description,
      option,
      startDate,
      assigneeRequired,
      locations,
    } = this.state;
    console.log(locations);
    if (title === "") {
      this.setState({
        titleError: "Title should not be empty",
      });
    }
    if (description === "") {
      this.setState({
        descriptionError: "description should not be empty",
      });
    }
    if (option === "") {
      this.setState({
        servicesError: "Services should not be empty",
      });
    }
    if (assigneeRequired === "") {
      this.setState({
        assigneeError: "assignee should not be empty",
      });
    }
    if (locations[0].from === "") {
      this.setState({
        locationFromError: "from should not be empty",
      });
    }

    if (locations[0].to === "") {
      this.setState({
        locationToError: "to should not be empty",
      });
    }
    var {
      titleError,
      descriptionError,
      servicesError,
      assigneeError,
      locationFromError,
      locationToError,
    } = this.state;
    if (
      titleError ||
      descriptionError ||
      servicesError ||
      assigneeError ||
      locationFromError ||
      locationToError
    ) {
      return false;
    } else {
      return true;
    }
  };
  handleEndDate = (date) => {
    this.setState({
      endDate: date,
      endDateInString: date.toString(),
    });
  };
  componentDidMount = () => {
    // var {getJob} = this.props
    var {
      match: {
        params: { jobId },
      },
    } = this.props;
    var { title, job } = this.state;

    getJob(jobId).then((res) => {
      console.log(res);
      this.setState({
        services: res.data.job.services,
        assignee: res.data.job.assignee,
      });
      var moversObj = {
        name: "",
        address: "",
        attributes: "",
      };
      getAllMovers(moversObj).then((moverRes) => {
        console.log(moverRes);
        var mover = moverRes?.data.movers.docs?.map((mover) => mover);
        this.setState({
          assigneeList: mover,
        });
      });
      var services = res.data.job.services.map((service, index) => {
        return { id: index + 1, name: service };
      });
      let ids = res.data.job.assignee.map((x) => x._id);
      let parsedDates = res.data.job.dates.map((x) => Date.parse(x));
      this.setState({
        job: res.data.job,
        title: res.data.job.title,
        startDate: Date.parse(res.data.job.startDate),
        dates: parsedDates,
        endDate: Date.parse(res.data.job.endDate),
        startDateInString: res.data.job.startDate,
        endDateInString: res.data.job.endDate,
        startTime: res.data.job.startTime,
        // meetTime: res.data.job.meetTime,
        locations: res.data.job.locations,
        jobType: res.data.job.jobType,
        description: res.data.job.description,
        options: services,
        assignee: res.data.job.assignee,
        // assigneeList:assigneeList,
        // assigneesId: ids,
        note: res.data.job.note,
        userId: "5f732f880cf3f60894f771b9",
        status: res.data.job.status,
        show: false,
        customerId: res.data.job.customer.email,
        assigneeRequired: res.data.job.assigneeRequired,
      });
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = (notes) => {
    var { note } = this.state;
    this.setState({
      show: false,
      note: notes,
    });
  };

  AddNote = () => {
    var { Note, note, job } = this.state;
    if (note) {
      // var noteAdded = {text: Note}
      // this.handleClose()
      let notes = [...this.state.note];
      notes.push({ uid: uuidv4(), text: Note });
      this.setState({
        show: false,
        note: notes,
        Note: "",
      });
    }
  };

  handleFormInput = (e) => {
    var { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleDelete = (deleteNote) => {
    var { note } = this.state;
    var noteToDelete = note.findIndex((n) => n.uid === deleteNote.uid);
    if (noteToDelete !== -1) {
      note.splice(noteToDelete, 1);
      this.setState({
        note: note,
      });
    }
  };

  handleAddNote = (e) => {
    var { name, value } = e.target;
    this.setState({
      Note: value,
    });
  };

  handleJobUpdate = () => {
    var {
      title,
      startDate,
      dates,
      endDate,
      startTime,
      meetTime,
      locations,
      services,
      options,
      description,
      assigneesId,
      assignee,
      status,
      jobType,
      startDateInString,
      endDateInString,
      assigneeRequired,
      userId,
      customerId,
      note,
    } = this.state;

    var {
      match: {
        params: { jobId },
      },
      history,
    } = this.props;
    var { showMessage } = this.props;
    let stringDates = dates.map((x) => {
      if (typeof x == "number") {
        return new Date(x).toDateString();
      } else {
        return x.toDateString();
      }
      //   x.toDateString()
    });
    //  var {startDate, endDate,  title, description, services,startTime, meetTime, from , to, status, assigneesId, customerId,userId } = this.state;
    var { loggedinUser } = this.props;
    var updatedObj = {
      dates: stringDates,
      title,
      description,
      services,
      assigneeRequired,
      jobType,
      // meetTime,
      locations,
      // assigneesId,
      status,
      userId: loggedinUser._id,
      customerId,
      note,
    };
    if (this.handleValidation()) {
      updateJob(jobId, updatedObj)
        .then((res) => {
          showMessage(res.data.message);
          history.push("/job/details/" + jobId);
        })
        .catch((error) => {});
    }
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
    let assigneeItem = selectedItem;
    let newState = { ...this.state };
    newState.assigneesId.push(assigneeItem._id);
    this.setState({ newState });
  };

  onAssigneeRemove = (selectedList, removedItem) => {
    let newState = { ...this.state };
    let removeItem = removedItem._id;
    var index = newState.assigneesId.findIndex(
      (assigneeId) => assigneeId === removeItem
    );
    newState.assigneesId.splice(index, 1);
    this.setState({ newState });
    // newState.assigneesId.push(assigneeItem)
    // this.setState({ assignee: removedItem })
  };

  statusChanged = (status) => {
    this.setState({
      status: status.toLowerCase(),
    });
  };

  hanldeLocationInput = (i, e) => {
    let updateLocation = this.state.locations.slice();
    updateLocation[i].from = e.target.value;
    this.setState({ locations: updateLocation });
  };

  hanldeLocationInputTo = (i, e) => {
    let updateLocation = this.state.locations.slice();
    updateLocation[i].to = e.target.value;
    this.setState({ locations: updateLocation });
  };

  addLocation = () => {
    this.setState({
      locations: [...this.state.locations, { from: null, to: null }],
    });
  };

  showLocation = (i) => {
    return (
      <>
        <div className="col-4">
          <div>
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
        </div>
      </>
    );
  };

  addDate = () => {
    if (this.state.dates[0]) {
      this.setState({ dates: [...this.state.dates, ""] });
    }
  };

  servicesChanged = (newValue) => {
    let arr = uniqBy(newValue, "id");
    this.setState({ services: arr });
  };

  render() {
    var { job } = this.state;
    var {
      match: {
        params: { jobId },
      },
    } = this.props;

    var {
      title,
      startDate,
      endDate,
      startTime,
      meetTime,
      from,
      assigneeRequired,
      assignee,
      to,
      description,
      assigneesId,
      Note,
      note,
      show,
    } = this.state;
    return (
      <div className={`${style.formStyle}`}>
        <div className={`${style.form}`}>
          {/* <ToastContainer position="bottom-right"/> */}
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            Job Details Edit
          </h3>
          <div className="row">
            <form style={{ width: "85%" }}>
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ transform: "translateX(3rem)", width: "100%" }}
                  size="small"
                  id="customerId"
                  label="Cutomer Id"
                  name="customerId"
                  autoComplete="customerId"
                  value={this.state.customerId}
                  onChange={this.handleFormInput}
                />
              </div>

              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  style={{ transform: "translateX(3rem)", width: "100%" }}
                  size="small"
                  id="title"
                  label="Job Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  value={this.state.title}
                  onChange={this.handleFormInput}
                  error={this.state.titleError}
                />
              </div>
              <div>
                <h4 style={{ transform: "translateX(3rem)", width: "100%" }}>
                  Job Description
                </h4>
                <TextareaAutosize
                  rowsMin={5}
                  required
                  style={{
                    transform: "translateX(3rem)",
                    width: "100%",
                    margin: "1.4rem 0",
                  }}
                  id="description"
                  name="description"
                  error={this.state.descriptionError}
                  value={description}
                  onChange={this.handleFormInput}
                />
              </div>

              <div style={{ transform: "translateX(3rem)", width: "100%" }}>
                {this.state.customerId && (
                  <Autocomplete
                    multiple
                    margin="normal"
                    value={this.state.services}
                    onChange={(event, newValue) => {
                      this.servicesChanged(newValue);
                    }}
                    limitTags={10}
                    id="multiple-limit-tags"
                    options={this.servicesOptions}
                    getOptionLabel={(option) =>
                      option.name ? option.name : option
                    }
                    defaultValue={this.state.services.splice()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Services"
                        placeholder="Services"
                      />
                    )}
                  />
                )}
              </div>

              {this.state.dates.map((x, i) => {
                return (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid>
                      <div
                        className="col-12"
                        style={{ transform: "translateX(3rem)", width: "100%" }}
                      >
                        <KeyboardDatePicker
                          margin="normal"
                          fullWidth
                          id="date-picker-dialog"
                          // style={{ zIndex: "-1" }}
                          format="MM/dd/yyyy"
                          value={this.state.dates[i]}
                          onChange={(e) => this.handleStartDate(e, i)}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </div>
                    </Grid>
                  </MuiPickersUtilsProvider>
                );
              })}
              <div className="row">
                <div className="col-11"></div>
                <div
                  onClick={this.addDate}
                  className="col-1"
                  style={{ transform: "translateX(3rem)" }}
                >
                  <i className="fa fa-plus"></i>
                </div>
              </div>

              <div
                className="row"
                style={{ transform: "translateX(3rem)", width: "100%" }}
              >
                <div className="col-6">
                  <TextField
                    id="time"
                    fullWidth
                    label="Start Time"
                    type="time"
                    name="startTime"
                    value={this.state.startTime}
                    onChange={this.handleFormInput}
                    defaultValue="07:30"
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </div>

                {/* <div className="col-4">
                  <TextField
                    type="number"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="assigneeRequired"
                    label="Movers Required"
                    autoComplete="Number of movers required"
                    name="assigneeRequired"
                    value={this.state.assigneeRequired}
                    onChange={this.handleFormInput}
                    error={this.state.assigneeError}
                  />
                </div> */}

                <div className={`col-6`}>
                  <div
                    class="form-group"
                    style={{ transform: "translateX(3rem)",marginTop:"0.4rem", width: "100%" }}
                  >
                    {/* <select class="form-control" value={this.state.jobType} id="sel1" name="jobType" onChange={this.handleFormInput}>
                    {this.state.jobType === "fixed"? (  
                      <React.Fragment>
                        <option>{this.state.jobType}</option>
                      <option>hourly based</option>
                    
                      </React.Fragment>
                     ):(
                    <React.Fragment>
                        <option >{this.state.jobType}</option>
                      <option>fixed</option>
                    </React.Fragment>
                     )
                    }
                    </select> */}

                    <FormControl
                      variant="outlined"
                      style={{ width: "90%" }}
                      margin="dense"
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Job Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.jobType}
                        onChange={this.handleFormInput}
                        label="Job Type"
                        name="jobType"
                      >
                        <MenuItem value = {this.state.jobType}>{this.state.jobType}</MenuItem>
                        {this.state.jobType === "fixed" ? (
                          <MenuItem value = {"hourly based"}>hourly based</MenuItem>
                        ) : (
                          <MenuItem value={"fixed"}>fixed</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div
                    style={{
                      transform: "translateX(3rem)",
                      width: "100%",
                      marginTop: "1rem",
                    }}
                  >
                    <h4>Location:</h4>
                  </div>
                </div>
              </div>
              {this.state.locations &&
                this.state.locations.map((list, i) => {
                  return (
                    <div
                      className="row"
                      style={{ transform: "translateX(3rem)" }}
                    >
                      {/* <div className="col"></div> */}
                      <div className="col-6">
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          size="small"
                          id="from"
                          label="From"
                          name="from"
                          autoComplete="from"
                          error={this.state.locationFromError}
                          value={list.from}
                          onChange={(e) => this.hanldeLocationInput(i, e)}
                        />
                      </div>
                      <div className="col-6">
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          size="small"
                          id="to"
                          error={this.state.locationToError}
                          label="Drop Off"
                          aria-describedby="emailHelp"
                          name="to"
                          value={list.to}
                          onChange={(e) => this.hanldeLocationInputTo(i, e)}
                        />
                      </div>
                    </div>
                  );
                })}
              <div>
                <div className="col-11"></div>
                <div
                  className="col-1"
                  style={{
                    float: "right",
                    transform: "translate3d(5rem,0rem, 0)",
                  }}
                >
                  <i
                    className="fa fa-plus"
                    name="Add Location"
                    value="Add Location"
                    onClick={this.addLocation}
                  />
                </div>
              </div>
            </form>

            {/* <div className="dropdown">
              <button
                className={`btn btn-primary dropdown-toggle ${style.colors}`}
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Change Status
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {this.state.statusOptions.map((option, i) => (
                  <button key={i}
                    className="dropdown-item"
                    type="button"
                    onClick={() => this.statusChanged(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div> */}
          </div>
          <div></div>

          {/* <h4 style={{margin:"0.8rem 0"}}>Assignees</h4>
        <div className="form-group col-10">
          <div  style={{transform:"translateX(-1.3rem)"}}>
            <Multiselect
              selectedValues={this.state.assignee}
              options={this.state.assigneeList} // Options to display in the dropdown
              onSelect={this.onAssigneeSelect} // Function will trigger on select event
              onRemove={this.onAssigneeRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>
        </div> */}
          <div className={`${style.tron2}`}>
            {note?.length !== 0 && <h3 className={style.jobtag}>Notes</h3>}

            {note?.map((note) => (
              <div style={{ display: "flex" }}>
                <p className={style.para}>{note.text} </p>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ transform: "translateY(0.2rem)" }}
                  onClick={() => this.handleDelete(note)}
                />
              </div>
            ))}

            <div className="row">
              <div
                className={`col-12`}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <button
                  onClick={this.handleShow}
                  type="submit"
                  className={`btn btn-primary ${style.btnCustom}`}
                  style={{
                    // transform: "translate3d(-3rem, 0, 0)", width: "100%", display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Add Notes
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className={`col-4 ${style.btnalign}`}
              style={{ marginBottom: "1.5rem" }}
            >
              <button
                type="submit"
                className={`btn btn-primary ${style.btnCustom}`}
                onClick={this.handleJobUpdate}
                style={{ transform: "translate3d(0rem, 0, 0)" }}
              >
                Update
              </button>
            </div>
            <div className={`col-4 ${style.btnalign}`}>
              <button
                type="submit"
                className={`btn btn-primary  ${style.btnCustom}`}
                style={{
                  transform: "translate3d(0.4rem, 0, 0)",
                  width: "100%",
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <Modal
            show={show}
            onHide={this.handleClose}
            animation={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <textarea
                name=""
                id=""
                cols="65"
                rows="5"
                name="Note"
                value={Note}
                onChange={this.handleAddNote}
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.AddNote}>
                Add Note
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
// var mapStateToProps = (state) => ({
//     jobs: state.jobs
// })
// var actions = {
//     getJob
// }
var actions = {
  showMessage,
};

var mapStateToProps = (state) => ({
  loggedinUser: state.users.user,
});

export default connect(mapStateToProps, actions)(JobEditDetails);
