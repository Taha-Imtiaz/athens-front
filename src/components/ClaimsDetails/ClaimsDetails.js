import { Button, Chip } from "@material-ui/core";
import { cloneDeep } from "lodash";
import { Modal } from "react-bootstrap";
import {Link} from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateClaim, getClaim } from "../../Redux/Claims/claimsActions";
import style from "./ClaimsDetails.module.css";
import { showMessage } from "../../Redux/Common/commonActions";

const ClaimsDetails = (props) => {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
//   var [claimsId, setClaimsId] = useState(props.location.claimsId);
//   const [updateIndex, setUpdateIndex] = useState(0);
//   console.log(props.location.claimsId);

  var {
    match: {
      params: { claimsId },
    },
  } = props;

  useEffect(() => {
    var { getClaim,claims } = props;
    console.log(claimsId);
    if(claims) {
        console.log(claims)
    }
    getClaim(claimsId);
  }, []);

  //     var { claims } = props;
  //   var data = [];
  //   if (claims.claims) {
  //     data = claims.claims.data.claims;
  //     console.log(data.docs);
  //   }

  const handleAddUpdate = (e) => {
    setUpdate(e.target.value);
  };

  const handleCloseJob = () => {
    var { showMessage,claims } = props;

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
        console.log(newData);
        newData.updates.push(ob);
        var { showMessage, history } = props;
        updateClaim(newData)
          .then((res) => {
            if (res.data.status == 200) {
              claims.updates = res.data.claim.updates;
              setShow(false);
              setUpdate("");
              showMessage(res.data.message);
            }
          })
          .catch((err) => console.log(err));
      }
    };
var {claims} = props
  return (
    <div className = "row">
        <div className="col-3">

        <div className={`card ${style.cardCustom}`} style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", margin:"1rem 0"}}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontFamily: "sans-serif" }}>Customer</h5>
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

                <div
                  className="row"
                  style={{ marginTop: "2rem" }}
                >
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
                        {claims?.job ?  
                          <p style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}
                            className={style.assigneehead}
                            style={{ flexWrap: "nowrap" }}
                          >
                            <Link to = {`/job/details/${claims?.job?._id}`}> {claims?.job?.title}</Link>
                            <div>
                  {claims?.job?.assignee.length > 0 ?claims?.job?.assignee.map((assignee)=>  <Chip
                              label={assignee.name}
                              clickable
                              color="primary"
                              variant="outlined"
                              size="small"
                              style={{ margin: " 0.2rem 0rem" }}
                            /> ):<Chip
                            label="Not Added"
                            clickable
                            color="primary"
                            variant="outlined"
                            size="small"
                            style={{ margin: " 0 0.2rem" }}
                          /> }
                </div>
                          </p>
                     : <p style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>Not Added</p>}
                        <div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <h5 style={{fontFamily:"sans-serif", margin: " 0 0.2rem" , padding:"1rem"}} >Assignees</h5> */}
              
        </div>
      <div className={`card-body col-8 jumbotron `} style={{margin:"1rem 0"}} >
        <div>
          <div className="row justify-content-between"></div>

          {/* {x.claims.map((y, j) => {
            return ( */}
          <div>
         
            <h6>Protection Type : {claims?.claimType}</h6>
            <div className="row">
            <div className="col-12">
                <p  style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                      Title : {claims?.title}
                    </p>
              </div>
              <div className="col-12">
                <p  style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif", whiteSpace:"pre-line" }}>
                      Description : {claims?.description}
                    </p>
              </div>
              <div className="col-12">
                <p  style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                     Waiting : {claims?.waitTo}
                    </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-10"></div>
            <div
              className="col-2"
              style={{
                fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              <p>{`Total: $${claims?.price}`}</p>
            </div>
          </div>

          {/* );
          })} */}

          {/* {x.length > 0 ? (
            <div className="row">
              <div className="col-10">
              
              </div>
              <div className="col-2">
                <p>
                  {" "}
                  Total: $
                  {x.reduce(function (a, b) {
                    return a + b["price"];
                  }, 0)}
                </p>
              </div>
            </div>
          ) : null} */}
          <hr />
          <div className="row">
            <div className="col-12">
              {claims?.updates.length > 0 ? (
                <div>
                  <h3>Updates</h3>
                  {claims?.updates.map((x, i) => (
                    <div key={i} className="row" style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                      <div className="col-9">
                        <li> {x.value}</li>
                      </div>
                      <div className="col-3">
                        <li>
                          {" "}
                          {x.timestamp.split("T")[0]}
                        </li>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row" style={{ margin: "1rem 0" }}>
            <div className="col-8"></div>
            <div className="col-2" style={{ transform:"translateX(5rem)" }}>
              {claims?.status == "open" ? (
                <Button
                  // name="Add Update"
                  style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}}
                  onClick={() => handleShow()}
                >Add Update</Button>
              ) : null}
            </div>

            <div className="col-2">
              {claims?.status == "open" ? (
                <Button
                  // name="Close Claim"
                  style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif", transform: "translateX(2.5rem)" }}
                  onClick={() => handleCloseJob()}
                >Close Claim</Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Modal 
      show={show} onHide={handleClose}
      dialogClassName = {style.modal}
       scrollable centered>
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
  claims: state.claims?.data?.claim,
});
var actions = {
  showMessage,
  getClaim,
};
export default connect(mapStateToProps, actions)(ClaimsDetails);
