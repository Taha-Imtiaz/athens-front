import { Button, Chip } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import style from "./Blankets.module.css";
import TimeAgo from "react-timeago";
import { connect } from "react-redux";
import { updateDeposit } from "../../Redux/Deposit/DepositActions";
import ActivitiesModal from "../ActivitiesModal/ActivitiesModal";
import Confirmation from "../Confirmation/Confirmation";

const Blankets = (props) => {
  let [blanketValue, setBlanketValue] = useState(props.items);
  const [show, setShow] = useState(false);

  let { user } = props;

  useEffect(() => {
    setBlanketValue(props.items);
  }, [props.items]);

  // close activities modal
  const handleClose = () => {
    setShow(false);
  };
  let {
    firstName,
    lastName,
    location: { pathname },
  } = props;
  return (
    <div>
      {blanketValue &&
        blanketValue.map((deposit, i) => {
          return (
            <div key={i}>
              <div className={style.listContainer}>
                <div className={`${style.listContent} `}>
                  <Link key={i} to={`/deposit/detail/${deposit._id}`}>
                    <div className={style.listContentItems}>
                      <div className={style.customerName}>
                        <div
                          className={`text-muted ${style.title}`}
                        >{`Name:`}</div>
                        <div className={`text-capitalize ${style.text}`}>
                          {pathname === `/deposits`
                            ? `${deposit.customer.firstName} ${deposit.customer.lastName}`
                            : `${firstName} ${lastName}`}
                        </div>
                      </div>
                      <div className={style.customerJobId}>
                        <div
                          className={`text-muted ${style.title}`}
                        >{`Job ID:`}</div>
                        <div className={style.text}>
                          <Chip label={deposit.job.jobId} />
                        </div>
                      </div>
                      <div className={style.quantity}>
                        <div
                          className={`text-muted ${style.title}`}
                        >{`Quantity:`}</div>
                        <div className={style.text}>
                          <Chip label={deposit.quantity} />
                        </div>
                      </div>
                      <div className={style.cost}>
                        <div
                          className={`text-muted ${style.title}`}
                        >{`Deposit:`}</div>
                        <div className={style.text}>
                          <Chip label={deposit.cost} />
                        </div>
                      </div>
                      <div className={style.time}>
                        <div
                          className={`text-muted ${style.title}`}
                        >{`Last Updated:`}</div>
                        <div className={`text-capitalize ${style.text}`}>
                          <TimeAgo date={deposit.updatedAt} />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className={style.depositBtn}>
                    {user && user.role === "admin" && pathname === "/deposits" && (
                      <Button
                        onClick={() => props.openDeleteModal(i, deposit._id)}
                        className={`text-uppercase  ${style.depositBtn} ${style.button}`}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <ActivitiesModal
        show={show}
        // activities= {depositValue.activities}
        handleClose={handleClose}
      />
      {pathname === "/deposits" && (
        <Confirmation
          show={props.deleteModal}
          handleClose={props.closeDeleteModal}
          type="delete deposit"
          action={props.deleteDeposit}
        />
      )}
    </div>
  );
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});
var actions = {
  updateDeposit,
};

export default connect(mapStateToProps, actions)(withRouter(Blankets));
