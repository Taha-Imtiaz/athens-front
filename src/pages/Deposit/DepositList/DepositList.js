import React, { useEffect, useState } from "react";
import style from "./DepositList.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Pagination from "../../../components/Pagination/Pagination";
import {
  deleteBlanketDeposit,
  getDeposits,
} from "../../../Redux/Deposit/DepositActions";
import Blankets from "../../../components/Blankets/Blankets";
import SearchBar from "../../../components/SearchBar/SearchBar";

const DepositList = (props) => {
  let { blanketDeposit } = props;
  let totalCount = 0;
  if (blanketDeposit) {
    var { docs } = blanketDeposit;
    totalCount = blanketDeposit.total;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [depositToDelete, setDepositToDelete] = useState(false);

  useEffect(() => {
    let { getDeposits } = props;
    getDeposits(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, getDeposits]);

  //close activities modal
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const removeBlanketDeposit = () => {
    let { deleteBlanketDeposit } = props;
    deleteBlanketDeposit(depositToDelete);
    setDeleteModal(false);
  };
  //set deposit
  const openDeleteModal = (i, deposit) => {
    setDepositToDelete(deposit);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const {
    location: { pathname },
  } = props;

  return (
    <div>
      <div className={style.submitDepositContainer}>
        <div className={style.submitDeposit}>
          <div className={` ${style.toprow}`}>
            <div>
              <h3>Blanket Deposit</h3>
            </div>
            <div>
              <SearchBar/>
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

          {docs && docs.length > 0 && pathname === "/deposits" ? (
            <div className = {style.blanketContainer}>
              <Blankets
                items={docs}
                deleteDeposit={removeBlanketDeposit}
                openDeleteModal={openDeleteModal}
                deleteModal={deleteModal}
                closeDeleteModal={closeDeleteModal}
                page={currentPage}
              />

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
    </div>
  );
};

var actions = {
  getDeposits,
  deleteBlanketDeposit,
};

var mapStateToProps = (state) => ({
  blanketDeposit: state.blankets,
});

export default connect(mapStateToProps, actions)(DepositList);
