import React, { Component } from "react";
import style from "./Payment.module.css";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { payAmount } from "../../../Redux/Mover/moverActions";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";

class Payment extends Component {
  state = {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    amount: "",
  };

  changeHandler = (e) => {
    var { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loadStripe = () => {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_51HfgSrIoqQ2sulu0x4TK6K2atQHghj1iIthjdrpD9qkE1yLx8nEFEYysxJrXn16tz6caSn1kMFFD6YnUl2MK05C800tBcU5bIH"
        );
      };
      window.document.body.appendChild(s);
    }
  };
  componentDidMount() {
    this.loadStripe();
    const { history } = this.props;
    if (!this.props.location.jobId) {
      history.push("/mover");
    }
  }

  pay = (e) => {
    e.preventDefault();

    window.Stripe.card.createToken(
      {
        number: this.state.number,
        exp_month: this.state.exp_month,
        exp_year: this.state.exp_year,
        cvc: this.state.cvc,
      },
      (status, response) => {
        if (status === 200) {
          // Send Token To Backend
          let obj = {
            stripeToken: response.id,
            amount: this.state.amount,
            jobId: this.props.location.jobId,
          };
          payAmount(obj).then((res) => {
            let { history, showMessage } = this.props;
            if (res.data.status == 200) {
              showMessage(res.data.message);
              history.push("/mover");
            }
          });
        }
      }
    );
  };

  render() {
    return (
      <div className={style.main}>
        <div className={style.form}>
          <div className={style.tophead}>
            <h3>Credit Card Information</h3>

            <div>
              <span className={style.logo}>
                <i className="fa fa-cc-paypal"></i>
              </span>
              <span className={style.logo}>
                <i className={`fa fa-cc-visa ${style.visaIcon}`}></i>
              </span>
              <span className={style.logo}>
                <i className="fa fa-cc-mastercard"></i>
              </span>
            </div>
          </div>
          <form>
            <TextField
              variant="outlined"
              fullWidth
              className={style.styleFormFields}
              size="small"
              name="number"
              label="Card Number"
              onChange={this.changeHandler}
            />

            <p>Testing Card #: 4242424242424242</p>
            <div className={style.styleCurrentYear}>
              <div>
                <TextField
                  variant="outlined"
                  className={style.styleFormFields}
                  fullWidth
                  size="small"
                  name="exp_month"
                  label="Month"
                  onChange={this.changeHandler}
                />
              </div>

              <div>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  className={style.styleFormFields}
                  name="exp_year"
                  label="Year"
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <TextField
              variant="outlined"
              fullWidth
              size="small"
              name="cvc"
              label="CVC"
              className={style.styleFormFields}
              onChange={this.changeHandler}
            />

            <TextField
              type="number"
              variant="outlined"
              fullWidth
              size="small"
              id="amount"
              className={style.styleFormFields}
              label="Amount (Plus tip if any)"
              name="amount"
              onChange={this.changeHandler}
            />

            <div className={style.flexEnd}>
              <Button className={style.button} type="button" onClick={this.pay}>
                Pay
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

var actions = {
  showMessage,
};

export default connect(null, actions)(Payment);
