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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['Confirm Date and Time', 'Confirm Contact Info', 'Confirm PU/DO Addresseses', 'Deposit'];
}

export default function JobConfirmation(props) {

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

    console.log(props)
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [data, setData] = React.useState('');
    const steps = getSteps();


    useEffect(() => {
        let job = cloneDeep(props.data)
        console.log(job.dates)
        let parsedDates = job.dates.map(x => typeof x == 'string' ? Date.parse(x) : x)
        let index = timeOptions.findIndex(x => x.value == job.startTime)
        console.log(index)
        job.dates = parsedDates;
        // if (index != -1) {
        //     job.startTime = timeOptions[index].name;
        // }
        setData(job)
    }, [])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        setData({
            dates: newState.dates
        });
    };

    const addDate = () => {
        if (data.dates[0]) {
            setData({ dates: [...data.dates, ''] });
        }
    }

    const onStartTimeSelect = (selectedList, selectedTimeItem) => {
        let selectedTime = selectedTimeItem.value;
        let newState = { ...data };
        newState.startTime = selectedTime;
        setData({ startTime: newState.startTime });
    };

    const getStepContent = (step) => {
        console.log(data)
        switch (step) {
            case 0:
                return <form>
                    <h6>Dates:</h6>
                    <div className="row">
                        {data && data.dates.map((x, i) => {
                            return (
                                <div className="form-group col-5">
                                    <DatePicker
                                        selected={data.dates[i]}
                                        onChange={(e) => handleStartDate(e, i)}
                                        placeholderText="Choose Dates"
                                        className="form-control"
                                    />
                                </div>
                            )
                        })}
                        {/* {data.startDateError ? (
                    <div
                      className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                      role="alert"
                    >
                      {data.startDateError}
                    </div>
                  ) : null} */}

                        <div className="form-group col-2 my-0" onClick={addDate}>
                            <i className="fa fa-plus"></i>
                        </div>
                    </div>
                    <h6>Time:</h6>

                    <div className="row">
                        {data && <div className="form-group col-12" style={{ marginTop: "1rem" }}>
                            <Multiselect
                                // className={style.multi}
                                options={timeOptions} // Options to display in the dropdown
                                onSelect={onStartTimeSelect} // Function will trigger on select event
                                displayValue="name" // Property name to display in the dropdown options
                                className="form-control"
                                value={data.startTime}
                                id="starttime"
                                placeholder={data.startTime.length > 0 ? null : 'Start Time'}
                            />
                        </div>}
                    </div>

                </form>
            case 1:
                return 'An ad group contains one or more ads which target a shared set of keywords.';
            case 2:
                return `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`;
            default:
                return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <div>{getStepContent(index)}</div>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                  </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
          </Button>
                </Paper>
            )}
        </div>
    );
}
