import React from 'react'
import style from './JobDetails.module.css'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'

const JobDetails = () => {
    const width = window.innerWidth
    return <div>
        <div className={`row ${style.toprow}`}>
            <div className="col-3 col-md-3">
                <div className={`card ${style.cardCustom}`} >
                    <div class="card-body">
                        <h5 class="card-title">Customer</h5>
                        <h6 class="card-subtitle mb-2 text-muted">John Doe</h6>
                        <p class="card-text">+1 1234567890</p>
                        <p class="card-text">name@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="col-6 col-md-5">
                <div className={`container ${style.containerCustom}`}>
                    <h3 className={style.head}>Job Title</h3>
                    <div className={style.btn}>
                        <Button name="Status" />
                    </div>
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
            <div className={`col-3 d-flex justify-content-end  col-md-3`}>
                <div className={style.btns}>
                    <Link style={{ textDecoration: "none"}} to='/job/edit'>
                        <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />
                    </Link>
                </div>

                <Button name={width < 576 ? "" : "Delete"} icon="fa fa-trash" />
            </div>
        </div>




        <div className={`row ${style.row2}`}>
            <div className="col-2">
                <div className={`container ${style.cont}`}>
                    <h5 className={style.assigneehead} style = {{flexWrap:"nowrap"}}>Assignees</h5>
                    <p className={style.assigneehead} style = {{flexWrap:"nowrap"}}>Assignee 1</p>
                    <p className={style.assigneehead} style = {{flexWrap:"nowrap"}}>Assignee 2</p>
                    <div className={style.btncustom}>
                        <Button name="Activities" />
                    </div>
                </div>
            </div>
            <div className="col-10">
                <div className={`${style.jumbo}`}>
                    <h3 className={style.jobHead}>Job Description</h3>
                    <p className={style.para}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet odio et nulla bibendum mollis vitae nec lorem. Maecenas condimentum dapibus dolor, ac venenatis mauris fermentum vel. Donec sit amet orci non leo finibus vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum posuere mattis eros, quis mattis tortor porta ac. In ipsum libero, euismod ac est cursus, molestie fermentum magna. In semper velit.
                    </p>
                    <h3 className={style.jobHead}>Notes</h3>
                    <p className={style.para}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet odio et nulla bibendum mollis vitae nec lorem. Maecenas condimentum dapibus dolor
                    </p>
                    <button className={`btn btn-primary ${style.btnCustom}`}>Add Notes</button>
                </div>

            </div>
        </div>
    </div>
}


export default JobDetails