import React from 'react'
import style from './JobDetails.module.css'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'


const MoversJobDetails = () => {
    return <div className={style.main}>

        <div className={`row ${style.toprow}`}>
            <div className={`col-6 ${style.title}`}>
                <h3>Job Title</h3>
            </div>
            <div className={`col-6 ${style.topbtn}`}>
                <span className={`badge badge-primary ${style.badges2}`}>Completed</span>
            </div>
        </div>
        <p>July 07 - July 10  |  10am - 2pm</p>
        <p>Start Location - End Location</p>
        <span className={`badge badge-primary ${style.badges}`}>Primary</span>
        <span className={`badge badge-primary ${style.badges}`}>Secondary</span>
        <span className={`badge badge-primary ${style.badges}`}>Success</span>

        <h3 className={style.head}>Job Description</h3>
        <div className={`card ${style.cardwidth}`}>
            <div className="card-body">
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at dictum augue, sit amet dignissim orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at dictum augue, sit amet dignissim orci. Aenean a lorem eleifend massa porta varius at at nibhLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at dictum augue, sit amet dignissim orci. Aenean a lorem eleifend massa porta varius at at nibhAenean a lorem eleifend massa porta varius at at nibh</p>
            </div>
        </div>


        <h3 className={style.head}>Assignee</h3>
        <span className={`badge badge-primary ${style.badges2}`}>Assignee 1</span>
        <span className={`badge badge-primary ${style.badges2}`}>Assignee 2</span>
        <span className={`badge badge-primary ${style.badges2}`}>Assignee 3</span>

        <h3 className={style.head}>Customer</h3>
        <div className={`card ${style.carddetail}`}>
            <div className="card-body">
                <h5 className="card-title">Account Holder</h5>
                <p className="card-text">John Doe</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><span>Location: </span>Washington Dc</li>
                <li className="list-group-item"><span>Phone Number: </span>0331-XXXXXXXX</li>
                <li className="list-group-item"><span>Email: </span>john@gmail.com</li>
            </ul>

        </div>

        <h3 className={style.head}>Notes</h3>
        <div className={`card ${style.cardwidth}`}>
            <div className="card-body">
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>


        <div className={`row ${style.btnrow}`}>
            <div className="col-6 d-flex">
                <Button name="Paid in Cash" />
            </div>
            <div className={`col-6 d-flex ${style.onlinebtn}`}>
                <Link style={{ textDecoration: "none" }} to='/mover/payment'> <Button name="Pay Online" /></Link>
            </div>

        </div>
    </div>
}

export default MoversJobDetails