import React, { useState, useEffect } from 'react'
import style from './JobDetails.module.css'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'
import { updateJob } from '../../../Redux/Mover/moverActions'

import { getJob } from '../../../Redux/Job/jobActions'
import { connect } from 'react-redux';
import { showMessage } from '../../../Redux/Common/commonActions';

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
        let { history, showMessage } = props;
        updateJob(job._id, { status: 'Paid Cash' }).then((res) => {
            console.log(res)
            if (res.data.status == 200) {
                showMessage(res.data.message)
                history.push('/mover')
            }
        })
    }

    return <div className={style.main}>
        {job &&
            <><div className={`row ${style.toprow}`}>
                <div className="col-3">
              



                <h3 style = {{fontFamily:"Roboto"}}>Customer</h3>
                <div className={`card`}>
                    <div className="card-body" style = {{fontFamily:"Roboto"}}>
                        <h5 className="card-title">Account Holder</h5>
                        <p className="card-text">{job.customer.firstName}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        {/* <li className="list-group-item"><span>Location: </span>{job.customer.}</li> */}
                        <li className="list-group-item"><span>Phone Number: </span>{job.customer.phone}</li>
                        <li className="list-group-item"><span>Email: </span>{job.customer.email}</li>
                    </ul>

                </div>
                <div className="row">
                    <div className="col">
                <h3 className={style.head} style = {{fontFamily:"Roboto"}}>Assignee</h3>
                {job.assignee.map((assignee, i) => 
                <div className="card">
                    <div className="card-body" style = {{fontFamily:"Roboto"}}>
                <span key={i}>{assignee.name}</span>
                </div>
                </div>)}
                </div>
                </div>
                </div>
                <div className="col-7">
                <div>
                    <h3 style = {{fontFamily:"Roboto"}}>{job.title}</h3>
                </div>
                <p>{job.startTime} {job.meetTime ? '- ' + job.meetTime : null}</p>
                {job.locations.map((list, i) => <p key={i}>{list.from} to {list.to}</p>)}
                {job.services.map((service, i) => <span key={i} className={`badge badge-primary ${style.badges}`}>{service.name}</span>)}

                <h3 className={style.head} style = {{fontFamily:"Roboto"}}>Job Description</h3>
                <div className={`card`} style = {{border:"2px solid rgba(0,0,0,0.125)"}}>
                    <div className="card-body" style = {{fontFamily:"Roboto"}}>
                        <p className="card-text">{job.description}</p>
                    </div>
                </div>


                <h3 className={style.head} style = {{fontFamily:"Roboto"}}>Notes</h3>
                <div className={`card`}  style = {{border:"2px solid rgba(0,0,0,0.125)"}}>
                    {job.note.map((note, i) =>
                        <div key={i} className="card-body" style = {{fontFamily:"Roboto"}} >
                            <p className="card-text">{note.text}</p>
                        </div>
                    )}
                </div>


                {job.status == 'booked' || job.status == 'completed' ?
                    <div className={`row`}>
                        <div className="col-3" style ={{transform:"translateY(1rem)"}}>
                            <Button name="Pay in Cash" onClick={paidInCash} />
                        </div>
                        <div className={`col-3 `} style ={{transform:"translate3d(-4rem,1rem, 0)"}}>
                            <Link to={{
                                pathname: '/mover/payment',
                                jobId: job._id
                            }} style={{ textDecoration: "none" }} > <Button name="Pay Online" /></Link>
                        </div>

                    </div>
                    : null}
                </div>
               
                                
                <div className={`col-2`}>
                <Button name={`${job.status}`} />
                </div>      
               
            </div>
               


             

               

              
            </>}
    </div>
}

var actions = {
    showMessage
};

export default connect(null, actions)(MoversJobDetails);