import React, { Component } from 'react'
import style from './JobsList.module.css'
import DatePicker from "react-datepicker";
import Button from '../../Button/Button'
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllJobs } from '../../../Redux/Job/jobActions';
import Pagination from '../../Pagination/Pagination';
import SearchBar from '../../SearchBar/SearchBar';

const width = window.innerWidth

class JobsList extends Component {


  state = {
    startDateTo1: "",
    startDateTo2: "",
    startDateTo3: "",
    startDateTo4: "",
    pageSize: 10,
    currentPage: 1
  };

  // var [pageSize, setPageSize] = useState(10);
  // var [currentPage, setCurrentPage] = useState(1)
  componentDidMount = () => {
    var { getAllJobs } = this.props
    var jobObj = {
      query: "",
      filters: {
        startDate: "",
        endDate: "",
        movedDate: "",
        tag: "ABC",
        startYearMonth: ""
      },
      page: 1
    }
    console.log("cdm")
    getAllJobs(jobObj)
  };


  handleChangeTo1 = date => {
    this.setState({
      startDateTo1: date,

    });
  };
  handlePageChange = (page) => {
    var { getAllJobs } = this.props
    var fetchJobsOnPageChange = {
      query: "",
      filters: {
        startDate: "",
        endDate: "",
        movedDate: "",
        tag: "ABC",
        startYearMonth: ""
      },
      page: page
    }

    getAllJobs(fetchJobsOnPageChange)
    this.setState({
      currentPage: page
    })
  }

  handleChangeTo2 = date => {
    this.setState({
      startDateTo2: date
    });
  };

  handleChangeTo3 = date => {
    this.setState({
      startDateTo3: date,
    });
  };

  handleChangeTo4 = date => {
    this.setState({
      startDateTo4: date,
    });
  };

