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

  var totalCount = blanketDeposit?.total;

  useEffect(() => {
    var { getDeposits } = props;
    getDeposits(currentPage);
  }, []);

  useEffect(() => {
    var { blanketDeposit } = props;
    if (blanketDeposit) {
      setBlankets(blanketDeposit.docs);
    }
  }, [blanketDeposit]);

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
    setModalIndex(i);
    setDepositToDelete(deposit);
    setDeleteModal(true);
  };

  var closeDeleteModal = () => {
    setDeleteModal(false);
  };
  var { user, blanketDeposit } = props;
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
                        {x?.customer?.firstName} {x?.customer?.lastName}
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
                        {user?.role === "admin" && (
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
            </div>
          ) : (
            <div className="text-center">
              <img src="/images/no-data-found.png" />
            </div>
          )}
        </div>
        <div className={style.stylePagination}>
          <div className={style.pagination}>
            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
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
          <div className={style.activitiesModal}>
            <div>Performer</div>
            <div>Message</div>
            <div>Timestamp</div>
          </div>

          {depositValue &&
            depositValue?.activities.map((activity, i) => (
              <div className={style.activitiesModalContent} key={i}>
                <div> {activity.performer.name}</div>
                <div>
                  {activity.messageLogs.map((x, i) => (
                    <p key={i}>* {x}</p>
                  ))}
                </div>
                <div>
                  <TimeAgo date={activity.timeStamp} />
                </div>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <div className={style.activityModalBtn}>
            {" "}
            <Button className={style.button} onClick={() => setShow(false)}>
              Close
            </Button>
          </div>
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
          <div className={style.deleteModalBtn}>
            <Button
              className={style.button}
              onClick={() => removeBlanketDeposit()}
            >
              Confirm
            </Button>
            <Button className={style.button} onClick={closeDeleteModal}>
              Cancel
            </Button>
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
