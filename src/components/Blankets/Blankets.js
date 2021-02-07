import { Button, TextField } from "@material-ui/core";
import { cloneDeep } from "lodash";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import style from "./Blankets.module.css";
import TimeAgo from "react-timeago";
import { connect } from "react-redux";
import { updateDeposit } from "../../Redux/Deposit/DepositActions";
import ActivitiesModal from "../ActivitiesModal/ActivitiesModal";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";

const Blankets = (props) => {
  const [blanketValue, setBlanketValue] = useState(props.items);
  const [show, setShow] = useState(false);
  const [depositValue, setDepositValue] = useState("");

  let { user } = props;

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
      let obj = {
        id: newData[i]._id,
        userId: user._id,
        quantity: newData[i].quantity,
        cost: newData[i].cost,
        page: props.page,
      };
      let { updateDeposit } = props;
      updateDeposit(obj)
    }
  };

  const makeInputFieldsEditible = (i) => {
    let newData = cloneDeep(blanketValue);
    newData.map((data) => (data.edit = true));
    newData[i].edit = !newData[i].edit;
    setBlanketValue(newData);
  };

  const handleInput = (e, i) => {
    let newData = cloneDeep(blanketValue);
    if (newData[i].edit === false) {
      newData[i].quantity = e.target.value;
      newData[i].cost = parseInt(e.target.value) * 15;
      setBlanketValue(newData);
    }
  };

  const changeCost = (e, i) => {
    let { value } = e.target;
    let newData = cloneDeep(blanketValue);
    newData[i].cost = value;
    setBlanketValue(newData);
  };

  // close activities modal
  const handleClose = () => {
    setShow(false);
  };
  let {
    location: { pathname },
  } = props;
console.log(blanketValue)
  return (
    <div>
      <div className={` ${style.blanketHeader}`}>
      <div>
          <h6>Customer</h6>
        </div>
        <div>
          <h6>Job Id</h6>
        </div>
        <div>
          <h6>Quantity</h6>
        </div>
        <div>
          <h6>Deposit</h6>
        </div>

        <div className = {style.flex}>
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
                <div>{deposit.customer.firstName}</div>
                <div>
                  <Link to={`/job/detail/${deposit.job._id}`}>
                    {deposit.job.jobId}
                  </Link>
                </div>

                <div onDoubleClick={() => makeInputFieldsEditible(i)}>
                  <TextField
                    variant="outlined"
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
                    fullWidth
                    size="small"
                    onChange={(e) => changeCost(e, i)}
                    disabled={deposit.edit}
                    type="number"
                    className="form-control input-number"
                    value={deposit.cost}
                  ></TextField>
                </div>

                <div className = {style.flex}>
                  <TimeAgo date={deposit.updatedAt} />
                </div>
                <div
                  className={
                    pathname === "/deposits"
                      ? style.depositBtn
                      : style.customerDepositBtn
                  }
                >
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
                  {user && user.role === "admin" && pathname === "/deposits" && (
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
      {pathname === "/deposits" && (
        <DeleteConfirmation
          show={props.deleteModal}
          handleClose={props.closeDeleteModal}
          type="deposit"
          deleteItem={props.deleteDeposit}
        />
      )}
    </div>
  );
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});
var actions = {
  updateDeposit
};

export default connect(mapStateToProps, actions)(withRouter(Blankets));