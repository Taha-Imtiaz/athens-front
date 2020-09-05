import React from 'react'
import style from './Daily.module.css'
import SideBar from '../../Sidebar/SideBar'

const DailySchedule = () => {
    return <div>
        <div className={`row ${style.toprow}`}>
            <div className="col-1">
                <SideBar name1="Unavailable" name2="Daily Schedule" name3="Movers" />
            </div>
            <div className="col-7">
                <h3 className={style.head}>Movers</h3>

                <div className={`list-group ${style.list}`}>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 className={`mb-1 ${style.name}`}>Thoma</h5>
                            <small>Crew Leader</small>
                        </div>
                        <div className={style.para}>
                            <p class="mb-1">Everyday</p>
                        </div>
                    </a>     <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 className={`mb-1 ${style.name}`}>Jc</h5>
                            <small>Crew Leader if needed</small>
                        </div>
                        <div className={style.para}>
                            <p class="mb-1">Sat - Sunday -- Off Day</p>
                        </div>
                    </a>     <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 className={`mb-1 ${style.name}`}>Josh</h5>
                            <small>Mover Helper</small>
                        </div>
                        <div className={style.para}>
                            <p class="mb-1">Everyday</p>
                        </div>
                    </a>     <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
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
            <div className={`col-3 ${style.btn}`}>
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
}

export default DailySchedule