import React, { useEffect, useState } from "react";
import style from "./CustomerClaims.module.css";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllClaims, deleteClaim } from "../../../Redux/Claims/claimsActions";

import { Modal } from "react-bootstrap";

import { showMessage } from "../../../Redux/Common/commonActions";
import Pagination from "../../../components/Pagination/Pagination";

import SearchBar from "../../../components/SearchBar/SearchBar";
import TimeAgo from "react-timeago";

const CustomerClaims = (props) => {
  var { claims } = props;
  const [show, setShow] = useState(false);

  const [status, setStatus] = useState("all");

  var [modalIndex, setModalIndex] = useState("");

  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var [claimToDelete, setClaimToDelete] = useState("");
  var [value, setValue] = useState("all");

  var totalCount = claims?.total;

  useEffect(() => {
    var { getAllClaims, claims } = props;
    var claimsObj = {
      status: status,
      page: currentPage,
      query: "",
    };
    getAllClaims(claimsObj);
  }, []);
  var data = [];
  useEffect(() => {
    var { claims } = props;
    if (claims) {
      data = claims;
    }
  }, [claims]);
  var { claims } = props;

  var handlePageChange = (page) => {
    var { getAllClaims } = props;
    var claimsObj = {
      status: "all",
      page: page,
      query: "",
    };
    getAllClaims(claimsObj);
    setCurrentPage(page);
  };

  const getClaimsByStatus = (e) => {
    let value = e.target.value;
    var { getAllClaims } = props;
    setStatus(value);
    setValue(value);

    var claimsObj = {
      status: value,
      page: currentPage,
      query: "",
    };
    getAllClaims(claimsObj);
  };

  var removeClaim = () => {
    var { deleteClaim } = props;
    deleteClaim(claimToDelete, currentPage);
    setShow(false);
  };
  var { users, claims } = props;

  var handleShow = (i, jobId) => {
    setModalIndex(i);
    setClaimToDelete(jobId);
    setShow(true);
  };

  var handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      {claims && (
        <div className={` ${style.toprow}`}>
          <div className={style.rowContent}>
            <div>
              <h3>Claims</h3>
            </div>
            <div>
              <SearchBar
                type="claims"
                title="Type first name or email"
                claimStatus={status}
              />
            </div>
            <div className={`${style.filter}`}>
              <i
                className="fa fa-filter dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></i>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={(e) => getClaimsByStatus(e)}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="open"
                    control={<Radio />}
                    label="Open"
                  />
                  <FormControlLabel
                    value="closed"
                    control={<Radio />}
                    label="Closed"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className={style.newClaimBtn}>
              <Link className={style.link} to="/claim/add">
                <Button className={style.button}>New Claim</Button>{" "}
              </Link>
            </div>
          </div>
        </div>
      )}
      {claims?.docs.length > 0 ? (
        <div>
          <div className={style.claimListHeaderContainer}>
            <div className={style.claimListHeader}>
              <div>Name</div>
              <div>Status</div>
              <div> Waiting To</div>
              <div>Last Update</div>
              {users?.role === "admin" && <div>Actions</div>}
            </div>
          </div>

          <div>
            {claims?.docs &&
              claims?.docs.map((x, i) => {
                return (
                  <div className={style.listContainer} key = {i}>
                    <div className={`${style.listContent}`}>
                      <Link
                        className={style.styleLink}
                        to={{
                          pathname: `/claim/detail/${x._id}`,
                          claimsId: x._id,
                        }}
                      >
                        {" "}
                        <div className={style.claimList}>
                          <div className={`${style.item} ${style.center}`}>
                            {x.customer.firstName} {x.customer.lastName}
                          </div>
                          <div className={`${style.item} ${style.center}`}>
                            {x.status.toLocaleUpperCase()}
                          </div>
                          <div className={`${style.item} ${style.center}`}>
                            {x.waitTo}
                          </div>

                          <div className={`${style.item} ${style.center}`}>
                            {x.updates.length > 0 ? (
                              <div>
                                {<TimeAgo date={x.updates[0].timestamp} />}
                              </div>
                            ) : (
                              <div>
                                <TimeAgo date={x.createdAt} />
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>

                      {users?.role === "admin" && (
                        <div className={`${style.center} ${style.actions}`}>
                          <Button onClick={() => handleShow(i, x._id)}>
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          {/* </ul> */}
        </div>
      ) : (
        <div className="text-center">
          <img src="/images/no-data-found.png" />
        </div>
      )}
      <div className = {style.stylePagination}>
       <div className = {style.pagination}>
       <Pagination
          itemCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
       </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        scrollable
        // backdrop = {false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Are You sure you want to delete this Claim with id {x._id}</Modal.Body> */}
        <Modal.Body>Are you sure you want to delete this Claim?</Modal.Body>
        <Modal.Footer>
          <div className={style.flexEnd}>
            <Button className={style.button} onClick={() => removeClaim()}>
              Confirm
            </Button>
            <Button className={style.button} onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
var mapStateToProps = (state) => ({
  claims: state.claims?.claimList,
  users: state.users.user,
});

var actions = {
  getAllClaims,
  showMessage,
  deleteClaim,
};

export default connect(mapStateToProps, actions)(CustomerClaims);
