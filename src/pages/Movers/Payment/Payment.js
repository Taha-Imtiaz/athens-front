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
      }
    );
  };

  render() {
    return (
      <div className={style.main}>
        <div className={style.form}>
          <div className={style.tophead}>
            <h3>Credit Card Information</h3>
            {/* <h5>Payment Information</h5> */}

            <div>
            <span className={style.logo}>
              <i className="fa fa-cc-paypal" style={{ fontSize: "36px" }}></i>
            </span>
            <span className={style.logo}>
              <i
                className="fa fa-cc-visa"
                style={{ fontSize: "36px", backgroundColor: "red" }}
              ></i>
            </span>
            <span className={style.logo}>
              <i
                className="fa fa-cc-mastercard"
                style={{ fontSize: "36px" }}
              ></i>
            </span>
            </div>
          </div>
          <form>
            <div className="form-group">
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="number"
              
                label="Card Number"
                onChange={this.changeHandler}
                style = {{ marginTop:"2rem"}}
              />

            
            </div>
            <p>Testing Card #: 4242424242424242</p>
            <div className="row">
              <div className="col-6">
                <div className="form-group">

                <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="exp_month"
                label="Month"
                onChange={this.changeHandler}
               
              />

                 
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="exp_year"
                label="Year"
                onChange={this.changeHandler}
               
              />
              
                </div>
              </div>
            </div>
            <div className="form-group">
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="cvc"
                label="CVC"
                onChange={this.changeHandler}
               
              />
             
            </div>
            <div className="form-group">
              <TextField
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                id="amount"
               label="Amount (Plus tip if any)"
                name="amount"
                onChange={this.changeHandler}
              />
            </div>

            <Button
              type="button"
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                marginLeft: "0.5rem",
                float: "right",
              }}
              onClick={this.pay}
            >
              Pay
            </Button>
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
