import React from 'react'
import style from './Unavailable.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'

const UnavailableSchedule = () => {
    return <div>

        <div className={`row ${style.toprow}`}>
            <div className="col-1">
                <SideBar name1="Unavailable" name2="Daily Schedule" name3="Movers" />
            </div>
            <div className="col-9">
                <h3 className={style.head}>Unavailable</h3>

                <div className={`list-group ${style.list}`}>
                    <div>
            <a href="#" className={`list-group-item list-group-item-action flex-column align-items-start ${style.l}`}>
                <div className={`d-flex w-100 justify-content-between`}>
                    <label class="checkbox-inline"><input type="checkbox" value="" /></label>
                    <h5 className={`mb-1 ${style.name}`}>Thoma</h5>
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
                    <label class="checkbox-inline"><input type="checkbox" value="" /></label>
                    <h5 className={`mb-1 ${style.name}`}>Jc</h5>
                    <small>4/7/2020 - 15/7/2020</small>
                </div>
                <div className={style.para}>
                    <p class="mb-1">Reason: <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>
                </div>
            </a>
            </div>
            <div className = {style.box}>
            <a href="#" className={`list-group-item list-group-item-action flex-column align-items-start ${style.l}`}>
                <div class="d-flex w-100 justify-content-between">
                    <label class="checkbox-inline"><input type="checkbox" value="" /></label>
                    <h5 className={`mb-1 ${style.name}`}>Josh</h5>
                    <small>4/7/2020 - 15/7/2020</small>
                </div>
                <div className={style.para}>
                    <p class="mb-1">Reason: <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>
                </div>
            </a>
            </div>
            <a href="#" className={`list-group-item list-group-item-action flex-column align-items-start ${style.l}`}>
                <div class="d-flex w-100 justify-content-between">
                    <label class="checkbox-inline"><input type="checkbox" value="" /></label>
                    <h5 className={`mb-1 ${style.name}`}>Monte</h5>
                    <small>4/7/2020 - 15/7/2020</small>
                </div>
                <div className={style.para}>
                    <p class="mb-1">Reason: <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>
                </div>
            </a>
        </div>

            </div>
            <div className={`col-2 ${style.btn}`}>
             <Button name="Approve"/>
            </div>
        </div>

        
    </div>
}

export default UnavailableSchedule