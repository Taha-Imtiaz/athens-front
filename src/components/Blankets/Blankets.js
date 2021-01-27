import { Button, TextField } from "@material-ui/core";
import { cloneDeep } from "lodash";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Blankets.module.css";
import TimeAgo from "react-timeago";
import { connect } from "react-redux";

import { updateDeposit } from "../../Redux/Claims/claimsActions";
import { showMessage } from "../../Redux/Common/commonActions";
import ActivitiesModal from "../ActivitiesModal/ActivitiesModal";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { deleteBlanketDeposit } from "../../Redux/BlanketDeposit/BlanketDepositActions";

const Blankets = (props) => {
  const [blanketValue, setBlanketValue] = useState(props.items);
  const [show, setShow] = useState(false);
  const [depositValue, setDepositValue] = useState("");

  var { user } = props;

  useEffect(() => {
    setBlanketValue(props.items);
  }, [props.items]);
  
  const handleShow = (deposit) => {
    setDepositValue(deposit);
    setShow(true);
  };

  const closeEdit = (i, type) => {
    let newData = cloneDeep(blanketValue);
    newData[i].edit = !newData[i].edit;
    setBlanketValue(newData);
    if (type === "save") {
      // Call Api

      var obj = {
        id: newData[i]._id,
        userId: user._id,
        quantity: newData[i].quantity,
        cost: newData[i].cost,
        page:props.page
        
      };
      updateDeposit(obj)
        .then((res) => {
          let newData = cloneDeep(blanketValue);
          newData[i] = res.data.data.updatedblanketDeposit;
          props.update(newData);
          var { showMessage } = props;
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
    let newData = cloneDeep(blanketValue);
    if (newData[i].edit === false) {
      newData[i].quantity = e.target.value;
      newData[i].cost = parseInt(e.target.value) * 15;
      setBlanketValue(newData);
    }
  };

  var changeCost = (e, i) => {
    var { value } = e.target;
    let newData = cloneDeep(blanketValue);
    newData[i].cost = value;
    setBlanketValue(newData);
  };

  // close activities modal
  var handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <div className={` ${style.blanketHeader}`}>
        <div>
          <h6>Job Id</h6>
        </div>
        <div>
          <h6>Quantity</h6>
        </div>
        <div>
          <h6>Deposit</h6>
        </div>

        <div>
          <h6>Last Updated</h6>
        </div>

        <div>
          <h6>Actions</h6>
        </div>
      </div>

      {blanketValue &&
        blanketValue.map((deposit, i) => {
          return (
            <div key={i} className={style.listContainer}>
              <div className={`${style.listContent} `}>
                <div>
                  <Link to={`/job/detail/${deposit.job._id}`}>
                    {deposit.job.jobId}
                  </Link>
                </div>

                <div onDoubleClick={() => makeInputFieldsEditible(i)}>
                  <TextField
                    variant="outlined"
                    // required
                    fullWidth
                    size="small"
                    onChange={(e) => handleInput(e, i)}
                    disabled={deposit.edit}
                    type="number"
                    className="form-control input-number"
                    value={deposit.quantity}
                  ></TextField>
                </div>

                <div onDoubleClick={() => makeInputFieldsEditible(i)}>
                  <TextField
                    variant="outlined"
                    // required
                    fullWidth
                    size="small"
                    onChange={(e) => changeCost(e, i)}
                    disabled={deposit.edit}
                    type="number"
                    className="form-control input-number"
                    value={deposit.cost}
                  ></TextField>
                </div>

                <div>
                  <TimeAgo date={deposit.updatedAt} />
                </div>
                <div className={style.depositBtn}>
                  {deposit.edit ? (
                    <Button
                      onClick={() => closeEdit(i, "edit")}
                      className={style.button}
                    >
                      {" "}
                      <i className="fa fa-edit"></i> Edit{" "}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => closeEdit(i, "save")}
                      className={style.button}
                    >
                      {" "}
                      <i className="fa fa-save"></i> Save
                    </Button>
                  )}
                  <Button
                    onClick={() => handleShow(deposit)}
                    className={style.button}
                  >
                    Activities
                  </Button>
                  {user && user.role === "admin" && (
                    <Button
                      onClick={() => props.openDeleteModal(i, deposit._id)}
                      className={style.button}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      <ActivitiesModal
        show={show}
        activities={depositValue.activities}
        handleClose={handleClose}
      />
      <DeleteConfirmation
        show={props.deleteModal}
        handleClose={props.closeDeleteModal}
        type="Deposit"
        deleteItem={props.deleteDeposit}
      />
    </div>
  );
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});
var actions = {
  showMessage,
  deleteBlanketDeposit,
};

export default connect(mapStateToProps, actions)(Blankets);
