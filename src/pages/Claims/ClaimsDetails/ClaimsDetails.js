import { Button, Chip, TextareaAutosize, TextField } from "@material-ui/core";
import { cloneDeep } from "lodash";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateClaim, getClaim } from "../../../Redux/Claims/claimsActions";
import style from "./ClaimsDetails.module.css";
import { showMessage } from "../../../Redux/Common/commonActions";
import TimeAgo from "react-timeago";

const ClaimsDetails = (props) => {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const [waitTo, setWaitTo] = useState(true);
  const [claimInput, setClaimInput] = useState("");

  var {
    match: {
      params: { claimId },
    },
  } = props;

  var { claims, getClaim } = props;

  useEffect(() => {
    getClaim(claimId);
  }, []);

  useEffect(() => {
    setClaimInput(claims ?.waitTo);
  }, [claims]);

  const handleAddUpdate = (e) => {
    setUpdate(e.target.value);
  };

  const handleCloseJob = () => {
    var { showMessage, claims } = props;

    claims.status = "closed";
    updateClaim(claims)
      .then((res) => {
        if (res.data.status === 200) {
          showMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleShow = () => {
    setShow(true);
    // setUpdateIndex(i);
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
      var { showMessage, history } = props;
      updateClaim(newData)
        .then((res) => {
          if (res.data.status === 200) {
            claims.updates = res.data.data.updates;
            setShow(false);
            setUpdate("");
            showMessage(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  var editInput = () => {
    setWaitTo(false);
  };
  var handleClaimInput = (e) => {
    setClaimInput(e.target.value);
  };

  var disableInput = () => {
    var { showMessage, claims } = props;
    claims.waitTo = claimInput;
    setWaitTo(true);
    updateClaim(claims)
      .then((res) => {
        if (res.data.status == 200) {
          showMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  var { claims } = props;

  return (
    <div className={style.claimsDetailContainer}>
      <div className={style.claimDetails}>
        <div className={style.cards}>
          <div className={`card ${style.customerCard}`}>
            <div className="card-body">
              <h5 className="card-title">Customer</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                <Link
                  className={style.link}
                  to={`/customer/detail/${claims ?.customer._id}`}
                >
                  {claims ?.customer.firstName} {claims ?.customer.lastName}
                </Link>
              </h6>
              <p className="card-text">{claims ?.customer.phone}</p>
              <p className="card-text">{claims ?.customer.email}</p>
            </div>
          </div>

          <div className={`card ${style.jobCard}`}>
            <div className="card-body">
              <h5>Jobs</h5>
              {claims ?.job ? (
                <div>
                  <Link
                    to={`/job/detail/${claims ?.job ?._id}`}
                    className="card-title"
                  >
                    {" "}
                    {claims ?.job ?.title}
                  </Link>
                  <div>
                    {claims ?.job ?.assignee.length > 0 ? (
                      claims ?.job ?.assignee.map((assignee) => (
                        <Chip
                          label={assignee.name}
                          clickable
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      ))
                    ) : (
                        <Chip
                          label="Not Added"
                          clickable
                          color="primary"
                          variant="outlined"
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
        </div>

        <div className={`${style.claimDetail} `}>
          <div className={`${style.protectionRow}`}>
            <div>
              <h6>Protection Type : </h6>
            </div>
            <div>{claims ?.claimType}</div>

            <div>
              <h6>{`Total: `}</h6>
            </div>
            <div>{`$${claims ?.price}`}</div>

            <div>
              {claims ?.status === "open" ? (
                <Button className={style.button} onClick={() => handleShow()}>
                  Add Update
                </Button>
              ) : null}
            </div>

            <div>
              {claims ?.status === "open" ? (
                <Button
                  className={style.button}
                  // name="Close Claim"

                  onClick={() => handleCloseJob()}
                >
                  Close Claim
                </Button>
              ) : (
                  <Chip
                    label="Closed"
                    clickable
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                )}
            </div>
          </div>

          <div className={`${style.title} `}>
            <h6>Title:</h6> <div>{claims ?.title}</div>
          </div>

          <div className={style.description}>
            <h6>Description:</h6> <span>{claims ?.description}</span>
          </div>

          <div className={`${style.waiting}`}>
            <div>
              <h6>Waiting To : </h6>
            </div>

            <div onDoubleClick={editInput}>
              <TextField
                variant="outlined"
                margin="0"
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
              {waitTo === false && (
                <Button className={style.button} onClick={disableInput}>
                  Save
                </Button>
              )}
            </div>
          </div>

          {claims ?.updates.length > 0 ? (
            <div className={style.updates}>
              <div className={style.updateHead}>
                <h3>Updates</h3>
              </div>
              <div className={style.updateContent}>
                {claims ?.updates.map((x, i) => (
                  <div key={i} className={style.updateContentRow}>
                    {" "}
                    <div>{`${i + 1}.  ${x.value}`}</div>
                    <div>
                      <TimeAgo date={x.timestamp} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={style.modal}
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextareaAutosize
            name=""
            id=""
            cols="65"
            rows="5"
            name="Note"
            value={update}
            onChange={handleAddUpdate}
          ></TextareaAutosize>
        </Modal.Body>
        <Modal.Footer>
          <div className={style.flexEnd}>
            <Button className={style.button} onClick={handleClose}>
              Close
            </Button>
            <Button className={style.button} onClick={updateClaimData}>
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
var mapStateToProps = (state) => ({
  claims: state.claims ?.claim,
});
var actions = {
  showMessage,
  getClaim,
};
export default connect(mapStateToProps, actions)(ClaimsDetails);
