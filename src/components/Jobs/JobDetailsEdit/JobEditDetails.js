import React, { Component } from "react";
import style from "./JobEditDetails.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";
import {
  getJob,
  getAllMovers,
  updateJob,
  addService,
  getServices,
} from "../../../Redux/Job/jobActions";
import { showMessage } from "../../../Redux/Common/commonActions";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

class JobEditDetails extends Component {
  servicesOptions = [
    { id: 1, name: "Packaging" },
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
    newService: "",
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
    if (locations[0].value === "") {
      this.setState({
        locationFromError: "from should not be empty",
      });
    }

    if (locations[1].value === "") {
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
        var mover = moverRes ?.data.movers.docs ?.map((mover) => mover);
        this.setState({
          assigneeList: mover,
        });
      });
      getServices()
        .then((res) => {
          this.setState({
            serviceOptions: res.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
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
        // newService: res.data.job.newService,
      });
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  removeLocation = (i) => {
    var location = cloneDeep(this.state.locations)
    location.splice(i, 1)
    this.setState({
      locations: location
    })
  }

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
      locations: locations.filter(x => x.value != '' && x.type != ''),
      // assigneesId,
      // startTime,
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
        .catch((error) => { });
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
    let updateLocation = cloneDeep(this.state.locations);
    updateLocation[i].value = e.target.value;
    this.setState({ locations: updateLocation });
    if (e.target.value) {
      this.setState({ locationfromError: "" });
    }
  };

  hanldeLocationInputTo = (i, e) => {
    let updateLocation = cloneDeep(this.state.locations);
    updateLocation[i].value = e.target.value;
    this.setState({ locations: updateLocation });
    if (i == 0 && e.target.value) {
      this.setState({ locationtoError: "" });
    }
  };
  addLocation = () => {
    var location = cloneDeep(this.state.locations)

    var locationAdded = location.push({ type: "", value: "" });
    this.setState({
      locations: location,
    });
  }
  handleInputChange = (e, i) => {
    let { name, value } = e.target;
    console.log(name, value)
    let updateLocation = cloneDeep(this.state.locations);
    updateLocation[i].type = value;
    updateLocation[i].value = '';
    updateLocation[i].default = false
    this.setState({
      locations: updateLocation,
    });
  };

  handleCheckBox = (e, i) => {
    var { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  changeCheckBoxState = (i) => {
    console.log(this.state.locations, i);
    var prevState = cloneDeep(this.state.locations);
    prevState[i].default = !prevState[i].default;
    console.log(prevState[i].type)
    if(prevState[i].default) {
      // console.log(prevState[i].type)
      prevState[i].value = prevState[i].type == 'pickup' ? 'Unload Only' : 'Load Only / IA'
    } else {
      prevState[i].value = ''
    }
    console.log(prevState[i]);
    this.setState({
      locations: prevState,
    });
  };


  showLocation = (i) => {
    if (i === 0) {
      return (
        <div className="row" >
          <div className="col-12">
            <TextField
              variant="outlined"
              style={{ transform: "translateX(3rem)", width: "100%" }}
              margin="normal"
              required
              fullWidth
              size="small"
              id="from"
              label="Pickup"
              name="pickup"
              value={this.state.locations[0].value}
              onChange={(e) => this.hanldeLocationInput(i, e)}
              error={this.state.locationfromError ? true : false}
            />
          </div>
        </div>
      );
    } else if (i == 1) {
      return (
        <div className="row">
          <div className="col-12">
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              size="small"
              id="to"
              style={{ transform: "translateX(3rem)", width: "100%" }}
              label="Drop Off"
              name="dropoff"
              value={this.state.locations[i].value}
              onChange={(e) => this.hanldeLocationInputTo(i, e)}
              error={this.state.locationtoError ? true : false}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-4" style={{ transform: "translate3d(2rem, 0.75rem, 0)", width: "100%" }}>
            <RadioGroup
              className={style.rowFlex}
              value={this.state.locations[i].type}
              onChange={(e) => this.handleInputChange(e, i)}
            >
              <FormControlLabel
                value="pickup"
                name="pickup"
                control={<Radio style={{ color: "#00ADEE" }} />}
                label="Pickup"
              />
              <FormControlLabel
                value="dropoff"
                name="dropoff"
                control={<Radio style={{ color: "#00ADEE" }} />}
                label="Dropoff"
              />
            </RadioGroup>
          </div>
          <div className="col-4" >
            <TextField
              fullWidth
              variant="outlined"
              style={{ transform: "translateX(3rem)", width: "100%" }}
              margin="normal"
              required
              size="small"
              id="to"
              label={this.state.locations[i].type === "pickup" ? "PickUp Location" : this.state.locations[i].type === "dropoff" ? "Drop Off Location" : "Choose Location"}
              disabled={(this.state.locations[i].type ? false : true) || this.state.locations[i].default}
              name={this.state.locations[i].type}
              value={this.state.locations[i].type === "pickup"  && this.state.locations[i].default ? "Unload only" : this.state.locations[i].type === "dropoff" && this.state.locations[i].default ? "Load only/IA": this.state.locations[i].value}
              onChange={(e) => this.hanldeLocationInput(i, e)}
            // error={this.state.locationtoError ? true : false}
            />
          </div>
          {this.state.locations[i].type == "pickup" ? (
            <div
              className="col-3"
              style={{
                display: "flex",
                alignItems: "center",
                transform:"translateX(3rem)"
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.locations[i].default}
                    onChange={(e) => this.handleCheckBox(e, i)}
                    onClick={() => this.changeCheckBoxState(i)}
                    name="checkboxStates"
                    color="#00ADEE"
                  />
                }
                label="Unload Only"
              />
            </div>
          ) : this.state.locations[i].type == "dropoff" ? (
            <div
              className="col-3"
              style={{
                display: "flex",
                alignItems: "center",
                transform:"translateX(3rem)"
             
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.locations[i].default}
                    onChange={(e) => this.handleCheckBox(e, i)}
                    onClick={() => this.changeCheckBoxState(i)}
                    name="checkboxStates"
                    color="#00ADEE"
                  />
                }
                label="Load only/IA"
              />
            </div>
          ) : (
            <div
              className="col-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "no-wrap",
              }}
            ></div>
          )}
          <div className="col-1">
            <FontAwesomeIcon
              icon={faTrash}


              onClick={() => this.removeLocation(i)}
              style={{ transform: "translate3d(3.5rem,1.5rem, 0)", display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}
            ></FontAwesomeIcon>
          </div>
        </div>
      );

      // return (
      //   <div className="row" style={{ width: "92%", margin: "0 2rem" }} key={i}>
      //     <div className="col-11">
      //       <TextField
      //         fullWidth
      //         variant="outlined"
      //         margin="normal"
      //         required
      //         size="small"
      //         id="to"
      //         label="Drop Off"
      //         name="to"
      //         value={this.state.locations.to[i]}
      //         onChange={(e) => this.hanldeLocationInputTo(i, e)}
      //         error={this.state.locationtoError ? true : false}
      //       />
      //     </div>
      //     <div className="col-1">
      //       <div className=" form-group col-1">
      //         <i
      //           className="fa fa-minus"
      //           onClick={() => this.removeLocation(i)}
      //           style={{ transform: "translateY(1.5rem)" }}
      //         ></i>
      //       </div>
      //     </div>
      //   </div>
      // );
    }
  };

  addDate = () => {
    if (this.state.dates[0]) {
      this.setState({ dates: [...this.state.dates, ""] });
    }
  };

  servicesChanged = (newValue) => {
    let arr = uniqBy(newValue, "_id");
    this.setState({ services: arr });
  };

  addCustomService = (e) => {
    e.preventDefault();
    if (e.target.value) {
      this.setState({
        newService: e.target.value,
      });
      if (e.keyCode === 13 && e.target.value) {
        var serviceAdded = {
          name: this.state.newService,
          id: Math.random() * 10
        };
        let services = cloneDeep(this.state.services);
        services.push(serviceAdded);

        let serviceOptions = cloneDeep(this.state.serviceOptions);
        serviceOptions.push(serviceAdded);
        this.setState({
          serviceOptions,
          services,
        });
      }
    } else {
      this.setState({
        newService: "",
      });
    }
  };

  render() {
    var { job } = this.state;
    console.log(this.state.locations)
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
            <form style={{ width: "88%" }}>
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ transform: "translateX(3rem)", width: "100%" }}
                  size="small"
                  id="customerId"
                  label="Cutomer Email"
                  name="customerId"
                  autoComplete="customerId"
                  value={this.state.customerId}
                  onChange={this.handleFormInput}
                  disabled
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
                  className={style.textarea}
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
                    noOptionsText={`Add '${this.state.newService}' to Services`}
                    value={this.state.services}
                    size="small"
                    onChange={(event, newValue) => {
                      this.servicesChanged(newValue);
                    }}
                    limitTags={10}
                    id="multiple-limit-tags"
                    options={
                      this.state.serviceOptions ? this.state.serviceOptions : []
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : option
                    }
                    error={this.state.multiError}
                    renderInput={(params) => (
                      <TextField
                        onKeyUp={(e) => this.addCustomService(e)}
                        {...params}
                        variant="outlined"

                        margin="normal"
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

                        style={{ transform: "translateX(3rem)", width: "100%" }}
                      >
                        <KeyboardDatePicker
                          inputVariant="outlined"
                          margin="normal"
                          size="small"
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
                <div className="col-1"
                  onClick={this.addDate}

                  style={{ transform: "translateX(5rem)", float: "right" }}
                >
                  <i className="fa fa-plus"></i>
                </div>
              </div>

              <div
                className="row"
                style={{ transform: "translateX(3rem)" }}
              >
                {/* <div className="col-4" style={{ marginTop: "1rem" }}>
                  <TextField
                    id="time"
                    fullWidth
                    label="Start Time"
                    type="time"
                    name="startTime"
                    value={this.state.startTime}
                    onChange={this.handleFormInput}
                    variant="outlined"
                    size="small"
                    defaultValue="07:30"
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </div> */}

                <div className={` col-6`}>
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
                    error={this.state.assigneeRequiredError}
                    onChange={this.handleFormInput}
                  />
                </div>

                <div className={`col-6`} style={{

                  marginTop: "0.4rem",
                  width: "100%",
                }}>

                  <FormControl
                    variant="outlined"
                    style={{ width: "100%" }}
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
                      <MenuItem value={this.state.jobType}>
                        {this.state.jobType}
                      </MenuItem>
                      {this.state.jobType === "Fixed" ? (
                        <MenuItem value={"Hourly based"}>
                          Hourly based
                          </MenuItem>
                      ) : (
                          <MenuItem value={"Fixed"}>Fixed</MenuItem>
                        )}
                    </Select>
                  </FormControl>
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





              {this.state.locations && (
                <div>
                  {this.state ?.locations ?.map((location, i) =>
                    this.showLocation(i)
                  )}
                </div>
              )}
              {/* {this.state.locations &&
                <div> */}
              {/* <div
                    className="row"
                    style={{ transform: "translateX(3rem)" }}
                  >
                  
                    <div className="col-12">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="from"
                        label="Pickup"
                        name="from"
                        autoComplete="from"
                        error={this.state.locationFromError}
                        value={this.state.locations.from}
                        onChange={(e) => this.hanldeLocationInput(e)}
                      />
                    </div>
                  </div> */}


              {/* {this.state.locations.map((list, i) => {
                    return (

                      i === 0 ? <div className="row" style={{ transform: "translateX(3rem)" }}>
                        <div className="col-12"  >
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
                            value={list}
                            onChange={(e) => this.hanldeLocationInputTo(i, e)}
                          />
                        </div>
                      </div> : <div className="row" style={{ transform: "translateX(3rem)" }}>
                          <div className="col-11"  >
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
                              value={list}
                              onChange={(e) => this.hanldeLocationInputTo(i, e)}
                            />
                          </div>
                          <div className="col-1">
                            <i
                              className="fa fa-minus"
                              style={{ transform: "translate3d(1.5rem, 1.5rem, 0)" }}
                              name="Add Location"
                              value="Add Location"
                              onClick={() => this.removeLocation(i)}
                            />
                          </div>
                        </div>



                    );
                  })}
                </div>
              } */}
              <div className="row">
                <div className="col-11"></div>
                <div
                  className=" form-group col-1"
                  style={{
                    // float: "right",
                    transform: "translate3d(3.7rem,0rem, 0)"
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
          <div>
            {note ?.length !== 0 && <h3 style={{ transform: "translateX(2.5rem)" }}>Notes</h3>}

            {note ?.map((note) => (
              <div style={{ display: "flex", transform: "translateX(2.5rem)" }}>
                <p className={style.para}>{note.text} </p>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  size="1x"
                  style={{ transform: "translateY(0.2rem)", }}
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
                <Button
                  onClick={this.handleShow}
                  type="submit"

                  style={{ background: "#00ADEE", textTransform: "none", color: "#FFF", fontFamily: "sans-serif", width: "90%" }}
                >
                  Add Notes
                </Button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className={`col-6 ${style.btnalign}`}>
              <Button
                type="submit"
                className={`btn btn-primary  ${style.btnCustom}`}
                style={{
                  width: "80%",
                  background: "#00ADEE", textTransform: "none", color: "#FFF", fontFamily: "sans-serif",
                  transform: "translate3d(2rem, 1rem ,0rem)"
                  // transform:"translateX(-1.5rem)"
                }}
              >
                Reset
              </Button>
            </div>

            <div className={`col-6 ${style.btnalign}`}>
              <Button
                type="submit"

                onClick={this.handleJobUpdate}

                style={{ background: "#00ADEE", textTransform: "none", color: "#FFF", fontFamily: "sans-serif", width: "90%", transform: "translate3d(0rem, 1rem ,0rem)" }}
              >
                Update
              </Button>
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
