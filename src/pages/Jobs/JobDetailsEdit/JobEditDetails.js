import React, { Component } from "react";
import style from "./JobEditDetails.module.css";
import "react-datepicker/dist/react-datepicker.css";

import { connect } from "react-redux";
import { getJob, getAllMovers, updateJob } from "../../../Redux/Job/jobActions";
import { showMessage } from "../../../Redux/Common/commonActions";
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
} from "@material-ui/pickers";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  TextareaAutosize,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class JobEditDetails extends Component {
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
    serviceOptions: [
      { id: 1, name: "Packaging" },
      { id: 2, name: "Loading" },
      { id: 3, name: "Unloading" },
      { id: 4, name: "Grand Piano" },
      { id: 5, name: "Baby" },
      { id: 6, name: "Hot Tub" },
    ],
  };
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
    var {
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
  //fetch job id on componentDidMount
  componentDidMount = () => {
    var {
      getJob,
      match: {
        params: { jobId },
      },
    } = this.props;

    getJob(jobId);

    var moversObj = {
      name: "",
      address: "",
      attributes: "",
    };
    //why this api calls
    getAllMovers(moversObj).then((moverRes) => {
      var mover = moverRes?.data?.movers?.docs?.map((mover) => mover);
      this.setState({
        assigneeList: mover,
      });
    });

    var { job } = this.props;

    if (job) {
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
      var services = job.services.map((service, index) => {
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
        startTime: job.startTime,

        locations: job.locations,
        jobType: job.jobType,
        description: job.description,
        options: services,
        assignee: job.assignee,

        note: job.note,
        userId: "5f732f880cf3f60894f771b9",
        status: job.status,
        show: false,
        customerId: job.customer.email,
        assigneeRequired: job.assigneeRequired,
        services: job.services,
      });
    }
  };
  //show modal when addNote button is pressed
  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  //remove location
  removeLocation = (i) => {
    var location = cloneDeep(this.state.locations);
    location.splice(i, 1);
    this.setState({
      locations: location,
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
    var { Note, note } = this.state;
    if (note) {
      let notes = [...this.state.note];
      notes.push({ uid: uuidv4(), text: Note });
      this.setState({
        show: false,
        note: notes,
        Note: "",
      });
    }
  };
  //onChange handler of form
  handleFormInput = (e) => {
    var { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  //delete ntoe
  handleDeleteNote = (deleteNote) => {
    var { note } = this.state;
    var noteToDelete = note.findIndex((n) => n.uid === deleteNote.uid);
    if (noteToDelete !== -1) {
      note.splice(noteToDelete, 1);
      this.setState({
        note: note,
      });
    }
  };
  //onChange handler of addNote
  handleAddNote = (e) => {
    var { name, value } = e.target;
    this.setState({
      Note: value,
    });
  };
  //update job
  handleJobUpdate = () => {
    var {
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
    } = this.state;

    var {
      match: {
        params: { jobId },
      },
      history,
    } = this.props;
    var { showMessage } = this.props;
    let stringDates = dates.map((x) => {
      if (typeof x === "number") {
        return new Date(x).toDateString();
      } else {
        return x.toDateString();
      }
    });

    var { loggedinUser } = this.props;
    var updatedObj = {
      dates: stringDates,
      title,
      description,
      services,
      assigneeRequired,
      jobType,

      locations: locations.filter((x) => x.value != "" && x.type != ""),

      status,
      userId: loggedinUser._id,
      customerId,
      note,
    };
    //check if the fields are empty
    if (this.handleValidation()) {
      //update job
      updateJob(jobId, updatedObj)
        .then((res) => {
          showMessage(res.data.message);
          history.push("/job/detail/" + jobId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  //onChange handler of locations
  hanldeLocationInput = (i, e) => {
    let updateLocation = cloneDeep(this.state.locations);
    updateLocation[i].value = e.target.value;
    this.setState({ locations: updateLocation });
    if (e.target.value) {
      this.setState({ locationfromError: "" });
    }
  };

  //add new location
  addLocation = () => {
    var location = cloneDeep(this.state.locations);

    var locationAdded = location.push({ type: "", value: "", default: false });
    this.setState({
      locations: location,
    });
  };
  //onChange handler of radio buttons
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
  //change checkBox state
  changeCheckBoxState = (i) => {
    var prevState = cloneDeep(this.state.locations);
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
  //show Locations
  showLocation = (i) => {
    return (
      <div className={style.locationInput}>
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
              label="Dropoff"
            />
          </RadioGroup>
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            required
            className={style.inputField}
            size="small"
            id="to"
            label={
              this.state.locations[i].type === "pickup"
                ? "PickUp Location"
                : this.state.locations[i].type === "dropoff"
                ? "Drop Off Location"
                : "Choose Location"
            }
            disabled={
              (this.state.locations[i].type ? false : true) ||
              this.state.locations[i].default
            }
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
            className={
              this.state.locations[i].type == "pickup" ? style.checkBox : null
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.locations[i].default}
                  // onChange={(e) => this.handleCheckBox(e, i)}
                  onClick={() => this.changeCheckBoxState(i)}
                  name="checkboxStates"
                  color="#00ADEE"
                />
              }
              label="Load only / IA"
            />
          </div>
        ) : this.state.locations[i].type == "dropoff" ? (
          <div
            className={
              this.state.locations[i].type == "dropoff" ? style.checkBox : null
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.locations[i].default}
                  // onChange={(e) => this.handleCheckBox(e, i)}
                  onClick={() => this.changeCheckBoxState(i)}
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
  //add date on Clicking plus icon
  addDate = () => {
    if (this.state.dates[0]) {
      this.setState({ dates: [...this.state.dates, new Date()] });
    }
  };
  //remove date upon clicking remove icon
  removeDate = (i) => {
    var datesArr = cloneDeep(this.state.dates);
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
  //add custom service
  addCustomService = (e) => {
    e.preventDefault();
    if (e.target.value) {
      this.setState({
        newService: e.target.value,
      });
      if (e.keyCode === 13 && e.target.value) {
        var serviceAdded = {
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
  //change editor's state
  onEditorStateChange = (e) => {
    this.setState({
      editorState: e,
      description: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  render() {
    var { job } = this.props;
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

            <div>
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
                error={this.state.titleError}
              />
            </div>
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
                  error={this.state.multiError}
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
                  <div className={style.styleDate}>
                    <div key={i}>
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
            <div className={style.alignRight} onClick={this.addDate}>
              <i className="fa fa-plus"></i>
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
                  error={this.state.assigneeRequiredError}
                  onChange={this.handleFormInput}
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
                      {this.state.jobType}
                    </MenuItem>
                    {this.state.jobType === "Fixed" ? (
                      <MenuItem value={"Hourly based"}>Hourly based</MenuItem>
                    ) : (
                      <MenuItem value={"Fixed"}>Fixed</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
            {this.state?.locations?.length === 0 && (
              <div className={style.addLocation}>
                <div className={style.addLocationBtn}>
                  <Button onClick={this.addLocation} className={style.button}>
                    Add Location
                  </Button>
                </div>
              </div>
            )}

            {this.state?.locations?.length > 0 && (
              <div>
                {this.state?.locations?.map((location, i) =>
                  this.showLocation(i)
                )}
              </div>
            )}

            {this.state?.locations?.length > 0 && (
              <div className={style.alignRight}>
                <i
                  className="fa fa-plus"
                  name="Add Location"
                  value="Add Location"
                  onClick={this.addLocation}
                />
              </div>
            )}
          </form>

          <div>
            {note?.length > 0 && <h3>Notes</h3>}

            {note?.map((note) => (
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
              <TextareaAutosize
                name=""
                id=""
                cols="65"
                rows="5"
                name="Note"
                value={Note}
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
  showMessage,
  getJob,
};

var mapStateToProps = (state) => ({
  loggedinUser: state.users.user,
  job: state.jobs?.job,
});

export default connect(mapStateToProps, actions)(JobEditDetails);
