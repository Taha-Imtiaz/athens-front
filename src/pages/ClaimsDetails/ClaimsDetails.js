import { Button, Chip, TextField } from "@material-ui/core";
import { cloneDeep } from "lodash";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateClaim, getClaim } from "../../Redux/Claims/claimsActions";
import style from "./ClaimsDetails.module.css";
import { showMessage } from "../../Redux/Common/commonActions";
import TimeAgo from "react-timeago";

const ClaimsDetails = (props) => {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const [waitTo, setWaitTo] = useState(true);
  const [claimInput, setClaimInput] = useState("");

  var {
    match: {
      params: { claimsId },
    },
  } = props;

  var { claims, getClaim } = props;
  useEffect(() => {
    getClaim(claimsId);
  }, []);

  useEffect(() => {
    setClaimInput(claims?.waitTo);
  }, [claims]);

  const handleAddUpdate = (e) => {
    setUpdate(e.target.value);
  };

  const handleCloseJob = () => {
    var { showMessage, claims } = props;

    claims.status = "closed";
    updateClaim(claims)
      .then((res) => {
        if (res.data.status == 200) {
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
          console.log(res.data)
          if (res.data.status == 200) {
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
    <div className={`row ${style.toprow}`}>
      <div className="col-3">
        <div
          className={`card ${style.cardCustom}`}
          style={{
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            margin: "1rem 0",
          }}
        >
          <div className="card-body">
            <h5 className="card-title" style={{ fontFamily: "sans-serif" }}>
              Customer
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              <Link
                style={{ textDecoration: "none" }}
                to={`/customer/detail/${claims?.customer._id}`}
              >
                {claims?.customer.firstName} {claims?.customer.lastName}
              </Link>
            </h6>
            <p className="card-text">{claims?.customer.phone}</p>
            <p className="card-text">{claims?.customer.email}</p>
          </div>
        </div>

        <div className="row" style={{ marginTop: "2rem" }}>
          <div className="col-11 col-md-11">
            <div
              className={`card ${style.cardCustom}`}
              style={{
                // margin: "1rem",
                // width: "100%",
                transform: "translateY(-1rem)",
              }}
            >
              <div
                className={`container ${style.cont}`}
                style={{ margin: "1rem" }}
              >
                <h5
                  className={style.assigneehead}
                  style={{ flexWrap: "nowrap", fontFamily: "sans-serif" }}
                >
                  Jobs
                </h5>
                {claims?.job ? (
                  <p
                    style={{
                      fontFamily:
                        "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                    }}
                    className={style.assigneehead}
                    style={{ flexWrap: "nowrap" }}
                  >
                    <Link to={`/job/detail/${claims?.job?._id}`}>
                      {" "}
                      {claims?.job?.title}
                    </Link>
                    <div>
                      {claims?.job?.assignee.length > 0 ? (
                        claims?.job?.assignee.map((assignee) => (
                          <Chip
                            label={assignee.name}
                            clickable
                            color="primary"
                            variant="outlined"
                            size="small"
                            style={{ margin: " 0.2rem 0rem" }}
                          />
                        ))
                      ) : (
                        <Chip
                          label="Not Added"
                          clickable
                          color="primary"
                          variant="outlined"
                          size="small"
                          style={{ margin: " 0 0.2rem" }}
                        />
                      )}
                    </div>
                  </p>
                ) : (
                  <p>Not Added</p>
                )}
                <div></div>
              </div>
            </div>
          </div>
        </div>
        {/* <h5 style={{fontFamily:"sans-serif", margin: " 0 0.2rem" , padding:"1rem"}} >Assignees</h5> */}
      </div>
      <div
        className={`card-body col-8 jumbotron `}
        style={{ margin: "1rem 0" }}
      >
        <div>
          <div className="row justify-content-between"></div>

          {/* {x.claims.map((y, j) => {
            return ( */}
          <div>
            <div className="row col-12">
              <div className={`col-5 ${style.protectionRow}`}>
                <h6>Protection Type : </h6>
                <span style={{ fontWeight: "normal" }}>
                  {claims?.claimType}
                </span>
              </div>

              <div
                className={`col-3 ${style.protectionRow}`}
                style={{
                  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                <h6>{`Total: `}</h6>
                <span>{`$${claims?.price}`}</span>
              </div>

              <div className="col-2" style={{ transform: "translateX(5rem)" }}>
                {claims?.status == "open" ? (
                  <Button
                    // name="Add Update"
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                    }}
                    onClick={() => handleShow()}
                  >
                    Add Update
                  </Button>
                ) : null}
              </div>

              <div className="col-2">
                {claims?.status == "open" ? (
                  <Button
                    // name="Close Claim"
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                      transform: "translateX(2.5rem)",
                    }}
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
                    style={{ margin: " 0 0.2rem" }}
                  />
                )}
              </div>
            </div>

            <hr />

            <div className={`col-12 row ${style.styleClaims}`}>
              <h6
                className="col-3"
                style={{
                  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                Title:
              </h6>{" "}
              <span style={{ fontWeight: "normal" }}>{claims?.title}</span>
            </div>
            <hr />
            <div className={`col-12 row ${style.styleClaims}`}>
              <h6
                className="col-3"
                style={{
                  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                  whiteSpace: "pre-line",
                }}
              >
                Description:
              </h6>{" "}
              <span style={{ fontWeight: "normal", whiteSpace: "pre-line" }}>
                {claims?.description}
              </span>
            </div>
            <hr />
            <div className={`col-12 ${style.styleWaiting}`}>
              <h6
                style={{
                  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                Waiting To :{" "}
              </h6>

              <div onDoubleClick={editInput} className="col-9">
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
                  style={{ fontWeight: "normal" }}
                >
                  {" "}
                </TextField>
              </div>
              <div>
                {waitTo === false && (
                  <Button
                    onClick={disableInput}
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-12">
              {claims?.updates.length > 0 ? (
                <div>
                  <h3 className="col-12">Updates</h3>
                  {claims?.updates.map((x, i) => (
                    <div>
                      <div
                        key={i}
                        // className="row"
                        style={{
                          fontFamily:
                            "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                        }}
                      >
                        <div className="col-12">
                          <li style={{ listStyle: "none" }}>{`${i + 1}.  ${
                            x.value
                          }`}</li>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-10"></div>
                        <div className="col-2">
                          <li style={{ listStyle: "none", color: "#a8a8a8" }}>
                            {/* {x.timestamp.split("T")[0]} */}

                            <TimeAgo date={x.timestamp} />
                            {/* {" " + new Date(x.timestamp).toDateString()} {new Date(x.timestamp).toLocaleTimeString()} */}
                          </li>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        
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
          <textarea
            name=""
            id=""
            cols="65"
            rows="5"
            name="Note"
            value={update}
            onChange={handleAddUpdate}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            style={{
              background: "#00ADEE",
              textTransform: "none",
              color: "#FFF",
              fontFamily: "sans-serif",
              margin: "0 0.4rem",
            }}
          >
            Close
          </Button>
          <Button
            onClick={updateClaimData}
            style={{
              background: "#00ADEE",
              textTransform: "none",
              color: "#FFF",
              fontFamily: "sans-serif",
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
var mapStateToProps = (state) => ({
  claims: state.claims?.claim,
});
var actions = {
  showMessage,
  getClaim,
};
export default connect(mapStateToProps, actions)(ClaimsDetails);
