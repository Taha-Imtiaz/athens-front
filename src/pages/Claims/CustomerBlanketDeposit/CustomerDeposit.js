import React, { useEffect, useState } from "react";
import style from "./CustomerDeposit.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { updateDeposit } from "../../../Redux/Claims/claimsActions";
import { clone, cloneDeep } from "lodash";
import { showMessage } from "../../../Redux/Common/commonActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "react-timeago";
import { Modal } from "react-bootstrap";
import Pagination from "../../../components/Pagination/Pagination";
import {
  deleteBlanketDeposit,
  getDeposits,
  updateDeposit,
} from "../../../Redux/BlanketDeposit/BlanketDepositActions";

const CustomerDeposit = (props) => {
  const routes = [
    {
      title: "Claims",
      path: "/claim/customer",
      icon: <i className="fa fa-exchange"></i>,
    },
    {
      title: "Blanket Deposit",
      path: "/claim/customerdeposit",
      icon: <i className="fa fa-bed"></i>,
    },
  ];
  var { blanketDeposit } = props;

  const [show, setShow] = useState(false);

  const [edit, setEdit] = useState(true);
  var [costValue, setCostValue] = useState("");
  var [depositValue, setDepositValue] = useState("");
  const [blankets, setBlankets] = useState("");
  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var [modalIndex, setModalIndex] = useState("");
  var [deleteModal, setDeleteModal] = useState(false);
  var [depositToDelete, setDepositToDelete] = useState(false);


  var totalCount = blanketDeposit ?.data ?.blanketDeposit ?.total;

  useEffect(() => {
    var { getDeposits } = props;
    getDeposits(currentPage);
  }, []);

  useEffect(() => {
    var { blanketDeposit } = props;
    if (blanketDeposit) {
      setBlankets(blanketDeposit ?.data ?.blanketDeposit ?.docs);
    }
  }, [blanketDeposit]);

  const decrement = (x, i) => {
    let newData = cloneDeep(blankets);
    newData[i].quantity = --x.quantity;
    setBlankets(newData);
  };

  const increment = (x, i) => {
    let newData = cloneDeep(blankets);
    newData[i].quantity = ++x.quantity;
    setBlankets(newData);
  };

  const closeEdit = (id, i, type) => {
    var { updateDeposit } = props;
    let newData = cloneDeep(blankets);
    newData[i].edit = !newData[i].edit;
    setBlankets(newData);
    // Call Api
    if (type == "save") {
      var { user } = props;
      var obj = {
        id: newData[i]._id,
        userId: user._id,
        quantity: newData[i].quantity,
        cost: newData[i].cost,
        page: currentPage,
      };
      updateDeposit(obj);
      // .then((res) => {
      //   var { showMessage } = props;
      //   showMessage(res.data.message);
      // })
      // .catch((err) => console.log(err));
    }
  };
  var makeInputFieldEditible = (id, e, i) => {
    // var {blanketDeposit } = props
    let newData = cloneDeep(blankets);
    newData.map((data) => (data.edit = true));
    newData[i].edit = !newData[i].edit;
    setBlankets(newData);
  };
  var handleInput = (id, e, i) => {
    var { name, value } = e.target;
    // var {blanketDeposit } = props
    let newData = cloneDeep(blankets);

    if (newData[i].edit === false) {
      newData[i].quantity = value;
      newData[i].cost = value * 15;
      setBlankets(newData);
    }
  };
  var changeCost = (id, e, i) => {
    var { name, value } = e.target;
    // var {blanketDeposit } = props
    let newData = cloneDeep(blankets);

    newData[i].cost = value;
    setBlankets(newData);
  };
  const handleShow = (deposit) => {
    setDepositValue(deposit);
    setShow(true);
  };
  var removeBlanketDeposit = () => {
    var { deleteBlanketDeposit } = props;
    deleteBlanketDeposit(depositToDelete);
    setDeleteModal(false);

  };
  var handlePageChange = (page) => {
    getDeposits(page);
    setCurrentPage(page);
  };


  var openDeleteModal = (i, deposit) => {
    setModalIndex(i)
    setDepositToDelete(deposit)
    setDeleteModal(true)
    // if (modalIndex === i)
    //   setDeleteModal(true)
    // else
    //   setDeleteModal(false)
  };

  var closeDeleteModal = () => {
    setDeleteModal(false);
  };
  var { user, blanketDeposit } = props;
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className={`row  ${style.toprow}`}>
            <div className="col-6">
              <h3 className={style.head}>Blanket Deposit</h3>
            </div>
            <div className="col-5">
              <div className={style.btn}>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/claim/customerdeposit/deposit"
                >
                  {" "}
                  <Button
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Deposit
                  </Button>{" "}
                </Link>
              </div>
            </div>
          </div>

          {blankets && blankets.length > 0 ? (
            <div className="col-12">
              <div
                className={`row ${style.myrow}`}
                style={{ marginTop: "2rem", marginBottom: "0.6rem" }}
              >
                <div className={`col-2`} style={{ fontWeight: "bold" }}>
                  <h6>Customer</h6>
                </div>
                <div className={`col-2`} style={{ fontWeight: "bold" }}>
                  <h6>Quantity</h6>
                </div>
                <div className={`col-2 `} style={{ fontWeight: "bold" }}>
                  <h6>Deposit</h6>
                </div>
                <div className="col-3" style={{ fontWeight: "bold" }}>
                  <h6>Last Updated</h6>
                </div>
                <div className={`col-3 `} style={{ fontWeight: "bold" }}>
                  <h6>Actions</h6>
                </div>
              </div>

              <div className={`${style.jumbotron}`}>
                <ul className="list-group">
                  {blankets.map((x, i) => {
                    return (
                      <li
                        key={i}
                        className={`list-group-item ${style.list}`}
                        style={{
                          fontFamily:
                            "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                        }}
                      >
                        <div className={`row `}>
                          <div className="col-2">
                            <label>
                              {x ?.customer ?.firstName} {x ?.customer ?.lastName}
                            </label>
                          </div>
                          <div class={`col-2 `}>
                            <div>
                              <span
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
                              </span>
                            </div>
                          </div>
                          <div className="col-2">
                            <span
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
                                onChange={(e) => changeCost(x._id, e, i)}
                                disabled={x.edit}
                                type="number"
                                className="form-control input-number"
                                name="cost"
                                value={x.cost}
                              ></TextField>
                            </span>
                          </div>
                          <div className="col-3">
                            {/* <label htmlFor="">{x.updatedAt.split("T")[0]} <span> | </span>{x.updatedAt.split("T")[1].split(".")[0]}</label> */}
                            <TimeAgo date={x.updatedAt} />
                          </div>

                          <div className="col-3">
                            <div style={{ display: "flex" }}>
                              {x.edit ? (
                                <div
                                  onClick={() => closeEdit(x._id, i, "edit")}
                                  style={{ margin: "0 0.6rem" }}
                                >
                                  <Button
                                    style={{
                                      background: "#00ADEE",
                                      textTransform: "none",
                                      color: "#FFF",
                                      fontFamily: "sans-serif",
                                      width: "100%",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faEdit}>
                                      {" "}
                                    </FontAwesomeIcon>{" "}
                                    Edit
                                  </Button>
                                </div>
                              ) : (
                                  <div
                                    onClick={() => closeEdit(x._id, i, "save")}
                                    style={{ margin: "0 0.6rem" }}
                                  >
                                    <Button
                                      style={{
                                        background: "#00ADEE",
                                        textTransform: "none",
                                        color: "#FFF",
                                        fontFamily: "sans-serif",
                                        width: "100%",
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faSave}>
                                        {" "}
                                      </FontAwesomeIcon>{" "}
                                      Save
                                  </Button>
                                  </div>
                                )}
                              <div style={{ margin: "0 0.6rem" }}>
                                <Button
                                  onClick={() => handleShow(x)}
                                  style={{
                                    background: "#00ADEE",
                                    textTransform: "none",
                                    color: "#FFF",
                                    fontFamily: "sans-serif",
                                    width: "100%",
                                  }}
                                >
                                  Activities
                                </Button>
                              </div>
                              {user ?.role === "admin" && (
                                <div>
                                  <Button
                                    onClick={() => openDeleteModal(i, x._id)}
                                    style={{
                                      background: "#00ADEE",
                                      textTransform: "none",
                                      color: "#FFF",
                                      fontFamily: "sans-serif",
                                      width: "100%",
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
              <div className="text-center">
                <img src="/images/no-data-found.png" />
              </div>
            )}
        </div>
        <div className={style.jumbotron}>
          <Pagination
            // itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
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
                  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                <div className={`col-2`} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                  {" "}
                  <p>{activity.performer.name}</p>
                </div>
                <div className={`col-6`}>
                  {activity.messageLogs.map((x, i) => (
                    <p key={i}>* {x}</p>
                  ))}
                </div>
                <div className={`col-4 `}  style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
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
      <Modal
        show={deleteModal}
        onHide={closeDeleteModal}
        // dialogClassName={`${style.modal}`}
        centered
        scrollable
      // backdrop = {false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Blanket Deposit?
        </Modal.Body>
        <Modal.Footer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                width: "100%",
                margin: "0 0.6rem",
              }}
              onClick={() =>
                removeBlanketDeposit()
              }>Confirm</Button>
            <Button
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                width: "100%",
              }}
              onClick={closeDeleteModal}>Cancel</Button>
          </div>
        </Modal.Footer>
      </Modal>
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
