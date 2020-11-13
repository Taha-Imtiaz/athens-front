import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { clone, cloneDeep } from "lodash"
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import { payAmount } from '../../../Redux/Mover/moverActions'
import { confirmJob } from '../../../Redux/Job/jobActions'
import { showMessage } from '../../../Redux/Common/commonActions'
import { connect } from "react-redux";
import { TextField } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
var time = today.getHours() + ":" + today.getMinutes() 

function getSteps() {
    return ['Confirm Date and Time', 'Confirm Contact Info', 'Confirm PU/DO Addresseses', 'Deposit'];
}

function JobConfirmation(props) {

    var [startTime, setStartTime] = useState(null)
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
    const [data, setData] = React.useState('');
    const [payment, setPayment] = React.useState({});


    const steps = getSteps();

    useEffect(() => {
        let job = cloneDeep(props.data)
        loadStripe();
        console.log(job.startTime)
        let parsedDates = job.dates.map(x => typeof x == 'string' ? Date.parse(x) : x)
        // let index = timeOptions.findIndex(x => x.value == job.startTime)
        job.dates = parsedDates;
        // if (index != -1) {
        //     job.startTime = timeOptions[index].name;
        // }
        setData(job)
    }, [])

    var handleTimeSelect = (e) => {
        var {name, value} = e.target
        console.log(name, value)
        setStartTime(value)
    }
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
        let newState = cloneDeep(data)
        newState.dates[i] = date;
        setData(newState);
    };

    const addDate = () => {
        if (data.dates[0]) {
            let newState = cloneDeep(data)
            newState.dates.push(new Date());
            setData(newState);
        }
    }

    const onStartTimeSelect = (selectedList, selectedTimeItem) => {
        let selectedTime = selectedTimeItem.value;
        let newState = { ...data };
        newState.startTime = selectedTime;
        setData(newState);
    };

    const handleFormInput = (event) => {
        console.log()
        var { name, value } = event.target
        let updatedCustomer = cloneDeep(data)
        updatedCustomer.customer[name] = value;
        setData(updatedCustomer)
    }


    const hanldeLocationInput = (i, e) => {
        let job = cloneDeep(data);
        job.locations[i].from = e.target.value
        setData(job);
    }

    const hanldeLocationInputTo = (i, e) => {
        let job = cloneDeep(data);
        job.locations[i].to = e.target.value
        setData(job);
    }

    const showLocation = (i) => {
        return <><div className="col-4">
            <div className="form-group">

            </div>
        </div>
            <div className="col-4">
                <div className="form-group">
                    <input
                        type="input"
                        className="form-control"
                        id="from"
                        placeholder="Pickup"
                        name="from"
                        value={data.locations[i].from}
                        onChange={(e) => hanldeLocationInput(i, e)}
                    />
                </div>
            </div>
            <div className="col-4">
                <input
                    type="input"
                    className="form-control"
                    id="to"
                    placeholder="Drop Off"
                    name="to"
                    value={data.locations[i].to}
                    onChange={(e) => hanldeLocationInputTo(i, e)}
                />
            </div></>
    }

    const loadStripe = () => {

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

    const changeHandler = (e) => {
        var { name, value } = e.target;
        let updatedPayment = cloneDeep(payment)
        updatedPayment[name] = value;
        setPayment(updatedPayment);
    }

    const pay = (e) => {
        // e.preventDefault();
        console.log(data, 'Data')
        console.log(payment, 'Payment')



        window.Stripe.card.createToken({
            number: payment.number,
            exp_month: payment.exp_month,
            exp_year: payment.exp_year,
            cvc: payment.cvc
        }, (status, response) => {

            if (status === 200) {
                let stringDates = data.dates.map(x => {
                    if (typeof x == 'number') {
                        return new Date(x).toDateString()
                    } else {
                        return x.toDateString()
                    }
                    //   x.toDateString()
                })
                let obj = {
                    stripeToken: response.id,
                    amount: payment.amount,
                    jobbyId: data._id,
                    dates: stringDates,
                    startTime: data.startTime,
                    phone: data.customer.phone,
                    locations: data.locations,
                    email: data.customer.email,
                    customerId: data.customer._id
                }
                console.log(obj)
                confirmJob(obj).then((res) => {
                    let { showMessage } = props;
                    if (res.data.status == 200) {
                        console.log(res)
                        showMessage(res.data.message)
                        // history.push('/job')
                        props.close();
                    }
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

    const getStepContent = (step) => {
        console.log(data)
        
        switch (step) {
            case 0:
                return <form>
                    <h6>Dates:</h6>
                    <div className="row">
                        {data && data.dates.map((x, i) => {
                            return (
                                <div className="form-group col-3">
                                    <DatePicker
                                        selected={data.dates[i]}
                                        onChange={(e) => handleStartDate(e, i)}
                                        placeholderText="Choose Dates"
                                        className="form-control"
                                    />
                                </div>
                            )
                        })}

                        <div className="form-group col-2 my-0" onClick={addDate}>
                            <i className="fa fa-plus">Add Date</i>
                        </div>
                    </div>
                    <h6>Time:</h6>

                    <div className="row">
                        {data && <div className="form-group col-12" style={{ marginTop: "1rem" }}>
                            {/* <Multiselect
                                singleSelect={true}
                                options={timeOptions} // Options to display in the dropdown
                                onSelect={onStartTimeSelect} // Function will trigger on select event
                                displayValue="name" // Property name to display in the dropdown options
                                className="form-control"
                                // value={startTime}
                                // selectedValues ={[data.startTime]}
                                id="starttime"
                                placeholder='Start Time'
                            /> */}

                <TextField
                    id="time"
                    fullWidth
                    label="Start Time"
                    type="time"
                    name="startTime"
                    value={startTime}
                    onChange={handleTimeSelect}
                    variant = "outlined"
                     size = "small"
                    // defaultValue="07:30"
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                        </div>}
                    </div>
                </form>
            case 1:
                return <form>
                    {data && <div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">First Name</label>
                            <input type="input" className="form-control" id="firstName" name="firstName" value={data.customer.firstName} onChange={handleFormInput} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Last Name</label>
                            <input type="input" className="form-control" id="lastName" name="lastName" value={data.customer.lastName} onChange={handleFormInput} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Phone Number</label>
                            <input type="input" className="form-control" id="phone_number" name="phone" value={data.customer.phone} onChange={handleFormInput} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" name="email" value={data.customer.email} onChange={handleFormInput} />
                        </div>
                    </div>}
                </form>;
            case 2:
                return <div>{data.locations.map((ll, i) => {
                    return showLocation(i)
                })}</div>
            case 3:
                return <div>
                    <div className="text-center" style={{ margin: "26px" }}>
                        <h5>Payment Information</h5>
                        {/* <span><i className="fa fa-cc-paypal" style={{ fontSize: "36px" }}></i></span>
                        <span><i className="fa fa-cc-visa" style={{ fontSize: "36px", backgroundColor: "red" }}></i></span>
                        <span><i className="fa fa-cc-mastercard" style={{ fontSize: "36px" }}></i></span> */}
                    </div>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="cardno" placeholder="Card Number" name="number" onChange={changeHandler} />
                        </div>
                        <p>Testing Card #: 4242424242424242</p>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" id="month" placeholder="Month" name="exp_month" onChange={changeHandler} />
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" id="year" placeholder="Year" name="exp_year" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="name" placeholder="CVC" name="cvc" onChange={changeHandler} />
                        </div>
                        <div className="form-group">
                            <input type="number" className="form-control" id="amount" placeholder="Amount" name="amount" onChange={changeHandler} />
                        </div>

                        {/* <input type="button" className="btn btn-primary" name="pay" value="Pay" onClick={pay} /> */}

                    </form>
                </div>
            default:
                return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
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
                                getStepContent(activeStep)/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
                  </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

var actions = {
    showMessage
}

export default connect(null, actions)(JobConfirmation);
