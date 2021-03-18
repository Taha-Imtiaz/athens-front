import React, { useState, useEffect } from 'react'
import style from './DepositDetails.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes, faEnvelope, faMobile, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Chip, TextareaAutosize, TextField } from "@material-ui/core";
import { getDeposit } from '../../../Redux/Deposit/DepositActions'
import { connect } from "react-redux";

const DepositDetails = (props) => {

    let {
        match: {
            params: { depositId },
        },
    } = props;

    let { getDeposit, deposit } = props;
    const [show, setShow] = useState(false);
    const [toggleClaim, setToggleClaim] = useState(false)

    useEffect(() => {
        getDeposit(depositId)
    }, [])

    const handleShow = () => {
        setShow(true);
    };

    return (
        <div>{deposit &&
            <div className={style.depositDetailsContainer}>
                <div className={style.depositDetails}>
                    <div className={style.cards}>
                        <div className={`card ${style.customerCard}`}>
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">Customer</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
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
                                            {deposit.job.assignee.length > 0 ? (
                                                deposit.job.assignee.map((assignee, i) => (
                                                    <Chip key={i}
                                                        // label={assignee.name}
                                                        clickable
                                                        size="small"
                                                    />
                                                ))
                                            ) : (
                                                <Chip
                                                    label="Not Added"
                                                    clickable
                                                    size="small"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div>Not Added</div>
                                )}
                            </div>
                        </div>
                        <div className={`${style.claimButton}`}>
                            <div>
                                <Button
                                    onClick={() => handleShow(deposit)}
                                    className={style.button}
                                >
                                    Activities
                                </Button>
                                {/* {deposit.status === "open" ? (
                                    <Button className={style.button} onClick={() => handleShow()}>
                                        Add Update
                                    </Button>
                                ) : null} */}
                            </div>
                            <div>
                                {/* {claims.status === "open" ? (
                                    <Button
                                        className={style.button}
                                        onClick={() => setToggleClaim(true)}
                                    >
                                        Close Claim
                                    </Button>
                                ) : (
                                    <Button
                                        className={style.button}
                                        onClick={() => setToggleClaim(true)}
                                    >
                                        Re-Open Claim
                                    </Button>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>

    )
}
var mapStateToProps = (state) => ({
    deposit: state.blankets.deposit
});

var actions = {
    getDeposit
};

export default connect(mapStateToProps, actions)(DepositDetails)
