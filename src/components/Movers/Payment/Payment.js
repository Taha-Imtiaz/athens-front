import React, { Component } from 'react';
import style from './Payment.module.css'
import Button from '../../Button/Button';

class Payment extends Component {
    render() {
        return (
            <div className={style.main}>
                <div className={style.tophead}>
                    <h3>Credit Card Information</h3>
                    <h5>Payment Information</h5>

                    <span className={style.logo}><i className="fa fa-cc-paypal" style={{ fontSize: "36px" }}></i></span>
                    <span className={style.logo}><i className="fa fa-cc-visa" style={{ fontSize: "36px", backgroundColor:"red"}}></i></span>
                    <span className={style.logo}><i className="fa fa-cc-mastercard" style={{ fontSize: "36px" }}></i></span>
                </div>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="type" placeholder="Type" />
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="cardno" placeholder="Card Number" />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div class="form-group">
                                <input type="text" class="form-control" id="month" placeholder="Month" />
                            </div>
                        </div>

                        <div className="col-6">
                            <div class="form-group">
                                <input type="text" class="form-control" id="year" placeholder="Year" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="name" placeholder="Name On Card" />
                    </div>

                    <Button name="Submit" />
                </form>
            </div>
        );
    }
}

export default Payment;