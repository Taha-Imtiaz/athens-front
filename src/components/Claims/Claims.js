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

    const deleteBlanket = () => {
        props.delete(claimToDelete)
        handleClose();
    }


    return (
        <div>
            <div className={style.claimListHeaderContainer}>
                <div className={style.claimListHeader}>
                    <div>Name</div>
                    <div>Status</div>
                    <div> Waiting To</div>
                    <div>Last Update</div>
                    {user && user.role === "admin" && <div>Actions</div>}
                </div>
            </div>
            <div>
                {
                    items.docs.map((x, i) => {
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

                                    {user && user.role === "admin" && (
                                        <div className={`${style.center} ${style.actions}`}>
                                            <Button onClick={() => handleShow(x._id)}>
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
                type="Claim"
                deleteItem={deleteBlanket}
            />
        </div>
    )
}

var actions = {
    deleteClaim
};

export default connect(null, actions)(Claims);
