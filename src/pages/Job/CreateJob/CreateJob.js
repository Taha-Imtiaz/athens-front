import React, { Component } from "react";
import style from "./CreateJob.module.css";
import "react-datepicker/dist/react-datepicker.css";
import FormControl from "@material-ui/core/FormControl";
import { createJob } from "../../../Redux/Job/jobActions";
import { connect } from "react-redux";
import { cloneDeep, uniqBy } from "lodash";
import {
  InputLabel,
  MenuItem,
  Button,
  Select,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@material-ui/core";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import { getCustomersAndJobs } from "../../../Redux/Claim/claimActions";
import { Modal } from "react-bootstrap";
import CreateCustomer from "../../Customer/CreateCustomer/CreateCustomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { resetJobForm, setJobForm } from "../../../Redux/PersistForms/formActions";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

class CreateJob extends Component {
  //defining state
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
    //fetch customer id name and jobs if navigate from customer page
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
    //get all customers and jobs
    let { getCustomersAndJobs } = this.props;
    getCustomersAndJobs(res => {
      this.setState({ customers: res.data.data });
    });
  };
  //onchange handler of radio buttons
  handleInputChange = (e, i) => {
    let { value } = e.target;

    let updateLocation = cloneDeep(this.state.locations);
    updateLocation[i].type = value;
    updateLocation[i].value = "";
    updateLocation[i].default = false;
    this.setState({
      locations: updateLocation,
    });
  };
  //handler to add location
  addLocation = () => {
    let location = cloneDeep(this.state.locations);
    location.push({ type: "", value: "", default: false });
    this.setState({
      locations: location,
    });
  };
  //add new Date
  addDate = () => {
    if (this.state.dates[0]) {
      this.setState({ dates: [...this.state.dates, new Date()] });
    }
  };
  //remove the selected Date
  removeDate = (i) => {
    let datesArr = cloneDeep(this.state.dates);
    datesArr.splice(i, 1);
    this.setState({
      dates: datesArr,
    });
  };
  //onChange handler for location
  hanldeLocationInput = (i, e) => {
    let updateLocation = cloneDeep(this.state.locations);
    updateLocation[i].value = e.target.value;
    this.setState({ locations: updateLocation });
    if (e.target.value) {
      this.setState({ locationfromError: "" });
    }
  };

  //change the state of textbox
  changeCheckBoxState = (e, i) => {
    e.stopPropagation();
    let prevState = cloneDeep(this.state.locations);
    prevState[i].default = !prevState[i].default;
    if (prevState[i].default) {
      prevState[i].value =
        prevState[i].type === "pickup" ? prevState[i].value.concat(` (Load Only / IA)`) : prevState[i].value.concat(` (Unload Only)`);
    } else {
      prevState[i].value = prevState[i].value.split('(')[0]
    }
    this.setState({
      locations: prevState,
    });
  };
  //function to show all locations
  showLocation = (i) => {
    return (
      <div className={style.locationInput} key={i}>
        <div className={style.radioButtons}>
          <RadioGroup
            className={style.rowFlex}
            value={this.state.locations[i].type}
            onChange={(e) => this.handleInputChange(e, i)}
          >
            <FormControlLabel
              value="pickup"
              name="pickup"
              control={<Radio className={style.styleRadio} />}
              label="Pickup"
            />
            <FormControlLabel
              value="dropoff"
              name="dropoff"
              control={<Radio className={style.styleRadio} />}
              label="DropOff"
            />
          </RadioGroup>
        </div>
        <div className={style.inputField}>
          <TextField
            fullWidth
            variant="outlined"
            className={style.styleFormFields}
            required
            size="small"
            id="to"
            label={
              this.state.locations[i].type === "pickup"
                ? "Enter Pickup Point"
                : this.state.locations[i].type === "dropoff"
                  ? "Enter DropOff Point"
                  : "Choose Type"
            }
            disabled={
              (this.state.locations[i].type ? false : true) ||
              this.state.locations[i].default
            }
            // label={'Pickup / dropoff point'}
            name={this.state.locations[i].type}
            value={this.state.locations[i].value}
            onChange={(e) => this.hanldeLocationInput(i, e)}
          // error={this.state.locationtoError ? true : false}
          />
        </div>
        {this.state.locations[i].type === "pickup" ? (
          <div
            className={
              this.state.locations[i].type === "pickup" ? style.checkBox : null
            }
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
        ) : this.state.locations[i].type === "dropoff" ? (
          <div className={this.state.locations[i].type === "dropoff" ? style.checkBox : null}>
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
        ) : null}
        <div className={`${style.TrashIcon} ${style.centeredIcon}`}>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => this.removeLocation(i)}
          ></FontAwesomeIcon>
        </div>
      </div>
    );
  };
  //remove location
  removeLocation = (i) => {
    let location = cloneDeep(this.state.locations);
    location.splice(i, 1);
    this.setState({
      locations: location,
    });
  };
  //onChange handler of forms
  handleFormInput = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
    if (value === "") {
      // this.setState({ [name + "Error"]: "Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };
  //validate form (check if the fields are empty)
  validate = () => {
    let customerIdError = "";
    let titleError = "";
    // let descriptionError = "";
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

    // if (!this.state.description) {
    //   descriptionError = "Description should not be empty";
    // }

    if (this.state.services.length === 0) {
      multiError = "Services Should not be empty";
    }

    if (!this.state.assigneeRequired) {
      assigneeRequiredError = "Required count should not be empty";
    }

    if (!this.state.jobType) {
      jobTypeError = "Job type is required.";
    }

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
  //onChange handler of dates
  handleStartDate = (date, i) => {
    let newState = cloneDeep(this.state);
    newState.dates[i] = date;
    this.setState({
      dates: newState.dates,
    });
  };
  //submit form handler
  mySubmitHandler = (event) => {
    let { createJob, history, loggedInUser } = this.props;
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      let {
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
        x !== ("" || null) ? x.toDateString() : null
      );
      stringDates = stringDates.filter(Boolean);
      let createJobObj = {
        title,
        description,
        services,
        dates: stringDates,
        startTime,
        locations: locations.filter((x) => x.value !== "" && x.type !== ""),
        status,
        note,
        assigneesId,
        assigneeRequired,
        customerId,
        userId: loggedInUser._id,
        jobType,
      };
      createJob(createJobObj, (job) => {
        //reset form to its original state
        this.handleResetJob()
        history.push("/job/detail/" + job.data.data._id);
      });
    }
  };
  //services changed
  servicesChanged = (newValue) => {
    let arr = uniqBy(newValue, "id");
    this.setState({ services: arr });
    if (arr.length > 0) {
      this.setState({ multiError: "" });
    }
  };
  //add custom service to services autocomplete
  addCustomService = (e) => {
    e.preventDefault();
    if (e.target.value) {
      this.setState({
        newService: e.target.value,
      });
      let serviceAdded = {
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
  //add new customer
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
  //get customer jobs
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
  //populateNewCustomer
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
  //save the form fields on redux store on component unmounting
  componentWillUnmount() {
    let { setJobForm } = this.props;
    setJobForm({ ...this.state });
  }
  //onChange handler of editor
  onEditorStateChange = (e) => {
    this.setState({
      editorState: e,
      description: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  //reset form Fields
  handleResetJob = () => {
    let { resetJobForm } = this.props;
    let customers = cloneDeep(this.state.customers);
    resetJobForm();
    this.setState({ ...this.initialState, customers });
  };

  render() {
    return (
      <div>
        <div className={`${style.createJob}`}>
          <div className={`${style.form}`}>
            <h3 className={style.head}>Create Job</h3>
            <form onSubmit={this.mySubmitHandler}>
              {this.state.customers.length > 0 ? (
                <Autocomplete
                  noOptionsText={`Add '${this.state.newCustomer}' as Customer`}
                  value={this.state.selectedCustomer}
                  onChange={(event, newValue) => {
                    this.getCustomerJobs(newValue); // Get the customer and get job
                  }}
                  size="small"
                  options={this.state.customers}
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
                      className={style.styleFormFields}
                      onKeyUp={(e) => this.addNewCustomer(e)}
                      label="Choose a customer"
                      fullWidth
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
                      <div key={i}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid>
                            <KeyboardDatePicker
                              inputVariant="outlined"
                              fullWidth
                              size="small"
                              id="date-picker-dialog"
                              format="MM/dd/yyyy"
                              className={style.styleFormFields}
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
                      <div className={style.styleDate}>
                        <div key={i}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                              <KeyboardDatePicker
                                inputVariant="outlined"
                                fullWidth
                                size="small"
                                id="date-picker-dialog"
                                className={style.styleFormFields}
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
                          className={style.centeredIcon}
                          onClick={() => this.removeDate(i)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              <div onClick={this.addDate} className={style.alignRight}>
                <i className="fa fa-plus"></i>
              </div>

              <div>
                <TextField
                  variant="outlined"
                  required
                  className={style.styleFormFields}
                  size="small"
                  id="title"
                  label="Job Title"
                  name="title"
                  autoComplete="title"
                  fullWidth
                  error={this.state.titleError ? true : false}
                  value={this.state.title}
                  onChange={this.handleFormInput}
                />
              </div>

              <div className={style.styleEditor}>
                <Editor
                  editorState={this.state.editorState}
                  toolbarClassName="toolbarClassName"
                  className={style.styleFormFields}
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                  placeholder="Job Description"
                />
              </div>

              <div>
                <Autocomplete
                  multiple
                  noOptionsText={`Add '${this.state.newService}' to Services`}
                  value={this.state.services}
                  onChange={(event, newValue) => {
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
                      className={style.styleFormFields}
                      variant="outlined"
                      size="small"
                      label="Services"
                      placeholder="Services"
                      error={this.state.multiError ? true : false}
                    />
                  )}
                />
              </div>

              <div className={style.movers}>
                <div>
                  <TextField
                    type="number"
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    size="small"
                    id="assigneeRequired"
                    label="Movers Required"
                    autoComplete="Number of movers required"
                    name="assigneeRequired"
                    value={this.state.assigneeRequired}
                    className={style.styleFormFields}
                    error={this.state.assigneeRequiredError ? true : false}
                    onChange={this.handleFormInput}
                  />
                </div>

                <div>
                  <FormControl variant="outlined" margin="dense" fullWidth>
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
              </div>

              {this.state.locations.length === 0 && (
                <div className={style.addLocation}>
                  <div className={style.addLocationBtn}>
                    <Button onClick={this.addLocation} className={style.button}>
                      Add Location
                    </Button>
                  </div>
                </div>
              )}

              {this.state.locations.length > 0 && (
                <div>
                  {this.state.locations.map((location, i) =>
                    this.showLocation(i)
                  )}
                </div>
              )}
              {this.state.locations.length > 0 && (
                <div className={style.alignRight}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={this.addLocation}
                  ></FontAwesomeIcon>
                </div>
              )}

              <div className={style.resetBtns}>
                <div>
                  <Button
                    className={style.button}
                    type="button"
                    onClick={this.handleResetJob}
                  >
                    Reset
                  </Button>
                </div>

                <div>
                  <Button
                    className={style.button}
                    type="button"
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
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateCustomer isModal={true} close={this.populateNewCustomer} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

var actions = {
  createJob,
  setJobForm,
  resetJobForm,
  getCustomersAndJobs
};

var mapStateToProps = (state) => ({
  loggedInUser: state.users.user,
  jobForm: state.forms.addJobForm,
});

export default connect(mapStateToProps, actions)(CreateJob);