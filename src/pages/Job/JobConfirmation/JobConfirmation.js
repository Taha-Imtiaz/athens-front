import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import { cloneDeep } from "lodash";

import { confirmJob } from "../../../Redux/Job/jobActions";
import { connect } from "react-redux";
import {
  TextField,
} from "@material-ui/core";
import style from "./JobConfirmation.module.css";
import AddLocation from "../../../components/AddLocation/AddLocation";
import DateAndTime from "../../../components/DateAndTime/DateAndTime";

//material-ui styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
//steps of stepper
function getSteps() {
  return [
    {
      label: "Confirm Date and Time",
      color: "#f50057",
    },
    {
      label: "Confirm Contact Info",
      color: "#f50057",
    },
    {
      label: "Confirm PU/DO Addresses",
      color: "#f50057",
    },
    {
      label: "Deposit",
      color: "#f50057",
    },
  ];
}

const useIconStyles = makeStyles(
  (() => {
    return getSteps().reduce((styles, step, index) => {
      styles[index] = { color: `${step.color} !important` };
      return styles;
    }, {});
  })()
);
function JobConfirmation(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState("");
  const [payment, setPayment] = useState({});
  const steps = getSteps();
  const iconClasses = useIconStyles();

  useEffect(() => {
    //fetch jobData on ComponentDidMount
    let job = cloneDeep(props.data);
    //load stripe
    loadStripe();
    let parsedDates = job.dates.map((x) => {
      return {
        date: Date.parse(x.date),
        time: x.time
      }
    });
    job.dates = parsedDates;
    job.startTime = job.startTime ? new Date(job.startTime) : '';
    setData(job);
  }, [props.data]);

  //handler calls when next button is clicked
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      pay();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  //handler calls when back button is pressed
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePhoneNumberInput = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {

      // returns: "x", "xx", "xxx"
      if (cvLength < 4) return currentValue;

      // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

      // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  }

  const handleSubPhoneNumberInput = (value, previousState, i) => {
    let customer = { ...previousState.customer };
    let previousValue = customer.phone;
    customer.phone = handlePhoneNumberInput(value, previousValue)
    return customer
  }

  //onChange handler of formField
  const handleFormInput = (event) => {
    let { name, value } = event.target;
    let updatedCustomer = cloneDeep(data);
    if (name === 'phone') {
      setData(prevState => ({ ...updatedCustomer, customer: handleSubPhoneNumberInput(value, prevState) }))
    } else {
      updatedCustomer.customer[name] = value;
      setData(updatedCustomer);
    }
  };

  //add location
  const addLocation = (e) => {
    e.stopPropagation();
    let newData = { ...data };
    newData.locations.push({ type: "", value: "", default: false });
    setData(newData);
  };


  //load stripe
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
  //handler of input fields
  const changeHandler = (e) => {
    let { name, value } = e.target;
    let updatedPayment = cloneDeep(payment);
    updatedPayment[name] = value;
    setPayment(updatedPayment);
  };
  //payment handler
  const pay = (e) => {
    let { confirmJob, job } = props;
    window.Stripe.card.createToken(
      {
        number: payment.number,
        exp_month: payment.exp_month,
        exp_year: payment.exp_year,
        cvc: payment.cvc,
      },
      (status, response) => {
        if (status === 200) {
          let stringDates = data.dates.map((x) => {
            
            if (typeof x.date === "number") {
              return { date: new Date(x.date).toDateString(), time: x.time };
            } else {
              return { date: x.date.toDateString(), time: x.time };
            }
          });
          let obj = {
            paidInCash: false,
            stripeToken: response.id,
            amount: payment.amount,
            jobToUpdate: data._id,
            dates: stringDates.filter(Boolean),
            startTime: data.startTime,
            phone: data.customer.phone,
            locations: data.locations.filter(
              (x) => x.value !== ""
            ),
            email: data.customer.email,
            customerId: data.customer._id,
          };
          confirmJob(obj);
          setData(job);
          props.close();
        }
      }
    );
  };
  //without payment submission
  const handleSubmitWithoutPay = () => {
    let { confirmJob, job } = props;
    let stringDates = data.dates.map((x) => {
     
      if (typeof x.date === "number") {
        return { date: new Date(x.date).toDateString(), time: x.time };
      } else {
        return { date: x.date.toDateString(), time: x.time };
      }
    });
    let obj = {
      paidInCash: true,
      jobToUpdate: data._id,
      dates: stringDates.filter(Boolean),
      startTime: data.startTime.toString(),
      phone: data.customer.phone,
      locations: data.locations.filter((x) => x.value !== ""),
      email: data.customer.email,
      customerId: data.customer._id,
    };
    confirmJob(obj);
    setData(job);
    props.close();
  };
  //reset locations

  const handleLocationChange = (locations) => {
    let newData = { ...data }
    newData.locations = locations
    setData(newData);
  }

  const setDates = (dates) => {
    let newData = cloneDeep(data);
    newData.dates = dates;
    setData(newData);
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form>
            {data ? <DateAndTime dates={data.dates} setDates={setDates} /> : null}
          </form>
        );
      case 1:
        return (
          <form>
            {data && data.customer && (
              <div>
                {/* <label htmlFor="exampleInputEmail1">First Name</label> */}
                <TextField
                  variant="outlined"
                  className={style.styleFormFields}
                  required
                  fullWidth
                  size="small"
                  id="name"
                  label="First Name"
                  name="firstName"
                  value={data.customer.firstName}
                  onChange={handleFormInput}
                />

                {/* <label htmlFor="exampleInputEmail1">Last Name</label> */}
                <TextField
                  variant="outlined"
                  className={style.styleFormFields}
                  required
                  fullWidth
                  size="small"
                  id="name"
                  label="Last Name"
                  name="lastName"
                  value={data.customer.lastName}
                  onChange={handleFormInput}
                />

                {/* <label htmlFor="exampleInputEmail1">Phone Number</label> */}
                <TextField
                  variant="outlined"
                  className={style.styleFormFields}
                  required
                  fullWidth
                  size="small"
                  id="name"
                  label="Phone Number"
                  name="phone"
                  value={data.customer.phone}
                  onChange={handleFormInput}
                />

                {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                <TextField
                  variant="outlined"
                  className={style.styleFormFields}
                  required
                  fullWidth
                  size="small"
                  id="name"
                  label="Email Address"
                  name="email"
                  value={data.customer.email}
                  onChange={handleFormInput}
                />
              </div>
            )}
          </form>
        );
      case 2:
        return (
          <div>
            {/* {data.locations && data.locations.length === 0 && (
              <div className={`${style.locationBtn} ${style.flex}`}>
                <Button
                  className={`${style.button}`}
                  onClick={(e) => addLocation(e)}
                >
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    className={style.locationIcon}
                  />
                  Add Location
                </Button>
              </div>
            )} */}

            {/* {data.locations && data.locations.length > 0 &&
            } */}
              <AddLocation locationArr={data.locations} addLocation={addLocation} handleLocationChange={handleLocationChange} />



          </div>
        );
      case 3:
        return (
          <div>
            <form>
              <TextField
                variant="outlined"
                className={style.styleFormFields}
                required
                fullWidth
                size="small"
                id="cardno"
                label="Card Number"
                name="number"
                onChange={changeHandler}
              />

              <p>Testing Card #: 4242424242424242</p>
              <div className={style.currentYear}>
                <div>
                  <TextField
                    variant="outlined"
                    className={style.styleFormFields}
                    required
                    fullWidth
                    size="small"
                    id="month"
                    label="Month"
                    name="exp_month"
                    onChange={changeHandler}
                  />
                </div>

                <div>
                  <TextField
                    variant="outlined"
                    className={style.styleFormFields}
                    required
                    fullWidth
                    size="small"
                    id="year"
                    label="Year"
                    name="exp_year"
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <TextField
                variant="outlined"
                className={style.styleFormFields}
                required
                fullWidth
                size="small"
                id="name"
                label="CVC"
                name="cvc"
                onChange={changeHandler}
              />

              <TextField
                variant="outlined"
                className={style.styleFormFields}
                required
                fullWidth
                size="small"
                id="amount"
                label="Amount"
                name="amount"
                onChange={changeHandler}
              />
            </form>
            <div className={style.skipSubmitBtn}>
              <Button
                className={`${style.button} `}
                onClick={handleSubmitWithoutPay}
              >
                Skip And Submit
              </Button>
            </div>
          </div>
        );
      default:
        return "Unknown step";
    }
  };
  return (
    <div className={`${classes.root} ${style.confirmJobModal}`}>
      <div className={style.stepperLabels}>
        <Stepper activeStep={activeStep}>
          {steps.map(({ label, color }, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  className={style.styleRadio}
                  {...labelProps}
                  StepIconProps={{ classes: { root: iconClasses[index] } }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      {activeStep === steps.length ? (
        <div className={style.stepperContent}>
          <Typography className={classes.instructions}>
            All steps completed - you&apos;re finished
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </div>
      ) : (
          <div className={style.stepperContent}>
            <div>{getStepContent(activeStep)}</div>
            <div className={style.backAndSubmitBtn}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={
                  activeStep === 0
                    ? style.back
                    : `${style.back} ${style.backStyles}`
                }
              >
                Back
            </Button>

              <Button onClick={handleNext} className={style.next}>
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        )}
    </div>
  );
}

var actions = {
  confirmJob,
};
var mapStateToProps = (state) => ({
  job: state.jobs.job,
});
export default connect(mapStateToProps, actions)(JobConfirmation);
