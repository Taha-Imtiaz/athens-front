import React, { useEffect, useState } from "react";
import style from "./Payment.module.css";
import { Button, TextField } from "@material-ui/core";
import { payAmount } from "../../../Redux/Mover/moverActions";
import { connect } from "react-redux";

const Payment = (props) => {
  const [state, setState] = useState({
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    amount: "",
  })
  useEffect(() => {
    loadStripe();
    const { history } = props;
    if (!props.location.jobId) {
      history.push("/mover");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeHandler = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const loadStripe = () => {
    if (!window.document.getElementById("stripe-script")) {
      let s = window.document.createElement("script");
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


  const pay = (e) => {
    e.preventDefault();
    window.Stripe.card.createToken(
      {
        number: state.number,
        exp_month: state.exp_month,
        exp_year: state.exp_year,
        cvc: state.cvc,
      },
      (status, response) => {
        if (status === 200) {
          // Send Token To Backend
          let obj = {
            stripeToken: response.id,
            amount: state.amount,
            jobId: props.location.jobId,
          };
          let { history, payAmount } = props;
          payAmount(obj, res => history.push("/mover"));
        }
      }
    );
  };


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
            onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
            onChange={changeHandler}
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
            onChange={changeHandler}
          />

          <div className={style.flexEnd}>
            <Button className={style.button} type="button" onClick={pay}>
              Pay
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
}


var actions = {
  payAmount
};

export default connect(null, actions)(Payment);
