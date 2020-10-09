import React from 'react'
import style from './Unavailable.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'

const UnavailableSchedule = () => {
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
        path: "/schedule/movers",
        icon: <img src='/images/truck.png' width="20px" alt = "icon"> </img>
    }
    ]
    return <div className={``}>
        
        <div className = "row">
        <div className="col-2 col-md-2">
            <SideBar routes={routes} />
            {/* <SideBar routes={width < 576 ? "" : {routes}} icon={routes.icon} /> */}
        </div>
        <div className="col-10 col-md-10">
        <div className = "row">
            <div className = {`col-6 ${style.head}`}>
               <h5>Unavailable</h5>
            </div>
            <div className = {`col-3 ${style.btn}`}>
            <Button name="Approve" />
            </div>
        </div>
            <div className={`list-group ${style.list}`}>
                <div className={style.sty}>
                    <a href="#" className={`list-group-item list-group-item-action flex-column align-items-start ${style.l}`}>
                        <div className={`d-flex w-100 justify-content-between`}>
                            <span>
                                <input type="checkbox" id="defaultCheck1" value="" />
                                <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Thoma</label>
                            </span>

                            <small>4/7/2020 - 15/7/2020</small>
                        </div>
                        <div className={style.para}>
                            <p class="mb-1">Reason: <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="#" className={`list-group-item list-group-item-action flex-column align-items-start ${style.l}`}>
                        <div class="d-flex w-100 justify-content-between">
                            <span>
                                <input type="checkbox" id="defaultCheck1" value="" />
                                <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Thoma</label>
                            </span>

                            <small>4/7/2020 - 15/7/2020</small>
                        </div>
                        <div className={style.para}>
                            <p class="mb-1">Reason: <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>
                        </div>
                    </a>
                </div>
                <div className={style.box}>
                    <a href="#" className={`list-group-item list-group-item-action flex-column align-items-start ${style.l}`}>
                        <div class="d-flex w-100 justify-content-between">
                            <span>
                                <input type="checkbox" id="defaultCheck1" value="" />
                                <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Josh</label>
                            </span>

                            <small>4/7/2020 - 15/7/2020</small>
                        </div>
                        <div className={style.para}>
                            <p class="mb-1">Reason: <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>
                        </div>
                    </a>
                </div>
                <a href="#" className={`list-group-item list-group-item-action flex-column align-items-start ${style.l}`}>
                    <div class="d-flex w-100 justify-content-between">
                        <span>
                            <input type="checkbox" id="defaultCheck1" value="" />
                            <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Monte</label>
                        </span>
                        <small>4/7/2020 - 15/7/2020</small>
                    </div>
                    <div className={style.para}>
                        <p class="mb-1">Reason: <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>
                    </div>
                </a>
            </div>

        </div>
    </div>
    </div>
}

export default UnavailableSchedule