import React, { useEffect, useState } from 'react'
import style from './Movers.module.css'
import SideBar from '../../Sidebar/SideBar'
import { getAllMover } from '../../../Redux/Schedule/scheduleAction'

const MoversSchedule = (props) => {
    const [allMovers, setAllMovers] = useState()
    useEffect(() => {

        getAllMover().then((res) => {
            setAllMovers(res.data.movers)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    console.log(allMovers)
    const routes = [
    {
        title: "Daily Schedule",
        path: "daily",
        icon: <img src='/images/Icon material-schedule.png' width="20px" alt="icon"></img>

    },
    
    {
        title: "Unavailable",
        path: "/schedule",
        icon: <img src='/images/pin.png' width="20px" alt="icon"></img>
    },
    {
        title: "Movers",
        path: "/schedule/Movers",
        icon: <img src='/images/truck.png' width="20px" alt="icon"></img>

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
                        <div className="dropdown">
                            <button className={`btn btn-primary dropdown-toggle ${style.drop}`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Crew Leader
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Crew Leader</a>
                                <a className="dropdown-item" href="#">Crew Leader in training</a>
                                <a className="dropdown-item" href="#">Mover</a>
                                <a className="dropdown-item" href="#">New Employee</a>
                                <a className="dropdown-item" href="#">On Vacation</a>
                                <a className="dropdown-item" href="#">Reserve</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={`list-group ${style.list}`}>
                {allMovers && allMovers.length > 0 ? allMovers.map(list => {
                    return <><div className={style.mar}>
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className={`mb-1 ${style.name}`}>{list.name}</h5>
                                <small>{list.attributes[0].name}</small>
                            </div>
                            <div className={style.para}>
                                {list.weeklySchedule.map(status => {
                                    return <span className="mb-1">{status.status ? status.day.split("", 3).join("") : null}&nbsp;</span>
                                })}
                            </div>
                        </a>
                    </div></>
                }) : <div className="text-center">
                        <img src='/images/no-data-found.png' />
                    </div>}

            </div>

        </div></div>

}

export default MoversSchedule