import React, { useEffect, useState } from "react";
import style from "./CustomerDeposit.module.css";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { cloneDeep } from "lodash";
import { showMessage } from "../../../Redux/Common/commonActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "react-timeago";

import Pagination from "../../../components/Pagination/Pagination";
import {
  deleteBlanketDeposit,
  getDeposits,
  updateDeposit,
} from "../../../Redux/BlanketDeposit/BlanketDepositActions";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirmation";
import ActivitiesModal from "../../../components/ActivitiesModal/ActivitiesModal";

const CustomerDeposit = (props) => {
  var { blanketDeposit } = props;

  const [show, setShow] = useState(false);
  const [depositValue, setDepositValue] = useState("");
  const [blankets, setBlankets] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [depositToDelete, setDepositToDelete] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    var { getDeposits } = props;
    getDeposits(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, getDeposits]);

  useEffect(() => {
    var { blanketDeposit } = props;
    if (blanketDeposit) {
      setTotalCount(blanketDeposit.total);
      setBlankets(blanketDeposit.docs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blanketDeposit]);

  const closeEdit = (id, i, type) => {
    var { updateDeposit } = props;
    let newData = cloneDeep(blankets);
    newData[i].edit = !newData[i].edit;
    setBlankets(newData);
    // Call Api
    if (type === "save") {
      var { user } = props;
      var obj = {
        id: newData[i]._id,
        userId: user._id,
        quantity: newData[i].quantity,
        cost: newData[i].cost,
        page: currentPage,
      };
      updateDeposit(obj);
    }
  };
  var makeInputFieldEditible = (id, e, i) => {
    let newData = cloneDeep(blankets);
    newData.map((data) => (data.edit = true));
    newData[i].edit = !newData[i].edit;
    setBlankets(newData);
  };
  var handleInput = (id, e, i) => {
    var { value } = e.target;
    let newData = cloneDeep(blankets);

    if (newData[i].edit === false) {
      newData[i].quantity = value;
      newData[i].cost = value * 15;
      setBlankets(newData);
    }
  };
  var changeCost = (id, e, i) => {
    var { value } = e.target;
    let newData = cloneDeep(blankets);

    newData[i].cost = value;
    setBlankets(newData);
  };
  const handleShow = (deposit) => {
    setDepositValue(deposit);
    setShow(true);
  };
  //close activities modal
  const handleClose = () => {
    setShow(false);
  };

  var removeBlanketDeposit = () => {
    var { deleteBlanketDeposit } = props;
    deleteBlanketDeposit(depositToDelete);
    setDeleteModal(false);
  };
  var handlePageChange = (page) => {
    setCurrentPage(page);
  };

  var openDeleteModal = (i, deposit) => {
    setDepositToDelete(deposit);
    setDeleteModal(true);
  };

  var closeDeleteModal = () => {
    setDeleteModal(false);
  };
  var { user } = props;
  return (
    <div>
      <div className={style.submitDepositContainer}>
        <div className={style.submitDeposit}>
          <div className={` ${style.toprow}`}>
            <div>
              <h3>Blanket Deposit</h3>
            </div>
            <div>
              <div className={style.btn}>
                <Link className={style.link} to="/deposit/add">
                  {" "}
                  <Button className={style.button}>Deposit</Button>{" "}
                </Link>
              </div>
            </div>
          </div>

          {blankets && blankets.length > 0 ? (
            <div>
              <div className={` ${style.blanketHeader}`}>
                <div>
                  <h6>Customer</h6>
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

              {blankets.map((x, i) => {
                return (
                  <div key={i} className={style.listContainer}>
                    <div className={`${style.listContent} `}>
                      <div>
                        {x.customer.firstName} {x.customer.lastName}
                      </div>

                      <div
                        onDoubleClick={(e) => {
                          makeInputFieldEditible(x._id, e, i);
                        }}
                      >
                        <TextField
                          variant="outlined"
                          // margin="normal"
                          // required
                          fullWidth
                          size="small"
                          onChange={(e) => handleInput(x._id, e, i)}
                          disabled={x.edit}
                          type="number"
                          className="form-control input-number"
                          name="quantity"
                          value={x.quantity}
                        ></TextField>
                      </div>

                      <div
                        onDoubleClick={(e) => {
                          makeInputFieldEditible(x._id, e, i);
                        }}
                      >
                        <TextField
                          variant="outlined"
                          fullWidth
                          size="small"
                          onChange={(e) => changeCost(x._id, e, i)}
                          disabled={x.edit}
                          type="number"
                          className="form-control input-number"
                          name="cost"
                          value={x.cost}
                        ></TextField>
                      </div>

                      <div>
                        <TimeAgo date={x.updatedAt} />
                      </div>

                      <div className={style.depositBtn}>
                        {x.edit ? (
                          <div onClick={() => closeEdit(x._id, i, "edit")}>
                            <Button className={style.button}>
                              <FontAwesomeIcon icon={faEdit}> </FontAwesomeIcon>{" "}
                              Edit
                            </Button>
                          </div>
                        ) : (
                          <div onClick={() => closeEdit(x._id, i, "save")}>
                            <Button className={style.button}>
                              <FontAwesomeIcon icon={faSave}> </FontAwesomeIcon>{" "}
                              Save
                            </Button>
                          </div>
                        )}
                        <div>
                          <Button
                            onClick={() => handleShow(x)}
                            className={style.button}
                          >
                            Activities
                          </Button>
                        </div>
                        {user && user.role === "admin" && (
                          <div>
                            <Button
                              onClick={() => openDeleteModal(i, x._id)}
                              className={style.button}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className={style.stylePagination}>
                <div className={style.pagination}>
                  <Pagination
                    itemCount={totalCount}
                    pageSize={10}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <img src="/images/no-data-found.png" alt="No data found" />
            </div>
          )}
        </div>
      </div>

      {/* activities modal */}
      <ActivitiesModal
        show={show}
        activities={depositValue.activities}
        handleClose={handleClose}
      />

      <DeleteConfirmation
        show={deleteModal}
        handleClose={closeDeleteModal}
        type="Deposit"
        deleteItem={removeBlanketDeposit}
      />
    </div>
  );
};

var actions = {
  showMessage,
  getDeposits,
  deleteBlanketDeposit,
  updateDeposit,
};

var mapStateToProps = (state) => ({
  user: state.users.user,
  blanketDeposit: state.blankets,
});

export default connect(mapStateToProps, actions)(CustomerDeposit);
