import React, { useState, useEffect } from 'react'
import style from './DepositDetails.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes, faEnvelope, faMobile, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Chip, TextareaAutosize, TextField } from "@material-ui/core";
import { getDeposit, updateDeposit } from '../../../Redux/Deposit/DepositActions'
import { connect } from "react-redux";
import ActivitiesModal from '../../../components/ActivitiesModal/ActivitiesModal';

const DepositDetails = (props) => {

    let { getDeposit, updateDeposit, deposit } = props;

    const [show, setShow] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false)
    const [updatedDeposit, setUpdatedDeposit] = useState({
        quantity: 0,
        cost: 0
    })


    let {
        match: {
            params: { depositId },
        },
    } = props;

    useEffect(() => {
        getDeposit(depositId)
    }, [])

    useEffect(() => {
        if (deposit) {
            setUpdatedDeposit({
                quantity: deposit.quantity,
                cost: deposit.cost,
            })
        }
    }, [deposit])

    const handleShow = () => {
        setShow(true);
    };

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        if(name == 'quantity') {
            setUpdatedDeposit({ ...updatedDeposit, [name]: value, cost: value * 15 })
        } else {
            setUpdatedDeposit({ ...updatedDeposit, [name]: value })
        }
    }
    const update = () => {
        let obj = {
            ...updatedDeposit,
            id: deposit._id,
        }
        updateDeposit(obj)
        setToggleEdit(false)
    }

    return (
        <div>{deposit &&
            <div className={style.depositDetailsContainer}>
                <div className={style.depositDetails}>
                    <div className={style.cards}>
                        <div className={`card ${style.customerCard}`}>
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">Customer</h5>
                                <h6 className="card-subtitle mb-2">
                                    <Link
                                        className={style.link}
                                        to={`/customer/detail/${deposit.customer._id}`}
                                    > <FontAwesomeIcon icon={faUser} /> {" "}
                                        {deposit.customer.firstName} {deposit.customer.lastName}
                                    </Link>
                                </h6>
                                <div className="card-text mb-2">
                                    <FontAwesomeIcon icon={faMobile} /> {" "}
                                    {deposit.customer.phone}
                                </div>

                                <div className="card-text mb-2">
                                    <FontAwesomeIcon icon={faEnvelope} /> {" "}
                                    {deposit.customer.email}
                                </div>
                            </div>
                        </div>

                        <div className={`card ${style.jobCard}`}>
                            <div className={`card-body `}>
                                <div>
                                    <h5 className="font-weight-bold">Job</h5>
                                </div>
                                {deposit.job ? (
                                    <div>
                                        <div>
                                            <Link
                                                to={`/job/detail/${deposit.job._id}`}
                                                className="card-title"
                                            >
                                                {" "}
                                                {deposit.job.title}
                                            </Link>

                                        </div>
                                        <div>
                                            <Chip
                                                label={deposit.job.status}
                                                clickable
                                                size="small"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                        <div>Not Added</div>
                                    )}
                            </div>
                        </div>
                        <div className={`${style.claimButton}`}>
                            <Button
                                onClick={handleShow}
                                className={style.button}
                            >
                                Activities
                                </Button>
                        </div>
                    </div>

                    <div className={`card ${style.claimDetail} `}>
                        <div className={`${style.pricing}`}>


                            <div className={style.pricingInput}>
                                <div>
                                    <h6>Quantity: </h6>
                                    <TextField
                                        variant="outlined"
                                        required
                                        type="number"
                                        fullWidth
                                        size="small"
                                        name="quantity"
                                        value={updatedDeposit.quantity}
                                        onChange={(e) => handleOnChange(e)}
                                        disabled={!toggleEdit}
                                        onDoubleClick={() => setToggleEdit(true)}
                                    >
                                        {" "}
                                    </TextField>
                                </div>
                                <div>
                                    <h6>Deposit: </h6>
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        required
                                        fullWidth
                                        size="small"
                                        name="cost"
                                        value={updatedDeposit.cost}
                                        onChange={(e) => handleOnChange(e)}
                                        disabled={!toggleEdit}
                                        onDoubleClick={() => setToggleEdit(true)}
                                    >
                                        {" "}
                                    </TextField>
                                </div>

                            </div>

                        </div>
                        <div className={style.editButon}>
                            {toggleEdit ? (
                                <Button className={style.button} onClick={update}>
                                    Save
                                </Button>
                            ) : <Button className={style.button} onClick={() => setToggleEdit(true)}>
                                    Edit
                                </Button>
                            }
                        </div>
                    </div>
                </div>
                <ActivitiesModal
                    show={show}
                    activities={deposit.activities}
                    handleClose={() => setShow(false)}
                />
            </div>
        }
        </div>

    )
}
var mapStateToProps = (state) => ({
    deposit: state.blankets.deposit
});

var actions = {
    getDeposit,
    updateDeposit
};

export default connect(mapStateToProps, actions)(DepositDetails)
