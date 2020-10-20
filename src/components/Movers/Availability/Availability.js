import React, { Component } from 'react';
import Button from '../../Button/Button';
import style from './Availability.module.css'


class Availability extends Component {
    render() {
        return (
            <div className={style.main}>
                <h3>Select Your Availability</h3>
                <div className={style.list}>
                    <div className={`form-check d-flex justify-content-start ${style.border}`}>
                        <input className={`form-check-input ${style.check}`} type="checkbox" value="" id="defaultCheck1" />
                        <h5 className={style.label}><label className="form-check-label" htmlFor="defaultCheck1">
                            Monday
                    </label></h5>
                    </div>
                    <div className={`form-check d-flex justify-content-start ${style.border}`}>
                        <input className={`form-check-input ${style.check}`} type="checkbox" value="" id="defaultCheck1" />
                        <h5 className={style.label}><label className="form-check-label" htmlFor="defaultCheck1">
                            Tuesday
                    </label></h5>
                    </div>
                    <div className={`form-check d-flex justify-content-start ${style.border}`}>
                        <input className={`form-check-input ${style.check}`} type="checkbox" value="" id="defaultCheck1" />
                        <h5 className={style.label}><label className="form-check-label" htmlFor="defaultCheck1">
                            Wednesday
                    </label></h5>
                    </div>
                    <div className={`form-check d-flex justify-content-start ${style.border}`}>
                        <input className={`form-check-input ${style.check}`} type="checkbox" value="" id="defaultCheck1" />
                        <h5 className={style.label}><label className="form-check-label" htmlFor="defaultCheck1">
                            Thursday
                    </label></h5>
                    </div>
                    <div className={`form-check d-flex justify-content-start ${style.border}`}>
                        <input className={`form-check-input ${style.check}`} type="checkbox" value="" id="defaultCheck1" />
                       <h5 className = {style.label}><label className="form-check-label" htmlFor="defaultCheck1">
                            Friday
                    </label></h5> 
                    </div>
                    <div className={`form-check d-flex justify-content-start ${style.border}`}>
                        <input className={`form-check-input ${style.check}`} type="checkbox" value="" id="defaultCheck1" />
                       <h5 className = {style.label}><label className="form-check-label" htmlFor="defaultCheck1">
                            Saturday
                    </label></h5> 
                    </div>
                    <div className={`form-check d-flex justify-content-start ${style.border}`}>
                        <input className={`form-check-input ${style.check}`} type="checkbox" value="" id="defaultCheck1" />
                       <h5 className = {style.label}><label className="form-check-label" htmlFor="defaultCheck1">
                            Sunday
                    </label></h5> 
                    </div>
                </div>
                <div className={style.btn}>
                    <Button name="Save" />
                </div>
            </div>
        );
    }
}

export default Availability;