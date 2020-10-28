import React, { Component } from "react";
import style from "./JobsList.module.css";
import DatePicker from "react-datepicker";
import Button from "../../Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllJobs,  filterJobsByDate } from "../../../Redux/Job/jobActions";
import Pagination from "../../Pagination/Pagination";
import SearchBar from "../../SearchBar/SearchBar";
import { Popover } from "reactstrap";
import { PopoverHeader, PopoverBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faBook } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";

const width = window.innerWidth;

class JobsList extends Component {
  state = {
    startDateTo1: "",
    startDateTo2: "",
    startDateTo3: "",
    startDateTo4: "",
    pageSize: 10,
    currentPage: 1,
    popoverOpen: false,
    show: false,
    dates: "",
  };
  handleToggle = () =>
    this.setState({
      popoverOpen: !this.popoverOpen,
    });

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    // var { note } = this.state;
    this.setState({
      show: false,
      // note: notes,
    });
  };
  // var [pageSize, setPageSize] = useState(10);
  // var [currentPage, setCurrentPage] = useState(1)
  componentDidMount = () => {
    var { getAllJobs } = this.props;
    var jobObj = {
      query: "",
      filters: {
        startDate: "",
        endDate: "",
        movedDate: "",
        tag: "ABC",
        startYearMonth: "",
      },
      sort: {
        createdAt: -1,
      },
      page: 1,
    };
    getAllJobs(jobObj);
  };

  handleChangeTo1 = (date) => {
    this.setState({
      startDateTo1: date,
    });
  };

  handlePageChange = (page) => {
    var { getAllJobs } = this.props;
    var fetchJobsOnPageChange = {
      query: "",
      filters: {
        startDate: "",
        endDate: "",
        movedDate: "",
        tag: "ABC",
        startYearMonth: "",
      },
      page: page,
    };

    getAllJobs(fetchJobsOnPageChange);
    this.setState({
      currentPage: page,
    });
  };

  handleChangeTo2 = (date) => {
    this.setState({
      startDateTo2: date,
    });
  };

  handleChangeTo3 = (date) => {
    this.setState({
      startDateTo3: date,
    });
  };

  handleChangeTo4 = (date) => {
    this.setState({
      startDateTo4: date,
    });
  };

  handleSort = () => {
    console.log("Caleed");
    var { getAllJobs } = this.props;
    var fetchJobsOnPageChange = {
      query: "",
      filters: {
        startDate: "",
        endDate: "",
        movedDate: "",
        tag: "",
        startYearMonth: "",
      },
      page: 1,
    };

    getAllJobs(fetchJobsOnPageChange);
  };

  filterJobByDate = (e) => {
    
 var {filterJobsByDate} = this.props
    console.log(e.target.value)
    this.setState({
      dates: e.target.value,
    });
    var {dates} = this.state
   console.log(dates);
   let date  = new Date(e.target.value)
console.log(date.toString())
   var DateFilters = {
    filters: {
      dates:date.toString(),
      movedDate: "",
     startYearMonth :date.toString()
  },
 page:1
   }
  console.log(DateFilters)
   filterJobsByDate(DateFilters)
  };

  handleDateFilter = () => {
    var { getAllJobs } = this.props;

    var fetchJobsOnPageChange = {
      query: "",
      filters: {
        startDate: "",
        endDate: "",
        movedDate: "",
        tag: "",
        startYearMonth: "",
      },
      sort: {
        createdAt: -1,
      },
      page: 1,
    };
    getAllJobs(fetchJobsOnPageChange);
  };
  render() {
    var { jobs } = this.props;
    console.log(jobs);
    var { pageSize, currentPage } = this.state;

    var totalCount = jobs[0]?.data?.jobs.total;
    var { popoverOpen } = this.state;
    var { show, dates } = this.state;
    return (
      <div className={style.toprow}>
        <div className={`row justify-content-center ${style.toprow}`}>
          <div className="col-5 col-md-3">
            <b>
              <h3 className={style.head}>Jobs List Page</h3>
            </b>
          </div>

          <div className={`col-5 col-md-6 ${style.search}`}>
            <SearchBar type="job" title="Type title or services" />
          </div>
          <div className={`col-2 col-md-2 d-flex ${style.filter}`}>
            <i
              className="fa fa-filter dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ transform: "translateY(1.5rem)" }}
            ></i>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style={{ margin: "-2.5rem", width: "15rem" }}
            >
              <a className="dropdown-item" onClick={this.handleSort}>
                Sort By Name
              </a>
              <a className="dropdown-item" onClick={this.handleDateFilter}>
                Recently Added
              </a>
              <input
                type="date"
                name="dates"
                value={dates}
                id=""
                style={{ width: "10rem", margin: " 1rem 2rem" }}
                onChange={(e) => this.filterJobByDate(e)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            {/* <h3 className={style.head}>Jobs List Page</h3> */}
          </div>

          {/* <div className={`col-4`}>
            <Link style={{ textDecoration: "none" }} to='/job/create'> <Button name="Calendar" /> </Link>
          </div> */}

          <div className="col-6">
            <div className={`d-flex justify-content-end ${style.buttons}`}>
              <div
                className={` ${style.create}`}
                style={{ paddingRight: "0.5rem" }}
              >
                <Link style={{ textDecoration: "none" }} to="/calendar">
                  <button
                    className=" btn btn-primary"
                    style={{ background: "#00ADEE", transform:"translateY(-4.8rem)"}}
                  >
                    Calender
                  </button>
                </Link>
              </div>
              <div className={style.btndel}>
                {/* <Button name="Delete" /> */}
              </div>
            </div>
          </div>
        </div>

        {jobs[0] && jobs[0].data.jobs.docs.length > 0 ? (
          <div className={`${style.jumbotron}`}>
            <div className="row" style={{ margin: "1rem", fontWeight: "bold" }}>
              <div className="col-1"></div>
              <div className="col-2" style={{ transform: "translateX(-2rem)" }}>
                Title
              </div>
              <div className="col-2">Date</div>
              <div className="col-2">Assignee</div>
              <div className="col-2" style={{ transform: "translateX(6rem)" }}>
                Service
              </div>
              <div className="col-2" style={{ transform: "translateX(5rem)" }}>
                Status
              </div>
              <div className="col-1" style={{ transform: "translateX(-1rem)" }}>
                Details
              </div>
            </div>

            <ul className={style.listGroup}>
              <div className={style.li}>
                {jobs[0].data.jobs.docs.map((job, i) => {
                  return (
                    <li
                      key={i}
                      className=" checkbox list-group-item "
                      style={{
                        borderBottom: "1px solid #a8a8a8",
                        background: "#5D5C61",
                        color: "#fff",
                      }}
                    >
                      <div className="row justify-content-around">
                        <div className="col-4 col-md-2 text-left">
                          <label>{job.title}</label>
                        </div>
                        <div className="col-4 col-md-2">
                          <i className="fa fa-calendar">
                            {" "}
                            {
                              <span>
                                {job.dates[0]}
                                {job.dates.length > 1 && (
                                  <span>
                                    <span
                                      id={`Popover${job._id}`}
                                    >{` .....`}</span>
                                    <Popover
                                      placement="bottom"
                                      isOpen={popoverOpen}
                                      target={`Popover${job._id}`}
                                      toggle={this.handleToggle}
                                    >
                                      <PopoverBody>
                                        {job.dates.filter(
                                          (date) => date !== date[0]
                                        )}
                                      </PopoverBody>
                                    </Popover>
                                  </span>
                                )}
                              </span>
                            }
                          </i>
                        </div>
                        <div className="col-4 col-md-3">
                          <span>
                            <i className="fa fa-user"></i>
                            {job.assignee.map((x, i) => (
                              <label
                                key={i}
                                className={`checkbox-inline ${style.assignee}`}
                                htmlFor="defaultCheck1"
                              >
                                {x.name}
                              </label>
                            ))}
                          </span>
                        </div>
                        <div className="col-4 col-md-2">
                          <label>
                            {job.services.map((service) => (
                              <label
                                style={{ display: "flex", flexFlow: "column" }}
                              >
                                {service.name}
                              </label>
                            ))}
                          </label>
                        </div>
                        <div className="col-4 col-md-1">
                          <label style={{ transform: "translateX(-2rem)" }}>
                            {job.status}
                          </label>
                        </div>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={{
                            pathname: `/job/details/${job._id}`,
                            jobProps: job,
                          }}
                        >
                          <div className="col-4 col-md-1">
                            {/* <button
                              icon="fa fa-edit"
                              className="btn btn-primary"
                              style={{ background: "#00ADEE" }}
                            >
                              Details
                            </button> */}

                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              style={{
                                transform: "translateX(-2.5rem)",
                                color: "white",
                              }}
                            />
                          </div>
                        </Link>

                        <FontAwesomeIcon
                          icon={faBook}
                          style={{
                            transform: "translateX(-2.5rem)",
                            // color: "white",
                          }}
                          onClick={this.handleShow}
                        />
                        <Modal
                          show={show}
                          onHide={this.handleClose}
                          animation={false}
                          centered
                          backdrop={false}
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
                              // name="Note"
                              // value={Note}
                              // onChange={this.handleAddNote}
                            ></textarea>
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              className="btn btn-primary"
                              // variant="secondary"
                              onClick={this.handleClose}
                            >
                              Close
                            </button>
                            <button
                              className="btn btn-primary"
                              variant="primary"
                              // onClick={this.AddNote}
                            >
                              Add Note
                            </button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </li>
                  );
                })}
              </div>
            </ul>
            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        ) : (
          <div className="text-center">
            <img src="/images/no-data-found.png" />
          </div>
        )}
      </div>
    );
  }
}
var mapStateToProps = (state) => ({
  jobs: state.jobs,
});

var actions = {
  getAllJobs,
  filterJobsByDate
};

export default connect(mapStateToProps, actions)(JobsList);
