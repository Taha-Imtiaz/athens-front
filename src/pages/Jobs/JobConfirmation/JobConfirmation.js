import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import { cloneDeep } from "lodash";

import { confirmJob } from "../../../Redux/Job/jobActions";
import { showMessage } from "../../../Redux/Common/commonActions";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { connect } from "react-redux";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import style from "./JobConfirmation.module.css";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faTrash } from "@fortawesome/free-solid-svg-icons";

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
      color: "#f50057"
    },
    {
      label: "Confirm Contact Info",
      color: "#f50057"
    },
    {
      label: "Confirm PU/DO Addresses",
      color: "#f50057"
    },
    {
      label:  "Deposit",
      color: "#f50057"
    }
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
  var [startTime, setStartTime] = useState(null);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState("");
  const [payment, setPayment] = React.useState({});
  const steps = getSteps();
  const iconClasses = useIconStyles();

  useEffect(() => {
    //fetch jobData on ComponentDidMount
    let job = cloneDeep(props.data);
    //load stripe
    loadStripe();
    let parsedDates = job.dates.map((x) =>
      typeof x === "string" ? Date.parse(x) : x
    );
    job.dates = parsedDates;
    var currentDate = new Date("2020-08-18T09:00:00");
    job.startTime = currentDate;
    setData(job);
  }, []);

  //onChange handler of time
  var handleTimeSelect = (date) => {
    var newData = { ...data };
    setStartTime(date.toTimeString());
    newData.startTime = date;
    setData(newData);
  };
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
  //onChange handler of Date
  const handleStartDate = (date, i) => {
    let newState = cloneDeep(data);
    newState.dates[i] = date;
    setData(newState);
  };
  //handler to add date
  const addDate = () => {
    if (data.dates[0]) {
      let newState = cloneDeep(data);
      newState.dates.push(new Date());
      setData(newState);
    }
  };
  //onChange handler of formField
  const handleFormInput = (event) => {
    var { name, value } = event.target;
    let updatedCustomer = cloneDeep(data);
    updatedCustomer.customer[name] = value;
    setData(updatedCustomer);
  };
  //onChange handler of location
  const hanldeLocationInput = (i, e) => {
    let job = cloneDeep(data);
    job.locations[i].value = e.target.value;
    setData(job);
  };
  //handles checkBox state
  var changeCheckBoxState = (e, i) => {
    e.stopPropagation();
    var prevState = cloneDeep(data);

    prevState.locations[i].default = !prevState.locations[i].default;
    if (prevState.locations[i].default) {
      prevState.locations[i].value =
        prevState.locations[i].type === "pickup"
          ? "Load Only / IA"
          : "Unload Only";
    } else {
      prevState.locations[i].value = "";
    }
    setData(prevState);
  };
  //remove date
  var removeDate = (i) => {
    var newData = cloneDeep(data);
    newData.dates.splice(i, 1);
    setData(newData);
  };
  //show location
  const showLocation = (e, i) => {
    return (
      <div className={style.locationInput}>
        <div className={style.radioButtons}>
          <RadioGroup
            className={style.rowFlex}
            value={data.locations[i].type}
            onChange={(e) => handleInputChange(e, i)}
          >
            <FormControlLabel
              value="pickup"
              name="pickup"
              control={<Radio className={style.styleRadio} />}
              label="Pickup"
            />
            <FormControlLabel
              value="dropoff"
              name="dropoff"
              control={<Radio className={style.styleRadio} />}
              label="Dropoff"
            />
          </RadioGroup>
        </div>
        <div className={style.inputField}>
          <TextField
            fullWidth
            variant="outlined"
            className={style.styleFormFields}
            required
            size="small"
            id="to"
            label={
              data.locations[i].type === "pickup"
                ? "Enter Pickup Point"
                : data.locations[i].type === "dropoff"
                ? "Enter DropOff Point"
                : "Choose Type"
            }
            name={data.locations[i].type}
            disabled={
              (data.locations[i].type ? false : true) ||
              data.locations[i].default
            }
            value={
              data.locations[i].type === "pickup" && data.locations[i].default
                ? "Load only / IA"
                : data.locations[i].type === "dropoff" &&
                  data.locations[i].default
                ? "Unload only"
                : data.locations[i].value
            }
            onChange={(e) => hanldeLocationInput(i, e)}
          />
        </div>
        {data.locations[i].type === "pickup" ? (
          <div
            className={
              data.locations[i].type === "pickup" ? style.checkBox : null
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.locations[i].default}
                  onClick={(e) => {
                    changeCheckBoxState(e, i);
                  }}
                  name="checkboxStates"
                  color="#00ADEE"
                />
              }
              label="Load only / IA"
            />
          </div>
        ) : data.locations[i].type === "dropoff" ? (
          <div
            className={
              data.locations[i].type === "dropoff" ? style.checkBox : null
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.locations[i].default}
                  onClick={(e) => {
                    changeCheckBoxState(e, i);
                  }}
                  name="checkboxStates"
                  color="#00ADEE"
                />
              }
              label="Unload only"
            />
          </div>
        ) : null}
        <div className={`${style.TrashIcon} ${style.centeredIcon}`}>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => removeLocation(i)}
          ></FontAwesomeIcon>
        </div>
      </div>
    );
  };
  //add location
  var addLocation = (e) => {
    e.stopPropagation();

    var newData = { ...data };
    newData.locations.push({ type: "", value: "", default: false });
    setData(newData);
  };
  //remove location
  var removeLocation = (i) => {
    var newData = { ...data };
    newData.locations.splice(i, 1);
    setData(newData);
  };
  //on change handler of radio buttons
  var handleInputChange = (e, i) => {
    let {  value } = e.target;
    let updateLocation = { ...data };
    updateLocation.locations[i].type = value;
    updateLocation.locations[i].value = "";
    updateLocation.locations[i].default = false;

    setData(updateLocation);
  };
  //load stripe
  const loadStripe = () => {
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
  //handler of input fields
  const changeHandler = (e) => {
    var { name, value } = e.target;
    let updatedPayment = cloneDeep(payment);
    updatedPayment[name] = value;
    setPayment(updatedPayment);
  };
  //payment handler
  const pay = (e) => {
    var { confirmJob, job } = props;
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
            if (typeof x == "number") {
              return new Date(x).toDateString();
            } else {
              return x.toDateString();
            }
          });
          let obj = {
            paidInCash: false,
            stripeToken: response.id,
            amount: payment.amount,
            jobbyId: data._id,
            dates: stringDates,
            startTime: data.startTime,
            phone: data.customer.phone,
            locations: data.locations.filter(
              (x) => x.value !== "" && x.type !== ""
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
    var { confirmJob, job } = props;
    let stringDates = data.dates.map((x) => {
      if (typeof x == "number") {
        return new Date(x).toDateString();
      } else {
        return x.toDateString();
      }
    });
    let obj = {
      paidInCash: true,
      jobbyId: data._id,
      dates: stringDates,
      startTime: data.startTime.toString(),
      phone: data.customer.phone,
      locations: data.locations.filter((x) => x.value !== "" && x.type !== ""),
      email: data.customer.email,
      customerId: data.customer._id,
    };
    confirmJob(obj);
    setData(job);
    props.close();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form>
            <h6>Dates:</h6>

            {data &&
              data.dates?.map((x, i) => {
                return (
                  <div className={`${style.styleDate}`} key = {i}>
                    <div className={`${style.dates} `}>
                      <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid>
                            <KeyboardDatePicker
                              inputVariant="outlined"
                              className={style.styleFormFields}
                              size="small"
                              fullWidth
                              id="date-picker-dialog"
                              format="MM/dd/yyyy"
                              value={data.dates[i]}
                              onChange={(e) => handleStartDate(e, i)}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                      <div className={style.flex}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => removeDate(i)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

            <div onClick={addDate}>
              <i className="fa fa-plus">Add Date</i>
            </div>

            <div className={style.time}>
              <div>
                <h6>Time:</h6>
              </div>
              <div>
                {data && (
                  <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid>
                        <KeyboardTimePicker
                          // className = {style.styleFormFields}
                          // fullWidth
                          id="time-picker"
                          value={data.startTime}
                          onChange={handleTimeSelect}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                          keyboardIcon={<AccessTimeIcon />}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </div>
                )}
              </div>
            </div>
          </form>
        );
      case 1:
        return (
          <form>
            {data && (
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
                  value={data.customer?.firstName}
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
                  value={data.customer?.lastName}
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
                  value={data.customer?.phone}
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
                  value={data.customer?.email}
                  onChange={handleFormInput}
                />
              </div>
            )}
          </form>
        );
      case 2:
        return (
          <div>
            {data?.locations.length === 0 && (
              <div className={`${style.locationBtn} ${style.flex}`}>
                <Button
                  className={`${style.button}`}
                  onClick={(e) => addLocation(e)}
                >
                  <FontAwesomeIcon icon = {faMapMarker} className = {style.locationIcon}/>
                  Add Location
                </Button>
              </div>
            )}

            {data?.locations?.length > 0 &&
              data.locations.map((e, i) => showLocation(e, i))}

            {data?.locations.length > 0 && (
              <div className={style.flexEnd}>
                <i className="fa fa-plus" onClick={(e) => addLocation(e)}></i>
              </div>
            )}
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
                <div >
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

                <div >
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
      <div className = {style.stepperLabels}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label, color }, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel className={style.styleRadio} {...labelProps}
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
        <div className = {style.stepperContent}>
          <Typography className={classes.instructions}>
            All steps completed - you&apos;re finished
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </div>
      ) : (
        <div className = {style.stepperContent}>
          <div>
          {getStepContent(activeStep)}
          </div>
          <div className={style.backAndSubmitBtn}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={activeStep === 0 ? style.back :`${style.back} ${style.backStyles}`}
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
  showMessage,
  confirmJob,
};
var mapStateToProps = (state) => ({
  job: state.jobs?.job,
});
export default connect(mapStateToProps, actions)(JobConfirmation);
