import React, { useEffect, useState } from "react";
import style from "./CustomerClaims.module.css";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllClaims, deleteClaim } from "../../../Redux/Claims/claimsActions";
import { showMessage } from "../../../Redux/Common/commonActions";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBar from "../../../components/SearchBar/SearchBar";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirmation";
import Claims from "../../../components/Claims/Claims";

const CustomerClaims = (props) => {
  var { getAllClaims, claims, user } = props;

  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [claimToDelete, setClaimToDelete] = useState("");
  const [value, setValue] = useState("all");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let getClaims = async (obj) => {
      await getAllClaims(obj);
    };
    var claimsObj = {
      status: "all",
      page: 1,
      query: "",
    };
    getClaims(claimsObj);
  }, [getAllClaims]);

  useEffect(() => {
    let { claims } = props;
    if (claims) {
      setTotalCount(claims.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claims]);

  var handlePageChange = (page) => {
    var { getAllClaims } = props;
    var claimsObj = {
      status,
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
    setCurrentPage(1);
    var claimsObj = {
      status: value,
      page: 1,
      query: "",
    };
    getAllClaims(claimsObj);
  };

  var removeClaim = (id) => {
    var { deleteClaim } = props;
    deleteClaim(id, currentPage);
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
                    className="dropdown-item"
                  />
                  <FormControlLabel
                    value="open"
                    control={<Radio />}
                    label="Open"
                    className="dropdown-item"
                  />
                  <FormControlLabel
                    value="closed"
                    control={<Radio />}
                    label="Closed"
                    className="dropdown-item"
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
      {claims && claims.docs.length > 0 ? (
        <Claims items={claims} user={user} delete={removeClaim} />
      ) : (
          <div className="text-center">
            <img src="/images/no-data-found.png" alt="No data found" />
          </div>
        )}
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
  );
};
var mapStateToProps = (state) => ({
  claims: state.claims.claimList,
  user: state.users.user,
});

var actions = {
  getAllClaims,
  showMessage,
  deleteClaim,
};

export default connect(mapStateToProps, actions)(CustomerClaims);
