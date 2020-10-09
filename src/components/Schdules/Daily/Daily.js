import React from 'react'
import style from './Daily.module.css'
import SideBar from '../../Sidebar/SideBar'

const DailySchedule = () => {

    const routes = [{
        title: "Unavailable",
        path: "/schedule",
        icon: <img src='/images/pin.png' width="20px" alt = "icon"></img>
    },
    {
        title: "Daily Schedule",
        path: "/schedule/daily",
        icon: <img src='/images/Icon material-schedule.png' width="20px" alt = "icon"></img>

    }, {
        title: "Movers",
        path: "/schedule/Movers",
        icon: <img src='/images/truck.png' width="20px" alt = "icon"></img>

    }
    ]

    return <div className={`row ${style.toprow}`}>
        <div className="col-2">
            <SideBar routes={routes} />
        </div>
        <div className={`col-7 justify-content-center ${style.fr}`}>
            <h5 className={style.head}>Daily Schedule</h5>
            <div className={style.lists}>
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class={`nav-item ${style.items}`}>
                        <a className={`nav-link active ${style.color}`} id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Monday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a className={`nav-link active ${style.color}`} id="pills-home-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="true">Tuesday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a className={`nav-link active ${style.color}`} id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Wednesday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a className={`nav-link active ${style.color}`} id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Thursday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a className={`nav-link active ${style.color}`} id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Friday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a className={`nav-link active ${style.color}`} id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Saturday</a>
                    </li>
                    <li class={`nav-item ${style.items}`}>
                        <a className={`nav-link active ${style.color}`} id="pills-home-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="true">Sunday</a>
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
                        <h5><span className={`badge badge-primary ${style.color}`}>Packing</span></h5>
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
            <h5 className={style.movehead}>Movers</h5>
            <h6 className={style.movname}>Mover Name</h6>
            <span className={`badge badge-primary ${style.color}`}>Mon</span>
            <span className={`badge badge-primary ${style.color}`}>Tue</span>
            <span className={`badge badge-primary ${style.color}`}>Wed</span>
            <span className={`badge badge-light ${style.light}`}>Thur</span>
            <span className={`badge badge-primary ${style.color}`}>Fri</span>

            <h6 className={style.movname}>Mover Name</h6>
            <span className={`badge badge-primary ${style.color}`}>Mon</span>
            <span className={`badge badge-primary ${style.color}`}>Tue</span>
            <span className={`badge badge-light ${style.light}`}>Wed</span>
            <span className={`badge badge-light ${style.light}`}>Thur</span>
            <span className={`badge badge-primary ${style.color}`}>Fri</span>

            <h6 className={style.movname}>Mover Name</h6>
            <span className={`badge badge-primary ${style.color}`}>Mon</span>
            <span className={`badge badge-primary ${style.color}`}>Tue</span>
            <span className={`badge badge-primary ${style.color}`}>Wed</span>
            <span className={`badge badge-light ${style.light}`}>Thur</span>
            <span className={`badge badge-light ${style.light}`}>Fri</span>
        </div>
    </div>
}
export default DailySchedule