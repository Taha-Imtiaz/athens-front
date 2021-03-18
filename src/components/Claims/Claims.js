import React, { useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Button } from "@material-ui/core";
import style from "./Claims.module.css";
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation";
import { deleteClaim } from "../../Redux/Claim/claimActions";
import { connect } from "react-redux";

const Claims = (props) => {
  let { items, user } = props;
  const [show, setShow] = useState(false);
  const [claimToDelete, setClaimToDelete] = useState("");

  const handleShow = (jobId) => {
    setClaimToDelete(jobId);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const deleteClaim = () => {
    props.delete(claimToDelete)
    handleClose();
  }


  return (
    <div>
      {/* <div className={style.claimListHeaderContainer}>
        <div className={style.claimListHeader}>
          <div>Customer</div>
          <div>Job Id</div>
          <div>Status</div>
          <div> Waiting To</div>
          <div>Last Update</div>
          {user && user.role === "admin" && <div>Actions</div>}
        </div>
      </div> */}
      <div>
        {
          items.map((x, i) => {
           
            return (
              <div className={style.listContainer} key={i}>
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
                        <div className={`text-muted ${style.title}`}>{`Name:`}</div>
                        <div className={`text-capitalize ${style.text}`}>{x.customer.firstName} {x.customer.lastName}</div>
                        
                      </div>
                      <div className={`${style.item} ${style.center}`}>
                        <div className={`text-muted ${style.title}`}>{`Job ID:`}</div>
                        <div className={`text-capitalize ${style.text}`}>{x.job && x.job.jobId}</div>
                      
                      </div>
                      <div className={`${style.item} ${style.center}`}>
                        <div  className={`text-muted ${style.title}`}>{`Status:`}</div>
                        <div className={`text-capitalize ${style.text}`}>{x.status.toLocaleUpperCase()}</div>
                        
                      </div>
                      <div className={`${style.item} ${style.center}`}>
                        <div className={`text-muted ${style.title}`}>{`Waiting To:`}</div>
                        <div className={`text-capitalize ${style.text}`}>{x.waitTo}</div>
                        
                      </div>

                      <div className={`${style.item} ${style.center}`}>
                        <div className={`text-muted ${style.title}`}>{`Last Updates`}</div>
                        <div className={`text-capitalize ${style.text}`}>{x.updates.length > 0 ? (
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
                    </div>
                  </Link>

                  {user && user.role === "admin" && (
                    <div className={`${style.center} ${style.actions}`}>
                      <Button className={style.deleteBtn} onClick={() => handleShow(x._id)}>
                        Delete
                </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        type="claim"
        deleteItem={deleteClaim}
      />
    </div>
  )
}

var actions = {
  deleteClaim
};

export default connect(null, actions)(Claims);
