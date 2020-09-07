import React from 'react'
import style from './CustomerClaims.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'

const CustomerClaims = () => {
    return <div>
        {/* <SideBar name1="Claims" name2="Blanket Deposit" /> */}
        <div className="row">
            <div className="col-6">
                <h3 className={style.head}>Claims</h3>
            </div>
            <div className="col-6">
                <div className={style.btn}>
                    <Button name="Add Claim" />
                </div>
            </div>
        </div>

        <div className={style.jumbotron}>
            <div className="row">
                <div className="col-10">
                    <h6 className={style.comp}>Complaint Name</h6>
                </div>
                <div className="col-2">
                    <h6 className={style.job}>Job ID ##</h6>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <p className={style.comp}>from zim - to zip</p>
                </div>
            </div>
            <h6 className={style.sub}>Lorem #1</h6>
            <div className="row">
                <div className="col-10">
                    <p className={style.para}>ajshj asdknsalkjd asldjkasljdl </p>
                </div>
                <div className="col-2">
                    <p className={style.p2}>$75</p>
                </div>
            </div>
            <h6 className={style.sub}>Lorem #2</h6>
            <div className="row">
                <div className="col-10">
                    <p className={style.para}>ajshj asdknsalkjd asldjkasljdl </p>
                </div>
                <div className="col-2">
                    <p className={style.p2}>$100</p>
                </div>
            </div>

        </div>
    </div>
}

export default CustomerClaims