import React, { useEffect, useState } from "react";
import style from "./ClaimList.module.css";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllClaims, deleteClaim } from "../../../Redux/Claim/claimActions";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Claims from "../../../components/Claims/Claims";

const CustomerClaims = (props) => {
  let { getAllClaims, claims, user } = props;
  let totalCount = 0;
  if (claims) {
    var { docs } = claims;
    totalCount = claims.total;
  }

  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("all");

  useEffect(() => {
    let claimsObj = {
      status: "all",
      page: 1,
      query: "",
    };
    getAllClaims(claimsObj);
  }, [getAllClaims]);

  const handlePageChange = (page) => {
    let { getAllClaims } = props;
    let claimsObj = {
      status,
      page: page,
      query: "",
    };
    getAllClaims(claimsObj);
    setCurrentPage(page);
  };

  const getClaimsByStatus = (e) => {
    let value = e.target.value;
    let { getAllClaims } = props;
    setStatus(value);
    setValue(value);
    setCurrentPage(1);
    let claimsObj = {
      status: value,
      page: 1,
      query: "",
    };
    getAllClaims(claimsObj);
  };

  const removeClaim = (id) => {
    let { deleteClaim } = props;
    deleteClaim(id, currentPage);
  };

  return (
    <div>
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
      {docs && docs.length > 0 ? (
        <Claims items={docs} user={user} delete={removeClaim} />
      ) : ( docs && docs.length == 0 ?
          <div className="text-center">
            <img src="/images/no-data-found.png" alt="No data found" />
          </div> : null
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
  deleteClaim,
};

export default connect(mapStateToProps, actions)(CustomerClaims);
