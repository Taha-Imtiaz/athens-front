import React from 'react'
import style from './JobDetails.module.css'


const JobDetails = () => {
    return <div>
        <div className={`row ${style.toprow}`}>
            <div className="col-3">
                <div className={`card ${style.cardCustom}`} >
                    <div class="card-body">
                        <h5 class="card-title">Customer</h5>
                        <h6 class="card-subtitle mb-2 text-muted">John Doe</h6>
                        <p class="card-text">+1 1234567890</p>
                        <p class="card-text">name@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className={`container ${style.containerCustom}`}>
                    <h3 className={style.head}>Job Title</h3>
                    <button type="button" class="btn btn-primary">Status</button>
                    <br />
                    <br />
                    <p className={style.para}>July 07 - July 10  |  10am - 2pm</p>
                    <br />
                    <br />
                    <p className={style.para}>Start Location - End Location</p>
                    <br />

                    <span className={`badge badge-primary ${style.badges}`}>Primary</span>
                    <span className={`badge badge-primary ${style.badges}`}>Secondary</span>
                    <span className={`badge badge-primary ${style.badges}`}>Success</span>

                </div>
            </div>
            <div className="col-3">
                <div className={style.btncustom}>
                    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit"> Edit</i></button>
                    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit"> Delete</i></button>
                </div>
            </div>
        </div>




        <div className={`row ${style.row2}`}>
            <div className="col-2">
                <div className={`container ${style.cont}`}>
                    <h5>Assignees</h5>
                    <p>Assignee 1</p>
                    <p>Assignee 2</p>
                    <button className={`btn btn-primary ${style.btnCustom}`}>Activities</button>
                </div>
            </div>
            <div className="col-10">
                <div className={`jumbotron ${style.jumbo}`}>
                    <h6 className={style.jobHead}>Job Description</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet odio et nulla bibendum mollis vitae nec lorem. Maecenas condimentum dapibus dolor, ac venenatis mauris fermentum vel. Donec sit amet orci non leo finibus vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum posuere mattis eros, quis mattis tortor porta ac. In ipsum libero, euismod ac est cursus, molestie fermentum magna. In semper velit.
                    </p>
                    <h6>Notes</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet odio et nulla bibendum mollis vitae nec lorem. Maecenas condimentum dapibus dolor
                    </p>
                    <button className={`btn btn-primary ${style.btnCustom}`}>Add Notes</button>
                </div>

            </div>
        </div>
    </div>
}


export default JobDetails