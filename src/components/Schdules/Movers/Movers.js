import React from 'react'
import style from './Movers.module.css'
import SideBar from '../../Sidebar/SideBar'

const MoversSchedule = () => {
    return <div className={`row ${style.toprow}`}>
        <div className="col-1">
            <SideBar name1="Unavailable" name2="Daily Schedule" name3="Movers" />
        </div>
        <div className="col-8">
            <h3 className={style.head}>Daily Schedule</h3>
            <div className={style.lists}>
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class={`nav-item ${style.items}`}>
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Monday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="true">Tuesday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Wednesday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Thursday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Friday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Saturday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Sunday</a>
                    </li>
                </ul>
            </div>


            <div className={`list-group ${style.list}`}>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 className={`mb-1 ${style.name}`}>Job Name</h5>
                        <small><button><i class="fa fa-group"></i></button></small>
                    </div>
                    <div className={style.para}>
                        <h5><span class="badge badge-primary">Packing</span></h5>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 className={`mb-1 ${style.name}`}>Job Name</h5>
                        <small><button><i class="fa fa-group"></i></button></small>
                    </div>
                    <div className={style.para}>
                        <h5><span className={`badge badge-primary ${style.badge}`}>Packing</span>
                            <span className={`badge badge-primary ${style.badge}`}>Loading/Unloading</span></h5>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 className={`mb-1 ${style.name}`}>Job Name</h5>
                        <small><button><i class="fa fa-group"></i></button></small>
                    </div>
                    <div className={style.para}>
                        <h5><span className={`badge badge-primary ${style.badge}`}>Packing</span>
                            <span className={`badge badge-primary ${style.badge}`}>Loading/Unloading</span></h5>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 className={`mb-1 ${style.name}`}>Job Name</h5>
                        <small><button><i class="fa fa-group"></i></button></small>
                    </div>
                    <div className={style.para}>
                        <h5><span className={`badge badge-primary ${style.badge}`}>Packing</span>
                            <span className={`badge badge-primary ${style.badge}`}>Loading/Unloading</span></h5>
                    </div>
                </a>
            </div>

        </div>
        <div className={`col-3 ${style.mov}`}>
            <h3 className = {style.movehead}>Movers</h3>
            <h6 className = {style.movname}>Mover Name</h6>
            <span className='badge badge-primary'>Mon</span>
            <span className='badge badge-primary'>Tue</span>
            <span className='badge badge-primary'>Wed</span>
            <span className='badge badge-light'>Thur</span>
            <span className='badge badge-light'>Fri</span>
            
            <h6 className = {style.movname}>Mover Name</h6>
            <span className='badge badge-primary'>Mon</span>
            <span className='badge badge-primary'>Tue</span>
            <span className='badge badge-light'>Wed</span>
            <span className='badge badge-light'>Thur</span>
            <span className='badge badge-light'>Fri</span>
            
            <h6 className = {style.movname}>Mover Name</h6>
            <span className='badge badge-primary'>Mon</span>
            <span className='badge badge-light'>Tue</span>
            <span className='badge badge-light'>Wed</span>
            <span className='badge badge-primary'>Thur</span>
            <span className='badge badge-primary'>Fri</span>
        </div>
    </div>
}

export default MoversSchedule