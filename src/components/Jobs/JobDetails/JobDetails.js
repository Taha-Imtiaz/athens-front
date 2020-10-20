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
    console.log(props)

    useEffect(() => {

        console.log(jobId)

        getJob(jobId).then((res) => {
            setJob(res.data.job)

            console.log(job)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return <div>

        <div>


            <div className={`row ${style.toprow}`}>
                <div className="col-3 col-md-3">
                    <div className={`card ${style.cardCustom}`} >
                        <div class="card-body">
                            <h5 class="card-title">Customer</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{job ?.customer.name}</h6>
                            <p class="card-text">{job ?.customer ?.phone}</p>
                            <p class="card-text">{job ?.customer ?.email}</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-5">
                    <div className={`container ${style.containerCustom}`}>
                        <h3 className={style.head}>{job ?.title}</h3>
                        <div className={style.btn}>
                            <Button name="Status" />
                        </div>
                        <br />
                        <br />
                        <p className={style.para}>{`${job ?.startDate ?.split("G")[0]}`} |{`${job ?.endDate.split("G")[0]}`}</p>
                        <br />
                        <br />
                        <p className={style.para}>{job ?.from} - {job ?.to}</p>
                        <br />
                        {
job?.services.map(service => <span className={`badge badge-primary m-2 ${style.badges}`}>{service.name}</span>)
                        
                        }


                    </div>
                </div>
                <div className={`col-3 d-flex justify-content-end  col-md-3`}>
                    <div className={style.btns}>
                        <Link style={{ textDecoration: "none" }} to={`/job/edit/${jobId}`}>
                            <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />
                        </Link>
                    </div>
                    <br />
                    <br />
                    <p className={style.para}>{`${job?.startDate?.split("G")[0]}`} |{`${job?.endDate.split("G")[0]}`}</p>
                    <br />
                    <br />
                    {job?.locations && job?.locations.map( list => {
                    return <><p className={style.para}>From : {list.from} To : {list.to}</p>
                    <br /></>
                    })}
                    <span className={`badge badge-primary ${style.badges}`}>Primary</span>
                    <span className={`badge badge-primary ${style.badges}`}>Secondary</span>
                    <span className={`badge badge-primary ${style.badges}`}>Success</span>

                    <Button name={width < 576 ? "" : "Delete"} icon="fa fa-trash" />
                </div>
            </div>




            <div className={`row ${style.row2}`}>
                <div className="col-2">
                    <div className={`container ${style.cont}`}>
                        <h5 className={style.assigneehead} style={{ flexWrap: "nowrap" }}>Assignees</h5>
                        {job ?.assignee.map((assignee) =>
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
                            {job ?.description}
                        </p>

                        {job ?.note.length !== 0 &&
                            <div>

                                <h3 className={style.jobHead}>Notes</h3>
                                <p className={style.para}>
                                    {job ?.note.map((note) => <p>{note.text}</p>)}
                                </p>
                            </div>
                     }

                        {/* <button className={`btn btn-primary ${style.btnCustom}`}>Add Notes</button> */}
                    </div>

                </div>
            </div>
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