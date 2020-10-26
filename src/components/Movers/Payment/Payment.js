import React, { Component } from 'react';
import style from './Payment.module.css'
import Button from '../../Button/Button';
import { Link } from 'react-router-dom';
import { payAmount } from '../../../Redux/Mover/moverActions'
class Payment extends Component {

    state = {
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        amount: ''
    }

    changeHandler = (e) => {
        console.log(e.target.value)
        var { name, value } = e.target;
        this.setState({ [name]: value });
    }

    loadStripe = () => {

        if (!window.document.getElementById('stripe-script')) {
            var s = window.document.createElement("script");
            s.id = "stripe-script";
            s.type = "text/javascript";
            s.src = "https://js.stripe.com/v2/";
            s.onload = () => {
                window['Stripe'].setPublishableKey('pk_test_51HfgSrIoqQ2sulu0x4TK6K2atQHghj1iIthjdrpD9qkE1yLx8nEFEYysxJrXn16tz6caSn1kMFFD6YnUl2MK05C800tBcU5bIH');
            }
            window.document.body.appendChild(s);
        }
    }
    componentDidMount() {
        this.loadStripe();
        const { history } = this.props;
        if (!this.props.location.jobId) {
            history.push('/mover')
        }
    }

    pay = (e) => {
        console.log(e)
        e.preventDefault();

        window.Stripe.card.createToken({
            number: this.state.number,
            exp_month: this.state.exp_month,
            exp_year: this.state.exp_year,
            cvc: this.state.cvc
        }, (status, response) => {

            if (status === 200) {
                console.log(response.id)
                // Send Token To Backend
                let obj = {
                    stripeToken: response.id,
                    amount: this.state.amount,
                    jobId: this.props.location.jobId
                }
                console.log(obj)
                payAmount(obj).then((res) => {
                    console.log(res)
                })
                // this.setState({
                //     message: `Success! Card token ${response.card.id}.`,
                //     formProcess: false
                // });

            } else {
                // this.setState({
                //     message: response.error.message,
                //     formProcess: false
                // });
            }
        });
    }

    render() {
        return (
            <div className={style.main}>
                <div className={style.tophead}>
                    <h3>Credit Card Information</h3>
                    <h5>Payment Information</h5>

                    <span className={style.logo}><i className="fa fa-cc-paypal" style={{ fontSize: "36px" }}></i></span>
                    <span className={style.logo}><i className="fa fa-cc-visa" style={{ fontSize: "36px", backgroundColor: "red" }}></i></span>
                    <span className={style.logo}><i className="fa fa-cc-mastercard" style={{ fontSize: "36px" }}></i></span>
                </div>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="cardno" placeholder="Card Number" name="number" onChange={this.changeHandler} />
                    </div>
                    <p>Testing Card #: 4242424242424242</p>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <input type="text" className="form-control" id="month" placeholder="Month" name="exp_month" onChange={this.changeHandler} />
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="form-group">
                                <input type="text" className="form-control" id="year" placeholder="Year" name="exp_year" onChange={this.changeHandler} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" placeholder="CVC" name="cvc" onChange={this.changeHandler} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" id="amount" placeholder="Amount (Plus tip if any)" name="amount" onChange={this.changeHandler} />
                    </div>

                    <input type="button" className="btn btn-primary" name="pay" value="Pay" onClick={this.pay} />

                </form>
            </div>
        );
    }
}

export default Payment;