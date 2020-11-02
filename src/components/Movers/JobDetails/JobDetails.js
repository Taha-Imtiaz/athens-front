import React, { useState, useEffect } from 'react'
import style from './JobDetails.module.css'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'
import { updateJob } from '../../../Redux/Mover/moverActions'

import { getJob } from '../../../Redux/Job/jobActions'

const MoversJobDetails = (props) => {

    var [job, setJob] = useState(null)
    var { match: { params: { jobId } } } = props
    useEffect(() => {

        getJob(jobId).then((res) => {
            setJob(res.data.job)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const paidInCash = () => {
        let { history } = props;
        updateJob(job._id, { status: 'Paid Cash' }).then((res) => {
            history.push('/mover')
        })
    }

    return <div className={style.main}>
        {job &&
            <><div className={`row ${style.toprow}`}>
                <div className={`col-6 ${style.title}`}>
                    <h3>{job.title}</h3>
                </div>
                <div className={`col-6 ${style.topbtn}`}>
                    <span className={`badge badge-primary ${style.badges2}`}>{job.status}</span>
                </div>
            </div>
                <p>{job.startTime} - {job.meetTime}</p>
                {job.locations.map((list, i) => <p key={i}>{list.from} to {list.to}</p>)}
                {job.services.map((service, i) => <span key={i} className={`badge badge-primary ${style.badges}`}>{service.name}</span>)}

                <h3 className={style.head}>Job Description</h3>
                <div className={`card ${style.cardwidth}`}>
                    <div className="card-body">
                        <p className="card-text">{job.description}</p>
                    </div>
                </div>


                <h3 className={style.head}>Assignee</h3>
                {job.assignee.map((assignee, i) => <span key={i} className={`badge badge-primary ${style.badges2}`}>{assignee.name}</span>)}



                <h3 className={style.head}>Customer</h3>
                <div className={`card ${style.carddetail}`}>
                    <div className="card-body">
                        <h5 className="card-title">Account Holder</h5>
                        <p className="card-text">{job.customer.firstName}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        {/* <li className="list-group-item"><span>Location: </span>{job.customer.}</li> */}
                        <li className="list-group-item"><span>Phone Number: </span>{job.customer.phone}</li>
                        <li className="list-group-item"><span>Email: </span>{job.customer.email}</li>
                    </ul>

                </div>

                <h3 className={style.head}>Notes</h3>
                <div className={`card ${style.cardwidth}`}>
                    {job.note.map((note, i) =>
                        <div key={i} className="card-body">
                            <p className="card-text">{note.text}</p>
                        </div>
                    )}
                </div>

                {job.status == 'booked' || job.status == 'completed' ?
                    <div className={`row ${style.btnrow}`}>
                        <div className="col-6 d-flex">
                            <Button name="Pay in Cash" onClick={paidInCash} />
                        </div>
                        <div className={`col-6 d-flex ${style.onlinebtn}`}>
                            <Link to={{
                                pathname: '/mover/payment',
                                jobId: job._id
                            }} style={{ textDecoration: "none" }} > <Button name="Pay Online" /></Link>
                        </div>

                    </div>
                    : null}
            </>}
    </div>
}

export default MoversJobDetails