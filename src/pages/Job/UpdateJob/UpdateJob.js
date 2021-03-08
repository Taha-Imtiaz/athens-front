import React, { Component } from "react";
import style from "./UpdateJob.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { getJob, updateJob } from "../../../Redux/Job/jobActions";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { cloneDeep, uniqBy } from "lodash";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,

  TextareaAutosize,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import AddLocation from "../../../components/AddLocation/AddLocation";

class UpdateJob extends Component {
  //defining state
  state = {
    services: [],
    assignee: [],
    assigneeList: [],
    startDate: "",
    dates: [""],
    endDate: "",
    startTime: "",
    meetTime: "",
    jobType: "",
    propertyType: '',
    title: "",
    titleError: "",
    descriptionError: "",
    servicesError: "",
    assigneeError: "",
    moversError: "",
    locationFromError: "",
    locationToError: "",
    job: null,
    newNote: "",
    customerId: "",
    statusOptions: ["Booked", "Completed", "Pending"],
    status: "",
    assigneeRequired: "",
    newService: "",
    price: '',
    truck: '',
    truckSize: 'None',
    serviceOptions: [
      { id: 1, name: "Packaging" },
      { id: 2, name: "Loading" },
      { id: 3, name: "Unloading" },
      { id: 4, name: "Grand Piano" },
      { id: 5, name: "Baby" },
      { id: 6, name: "Hot Tub" },
    ],
    propertyOptions: [
      { id: 1, name: "House" },
      { id: 2, name: "Town House" },
      { id: 3, name: "Apartment" }
    ],
  };


  //fetch job id on componentDidMount
  componentDidMount() {
    let {
      getJob,
      match: {
        params: { jobId },
      },
    } = this.props;

    getJob(jobId);
  };

  componentDidUpdate(prevProps) {
    let { job } = this.props;
    if (prevProps.job !== job) {
      this.setInitialState(job);
    }
  }
  //onChange handler of date
  handleDateChange = (date, i) => {
    let newState = cloneDeep(this.state);
    newState.dates[i] = date;
    this.setState({
      dates: newState.dates,
    });
  };
  //validate form if the fields are empty
  handleValidation = () => {
    let {
      title,
      description,
      option,

      assigneeRequired,
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

    let {
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


  setInitialState = (job) => {

    const contentBlock = htmlToDraft(job.description);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
      });
    }
    //fetch services of jobs
    let services = job.services.map((service, index) => {
      return { id: index + 1, name: service };
    });

    let parsedDates = job.dates.map((x) => Date.parse(x));
    this.setState({
      job: job,
      title: job.title,
      startDate: Date.parse(job.startDate),
      dates: parsedDates,
      endDate: Date.parse(job.endDate),
      startDateInString: job.startDate,
      endDateInString: job.endDate,
      startTime: new Date(job.startTime),
      locations: job.locations,
      jobType: job.jobType,
      description: job.description,
      options: services,
      assignee: job.assignee,
      note: job.note,
      status: job.status,
      show: false,
      customerId: job.customer.email,
      assigneeRequired: job.assigneeRequired,
      services: job.services,
      propertyType: job.propertyType,
      price: job.price,
      truck: job.truck,
      truckSize: job.truckSize,
      newService: "",
      newProperty: "",
    });
  }
  //show modal when addNote button is pressed
  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  
  //close note modal
  handleClose = (notes) => {
    this.setState({
      show: false,
      note: notes,
    });
  };
  //add note when add note button of modal is pressed
  AddNote = () => {
    let { newNote, note } = this.state;
    if (note) {
      let notes = [...this.state.note];
      notes.push({ uid: uuidv4(), text: newNote });
      this.setState({
        show: false,
        note: notes,
        newNote: "",
      });
    }
  };
  //onChange handler of form
  handleFormInput = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  //delete ntoe
  handleDeleteNote = (deleteNote) => {
    let { note } = this.state;
    let noteToDelete = note.findIndex((n) => n.uid === deleteNote.uid);
    if (noteToDelete !== -1) {
      note.splice(noteToDelete, 1);
      this.setState({
        note: note,
      });
    }
  };
  //onChange handler of addNote
  handleAddNote = (e) => {
    let { value } = e.target;
    this.setState({
      newNote: value,
    });
  };
  //update job
  handleJobUpdate = () => {
    let {
      title,
      dates,
      locations,
      services,
      description,
      status,
      jobType,
      assigneeRequired,
      customerId,
      note,
      startTime,
      propertyType,
      price,
      truck,
      truckSize
    } = this.state;

    let {
      match: {
        params: { jobId },
      },
      history,
    } = this.props;
    let stringDates = dates.map((x) => {
      if (typeof x === "number") {
        return new Date(x).toDateString();
      } else {
        return x.toDateString();
      }
    });

    let { loggedinUser, updateJob } = this.props;
    let updatedObj = {
      dates: stringDates,
      title,
      description,
      services,
      assigneeRequired,
      jobType,
      locations: locations && locations.filter((x) => x.value !== "" && x.type !== ""),
      status,
      userId: loggedinUser._id,
      customerId,
      note,
      startTime,
      propertyType,
      price,
      truck,
      truckSize
    };
    //check if the fields are empty
    if (this.handleValidation()) {
      //update job
      updateJob(jobId, updatedObj, (res) => history.push("/job/detail/" + jobId))
    }
  };


