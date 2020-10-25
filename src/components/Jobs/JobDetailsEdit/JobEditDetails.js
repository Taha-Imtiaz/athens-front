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

import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    endTime: "",
    title: "",
    job: null,
    Note: "",
    customerId: "",
    statusOptions: ["Booked", "Completed", "Pending"],
    status: ''
  };

  // handleStartDate = (date) => {
  //   this.setState({
  //     startDate: date,
  //     startDateInString: date.toString(),
  //   });
  // };

  handleStartDate = (date, i) => {
    console.log(typeof date, i);

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
        endTime: res.data.job.endTime,
        locations: res.data.job.locations,
        description: res.data.job.description,
        options: services,
        assignee: res.data.job.assignee,
        // assigneeList:assigneeList,
        assigneesId: ids,
        note: res.data.job.note,
        userId: "5f732f880cf3f60894f771b9",
        status: res.data.job.status,
        show: false,
        customerId: res.data.job.customer._id,
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
      endTime,
      locations,
      services,
      options,
      description,
      assigneesId,
      assignee,
      status,
      startDateInString,
      endDateInString,
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
    console.log(dates)
    let stringDates = dates.map(x => {
      console.log(typeof x)
      if (typeof x == 'number') {
        return new Date(x).toDateString()
      } else {
        return x.toDateString()
      }
      //   x.toDateString()
      // console.log(typeof x ==)
    })
    //  var {startDate, endDate,  title, description, services,startTime, endTime, from , to, status, assigneesId, customerId,userId } = this.state;
    var updatedObj = {
      startDate: startDateInString,
      dates: stringDates,
      endDate: endDateInString,
      title,
      description,
      services,
      startTime,
      endTime,
      locations,
      assigneesId,
      status,
      userId,
      customerId,
      note
    };
    console.log(jobId, updatedObj)
    updateJob(jobId, updatedObj).then((res) => {
      showMessage(res.data.message)
      history.push("/job")
    }).catch((error) => {
      console.log(error)
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
      console.log(this.state)
      this.setState({ dates: [...this.state.dates, ''] });
      console.log(this.state)
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
      endTime,
      from,
      assignee,
      to,
      description,
      assigneesId,
      Note,
      note,
      show,
    } = this.state;
    return (
      <div>
        {/* <ToastContainer position="bottom-right"/> */}
        <h3 className={style.head}>Job Details Edit</h3>
        <div className="row">
          <div className="col-8">
            <div className={`${style.tron}`}>
              <form>
                <div className={`form-group ${style.input}`}>
                  <label htmlFor="">Customer Id</label>
                  <input
                    type="input"
                    className="form-control"
                    id="jobTitle"
                    name="customerId"
                    value={this.state.customerId}
                    onChange={this.handleFormInput}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <input
                    type="input"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Job Title"
                    aria-describedby="emailHelp"
                    name="title"
                    value={title}
                    onChange={this.handleFormInput}
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
                      <div className="form-group col-3">
                        <DatePicker
                          className={style.to}
                          selected={this.state.dates[i]}
                          onChange={(e) => this.handleStartDate(e, i)}
                          placeholderText="Choose Dates"
                          className="form-control"
                        />
                      </div>
                    )
                  })}
                  <div className="form-group col-3 my-0" onClick={this.addDate}>
                    <i className="fa fa-plus"></i>
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
                  <div className="col-6">
                    <div className="form-group">
                      <input
                        type="input"
                        className="form-control"
                        id="time"
                        placeholder="Start Time"
                        aria-describedby="emailHelp"
                        name="startTime"
                        value={startTime}
                        onChange={this.handleFormInput}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <input
                        type="input"
                        className="form-control"
                        id="time"
                        placeholder="Time"
                        aria-describedby="emailHelp"
                        name="endTime"
                        value={endTime}
                        onChange={this.handleFormInput}
                      />
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
                        <input
                          type="input"
                          className="form-control"
                          id="from"
                          placeholder="Pickup"
                          aria-describedby="emailHelp"
                          name="from"
                          value={list.from}
                          onChange={(e) => this.hanldeLocationInput(i, e)}
                        />
                      </div>
                    </div>
                      <div className="col-4">
                        <input
                          type="input"
                          className="form-control"
                          id="to"
                          placeholder="Drop Off"
                          aria-describedby="emailHelp"
                          name="to"
                          value={list.to}
                          onChange={(e) => this.hanldeLocationInputTo(i, e)}
                        />
                      </div>
                      <div className="col-4">
                      </div></>
                  })}
                </div>
                <div className="form-group">
                  <div style={{ float: 'right' }}>
                    <input type="button" className="btn btn-primary" name="Add Location" value="Add Location" onClick={this.addLocation} />
                  </div>
                </div><br /><br />

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
            <div className="dropdown">
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
            </div>
          </div>
        </div>
        <div className={`${style.tron2}`}>
          <h3 className={style.jobtag}>Job Description</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="description"
                value={description}
                id=""
                onChange={this.handleFormInput}
              />
            </div>
          </form>
        </div>

        <h3 className={style.assigneehead}>Assignees</h3>
        <div className="row" style={{ margin: "1.5rem 4.5rem" }}>
          {/* {assignee?.map((assign) => assign.name)} */}
          <div className="col-8">
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
            >
              Add Notes
            </button>
          </div>
        </div>
        <div className={style.btnalign}>
          <button
            type="submit"
            className={`btn btn-primary ${style.btnCustom}`}
            onClick={this.handleJobUpdate}
          >
            Update
          </button>
          <button
            type="submit"
            className={`btn btn-primary ${style.btnCustom}`}
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


export default connect(null, actions)(JobEditDetails);
