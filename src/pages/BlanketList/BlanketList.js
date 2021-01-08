import { Button, FormControl, TextField } from "@material-ui/core";
import { cloneDeep } from "lodash";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./BlanketList.module.css";
import TimeAgo from "react-timeago";
import { updateDeposit } from "../../Redux/Claims/claimsActions";
import { showMessage } from "../../Redux/Common/commonActions";
import { connect } from "react-redux";
import { Modal, Alert } from "react-bootstrap";

const BlanketList = (props) => {
  var [blanketValue, setBlanketValue] = useState(props.blanketValue);
  var [quantityValue, setQuantityValue] = useState(false);
  const [show, setShow] = useState(false);

  var [depositValue, setDepositValue] = useState("");

  var [depositToEdit, setDepositToEdit] = useState(null);
  var [edit, setEdit] = useState(false);

  const editDeposit = (i) => {
    setDepositToEdit(i);
    setEdit(true);
  };

  const handleShow = (deposit) => {
    setDepositValue(deposit);
    setShow(true);
  };

  const closeEdit = (i, type) => {
    let newData = cloneDeep(blanketValue);
    newData[i].edit = !newData[i].edit;
    setBlanketValue(newData);
    if (type == "save") {
      // Call Api
      var { user } = props;
      var obj = {
        id: newData[i] ?._id,
        userId: user ?._id,
        quantity: newData[i] ?.quantity,
        cost: newData[i] ?.cost
      };
      updateDeposit(obj)
        .then((res) => {
          let newData = cloneDeep(blanketValue);
          newData[i] = res.data.data;
          // setBlanketValue(newData);
          props.updateBlanket(newData)
          var { showMessage } = props;
          //   setEdit(false);
          showMessage(res.data.message);
        })
        .catch((err) => console.log(err));
    }
  };

  const makeInputFieldsEditible = (i) => {
    var newData = cloneDeep(blanketValue);
    newData.map((data) => (data.edit = true));
    newData[i].edit = !newData[i].edit;
    setBlanketValue(newData);
  };

  var handleInput = (e, i) => {
    // var { name, value } = e.target;
    let newData = cloneDeep(blanketValue);
    if (newData[i].edit === false) {
      newData[i].quantity = e.target.value;
      newData[i].cost = parseInt(e.target.value) * 15
      // setQuantityValue(true);
      setBlanketValue(newData);
    }
  };

  var changeCost = (e, i) => {
    var { name, value } = e.target;
    let newData = cloneDeep(blanketValue);
    // setQuantityValue(false);
    newData[i].cost = value;
    setBlanketValue(newData);
  };
  return (
    <div>
      <div>
        <div className={`row`} style={{ fontFamily: "sans-serif" }}>
          <div className={`col-2`} style={{ fontWeight: "bold" }}>
            <h6>Job Id</h6>
          </div>
          <div className={`col-2`} style={{ fontWeight: "bold" }}>
            <h6>Quantity</h6>
          </div>
          <div className={`col-2`} style={{ fontWeight: "bold" }}>
            <h6>Deposit</h6>
          </div>

          <div className={`col-3`} style={{ fontWeight: "bold" }}>
            <h6>Last Updated</h6>
          </div>

          <div className={`col-3`} style={{ fontWeight: "bold" }}>
            <h6>Actions</h6>
          </div>
        </div>

        <div
          className={style.jumbotron}
          style={{
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <ul className="list-group">
            {blanketValue.map((deposit, i) => {
              console.log(deposit)
              return (
                <li className="checkbox list-group-item" key={i}>
                  {/* */}
                  <div className="row">
                    <div className="col-2">
                      <Link to={`/job/details/${deposit?.job._id}`}>
                        {deposit?.job?.jobId}
                      </Link>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <FormControl>
                          <span
                            onDoubleClick={() => makeInputFieldsEditible(i)}
                          >
                            <TextField
                              variant="outlined"
                              margin="normal"
                              // required
                              fullWidth
                              size="small"
                              onChange={
                                (e) => handleInput(e, i)
                              }
                              disabled={deposit.edit}
                              type="text"
                              className="form-control input-number"
                              value={deposit.quantity}
                              style={{ margin: "-0.25rem 0" }}
                            ></TextField>
                          </span>
                        </FormControl>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <FormControl>
                          <span
                            onDoubleClick={() => makeInputFieldsEditible(i)}
                          >
                            <TextField
                              variant="outlined"
                              margin="normal"
                              // required
                              fullWidth
                              size="small"
                              onChange={
                                (e) => changeCost(e, i)
                              }
                              disabled={deposit.edit}
                              type="number"
                              className="form-control input-number"
                              value={deposit.cost}
                              style={{ margin: "-0.25rem 0" }}
                            ></TextField>
                          </span>
                        </FormControl>
                      </div>
                    </div>
                    {/* <span onDoubleClick={() => makeInputFieldsEditible(i)}>
                        <input
                          onChange={(e) => changeCost(e, i)}
                          disabled={deposit.edit}
                          type="text"
                          className="form-control input-number"
                          // value={
                          //   quantityValue === true
                          //     ? deposit.quantity * 15
                          //     : deposit.cost
                          // }
                          value={deposit.cost}
                          style={{ margin: "-0.25rem 0" }}
                        ></input>
                      </span>
                    </div> */}
                    <div className="col-3">
                      <TimeAgo date={deposit ?.updatedAt} />
                    </div>
                    <div className="col-3">
                      {deposit.edit ? (
                        <Button
                          onClick={() => closeEdit(i, "edit")}
                          style={{
                            background: "#00ADEE",
                            textTransform: "none",
                            margin: "0 1rem",
                            color: "#FFF",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {" "}
                          <i
                            className="fa fa-edit"
                            style={{ margin: "0.2rem" }}
                          ></i>{" "}
                          Edit{" "}
                        </Button>
                      ) : (
                          <Button
                            onClick={() => closeEdit(i, "save")}
                            style={{
                              background: "#00ADEE",
                              textTransform: "none",
                              margin: "0 1rem",
                              color: "#FFF",
                              fontFamily: "sans-serif",
                            }}
                          >
                            {" "}
                            <i
                              className="fa fa-save"
                              style={{ margin: "0.2rem" }}
                            ></i>{" "}
                            Save
                        </Button>
                        )}
                      <Button
                        onClick={() => handleShow(deposit)}
                        style={{
                          background: "#00ADEE",
                          textTransform: "none",
                          margin: "0 1rem",
                          color: "#FFF",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Activities
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {/* <div className={`row ${style.flex}`} style={{ margin: "2rem 0" }}></div> */}
      </div>
      <Modal
        dialogClassName={`${style.modal}`}
        show={show}
        onHide={() => setShow(false)}

        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Activities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="row"
            style={{
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            <div className={`col-2`}>Performer</div>
            <div className={`col-6`}>Message</div>
            <div className={`col-4`}>Timestamp</div>
          </div>

          {depositValue &&
            depositValue ?.activities.map((activity, i) => (
              <div
                key={i}
                className="row"
                style={{
                  fontFamily:
                    "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                <div className={`col-2 `}>
                  {" "}
                  <p>{activity.performer.name}</p>
                </div>
                <div className={`col-6`}>
                  {activity.messageLogs.map((x, i) => (
                    <p key={i}>* {x}</p>
                  ))}
                </div>
                <div className={`col-4 `}>
                  {/* <p> {activity.timeStamp.split("G")[0]}</p> */}
                  <TimeAgo date={activity.timeStamp} />
                </div>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              background: "#00ADEE",
              textTransform: "none",
              color: "#FFF",
              fontFamily: "sans-serif",
            }}
            onClick={() => setShow(false)}
          >
            Close
                            </Button>
          {/* <Button variant="primary">Add Activity</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});
var actions = {
  showMessage,
};

export default connect(mapStateToProps, actions)(BlanketList);