  //add new location
  addLocation = () => {
    let location = cloneDeep(this.state.locations);
    location.push({ type: "", value: "", default: false });
    this.setState({
      locations: location,
    });
  };
  

  //set the google location in the state
  handleSetLocation = (choosenLocation, index) => {
    let value = choosenLocation ? choosenLocation.description : ''
    let location = [...this.state.locations];

    location[index].value = value;

    


    this.setState({
      locations: location
    })
  }


  //add date on Clicking plus icon
  addDate = () => {
    if (this.state.dates[0]) {
      this.setState({ dates: [...this.state.dates, new Date()] });
    }
  };
  //remove date upon clicking remove icon
  removeDate = (i) => {
    let datesArr = cloneDeep(this.state.dates);
    datesArr.splice(i, 1);
    this.setState({
      dates: datesArr,
    });
  };
  //onChange handler of services
  servicesChanged = (newValue) => {
    let arr = uniqBy(newValue, "id");
    this.setState({ services: arr });
  };
  //onChange handler of propertytype
  propertyChanged = (newValue) => {

    if (newValue) {
      this.setState({ propertyType: newValue.name });
    }
    else {
      this.setState({ propertyType: "" });
    }

   
  };

  //add custom service
  addCustomService = (e) => {
    e.preventDefault();
    if (e.target.value) {
      this.setState({
        newService: e.target.value,
      });
      if (e.keyCode === 13 && e.target.value) {
        let serviceAdded = {
          name: this.state.newService,
          id: Math.random() * 10,
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
  //add custom property
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
  }
  //change editor's state
  onEditorStateChange = (e) => {
    this.setState({
      editorState: e,
      description: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  handleTimeChange = (time) => {
    this.setState({
      startTime: time
    })
  }

  handleLocationChange = (locations) => {
    this.setState({
      locations
    });
  }

  render() {
    let {
      note,
      show,
    } = this.state;
    return (
      <div className={`${style.formStyle}`}>
        <div className={`${style.form}`}>
          {/* <ToastContainer position="bottom-right"/> */}
          <h3 className={style.head}>Job Details Edit</h3>

          <form>
            <div>
              <TextField
                variant="outlined"
                required
                className={style.styleFormFields}
                size="small"
                id="customerId"
                label="Cutomer Email"
                name="customerId"
                fullWidth
                autoComplete="customerId"
                value={this.state.customerId}
                onChange={this.handleFormInput}
                disabled
              />
            </div>

            {/* <div>
              <TextField
                variant="outlined"
                required
                fullWidth
                className={style.styleFormFields}
                size="small"
                id="title"
                label="Job Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={this.state.title}
                onChange={this.handleFormInput}
                error={this.state.titleError ? true : false}
              />
            </div>
           */}
            <div className={style.styleEditor}>
              <Editor
                editorState={this.state.editorState}
                className={style.styleFormFields}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
                placeholder="Job Description"
              />
            </div>

            <div>
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
                    this.state.serviceOptions && this.state.serviceOptions
                  }
                  getOptionLabel={(option) =>
                    option.name ? option.name : option
                  }
                  // error={this.state.multiError ? true : false}
                  renderInput={(params) => (
                    <TextField
                      onKeyUp={(e) => this.addCustomService(e)}
                      {...params}
                      variant="outlined"
                      fullWidth
                      className={style.styleFormFields}
                      label="Services"
                      placeholder="Services"
                    />
                  )}
                />
              )}
            </div>

            {this.state.dates.map((x, i) => {
              if (i === 0) {
                return (
                  <div key={i}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid>
                        <KeyboardDatePicker
                          inputVariant="outlined"
                          size="small"
                          fullWidth
                          className={style.styleFormFields}
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          value={this.state.dates[i]}
                          onChange={(e) => this.handleDateChange(e, i)}
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
                  <div className={style.styleDate} key={i}>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid>
                        <KeyboardDatePicker
                          inputVariant="outlined"
                          size="small"
                          fullWidth
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          value={this.state.dates[i]}
                          onChange={(e) => this.handleDateChange(e, i)}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>

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
            <div className={style.alignRight} onClick={this.addDate}>
              <i className="fa fa-plus"></i>
            </div>

            <div className={style.propertyTypeRow}>
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardTimePicker
                      id="startTime"
                      value={this.state.startTime}
                      onChange={this.handleTimeChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <Autocomplete
                  noOptionsText={`Add '${this.state.newProperty}' to property type`}
                  value={this.state.propertyType}
                  onChange={(event, newValue) => {
                    this.propertyChanged(newValue);
                  }}
                  limitTags={1}
                  id="property-tag"
                  options={
                    this.state.propertyOptions && this.state.propertyOptions
                  }
                  getOptionLabel={(option) =>
                    option.name ? option.name : option
                  }
                  renderInput={(params) => (
                    <TextField
                      required
                      onKeyUp={(e) => this.addCustomPropertyType(e)}
                      {...params}
                      className={style.styleFormFields}
                      variant="outlined"
                      size="small"
                      label="Property Type"
                      placeholder="Property Type"
                      error={this.state.multiError ? true : false}
                    />
                  )}
                />
              </div>

              <div>
                <FormControl variant="outlined" margin="dense" fullWidth>
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
                      {this.state && this.state.jobType}
                    </MenuItem>
                    {this.state.jobType !== "Fixed" ? (
                      <MenuItem value={"Fixed"}>Fixed</MenuItem>

                    ) : (
                        <MenuItem value={"Hourly based"}>Hourly based</MenuItem>
                      )}
                  </Select>
                </FormControl>
              </div>

            </div>
            <div className={style.movers}>
              <div>
                <TextField
                  type="number"
                  variant="outlined"
                  required
                  className={style.styleFormFields}
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
              <div>
                <TextField
                  type="number"
                  variant="outlined"
                  required
                  className={style.styleFormFields}
                  fullWidth
                  size="small"
                  id="price"
                  label="Price"
                  autoComplete="Enter Price"
                  name="price"
                  value={this.state.price}
                  error={this.state.assigneeRequiredError ? true : false}
                  onChange={this.handleFormInput}
                />

              </div>
              <div>
                <TextField
                  type="number"
                  variant="outlined"
                  // required
                  className={style.styleFormFields}
                  fullWidth
                  size="small"
                  id="truck"
                  label="Trucks"
                  autoComplete="Enter Number Of Trucks"
                  name="truck"
                  value={this.state.truck}
                  // error={this.state.assigneeRequiredError ? true : false}
                  onChange={this.handleFormInput}
                />
              </div>
              <div>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Truck Size
                    </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.truckSize}
                    onChange={this.handleFormInput}
                    label="Truck Size"
                    name="truckSize"
                  >

                    <MenuItem value={"None"} disabled>None</MenuItem>
                    <MenuItem value={"16ft"}>16ft</MenuItem>
                    <MenuItem value={"20ft"}>20ft</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {
              this.state.locations && <div>
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
                    <AddLocation locationArr={this.state.locations} addLocation={this.addLocation} handleLocationChange={this.handleLocationChange} />
                  </div>
                )}

              </div>
            }
          </form>

          <div>
            {note && note.length > 0 && <h3>Notes</h3>}
            {note && note.map((note) => (
              <div className={style.notesStyle}>
                <div>{note.text}</div>
                <div>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="1x"
                    onClick={() => this.handleDeleteNote(note)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={style.notesBtn}>
            <div>
              <Button
                onClick={this.handleShow}
                type="submit"
                className={style.button}
              >
                Add Notes
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                onClick={this.handleJobUpdate}
                className={style.button}
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
            dialogClassName={style.modal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TextareaAutosize className={style.styleTextArea}
                id=""
                cols="65"
                rows="5"
                name="Note"
                value={this.state.newNote}
                onChange={this.handleAddNote}
              ></TextareaAutosize>
            </Modal.Body>
            <Modal.Footer>
              <Button className={style.modalButtons} onClick={this.handleClose}>
                Close
              </Button>
              <Button className={style.modalButtons} onClick={this.AddNote}>
                Add Note
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

var actions = {
  getJob,
  updateJob
};

var mapStateToProps = (state) => ({
  loggedinUser: state.users.user,
  job: state.jobs && state.jobs.job
});

export default connect(mapStateToProps, actions)(UpdateJob);
