import React from 'react'
import style from './Movers.module.css'
import SideBar from '../../Sidebar/SideBar'

const MoversSchedule = () => {

    const routes = [{
        title: "Unavailable",
        path: "/schedule",
        icon: <img src='/images/pin.png' width="20px" alt = "icon"></img>
    },
    {
        title: "Daily Schedule",
        path: "daily",
        icon: <img src='/images/Icon material-schedule.png' width="20px" alt = "icon"></img>

    }, {
        title: "Movers",
        path: "/schedule/Movers",
        icon: <img src='/images/truck.png' width="20px" alt = "icon"></img>

    }
    ]

    return <div className={`row`}>
        <div className="col-2 col-md-2">
            <SideBar routes={routes} />
        </div>
        <div className="col-10 col-md-10">

            <div className="row">
                <div className="col-6">
                    <h3 className={style.head}>Movers</h3>

                </div>
                <div className="col-2 col-md-6">
                    <div className={`${style.btn}`}>
                        <div class="dropdown">
                            <button class={`btn btn-primary dropdown-toggle ${style.drop}`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Crew Leader
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Crew Leader</a>
                                <a class="dropdown-item" href="#">Crew Leader in training</a>
                                <a class="dropdown-item" href="#">Mover</a>
                                <a class="dropdown-item" href="#">New Employee</a>
                                <a class="dropdown-item" href="#">On Vacation</a>
                                <a class="dropdown-item" href="#">Reserve</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={`list-group ${style.list}`}>
                <div className={style.mar}>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 className={`mb-1 ${style.name}`}>Thoma</h5>
                            <small>Crew Leader</small>
                        </div>
                        <div className={style.para}>
                            <p class="mb-1">Everyday</p>
                        </div>
                    </a>
                </div>
                <div className={style.mar}>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 className={`mb-1 ${style.name}`}>Jc</h5>
                            <small>Crew Leader if needed</small>
                        </div>
                        <div className={style.para}>
                            <p class="mb-1">Sat - Sunday -- Off Day</p>
                        </div>
                    </a>
                </div>
                <div className={style.mar}>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 className={`mb-1 ${style.name}`}>Josh</h5>
                            <small>Mover Helper</small>
                        </div>
                        <div className={style.para}>
                            <p class="mb-1">Everyday</p>
                        </div>
                    </a>
                </div>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 className={`mb-1 ${style.name}`}>Monte</h5>
                        <small>New Employee</small>
                    </div>
                    <div className={style.para}>
                        <p class="mb-1">Everyday</p>
                    </div>
                </a>
            </div>

        </div>

    </div>

}

export default MoversSchedule