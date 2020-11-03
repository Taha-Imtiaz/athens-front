import React, { Component } from "react";
import style from "./JobEditDetails.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";
import { getJob, getAllMovers, updateJob } from "../../../Redux/Job/jobActions";
import { showMessage } from '../../../Redux/Common/commonActions'
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { clone, cloneDeep } from "lodash"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField } from "@material-ui/core";

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
    jobType:"fixed",
    title: "",
    job: null,
    Note: "",
    customerId: "",
    statusOptions: ["Booked", "Completed", "Pending"],
    status: '',
    assigneeRequired:""
  };

  handleStartDate = (date, i) => {
    let newState = cloneDeep(this.state)
    newState.dates[i] = date;
    this.setState({
      dates: newState.dates
    });
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
      var services = res.data.job.services.map((service, index) => {
        return { id: index + 1, name: service };
      });
      let ids = res.data.job.assignee.map((x) => x._id);
      let parsedDates = res.data.job.dates.map(x => Date.parse(x))
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
      startDateInString,
      endDateInString,
      assigneeRequired,
      userId,
      customerId,
      note
    } = this.state;


    var {
      match: {
        params: { jobId },
      }, history
    } = this.props;
    var { showMessage } = this.props;
    let stringDates = dates.map(x => {
      if (typeof x == 'number') {
        return new Date(x).toDateString()
      } else {
        return x.toDateString()
      }
      //   x.toDateString()
    })
    //  var {startDate, endDate,  title, description, services,startTime, meetTime, from , to, status, assigneesId, customerId,userId } = this.state;
    var { loggedinUser } = this.props;
    var updatedObj = {
      startDate: startDateInString,
      dates: stringDates,
      endDate: endDateInString,
      title,
      description,
      services,
      assigneeRequired,
      startTime,
      // meetTime,
      locations,
      // assigneesId,
      status,
      userId: loggedinUser._id,
      customerId,
      note
    };
    updateJob(jobId, updatedObj).then((res) => {
      showMessage(res.data.message)
      history.push("/job")
    }).catch((error) => {
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
      status: status.toLowerCase()
    })
  };

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


  addLocation = () => {
    this.setState({ locations: [...this.state.locations, { from: null, to: null }] });
  }


  showLocation = (i) => {
    return <>

      <div className="col-4">
        <div className="form-group">
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
      </div></>
  }

  addDate = () => {
    if (this.state.dates[0]) {
      this.setState({ dates: [...this.state.dates, ''] });
    }
  }

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
        <h3 className={style.head}>Job Details Edit</h3>
        <div className="row">
          <div>
            <div >
              <form>
                <div>
                
                  
                  <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
            id="customerId"
            label="Cutomer Id"
            name="customerId"
            autoComplete="customerId"
            autoFocus
            value={this.state.customerId} onChange={this.handleFormInput}
          />
                </div>

                <div className="form-group">
                  {/* <input
                    type="input"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Job Title"
                    aria-describedby="emailHelp"
                    name="title"
                    value={title}
                    onChange={this.handleFormInput}
                  /> */}
                  
                  <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
            id="title"
            label="Job Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={this.state.title} onChange={this.handleFormInput}
          />
                </div>
                <div className="row">
                  {/* <div className="col-6">
                    <div className="form-group">
                      <DatePicker
                        className={style.to}
                        selected={startDate}
                        onChange={this.handleStartDate}
                        placeholderText="Start Date"
                      />
                    </div>
                  </div> */}
                  {this.state.dates.map((x, i) => {
                    return (
                      <div className="form-group col-4">
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
          fullWidth
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
                  <div className="form-group col-3 my-0" onClick={this.addDate}>
                    <i className="fa fa-plus" style={{transform:"translateY(1.5rem)"}}></i>
                  </div>
                  {/* <div className="col-6">
                    <div className="form-group">
                      <DatePicker
                        className={style.to}
                        selected={endDate}
                        onChange={this.handleEndDate}
                        placeholderText="End Date"
                      />
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-4">
                   
                      
                      <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
            id="email"
            label="StartTime"
            name="startTime"
            autoComplete="startTime"
            autoFocus
            value={startTime} onChange={this.handleFormInput}
          />
                   
                  </div>
                  
                  
                     
                      <div className="col-4" >
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

<div className={`col-4`}>


<div class="form-group" style={{marginTop:"1rem"}}>

  <select class="form-control" value = {this.state.jobType} id="sel1" name = "jobType" onChange ={this.handleFormInput}>
    <option >Fixed</option>
    <option>Hourly based</option>
  
  </select>
</div>
                </div>
                    </div>
                 
                

                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Location:</label>
                    </div>
                  </div>

                  {this.state.locations && this.state.locations.map((list, i) => {

                    return <><div className="col-4">
                      <div className="form-group">
                        {/* <input
                          type="input"
                          className="form-control"
                          id="from"
                          placeholder="Pickup"
                          aria-describedby="emailHelp"
                          name="from"
                          value={list.from}
                          onChange={(e) => this.hanldeLocationInput(i, e)}
                        /> */}

                        
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
            autoFocus
            value={list.from}  onChange={(e) => this.hanldeLocationInput(i, e)}
          />
                      </div>
                    </div>
                      <div className="col-4">
                        <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
                          id="to"
                         label="Drop Off"
                          aria-describedby="emailHelp"
                          name="to"
                          value={list.to}
                          onChange={(e) => this.hanldeLocationInputTo(i, e)}
                        />
                      </div>
                      <div className="col-4">
                     
                 
                  <i className="fa fa-plus" style={{transform:"translateY(1.5rem)"}} name="Add Location" value="Add Location" onClick={this.addLocation} />
                  
                
                      </div></>
                  })}
                </div>
              

                <div className="form-group">
                  <Multiselect
                    selectedValues={this.state.services}
                    options={this.servicesOptions} // Options to display in the dropdown
                    onSelect={this.onSelect} // Function will trigger on select event
                    onRemove={this.onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col-4">
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
        </div>
        <div >
          <h4 className={style.jobtag}>Job Description</h4>
          <form>
            <div className = "col-10">
              <TextField
                 variant="outlined"
            // margin="normal"
            required
            fullWidth
            size="small"
                name="description"
                value={description}
                // label = "Job Description"
                id=""
                onChange={this.handleFormInput}
                style={{transform:"translateX(-1.3rem)"}}
              />
            </div>
          </form>
        </div>

        <h4 style={{margin:"0.8rem 0"}}>Assignees</h4>
        <div className="form-group col-10">
          {/* {assignee?.map((assign) => assign.name)} */}
          <div  style={{transform:"translateX(-1.3rem)"}}>
            <Multiselect
              selectedValues={this.state.assignee}
              options={this.state.assigneeList} // Options to display in the dropdown
              onSelect={this.onAssigneeSelect} // Function will trigger on select event
              onRemove={this.onAssigneeRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>
        </div>
        <div className={`${style.tron2}`}>
          {note ?.length !== 0 && <h3 className={style.jobtag}>Notes</h3>}

          {note ?.map((note) => (
            <div style={{ display: "flex" }}>
              <p className={style.para}>{note.text} </p>
              <FontAwesomeIcon
                icon={faTrash}
                style={{ transform: "translateY(0.2rem)" }}
                onClick={() => this.handleDelete(note)}
              />
            </div>
          ))}

            

          <div className="btnalign">
            <button
              onClick={this.handleShow}
              type="submit"
              className={`btn btn-primary ${style.btnCustom}`}
          style = {{transform:"translate3d(-3rem, 1rem, 0)"}}
            >
              Add Notes
            </button>
          </div>
        </div>
        <div className={`col-4 ${style.btnalign}`} style = {{marginBottom:"1.5rem"}}>

          <button
            type="submit"
            className={`btn btn-primary ${style.btnCustom}`}
            onClick={this.handleJobUpdate}
            style = {{transform:"translate3d(-0.4rem, 1rem, 0)"}}
          >
            Update
          </button>
          <button
            type="submit"
            className={`btn btn-primary col-4 ${style.btnCustom}`}
            style = {{transform:"translate3d(0.4rem, 1rem, 0)"}}
          >
            Reset
          </button>
        </div>
        <Modal show={show} onHide={this.handleClose} animation={false} centered>
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
  showMessage
}

var mapStateToProps = (state) => ({
  loggedinUser: state.users.user,
});

export default connect(mapStateToProps, actions)(JobEditDetails);
