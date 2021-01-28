import React, { useEffect, useState } from "react";
import style from "./BlanketList.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Pagination from "../../../components/Pagination/Pagination";
import {
  deleteBlanketDeposit,
  getDeposits,
} from "../../../Redux/BlanketDeposit/BlanketDepositActions";
import Blankets from "../../../components/Blankets/Blankets";

const BlanketList = (props) => {
  var { blanketDeposit } = props;

  const [blankets, setBlankets] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [depositToDelete, setDepositToDelete] = useState(false);
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
  
  
  //close activities modal

  var handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //update blanket Deposit
  const updateBlanket = (data) => {
    setBlankets(data);
  };

  var removeBlanketDeposit = () => {
    var { deleteBlanketDeposit } = props;
    deleteBlanketDeposit(depositToDelete);
    setDeleteModal(false);
  };
  //set deposit
  var openDeleteModal = (i, deposit) => {
    setDepositToDelete(deposit);
    setDeleteModal(true);
  };
  var closeDeleteModal = () => {
    setDeleteModal(false);
  };
  
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
              <Blankets
                items={blankets}
                update={updateBlanket}
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

export default connect(mapStateToProps, actions)(BlanketList);
