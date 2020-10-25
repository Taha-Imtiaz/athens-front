import React from 'react'
import style from './JobDetails.module.css'
import Button from '../../Button/Button'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getJob } from '../../../Redux/Job/jobActions'
import { useEffect } from 'react'
import { useState } from 'react'

const JobDetails = (props) => {
    const width = window.innerWidth
    var jobprops = props.location.jobProps
    // var job = null
    var [job, setJob] = useState(null)

    // var {getJob, jobs} = props 
    var { match: { params: { jobId } } } = props

    useEffect(() => {

        getJob(jobId).then((res) => {
            setJob(res.data.job)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return <div>

        <div>{job ?
            <> <div className={`row ${style.toprow}`}>
                <div className="col-3 col-md-3">
                    <div className={`card ${style.cardCustom}`} >
                        <div className="card-body">
                            <h5 className="card-title">Customer</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{job.customer.firstName} {job.customer.lastName}</h6>
                            <p className="card-text">{job.customer.phone}</p>
                            <p className="card-text">{job.customer.email}</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-5">
                    <div className={`container ${style.containerCustom}`}>
                        <h3 className={style.head}>{job.title}</h3>
                        <br></br>
                        <p>Job Id: {job._id}</p>
                        <br />
                        <br />
                        <p className={style.para}>{
                            job.dates.map(x => x)
                        }</p>
                        <br />
                        <br />

                        {job.locations && job.locations.map(list => {
                            return <><p className={style.para}>Pickup : {list.from} Drop Off : {list.to}</p>
                                <br /></>
                        })}
                        <br />
                        {
                            job.services.map(service => <span className={`badge badge-primary m-2 ${style.badges}`}>{service.name}</span>)

                        }

                    </div>
                </div>

                <div className={`col-3 d-flex justify-content-end  col-md-3`}>
                    <div className={style.btns}>

                        <Link style={{ textDecoration: "none" }} to={`/job/edit/${jobId}`}>
                            <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />
                        </Link>
                    </div>
                    <div className={style.btns}>
                        {/* <Button name="Status" /> */}
                    </div>

                    <div className={style.btns}>
                        {/* <Button name={width < 576 ? "" : "Delete"} icon="fa fa-trash" /> */}
                    </div>
                </div>
            </div>

                <div className={`row ${style.row2}`}>
                    <div className="col-2">
                        <div className={`container ${style.cont}`}>
                            <h5 className={style.assigneehead} style={{ flexWrap: "nowrap" }}>Assignees</h5>
                            {job.assignee.map((assignee) =>
                                <p className={style.assigneehead}>{assignee.name}</p>
                            )}

                            {/* <p className={style.assigneehead} style = {{flexWrap:"nowrap"}}>Assignee 2</p> */}
                            <div>
                                <Button name="Activities" />
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className={`${style.jumbo}`}>
                            <h3 className={style.jobHead}>Job Description</h3>
                            <p className={style.para}>
                                {job.description}
                            </p>

                            {job.note.length !== 0 &&
                                <div>

                                    <h3 className={style.jobHead}>Notes</h3>
                                    {job.note.map(x => <p className={style.para}>
                                        {x.text}
                                    </p>
                                    )}
                                </div>
                            }
                            {/* <button className={`btn btn-primary ${style.btnCustom}`}>Add Notes</button> */}
                        </div>

                    </div>
                </div></> : null

        }

        </div>

    </div>
}
// var mapStateToProps = (state) => ({
//     jobs: state.jobs
// })
// var actions = {
//     getJob
// }

export default JobDetails