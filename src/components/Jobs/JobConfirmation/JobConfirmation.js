import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { clone, cloneDeep } from "lodash";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import { payAmount } from "../../../Redux/Mover/moverActions";
import { confirmJob } from "../../../Redux/Job/jobActions";
import { showMessage } from "../../../Redux/Common/commonActions";
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
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();

function getSteps() {
  return [
    "Confirm Date and Time",
    "Confirm Contact Info",
    "Confirm PU/DO Addresseses",
    "Deposit",
  ];
}

function JobConfirmation(props) {
  var [startTime, setStartTime] = useState(null);
  const timeOptions = [
    { name: "01:00 am", id: 1, value: "01:00:00" },
    { name: "02:00 am", id: 2, value: "02:00:00" },
    { name: "03:00 am", id: 3, value: "03:00:00" },
    { name: "04:00 am", id: 4, value: "04:00:00" },
    { name: "05:00 am", id: 5, value: "05:00:00" },
    { name: "06:00 am", id: 6, value: "06:00:00" },
    { name: "07:00 am", id: 7, value: "07:00:00" },
    { name: "08:00 am", id: 8, value: "08:00:00" },
    { name: "09:00 am", id: 9, value: "09:00:00" },
    { name: "10:00 am", id: 10, value: "10:00:00" },
    { name: "11:00 am", id: 11, value: "11:00:00" },
    { name: "12:00 pm", id: 12, value: "12:00:00" },
    { name: "01:00 pm", id: 13, value: "13:00:00" },
    { name: "02:00 pm", id: 14, value: "14:00:00" },
    { name: "03:00 pm", id: 15, value: "15:00:00" },
    { name: "04:00 pm", id: 16, value: "16:00:00" },
    { name: "05:00 pm", id: 17, value: "17:00:00" },
    { name: "06:00 pm", id: 18, value: "18:00:00" },
    { name: "07:00 pm", id: 19, value: "19:00:00" },
    { name: "08:00 pm", id: 20, value: "20:00:00" },
    { name: "09:00 pm", id: 21, value: "21:00:00" },
    { name: "10:00 pm", id: 22, value: "22:00:00" },
    { name: "11:00 pm", id: 23, value: "23:00:00" },
    { name: "12:00 am", id: 24, value: "00:00:00" },
  ];

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState("");
  const [payment, setPayment] = React.useState({});
  var [state, setState] = useState("")
  const steps = getSteps();

  useEffect(() => {
    let job = cloneDeep(props.data);
    loadStripe();
    let parsedDates = job.dates.map((x) =>
      typeof x == "string" ? Date.parse(x) : x
    );
    job.dates = parsedDates;
    setData(job);
  }, []);

  var handleTimeSelect = (e) => {
    var { name, value } = e.target;
    setStartTime(value);
  };
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      pay();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleStartDate = (date, i) => {
    let newState = cloneDeep(data);
    newState.dates[i] = date;
    setData(newState);
  };

  const addDate = () => {
    if (data.dates[0]) {
      let newState = cloneDeep(data);
      newState.dates.push(new Date());
      setData(newState);
    }
  };

  const onStartTimeSelect = (selectedList, selectedTimeItem) => {
    let selectedTime = selectedTimeItem.value;
    let newState = { ...data };
    newState.startTime = selectedTime;
    setData(newState);
  };



  const handleFormInput = (event) => {
    var { name, value } = event.target;
    let updatedCustomer = cloneDeep(data);
    updatedCustomer.customer[name] = value;
    setData(updatedCustomer);
  };

  const hanldeLocationInput = (i, e) => {
    let job = cloneDeep(data);
    job.locations[i].value = e.target.value;
    setData(job);
  };

  const hanldeLocationInputTo = (i, e) => {
    let job = cloneDeep(data);
    job.locations[i].value = e.target.value;
    setData(job);
  };

  
  
 var handleCheckBox = (e, i) => {
    var { name, value } = e.target;
    e.stopPropagation()
    console.log(name, value)
     setState({...data,  [name]: value })
     console.log(data)
    // this.setState((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };
 var changeCheckBoxState = (i) => {
    // console.log(this.state.locations, i);

    var prevState = {...data.locations};
    console.log(prevState[i])
    prevState[i].default = !prevState[i].default;
    console.log(prevState[i].type)
    if(prevState[i].default) {
      // console.log(prevState[i].type)
      prevState[i].value = prevState[i].type == 'pickup' ? 'Unload Only' : 'Load Only / IA'
    } else {
      prevState[i].value = ''
    }
    console.log(prevState[i]);
    setData(prevState)
    // this.setState({
    //   locations: prevState,
    // });
  };

  const showLocation = (i) => {
    console.log(data.locations)
    if (i === 0) {
      return (
        <div className="row" style={{ width: "92%", margin: "0 2rem" }}>
          <div className="col-12">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              size="small"
              id="from"
              label="Pickup"
              name="pickup"
              value={data.locations[0].value}
              onChange={(e) => hanldeLocationInput(i, e)}
              error={data.locationfromError ? true : false}
            />
          </div>
        </div>
      );
    } else if (i == 1) {
      return (
        <div className="row" style={{ width: "92%", margin: "0 2rem" }}>
          <div className="col-12">
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              size="small"
              id="to"
              label="Drop Off"
              name="dropoff"
              value={data.locations[i].value}
              onChange={(e) => hanldeLocationInputTo(i, e)}
              error={data.locationtoError ? true : false}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="row" style={{ display: "flex", margin: "0 1rem" }}>
          <div className="col-4">
            <RadioGroup
              className={style.rowFlex}
              value={data.locations[i].type}
              onChange={(e) => handleInputChange(e, i)}
            >
              <FormControlLabel
                value="pickup"
                name="pickup"
                control={<Radio style = {{color:"#00ADEE"}}/>}
                label="Pickup"
              />
              <FormControlLabel
                value="dropoff"
                name="dropoff"
                control={<Radio style = {{color:"#00ADEE"}}/>}
                label="Dropoff"
              />
            </RadioGroup>
          </div>
          <div className="col-4">
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              size="small"
              id="to"
              label={data.locations[i].type}
              name={data.locations[i].type}
              value={data.locations[i].value}
              onChange={(e) => hanldeLocationInput(i, e)}
              // error={this.state.locationtoError ? true : false}
            />
          </div>
          {data.locations[i].type == "pickup" ? (
            <div
              className="col-3"
              style={{
                display: "flex",
                alignItems: "center",
                
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.locations[i].default}
                    onChange={(e) => handleCheckBox(e, i)}
                    onClick={() => changeCheckBoxState(i)}
                    name="checkboxStates"
                    color="#00ADEE"
                  />
                }
                label="Unload Only"
              />
            </div>
          ) : data.locations[i].type == "dropoff" ? (
            <div
              className="col-3"
              style={{
                display: "flex",
                alignItems: "center",
             
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.locations[i].default}
                    onChange={(e) => handleCheckBox(e, i)}
                    onClick={() => changeCheckBoxState(i)}
                    name="checkboxStates"
                    color="#00ADEE"
                  />
                }
                label="Load only/IA"
              />
            </div>
          ) : (
            <div
              className="col-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "no-wrap",
              }}
            ></div>
          )}
          <div className="col-1">
            <FontAwesomeIcon
              icon = {faTrash}
              onClick={() => removeLocation(i)}
              style={{
                transform: "translateY(1.5rem)",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            ></FontAwesomeIcon>
          </div>
        </div>
      );

      // return (
      //   <div className="row" style={{ width: "92%", margin: "0 2rem" }} key={i}>
      //     <div className="col-11">
      //       <TextField
      //         fullWidth
      //         variant="outlined"
      //         margin="normal"
      //         required
      //         size="small"
      //         id="to"
      //         label="Drop Off"
      //         name="to"
      //         value={this.state.locations.to[i]}
      //         onChange={(e) => this.hanldeLocationInputTo(i, e)}
      //         error={this.state.locationtoError ? true : false}
      //       />
      //     </div>
      //     <div className="col-1">
      //       <div className=" form-group col-1">
      //         <i
      //           className="fa fa-minus"
      //           onClick={() => this.removeLocation(i)}
      //           style={{ transform: "translateY(1.5rem)" }}
      //         ></i>
      //       </div>
      //     </div>
      //   </div>
      // );
    }
  };
  var addLocation = (e) => {
    e.stopPropagation();

    // if (this.state.locations.from && this.state.locations.to[0].length > 0) {
    //   var dropOffLocation = this.state.locations.to.push('')
    //   this.setState({
    //     locations: {...this.state.locations }
    //   });
    // }

    if (data.locations[0].value !== "" && data.locations[1].value !== "") {
      var newData = { ...data };
      newData.locations.push({ type: "", value: "" });
      setData(newData);
      // this.setState({
      //   locations: {...this.state.locations }
      // });
    }
  };

  // var removeLocation = (e, i) => {
  //   e.stopPropagation();
  //   let newData = { ...data };
  //   newData.locations.to.splice(i, 1);
  //   setData(newData);
  // };
  var removeLocation = (i) => {
    var newData = { ...data };
    newData.locations.splice(i, 1);
    setData(newData);
  };

  var handleInputChange = (e, i) => {
    let { name, value } = e.target;
    let updateLocation = { ...data };
console.log(name, value)
    updateLocation.locations[i].type = value;
    updateLocation.locations[i].value  = '';
    updateLocation.locations[i].default = false;

    setData(updateLocation);
  };

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

  const changeHandler = (e) => {
    var { name, value } = e.target;
    let updatedPayment = cloneDeep(payment);
    updatedPayment[name] = value;
    setPayment(updatedPayment);
  };

  const pay = (e) => {
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
            //   x.toDateString()
          });
          let obj = {
            paidInCash: false,
            stripeToken: response.id,
            amount: payment.amount,
            jobbyId: data._id,
            dates: stringDates,
            startTime: data.startTime,
            phone: data.customer.phone,
            locations: data.locations.filter(x => x.value != '' && x.type != ''),
            email: data.customer.email,
            customerId: data.customer._id,
          };
          confirmJob(obj).then((res) => {
            let { showMessage } = props;
            if (res.data.status == 200) {
              showMessage(res.data.message);
              // history.push('/job')
              props.close();
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

  const handleSubmitWithoutPay = () => {
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
      startTime: data.startTime,
      phone: data.customer.phone,
      locations: data.locations.filter(x => x.value != '' && x.type != ''),
      email: data.customer.email,
      customerId: data.customer._id,
    };
    confirmJob(obj).then((res) => {
      let { showMessage } = props;
      if (res.data.status == 200) {
        showMessage(res.data.message);
        // history.push('/job')
        props.close();
      }
    });
    // this.setState({
    //     message: `Success! Card token ${response.card.id}.`,
    //     formProcess: false
    // });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form>
            <h6>Dates:</h6>
            <div className="row">
              {data &&
                data.dates?.map((x, i) => {
                  return (
                    <div className="form-group col-3">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid>
                          <div
                            style={{
                              // transform: "translateX(3rem)",
                              width: "100%",
                            }}
                          >
                            <KeyboardDatePicker
                              inputVariant="outlined"
                              margin="normal"
                              size="small"
                              fullWidth
                              id="date-picker-dialog"
                              // style={{ zIndex: "-1" }}
                              format="MM/dd/yyyy"
                              value={data.dates[i]}
                              onChange={(e) => handleStartDate(e, i)}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </div>
                        </Grid>
                      </MuiPickersUtilsProvider>
                      {/* <DatePicker
                        selected={data.dates[i]}
                        onChange={(e) => handleStartDate(e, i)}
                        placeholderText="Choose Dates"
                        className="form-control"
                      /> */}
                    </div>
                  );
                })}

              <div className="form-group col-2 my-4" onClick={addDate}>
                <i className="fa fa-plus">Add Date</i>
              </div>
            </div>
            <h6>Time:</h6>

            <div className="row">
              {data && (
                <div
                  className="form-group col-12"
                  style={{ marginTop: "1rem" }}
                >
                  <TextField
                    id="time"
                    fullWidth
                    label="Start Time"
                    type="time"
                    name="startTime"
                    value={startTime}
                    onChange={handleTimeSelect}
                    variant="outlined"
                    size="small"
                    defaultValue={data.startTime}
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </div>
              )}
            </div>
          </form>
        );
      case 1:
        return (
          <form>
            {data && (
              <div>
                <div className="form-group">
                  {/* <label htmlFor="exampleInputEmail1">First Name</label> */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="name"
                    label="First Name"
                    name="firstName"
                    value={data.customer?.firstName}
                    onChange={handleFormInput}
                  />
                </div>

                <div className="form-group">
                  {/* <label htmlFor="exampleInputEmail1">Last Name</label> */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="name"
                    label="Last Name"
                    name="lastName"
                    value={data.customer?.lastName}
                    onChange={handleFormInput}
                  />
                </div>

                <div className="form-group">
                  {/* <label htmlFor="exampleInputEmail1">Phone Number</label> */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="name"
                    label="Phone Number"
                    name="phone"
                    value={data.customer?.phone}
                    onChange={handleFormInput}
                  />
                </div>

                <div className="form-group">
                  {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                  <TextField
                    variant="outlined"
                    margin="normal"
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
              </div>
            )}
          </form>
        );
      case 2:
        return (
          <div>
            {/* {data.locations && (
              <div>
                <div className="row" style={{ width: "92%", margin: "0 2rem" }}>
                  <div className="col-12">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="from"
                      label="Pickup"
                      name="from"
                      value={data.locations.from}
                      onChange={(e) => hanldeLocationInput(e)}
                    // error={this.state.locationfromError}
                    />
                  </div>
                </div>
              </div>
            )} */}

            {/* {data.locations.map((ll, i) => {
              return showLocation(i);
            })} */}
            {data.locations?.map((locationTo, i) => showLocation(i))}

            <div className="row">
              <div className="col-11"></div>
              <div className="col-1">
                <i
                  className="fa fa-plus"
                  onClick={(e) => addLocation(e)}
                  style={{ transform: "translate3d(-1.3rem,0rem, 0)" }}
                ></i>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            {/* <div className="text-center" style={{ margin: "26px" }}>
              <h5>Payment Information</h5>
            </div> */}
            <form>
              <div className="form-group">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  id="cardno"
                  label="Card Number"
                  name="number"
                  onChange={changeHandler}
                />
              </div>
              <p>Testing Card #: 4242424242424242</p>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="month"
                      label="Month"
                      name="exp_month"
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group">
                    <TextField
                      variant="outlined"
                      margin="normal"
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
              </div>
              <div className="form-group">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  id="name"
                  label="CVC"
                  name="cvc"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  id="amount"
                  label="Amount"
                  name="amount"
                  onChange={changeHandler}
                />
              </div>

              {/* <input type="button" className="btn btn-primary" name="pay" value="Pay" onClick={pay} /> */}
            </form>
            <Button
              onClick={handleSubmitWithoutPay}
              //   style={{ float: "right" }}
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                float: "right",
              }}

              //   className={classes.button}
            >
              Skip And Submit
            </Button>
          </div>
        );
      default:
        return "Unknown step";
    }
  };
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel  style = {{color:"#00ADEE"}} {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div style={{ margin: "5px 30px" }}>
            {
              getStepContent(
                activeStep
              ) /* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */
            }
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                style={{
                  background: "#00ADEE",
                  textTransform: "none",
                  color: "#FFF",
                  fontFamily: "sans-serif",
                }}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className={classes.button}
                style={{
                  background: "#00ADEE",
                  textTransform: "none",
                  color: "#FFF",
                  fontFamily: "sans-serif",
                }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

var actions = {
  showMessage,
};

export default connect(null, actions)(JobConfirmation);
