import React, { useEffect, useState } from 'react'
import style from './Unavailable.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'
import { getAllData, approveRequest } from "../../../Redux/Unavailable/unavailableAction";
import { cloneDeep } from '@babel/types';
import { connect } from 'react-redux';
import { showMessage } from '../../../Redux/Common/commonActions'

const UnavailableSchedule = (props) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [dates, setDates] = useState([])

    const routes = [
        {
            title: "Daily Schedule",
            path: "/schedule/daily",
            icon: <img src='/images/Icon material-schedule.png' width="20px" alt="icon"></img>

        },

        {
            title: "Unavailable",
            path: "/schedule",
            icon: <img src='/images/pin.png' width="20px" alt="icon"></img>
        },

        {
            title: "Movers",
            path: "/schedule/movers",
            icon: <img src='/images/truck.png' width="20px" alt="icon"></img>
        }
    ]

    useEffect(() => {
        // const { getAllData } = props;
        getAllData().then(res => {
            setData(res.data)
            setIsLoading(false)
        })
    }, []);

    const handleChange = (list) => {
        // let newDates = cloneDeep(dates)
        let index = dates.findIndex(x => x == list._id)
        if (index != -1) {
            dates.splice(index, 1);
        } else {
            dates.push(list._id);
            setDates(dates);
        }
        console.log(dates)
    }
    const approveRequests = () => {
        let data = {
            id: dates
        }
        var { showMessage } = props;
        approveRequest(data).then((res) => {
            showMessage(res.data.message)
            getAllData().then(res => {
                setData(res.data)
            })
        })
    }
    return <div className={``}>

        <div className="row">
            <div className="col-2 col-md-2">
                <SideBar routes={routes} />
                {/* <SideBar routes={width < 576 ? "" : {routes}} icon={routes.icon} /> */}
            </div>
            <div className="col-10 col-md-10">
                <div className="row">
                    <div className={`col-6 ${style.head}`}>
                        <h5>Unavailable</h5>
                    </div>
                    <div className={`col-3 ${style.btn}`}>
                        <Button name="Approve" onClick={approveRequests} />
                    </div>
                </div>
                {data && data.applicants.length > 0 ? data.applicants.map(list => {
                    return <><div className={`list-group ${style.list}`}>
                        <div className={style.sty}>
                            <a href="#" className={`list-group-item list-group-item-action flex-column align-items-start ${style.l}`}>
                                <div className={`d-flex w-100 justify-content-between`}>
                                    <span>
                                        <input type="checkbox" id="defaultCheck1" value="" onChange={() => handleChange(list)} />
                                        <label className={`checkbox-inline ${style.input}`} htmlFor="defaultCheck1">{list.applicant.name}</label>
                                    </span>
                                </div>
                                <div className={style.para}>
                                    <p className="mb-1">{list.dates[0]} - {list.dates[1]}</p>
                                </div>
                                <div className={style.para}>
                                    <p className="mb-1">Reason: {list.reason}</p>
                                </div>
                            </a>
                        </div></div>
                    </>
                }) : <div className="text-center">
                        <img src='/images/no-data-found.png' />
                    </div>}

            </div>
        </div>
    </div>
}

var actions = {
    showMessage
}
export default connect(null, actions)(UnavailableSchedule)