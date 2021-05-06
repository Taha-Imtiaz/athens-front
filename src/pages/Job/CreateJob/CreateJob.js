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
} from "@material-ui/core";
import "date-fns";
import { Autocomplete } from "@material-ui/lab";
import { getCustomersAndJobs } from "../../../Redux/Claim/claimActions";
import CreateCustomer from "../../Customer/CreateCustomer/CreateCustomer";
import {
  resetJobForm,
  setJobForm,
} from "../../../Redux/PersistForms/formActions";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import InputAdornment from "@material-ui/core/InputAdornment";

import AddLocation from "../../../components/AddLocation/AddLocation";
import VirtualizedAutocomplete from "../../../components/VirtualizedAutocomplete/VirtualizedAutocomplete";
import DateAndTime from "../../../components/DateAndTime/DateAndTime";
import Truck from "../../../components/Truck/Truck";
import { Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

class CreateJob extends Component {
  //defining state
  constructor(props) {
    super(props);
    this.state = { ...props.jobForm };
  }

  getDefaultTime = () => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.toString();
  };
  initialState = {
    editorState: EditorState.createEmpty(),
    // title: "",
    description: "",
    services: [],
    customerId: "",
    startDate: "",
    dates: [{ date: new Date(), time: new Date("2014-08-18T09:00:00") }],
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
    // priceError:"",
    assigneeError: "",
    locationfromError: "",
    locationtoError: "",
    assigneeList: [],
    jobType: "Hourly Based",
    status: "pending",
    note: [],
    assigneesId: [],
    add: 1,
    locations: [{ type: "", value: "", default: false, propertyType: "" }],
    fromTo: [],
    assigneeRequiredError: "",
    selectedDate: new Date(),
    newService: "",
    newProperty: "",
    customers: [],
    selectedCustomer: "",
    newCustomer: "",
    showAddCustomer: false,
    propertyType: "",
    price: "",
    trucks: [{ type: "", number: "" }],
    // truck: "",
    // truckSize: "None",
    serviceOptions: [
      { id: 1, name: "Packing" },
      { id: 2, name: "Loading" },
      { id: 3, name: "Unloading" },
      { id: 4, name: "Grand Piano" },
      { id: 5, name: "Baby" },
      { id: 6, name: "Hot Tub" },
    ],
    propertyOptions: [
      { id: 1, name: "House" },
      { id: 2, name: "Condominium" },
      { id: 3, name: "Duplex" },
      { id: 4, name: "Trailer" },
      { id: 5, name: "Office" },
      { id: 6, name: "Indoor Storage" },
      { id: 7, name: "Outdoor Storage" },
      { id: 8, name: "Town House" },
      { id: 9, name: "Apartment" },
    ],
    truckOptions: [
      "Pickup Truck",
      "Cargo Van",
      "15 ft truck",
      "17 ft truck",
      "20 ft truck",
      "26 ft truck",
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
    getCustomersAndJobs((res) => {
      this.setState({ customers: res.data.data });
    });
  };

  //handler to add location
  addLocation = () => {
    let location = cloneDeep(this.state.locations);
    location.push({ type: "", value: "", default: false, propertyType: "" });
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
    let { selectedCustomer } = this.state;
    let customerIdError = "";
    // let titleError = "";
    let descriptionError = "";
    let multiError = "";
    let locationfromError = "";
    let locationtoError = "";
    let assigneeRequiredError = "";
    // let priceError="";
    let jobTypeError = "";

    if (selectedCustomer === "") {
      customerIdError = "Customer Id should not be empty";
    }

    // if (!this.state.title) {
    //   titleError = "Title should not be empty";
    // }
    if (!this.state.editorState.getCurrentContent().hasText()) {
      descriptionError = "Description should not be empty";
    }
    if (this.state.services.length === 0) {
      multiError = "Services Should not be empty";
    }

    if (!this.state.assigneeRequired) {
      assigneeRequiredError = "Required count should not be empty";
    }

    // let locations = this.state.locations.map((x) => x.value !== "");
    // locations = locations.filter(Boolean);
    // if (locations.length === 0) {
    //   locationfromError = "Location must not be empty";
    // }
    // if (!this.state.price) {
    //   priceError = "Price should not be empty";
    // }

    if (!this.state.jobType) {
      jobTypeError = "Job type is required.";
    }

    if (
      customerIdError ||
      // titleError ||
      descriptionError ||
      multiError ||
      locationfromError ||
      locationtoError ||
      assigneeRequiredError ||
      // priceError ||
      jobTypeError
    ) {
      this.setState({
        customerIdError,
        // titleError,
        descriptionError,
        multiError,
        locationfromError,
        locationtoError,
        assigneeRequiredError,
        // priceError,
        jobTypeError,
      });
      return false;
    }
    return true;
  };

  //submit form handler
  mySubmitHandler = (event) => {
    let { createJob, history, loggedInUser } = this.props;
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      let {
        // title,
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
        price,
        trucks,
        jobType,
      } = this.state;

      let stringDates = dates.map((x) =>
        x.date !== ("" || null)
          ? { date: x.date.toDateString(), time: x.time }
          : null
      );

      stringDates = stringDates.filter(Boolean);
      let createJobObj = {
        // title,
        description,
        services,
        dates: stringDates,
        startTime,
        // locations: locations.filter((x) => x.value !== "" && x.type !== "" && x.propertyType !== ''),
        locations: locations.filter((x) => x.value !== ""),
        status,
        note,
        assigneesId,
        assigneeRequired,
        price,
        // trucks,
        trucks: trucks.filter((x) => x.type !== "" && x.number !== ""),
        customerId,
        userId: loggedInUser._id,
        jobType,
      };
      // Submit Form API
      createJob(createJobObj, (job) => {
        //reset form to its original state
        this.handleResetJob();
        history.push("/job/detail/" + job.data.data._id);
      });
      // Submit Form API
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

  propertyChanged = (newValue) => {
    if (newValue) {
      this.setState({ propertyType: newValue.name });
    } else {
      this.setState({ propertyType: "" });
    }
  };

  addCustomPropertyType = (e) => {
    e.preventDefault();
    if (e.target.value) {
      this.setState({
        newProperty: e.target.value,
      });
      let propertyAdded = {
        name: this.state.newProperty,
        id: Math.random() * 10,
      };
      if (e.keyCode === 13 && e.target.value) {
        let propertyOptions = cloneDeep(this.state.propertyOptions);
        propertyOptions.push(propertyAdded);
        this.setState({
          propertyOptions,
          propertyType: e.target.value,
        });
      }
    } else {
      this.setState({
        newProperty: "",
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
      descriptionError: e.getCurrentContent()
        ? ""
        : "Description should not be empty",
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

  handleLocationChange = (locations) => {
    this.setState({
      locations,
    });
  };

  setDates = (dates) => {
    this.setState({
      dates,
    });
  };

  setTrucks = (trucks) => {
    this.setState({
      trucks,
    });
  };

  render() {
    return (
      <div>
        <div className={`${style.createJob}`}>
          <div className={`${style.form}`}>
            <h3 className={style.head}>Create Job</h3>
            <form onSubmit={this.mySubmitHandler}>
              {/*Name Field*/}
              {this.state.customers.length > 0 ? (
                <VirtualizedAutocomplete
                  optionTextValue={this.state.newCustomer}
                  value={this.state.selectedCustomer}
                  options={this.state.customers}
                  getCustomerJobs={this.getCustomerJobs}
                  addNewCustomer={this.addNewCustomer}
                />
              ) : null}

              {/* date and time */}
              <DateAndTime dates={this.state.dates} setDates={this.setDates} />

              <div
                className={
                  this.state.descriptionError
                    ? style.styleEditorInValid
                    : style.styleEditorValid
                }
              >
                <Editor
                  onChange={() => {}}
                  editorState={this.state.editorState}
                  toolbarClassName="toolbarClassName"
                  className={style.styleFormFields}
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                  placeholder="Job Description"
                  // error={this.state.descriptionError ? true : false}
                />
              </div>

              <div>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  size="small"
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
                      fullWidth
                      size="small"
                      label="Services"
                      placeholder="Services"
                      error={this.state.multiError ? true : false}
                    />
                  )}
                />
              </div>

              <div className={style.propertyTypeRow}>
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
                      <MenuItem value={"Hourly Based"}>Hourly Based</MenuItem>
                      <MenuItem value={"Fixed"}>Fixed</MenuItem>
                    </Select>
                  </FormControl>
                </div>

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
                  <TextField
                    type="number"
                    variant="outlined"
                    margin="dense"
                    // required
                    fullWidth
                    size="small"
                    id="price$"
                    label="Price"
                    autoComplete="Price"
                    name="price"
                    value={this.state.price}
                    className={style.styleFormFields}
                    // error={this.state.priceError ? true : false}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    // startAdornment={}
                    onChange={this.handleFormInput}
                  />
                </div>
              </div>
              {/* truck size and number */}
              <Truck trucks={this.state.trucks} setTrucks={this.setTrucks} />
              {/* Add Location */}              
              {this.state.locations.length > 0 ? (
                <div>
                  <AddLocation
                    locationArr={this.state.locations}
                    addLocation={this.addLocation}
                    handleLocationChange={this.handleLocationChange}

                    // error={this.state.locationfromError ? true : false}
                  />
                </div>
              ) : null}

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
          open={this.state.showAddCustomer}
          onClose={() => this.setState({ showAddCustomer: false })}
          // scrollable
          // centered
          className={style.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.showAddCustomer}>
            <div className={"bg-light p-3"}>
              <h3>Create Customer</h3>
              <div>
                <CreateCustomer
                  isModal={true}
                  close={this.populateNewCustomer}
                />
              </div>
            </div>
          </Fade>
        </Modal>
        {/* <Modal
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
        </Modal> */}
      </div>
    );
  }
}

var actions = {
  createJob,
  setJobForm,
  resetJobForm,
  getCustomersAndJobs,
};

var mapStateToProps = (state) => ({
  loggedInUser: state.users.user,
  jobForm: state.forms.addJobForm,
});

export default connect(mapStateToProps, actions)(CreateJob);
