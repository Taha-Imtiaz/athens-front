import React, { Component } from "react";
import style from "./CreateJobs.module.css";
import { Multiselect } from "multiselect-react-dropdown";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import FormControl from "@material-ui/core/FormControl";

import API from "../../../utils/api";
import {
  getAllMovers,
  createJob,
  addService,
} from "../../../Redux/Job/jobActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { clone, cloneDeep, uniqBy } from "lodash";
import {
  InputLabel,
  Menu,
  MenuItem,
  Button,
  Select,
  TextareaAutosize,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import { getCustomersAndJobs } from "../../../Redux/Claims/claimsActions";
import { Modal } from "react-bootstrap";
import CustomerAdd from "../../Customer/CustomerAdd/customeradd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { resetJobForm, setJobForm } from "../../../Redux/PersistForms/formActions";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import { data } from "jquery";

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
class CreateJobs extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.jobForm };
  }
  initialState = {
    editorState: EditorState.createEmpty(),
    title: "",
    description: "",
    services: [],
    customerId: "",
    startDate: "",
    dates: [new Date()],
    startTime: "",
    anchorEl: "",
    meetTime: "",
    assigneeRequired: "",
    from: "",
    to: "",
    customerIdError: "",
    titleError: "",
    descriptionError: "",
    multiError: "",
    dateError: "",
    timeError: "",
    assigneeError: "",
    locationfromError: "",
    locationtoError: "",
    assigneeList: [],
    jobType: "Fixed",
    status: "pending",
    note: [],
    assigneesId: [],
    add: 1,
    // locations: [
    //   { type: "pickup", value: "", default: false },
    //   { type: "dropoff", value: "", default: false },
    // ],
    locations: [],
    fromTo: [],
    assigneeRequiredError: "",
    selectedDate: new Date(),
    newService: "",
    customers: [],
    selectedCustomer: "",
    newCustomer: "",
    showAddCustomer: false,
    serviceOptions: [
      { id: 1, name: "Packaging" },
      { id: 2, name: "Loading" },
      { id: 3, name: "Unloading" },
      { id: 4, name: "Grand Piano" },
      { id: 5, name: "Baby" },
      { id: 6, name: "Hot Tub" },
    ],
  };

  componentDidMount = () => {
    if (
      this.props.location.customerId !== undefined &&
      this.props.location.customerName !== undefined
    ) {
      this.setState({
        customerId: this.props.location.customerId,
        selectedCustomer: this.props.location.customerName,
        jobs: this.props.location.jobs,
      });
    }
    getCustomersAndJobs().then((res) => {
      console.log(res.data)
      if (res && res.status == 201) {
        this.setState({ customers: res.data.data });
      }
    });

    // getAllMovers().then((res) => {
    //   var moverId = res.data.movers.map((mover) => mover._id);
    //   this.setState({
    //     assigneeList: res.data.movers,
    //     customerId: this.props.location.customerId
    //   });
    // });

    // getServices()
    //   .then((res) => {
    //     this.setState({
    //       serviceOptions: res.data.data,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  handleChange = (event) => {
    this.setState({
      jobTypeOptions: event.target.value,
    });
  };
  handleInputChange = (e, i) => {
    let { name, value } = e.target;

    let updateLocation = cloneDeep(this.state.locations);
    updateLocation[i].type = value;
    updateLocation[i].value = "";
    updateLocation[i].default = false;
    this.setState({
      locations: updateLocation,
    });
  };
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  handleDateChange = (date) => {};

  addLocation = () => {
    // if (
    //   this.state.locations[0].value !== "" &&
    //   this.state.locations[1].value !== ""
    // ) {
    var location = cloneDeep(this.state.locations);
    location.push({ type: "", value: "", default: false });
    this.setState({
      locations: location,
    });
    // }
  };

  addDate = () => {
    if (this.state.dates[0]) {
      this.setState({ dates: [...this.state.dates, new Date()] });
    }
  };
  removeDate = (i) => {
    var datesArr = cloneDeep(this.state.dates);
    console.log(datesArr, i);
    datesArr.splice(i, 1);
    console.log(datesArr, i);
    this.setState({
      dates: datesArr,
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

  // handleCheckBox = (e, i) => {
  //   var { name, value } = e.target;
  //   console.log(name, value)
  //   e.stopPropagation()
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  changeCheckBoxState = (e, i) => {
    e.stopPropagation();
    var prevState = cloneDeep(this.state.locations);
    console.log(prevState);
    prevState[i].default = !prevState[i].default;
    if (prevState[i].default) {
      prevState[i].value =
        prevState[i].type == "pickup" ? "Load Only / IA" : "Unload Only";
    } else {
      prevState[i].value = "";
    }
    this.setState({
      locations: prevState,
    });
  };

  showLocation = (i) => {
    console.log(this.state.locations);
    // if (i === 0) {
    //   return (
    //     <div className="row" style={{ width: "92%", margin: "0 2rem" }}>
    //       <div className="col-12">
    //         <TextField
    //           variant="outlined"
    //           margin="normal"
    //           required
    //           fullWidth
    //           size="small"
    //           id="from"
    //           label="Pickup"
    //           name="pickup"
    //           value={this.state.locations[0].value}
    //           onChange={(e) => this.hanldeLocationInput(i, e)}
    //           error={this.state.locationfromError ? true : false}
    //         />
    //       </div>
    //     </div>
    //   );
    // } else if (i == 1) {
    //   return (
    //     <div className="row" style={{ width: "92%", margin: "0 2rem" }}>
    //       <div className="col-12">
    //         <TextField
    //           fullWidth
    //           variant="outlined"
    //           margin="normal"
    //           required
    //           size="small"
    //           id="to"
    //           label="Drop Off"
    //           name="dropoff"
    //           value={this.state.locations[i].value}
    //           onChange={(e) => this.hanldeLocationInputTo(i, e)}
    //           error={this.state.locationtoError ? true : false}
    //         />
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div className="row" style={{ display: "flex", margin: "0 1rem" }}>
        <div className="col-4" style={{ display: "flex" }}>
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
              label="DropOff"
            />
          </RadioGroup>
        </div>
        <div className="col-4">
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            size="small"
            id="to"
            label={
              this.state.locations[i].type == "pickup"
                ? "Enter Pickup Point"
                : this.state.locations[i].type == "dropoff"
                ? "Enter DropOff Point"
                : "Choose Type"
            }
            disabled={
              (this.state.locations[i].type ? false : true) ||
              this.state.locations[i].default
            }
            // label={'Pickup / dropoff point'}
            name={this.state.locations[i].type}
            value={
              this.state.locations[i].type === "pickup" &&
              this.state.locations[i].default
                ? "Load only / IA"
                : this.state.locations[i].type === "dropoff" &&
                  this.state.locations[i].default
                ? "Unload only"
                : this.state.locations[i].value
            }
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
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.locations[i].default}
                  // onChange={(e) => this.handleCheckBox(e, i)}
                  onClick={(e) => this.changeCheckBoxState(e, i)}
                  name="checkboxStates"
                  color="#00ADEE"
                />
              }
              label="Load only / IA"
            />
          </div>
        ) : this.state.locations[i].type == "dropoff" ? (
          <div
            className="col-3"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.locations[i].default}
                  // onChange={(e) => this.handleCheckBox(e, i)}
                  onClick={(e) => this.changeCheckBoxState(e, i)}
                  name="checkboxStates"
                  color="#00ADEE"
                />
              }
              label="Unload Only"
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
            style={{
              transform: "translate3d(1.2rem,1.5rem, 0)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          ></FontAwesomeIcon>
        </div>
      </div>
    );
  };

  removeLocation = (i) => {
    var location = cloneDeep(this.state.locations);
    location.splice(i, 1);
    this.setState({
      locations: location,
    });
  };

  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
    if (value == "") {
      // this.setState({ [name + "Error"]: "Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };

  validate = () => {
    let customerIdError = "";
    let titleError = "";
    let descriptionError = "";
    let multiError = "";
    let locationfromError = "";
    let locationtoError = "";
    let assigneeRequiredError = "";
    let jobTypeError = "";

    if (!this.state.customerId) {
      customerIdError = "Customer should not be empty";
    }

    if (!this.state.title) {
      titleError = "Title should not be empty";
    }

    if (!this.state.description) {
      descriptionError = "Description should not be empty";
    }

    if (this.state.services.length === 0) {
      multiError = "Services Should not be empty";
    }

    if (!this.state.assigneeRequired) {
      assigneeRequiredError = "Required count should not be empty";
    }

    if (!this.state.jobType) {
      jobTypeError = "Job type is required.";
    }

    // if (!this.state.locations[0].value) {
    //   locationfromError = "Location should not be empty";
    // }

    // if (!this.state.locations[1].value) {
    //   locationtoError = "Location should not be empty";
    // }

    if (
      customerIdError ||
      titleError ||
      // descriptionError ||
      multiError ||
      locationfromError ||
      locationtoError ||
      assigneeRequiredError ||
      jobTypeError
    ) {
      this.setState({
        customerIdError,
        titleError,
        // descriptionError,
        multiError,
        locationfromError,
        locationtoError,
        assigneeRequiredError,
        jobTypeError,
      });
      return false;
    }

    return true;
  };

  handleStartDate = (date, i) => {
    let newState = cloneDeep(this.state);
    newState.dates[i] = date;
    this.setState({
      dates: newState.dates,
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
    var { createJob, history, loggedInUser } = this.props;
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      var {
        title,
        description,
        services,
        dates,
        startTime,
        locations,
        status,
        note,
        assigneesId,
        customerId,
        assigneeRequired,
        jobType,
      } = this.state;

      let stringDates = dates.map((x) =>
        x != ("" || null) ? x.toDateString() : null
      );
      stringDates = stringDates.filter(Boolean);
      var createJobObj = {
        title,
        description,
        services,
        dates: stringDates,
        startTime,
        locations: locations.filter((x) => x.value != "" && x.type != ""),
        status,
        note,
        assigneesId,
        assigneeRequired,
        customerId,
        userId: loggedInUser._id,
        jobType,
      };
      var { history } = this.props;
      createJob(createJobObj, (job) => {
        history.push("/job/details/" + job.data.data._id);
      });
    }
  };

  servicesChanged = (newValue) => {
    let arr = uniqBy(newValue, "id");
    console.log(arr)
    this.setState({ services: arr });
    if (arr.length > 0) {
      this.setState({ multiError: "" });
    }
  };
  addCustomService = (e) => {
    e.preventDefault();
    if (e.target.value) {
      this.setState({
        newService: e.target.value,
      });
      var serviceAdded = {
        name: this.state.newService,
        id: Math.random() * 10,
      };
      if (e.keyCode === 13 && e.target.value) {
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

  addNewCustomer = (e) => {
    e.preventDefault();
    if (e.target.value) {
      this.setState({
        newCustomer: e.target.value,
      });
      if (e.keyCode === 13 && e.target.value) {
        this.setState({ showAddCustomer: true });
      }
    } else {
      this.setState({
        newCustomer: "",
      });
    }
  };

  getCustomerJobs = (customer) => {
    if (customer) {
      this.setState({
        jobs: customer.jobs,
        selectedCustomer: customer.firstName + " " + customer.lastName,
        customerId: customer.email,
        customerIdError: "",
      });
    } else {
      this.setState({ jobs: [], selectedCustomer: "", customerId: "" });
    }
  };

  populateNewCustomer = (e) => {
    let newCustomer = {
      email: e.data.data.email,
      firstName: e.data.data.firstName,
      lastName: e.data.data.lastName,
      jobs: [],
      _id: e.data.data._id,
    };
    let customers = cloneDeep(this.state.customers);
    customers.unshift(newCustomer);
    this.setState({
      showAddCustomer: false,
      customers,
      selectedCustomer: newCustomer.firstName + " " + newCustomer.lastName,
      customerId: newCustomer.email,
    });
  };

  componentWillUnmount() {
    var { setJobForm } = this.props;
    setJobForm({ ...this.state });
  }

  onEditorStateChange = (e) => {
    this.setState({
      editorState: e,
      description: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  handleResetJob = () =>{
    var {resetJobForm,jobForm} = this.props
    console.log("resetJobForm called")
    let customers = cloneDeep(this.state.customers)
    resetJobForm()
    this.setState({...this.initialState, customers})
  }
  render() {
    return (
      <div style={{ background: "#e9ecef" }}>
        <ToastContainer position="bottom-right" />
        <div className={`${style.tron}`}>
          <div className={`${style.form}`}>
            <h3 className={style.head}>Create New Job</h3>
            <form onSubmit={this.mySubmitHandler}>
              {this.state.customers.length > 0 ? (
                <Autocomplete
                  noOptionsText={`Add '${this.state.newCustomer}' as Customer`}
                  value={this.state.selectedCustomer}
                  onChange={(event, newValue) => {
                    this.getCustomerJobs(newValue); // Get the customer and get job
                  }}
                  // inputValue={this.state.selectedCustomer}
                  // onInputChange={(event, newInputValue) => {
                  // }}
                  // id="country-select-demo1"
                  style={{ width: "100%", margin: "1rem 0" }}
                  size="small"
                  options={this.state.customers}
                  // classes={{
                  //   option: classes.option,
                  // }}
                  // freeSolo
                  autoHighlight
                  getOptionLabel={(option) =>
                    option.firstName
                      ? option.firstName + " " + option.lastName
                      : option
                  }
                  renderOption={(option) => (
                    <React.Fragment>
                      {option.firstName} {option.lastName} ({option.email})
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      required
                      autoFocus
                      {...params}
                      onKeyUp={(e) => this.addNewCustomer(e)}
                      label="Choose a customer"
                      style={{ margin: "1rem 2rem", width: "90%" }}
                      variant="outlined"
                      error={this.state.customerIdError ? true : false}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              ) : null}

              <div>
                {this.state.dates.map((x, i) => {
                  if (i === 0) {
                    return (
                      <div
                        style={{ margin: "0rem 2rem", width: "90%" }}
                        key={i}
                      >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid>
                            <KeyboardDatePicker
                              inputVariant="outlined"
                              margin="normal"
                              fullWidth
                              size="small"
                              id="date-picker-dialog"
                              format="MM/dd/yyyy"
                              value={this.state.dates[i]}
                              onChange={(e) => this.handleStartDate(e, i)}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    );
                  } else {
                    return (
                      <div className="row" style={{ margin: "0 1rem" }}>
                        <div
                          className="col-11"
                          style={{ width: "90%" }}
                          key={i}
                        >
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                              <KeyboardDatePicker
                                inputVariant="outlined"
                                margin="normal"
                                fullWidth
                                size="small"
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                value={this.state.dates[i]}
                                onChange={(e) => this.handleStartDate(e, i)}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                              />
                            </Grid>
                          </MuiPickersUtilsProvider>
                        </div>
                        <div
                          className="col-1"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => this.removeDate(i)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              <div className="row" style={{ margin: "0 0.3rem" }}>
                <div className="col-11"></div>
                <div className="col-1" onClick={this.addDate}>
                  <i
                    className="fa fa-plus"
                    style={{ transform: "translate3d(0rem,-0.3rem, 0)" }}
                  ></i>
                </div>
              </div>

              <div>
                <TextField
                  variant="outlined"
                  required
                  style={{ margin: "0rem 2rem", width: "90%" }}
                  size="small"
                  id="title"
                  label="Job Title"
                  name="title"
                  autoComplete="title"
                  // autoFocus
                  error={this.state.titleError ? true : false}
                  value={this.state.title}
                  onChange={this.handleFormInput}
                />
              </div>

              <div
                className="form-group"
                style={{
                  margin: "1rem 2rem",
                  width: "90%",
                  borderRadius: "4px",
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                }}
              >
                <Editor
                  editorState={this.state.editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                  style={{}}
                />
              </div>

              <div
                className="form-group"
                style={{ margin: "1rem 2rem", width: "90%" }}
              >
                <Autocomplete
                  multiple
                  noOptionsText={`Add '${this.state.newService}' to Services`}
                  value={this.state.services}
                  onChange={(event, newValue) => {
                    console.log(newValue)
                    this.servicesChanged(newValue);
                  }}
                  limitTags={10}
                  id="multiple-limit-tags"
                  options={
                    this.state.serviceOptions && this.state.serviceOptions
                  }
                  getOptionLabel={(option) =>
                    option.name ? option.name : option
                  }
                  renderInput={(params) => (
                    <TextField
                      required
                      onKeyUp={(e) => this.addCustomService(e)}
                      {...params}
                      variant="outlined"
                      size="small"
                      label="Services"
                      placeholder="Services"
                      error={this.state.multiError ? true : false}
                    />
                  )}
                />
              </div>

              <div className="row" style={{ margin: "0 1.5rem" }}>
                {/* <div className="form-group col-4" style={{ marginTop: "1rem" }}>
                  <TextField
                    id="time"
                    label="Start Time"
                    type="time"
                    name="startTime"
                    value={this.state.startTime}
                    onChange={this.handleFormInput}
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </div> */}

                <div className={`form-group col-6`}>
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
                    error={this.state.assigneeRequiredError ? true : false}
                    onChange={this.handleFormInput}
                  />
                </div>

                <div className="col-6">
                  <FormControl
                    variant="outlined"
                    style={{ marginTop: "1rem", width: "96%" }}
                    margin="dense"
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Job Type
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.jobType}
                      onChange={this.handleFormInput}
                      label="Job Type"
                      name="jobType"
                    >
                      <MenuItem value={"Fixed"}>Fixed</MenuItem>
                      <MenuItem value={"Hourly Based"}>Hourly Based</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {/* <div className="col-1"></div> */}
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

            {this.state.locations.length === 0 &&  
            <div className="row">
              <div className="col-9"></div>
              <div className="col-3">
                <Button   onClick={this.addLocation}
                  style={{
                    background: "#00ADEE",
                    border: "transparent",
                    color: "#ffffff",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    fontFamily: "sans-serif",
                    textTransform: "none",
                    margin:" 0.5rem 2rem"
                    // float:"right"
                  }}
                >
                  Add Location
                </Button>
                </div>
              </div>}

              {this.state.locations.length > 0 && (
                <div>
                  {this.state?.locations?.map((location, i) =>
                    this.showLocation(i)
                  )}
                </div>
              )}
              {this.state.locations.length > 0 && (
                <div className="row">
                  <div className="col-11"></div>
                  <div className="col-1">
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={this.addLocation}
                      // style={{ transform: "translate3d(0rem,0rem, 0)" }}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              )}

              <div className="row" style={{ margin: "1rem" }}>
              <div className={`col-6 ${style.btnsubmit}`} >
                  <Button
                    type="button"
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                    }}
                    onClick={this.handleResetJob}
                  >
                    Reset
                  </Button>
                </div>

                <div className={`col-6 ${style.btnsubmit}`} >
                  <Button
                    type="button"
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                    }}
                    onClick={this.mySubmitHandler}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Modal
          dialogClassName={`${style.modal}`}
          show={this.state.showAddCustomer}
          onHide={() => this.setState({ showAddCustomer: false })}
          // animation={false}
          centered
          // backdrop={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <JobConfirmation data={job} close={handleCloseAndRefresh} /> */}
            <CustomerAdd isModal={true} close={this.populateNewCustomer} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

var actions = {
  createJob,
  setJobForm,
  resetJobForm
};

var mapStateToProps = (state) => ({
  loggedInUser: state.users.user,
  jobForm: state.forms.addJobForm,
});

export default connect(mapStateToProps, actions)(CreateJobs);
// export default CreateJobs;
