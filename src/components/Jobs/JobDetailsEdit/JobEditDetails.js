import React, { Component } from "react";
import style from "./JobEditDetails.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";
import { getJob, getAllMovers } from "../../../Redux/Job/jobActions";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuidv4 } from "uuid";

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
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    title: "",
    job: null,
    Note: "",
  };

  handleStartDate = (date) => {
    console.log(date);
    this.setState({
      startDate: date,
    });
  };
  handleEndDate = (date) => {
    console.log(date);
    this.setState({
      endDate: date,
    });
  };
  componentDidMount = () => {
    // var {getJob} = this.props
    var {
      match: {
        params: { jobId },
      },
    } = this.props;
    // console.log(jobId)
    var { title, job } = this.state;
    console.log(jobId);

    getJob(jobId).then((res) => {
      console.log(res.data.job);
      this.setState({
        services: res.data.job.services,
        assignee: res.data.job.assignee,
      });
      getAllMovers().then((moverRes) => {
        console.log(moverRes);
        var mover = moverRes?.data.movers.docs.map((mover) => mover);
        this.setState({
          assigneeList: mover,
        });
      });
      var services = res.data.job.services.map((service, index) => {
        return { id: index + 1, name: service };
      });
      console.log(res.data.job.startDate, Date.parse(res.data.job.startDate));
      let ids = res.data.job.assignee.map((x) => x._id);
      this.setState({
        job: res.data.job,
        title: res.data.job.title,
        startDate: Date.parse(res.data.job.startDate),
        endDate: Date.parse(res.data.job.endDate),
        startDateInString: res.data.job.startDate,
        endDateInString: res.data.job.endDate,
        startTime: res.data.job.startTime,
        endTime: res.data.job.endTime,
        locationFrom: res.data.job.from,
        locationTo: res.data.job.to,
        description: res.data.job.description,
        options: services,
        assignee: res.data.job.assignee,
        assigneesId: ids,
        note: res.data.job.note,
        show: false,
      });
    });
    // console.log(title)
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
      // console.log(note)
      // this.handleClose()
      console.log(Note);
      let notes = [...this.state.note];
      notes.push({ uid: uuidv4(), text: Note });
      console.log(notes);
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
    console.log(deleteNote);
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
    console.log(value);
    this.setState({
      Note: value,
    });
  };

  handleJobUpdate = () => {
    var {
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      locationFrom,
      locationTo,
      services,
      options,
      description,
      assignee,
    } = this.state;

 var {startDate, endDate, ...otherProps} = this.state;
    var updatedObj = {
    

      startDate: Date.parse(startDate),
      endDate: Date.parse(endDate),
      ...otherProps,
    }
    console.log(updatedObj)
    this.setState({
      updatedObj
    })
    
    
    console.log(this.state);
  };
  onSelect = (selectedList, selectedItem) => {
    let serviceItem = selectedItem;
    console.log(serviceItem);
    let newState = { ...this.state };
    console.log(newState);
    newState.services.push(serviceItem);
    this.setState({ services: newState.services });
  };

  onRemove = (selectedList, removedItem) => {
    let newState = { ...this.state };
    let removeItem = removedItem;
    console.log(removeItem);

    var updatedState = newState.services.findIndex(
      (service) => service === removeItem
    );
    newState.services.splice(updatedState, 1);
    console.log(newState);
    this.setState({ newState });
  };

  onAssigneeSelect = (selectedList, selectedItem) => {
    console.log(selectedItem);
    let assigneeItem = selectedItem;

    let newState = { ...this.state };
    console.log(newState);
    newState.assigneesId.push(assigneeItem._id);
    this.setState({ newState });
  };

  onAssigneeRemove = (selectedList, removedItem) => {
    let newState = { ...this.state };
    let removeItem = removedItem._id;
    console.log(removeItem);
    // console.log(newState.assigneesId)
    var index = newState.assigneesId.findIndex(
      (assigneeId) => assigneeId === removeItem
    );
    console.log(index);
    newState.assigneesId.splice(index, 1);

    this.setState({ newState });
    console.log(newState);

    // newState.assigneesId.push(assigneeItem)
    // this.setState({ assignee: removedItem })
  };
  render() {
    var { job } = this.state;
    var {
      match: {
        params: { jobId },
      },
    } = this.props;
    console.log(job);

    var {
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      locationFrom,
      assignee,
      locationTo,
      description,
      assigneesId,
      Note,
      note,
      show,
    } = this.state;
    return (
      <div>
        <h3 className={style.head}>Job Details Edit</h3>
        <div className="row">
          <div className="col-8">
            <div className={`${style.tron}`}>
              <form>
                <div className="form-group">
                  <input
                    type="input"
                    class="form-control"
                    id="jobTitle"
                    placeholder="Job Title"
                    aria-describedby="emailHelp"
                    name="title"
                    value={title}
                    onChange={this.handleFormInput}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <div class="form-group">
                      <DatePicker
                        className={style.to}
                        selected={startDate}
                        onChange={this.handleStartDate}
                        placeholderText="Start Date"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="form-group">
                      <DatePicker
                        className={style.to}
                        selected={endDate}
                        onChange={this.handleEndDate}
                        placeholderText="End Date"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <input
                        type="input"
                        class="form-control"
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
                        class="form-control"
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
                  <div className="col-4">
                    <div class="form-group">
                      <label>Location:</label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="form-group">
                      <input
                        type="input"
                        class="form-control"
                        id="from"
                        placeholder="Start"
                        aria-describedby="emailHelp"
                        name="locationFrom"
                        value={locationFrom}
                        onChange={this.handleFormInput}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <input
                      type="input"
                      class="form-control"
                      id="to"
                      placeholder="End"
                      aria-describedby="emailHelp"
                      name="locationTo"
                      value={locationTo}
                      onChange={this.handleFormInput}
                    />
                  </div>
                </div>

                <div class="form-group">
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
            <div class="dropdown">
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
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button">
                  Action
                </button>
                <button class="dropdown-item" type="button">
                  Another action
                </button>
                <button class="dropdown-item" type="button">
                  Something else here
                </button>
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
                class="form-control"
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

export default JobEditDetails;
