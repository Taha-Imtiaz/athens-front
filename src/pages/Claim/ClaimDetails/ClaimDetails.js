import {
  Button,
  Chip,
  TextareaAutosize,
  TextField,
  Modal,
} from "@material-ui/core";
import { cloneDeep } from "lodash";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateClaim, getClaim } from "../../../Redux/Claim/claimActions";
import style from "./ClaimDetails.module.css";
import TimeAgo from "react-timeago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarTimes,
  faEnvelope,
  faMobile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const ClaimDetails = (props) => {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const [waitTo, setWaitTo] = useState(true);
  const [claimInput, setClaimInput] = useState("");
  const [toggleClaim, setToggleClaim] = useState(false);

  let {
    match: {
      params: { claimId },
    },
  } = props;

  let { claims, getClaim, updateClaim } = props;

  useEffect(() => {
    getClaim(claimId);
  }, [getClaim, claimId]);

  useEffect(() => {
    if (claims) {
      setClaimInput(claims.waitTo);
    }
  }, [claims]);

  const handleAddUpdate = (e) => {
    setUpdate(e.target.value);
  };

  const handleCloseJob = () => {
    let { claims } = props;

    claims.status = "closed";
    updateClaim(claims, () => { });
    setToggleClaim(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  const updateClaimData = () => {
    if (update.length > 0) {
      let ob = {
        timestamp: new Date(),
        value: update,
      };
      let newData = cloneDeep(claims);
      newData.updates.unshift(ob);
      updateClaim(newData, (res) => {
        claims.updates = res.data.data.updates;
        setShow(false);
        setUpdate("");
      });
    }
  };

  const editInput = () => {
    setWaitTo(false);
  };
  const handleClaimInput = (e) => {
    setClaimInput(e.target.value);
  };

  const disableInput = () => {
    let { claims } = props;
    claims.waitTo = claimInput;
    setWaitTo(true);
    updateClaim(claims, () => { });
  };

  const reopenClaim = () => {
    let { claims } = props;
    claims.status = "open";
    updateClaim(claims, () => { });
    setToggleClaim(false);
  };

  return (
    <div>
      {claims && (
        <div className={style.claimsDetailContainer}>
          <div className={style.claimDetails}>
            <div className={style.cards}>
              <div className={`card ${style.customerCard}`}>
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">Customer</h5>
                  <div className="card-subtitle mb-2 text-capitalize">
                    <Link
                      className={style.link}
                      to={`/customer/detail/${claims.customer._id}`}
                    >
                      {" "}
                      <FontAwesomeIcon icon={faUser} />{" "}
                      {claims.customer.firstName} {claims.customer.lastName}
                    </Link>
                  </div>
                  <div className="card-text mb-2">
                    <FontAwesomeIcon icon={faMobile} /> {claims.customer.phone}
                  </div>

                  <div className={`${style.customerCardEmail} card-text mb-2`}>
                    <FontAwesomeIcon icon={faEnvelope} />{" "}
                    {claims.customer.email}
                  </div>
                </div>
              </div>

              <div className={`card ${style.jobCard}`}>
                <div className={`card-body `}>
                  <div>
                    <h5 className="font-weight-bold">Job</h5>
                  </div>
                  {claims.job ? (
                    <div>
                      <div>
                        <Link
                          to={`/job/detail/${claims.job._id}`}
                          className="card-title"
                        >
                          {" "}
                          {claims.job.title}
                        </Link>
                      </div>
                      <div className="text-capitalize font-weight-bold">
                        <Chip
                          label={claims.job.status}
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
                <div>
                  {claims.status === "open" ? (
                    <Button
                      className={style.button}
                      onClick={() => handleShow()}
                    >
                      Add Update
                    </Button>
                  ) : null}
                </div>
                <div>
                  {claims.status === "open" ? (
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
                    )}
                </div>
              </div>
            </div>

            <div className={`card ${style.claimDetail} `}>
              <div className={`${style.protectionRow}`}>
                <div>
                  <h6 className="text-muted">{`Title: `}</h6> <span>{claims.title}</span>
                </div>
                <div>
                  <h6 className="text-muted">{`Protection Type: `}</h6>
                  <Chip
                    className="font-weight-bold"
                    label={claims.claimType}
                    clickable
                    size="small"
                  />
                </div>
                <div>
                  <h6 className="text-muted">{`Total: `}</h6>
                  <Chip
                    className="font-weight-bold"
                    label={claims.price ? `$${claims.price}` : 'Not Added'}
                    clickable
                    size="small"
                  />
                </div>

              </div>

              <div className={style.description}>
                <h6>Description:</h6>
                <div>{claims.description}</div>
              </div>

              <div className={`${style.waiting}`}>
                <h6>Waiting To: </h6>

                <div className={style.waitingInput}>
                  <div onDoubleClick={editInput}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      name="claimInput"
                      value={claimInput}
                      onChange={(e) => handleClaimInput(e)}
                      disabled={waitTo}
                    >
                      {" "}
                    </TextField>
                  </div>
                  <div>
                    {waitTo === false ? (
                      <Button className={style.button} onClick={disableInput}>
                        Save
                      </Button>
                    ) : (
                        <Button className={style.button} onClick={editInput}>
                          Edit
                      </Button>
                      )}
                  </div>
                </div>
              </div>

              {claims.updates.length > 0 ? (
                <div className={style.updates}>
                  <div className={style.updateHead}>
                    <h6>{`Updates`}</h6>
                  </div>
                  <div className={`${style.updateContent}`}>
                    {claims.updates.map((x, i) => (
                      <div key={i} className={`card ${style.updateContentRow}`}>
                        {" "}
                        <div>{`${x.value}`}</div>
                        <div className={`text-muted ${style.update___time}`}>
                          <FontAwesomeIcon icon={faCalendarTimes} />{" "}
                          <TimeAgo date={x.timestamp} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* modal for close and reopen claims */}
          <Modal
            open={toggleClaim}
            onClose={() => setToggleClaim(false)}
            
            className={style.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={toggleClaim}>
              <div className={"bg-light p-3 w-50"}>
                <h3>Confirmation</h3>
                <h6>
                  {claims.status === "open"
                    ? `Do you want to close this claim ?`
                    : `Do you want to reopen this claim ?`}
                </h6>
                <div className={style.flexEnd}>
                  <Button
                    className={style.button}
                    onClick={() => setToggleClaim(false)}
                  >
                    Close
                  </Button>
                  {claims.status === "open" ? (
                    <Button
                      className={style.button}
                      onClick={() => handleCloseJob()}
                    >
                      Confirm
                    </Button>
                  ) : (
                      <Button className={style.button} onClick={reopenClaim}>
                        Confirm
                    </Button>
                    )}
                </div>
              </div>
            </Fade>
          </Modal>

          <Modal
            open={show}
            onClose={handleClose}
            
            className={style.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={show}>
              <div className={"bg-light p-3"}>
                <h3>Add update</h3>
                <TextareaAutosize
                  id=""
                  cols="65"
                  rows="5"
                  name="Note"
                  value={update}
                  onChange={handleAddUpdate}
                  className={style.styleTextArea}
                ></TextareaAutosize>
                <div className={style.flexEnd}>
                  <Button className={style.button} onClick={handleClose}>
                    Close
                </Button>
                  <Button className={style.button} onClick={updateClaimData}>
                    Add
                </Button>
                </div>
              </div>
            </Fade>
          </Modal>         
        </div>
      )}
    </div>
  );
};
var mapStateToProps = (state) => ({
  claims: state.claims.claim,
});

var actions = {
  getClaim,
  updateClaim,
};
export default connect(mapStateToProps, actions)(ClaimDetails);