  handleSort = () => {
    var fetchJobsOnPageChange = {
      query: "",
      filters: {
        startDate: "",
        endDate: "",
        movedDate: "",
        tag: "ABC",
        startYearMonth: ""
      },
      page: 1
    }

    getAllJobs(fetchJobsOnPageChange)
  }
  handleDateFilter = () => {
    var fetchJobsOnPageChange = {
      query: "",
      filters: {
        startDate: "",
        endDate: "",
        movedDate: "",
        tag: "",
        startYearMonth: ""
      },
      page: 1
    }

    getAllJobs(fetchJobsOnPageChange)
  }
  render() {
  
    var { jobs } = this.props

    var { pageSize, currentPage } = this.state

    var totalCount = jobs[0] ?.data ?.jobs.total
  //   var formatStartDate, formatEndDate;
  // if (jobs[0]?.data.jobs?.docs.length !== 0) {
  //   formatStartDate = new Date(jobs[0]?.data?.jobs.docs?.map((doc) => doc.startDate));
  //   console.log(formatStartDate)
  //   formatEndDate = new Date(jobs[0]?.data?.jobs.docs.endDate);
  // }
    return (
      <div className={style.toprow}>

        <div className={`row justify-content-center ${style.toprow}`}>
          <div className="col-5 col-md-3">
            <b>
              <h3 className={style.head}>Jobs List Page</h3>
            </b>
          </div>

          <div className={`col-5 col-md-6 ${style.search}`}>
            <SearchBar type = "job" title = "Type title or services"/>
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
            ></i>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" onClick={this.handleSort}>
                Sort By Name
                </a>
              <a className="dropdown-item" onClick={this.handleDateFilter}>
                Recently Added
                </a>
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

              <div className={` ${style.create}`} style={{ paddingRight: "0.5rem" }}>
                <Link style={{ textDecoration: "none" }} to='/calendar'> <Button name="Calendar" /></Link>
              </div>
              <div className={style.btndel}>
                <Button name="Delete" />
              </div>
            </div>
          </div>
        </div>



        {jobs[0] ?.data &&
          <div className={`${style.jumbotron}`}>

            <ul className="list-group">
              <div className={style.li}>
                {jobs[0] ?.data.jobs.docs.map((job, i) => {
                  return (

                    <li key = {i} className=" checkbox list-group-item ">
                      <div className="row justify-content-around">
                        <div className="col-4 col-md-2 text-left">
                          <label>{job.title}</label>
                        </div>
                        <div className="col-4 col-md-2">
                          <i className="fa fa-calendar"> {`${job.startDate.split("G")[0]}`}</i>
                        </div>
                        <div className="col-4 col-md-3">
                          <span>
                            <i className="fa fa-user"></i>
                            {job.assignee.map(x => <label className={`checkbox-inline ${style.assignee}`} for="defaultCheck1">{x.name}</label>)}
                          
                          </span>
                        </div>
                        <div className="col-4 col-md-2">
                          <label>{job.services.map((service) => `${service.name}`)}</label>
                        </div>
                        <div className="col-4 col-md-1">
                          <label>{job.status}</label>
                        </div>
                        <Link style={{ textDecoration: "none", color: "black" }} to={{
                          pathname: `/job/details/${job._id}`,
                          jobProps: job
                        }}>

                          <div className="col-4 col-md-1">
                            <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />
                          </div>
                        </Link>

                      </div>
                    </li>



                  )
                })}


              </div>
              {/* <div className={style.li}>
              <li class=" checkbox list-group-item ">
                <div className="row justify-content-around">
                  <div className="col-2 text-left">
                    <label>Job</label>
                  </div>
                  <div className="col-3">
                    <button className={`btn btn-primary ${style.color}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                      selected={this.state.startDateTo1}
                      onChange={this.handleChangeTo2}
                      placeholderText="To"
                    /> </i></button>
                  </div>
                  <div className="col-3">
                    <span>
                      <i className="fa fa-user"></i>
                      <label className={`checkbox-inline ${style.assignee}`} for="defaultCheck1">Assignee</label>
                    </span>
                  </div>
                  <div className="col-3">
                    <label>Grand Piano</label>
                  </div>
                  <div className="col-1">
                    <label>Status</label>
                  </div>

                </div>

              </li>
            </div>

            <div className={style.li}>
              <li class=" checkbox list-group-item ">
                <div className="row justify-content-around">
                  <div className="col-2 text-left">
                    <label>Job</label>
                  </div>
                  <div className="col-3">
                    <button className={`btn btn-primary ${style.color}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                      selected={this.state.startDateTo1}
                      onChange={this.handleChangeTo3}
                      placeholderText="To"
                    /> </i></button>
                  </div>
                  <div className="col-3">
                    <span>
                      <i className="fa fa-user"></i>
                      <label className={`checkbox-inline ${style.assignee}`} for="defaultCheck1">Assignee</label>
                    </span>
                  </div>
                  <div className="col-3">
                    <label>Grand Piano</label>
                  </div>
                  <div className="col-1">
                    <label>Status</label>
                  </div>

                </div>
              </li>
            </div> */}

              {/* <div className={style.li}>
              <li class=" checkbox list-group-item ">
                <div className="row justify-content-around">
                  <div className="col-2 text-left">
                    <label>Job</label>
                  </div>
                  <div className="col-3">
                    <button className={`btn btn-primary ${style.color}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                      selected={this.state.startDateTo1}
                      onChange={this.handleChangeTo4}
                      placeholderText="To"
                    /> </i></button>
                  </div>
                  <div className="col-3">
                    <span>
                      <i className="fa fa-user"></i>
                      <label className={`checkbox-inline ${style.assignee}`} for="defaultCheck1">Assignee</label>
                    </span>
                  </div>
                  <div className="col-3">
                    <label>Grand Piano</label>
                  </div>
                  <div className="col-1">
                    <label>Status</label>
                  </div>

                </div>
              </li>
            </div> */}

            </ul>
            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        
        }
      </div>
    )
  }

}
var mapStateToProps = (state) => ({
  jobs: state.jobs
})

var actions = {
  getAllJobs
}

export default connect(mapStateToProps, actions)(JobsList)