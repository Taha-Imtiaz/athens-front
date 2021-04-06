import React from "react";
import style from "./ActivitiesModal.module.css";
import { makeStyles } from "@material-ui/core/styles";
// import { Modal } from "react-bootstrap";
import TimeAgo from "react-timeago";
import { Button, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {    
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
  },
  paper: {
    backgroundColor: "white",
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonClass:{
    textAlign:"end",
  }
}));

const ActivitiesModal = ({ show, activities, handleClose }) => {
  const classes = useStyles();

  return (
    <div>
      {/* Activities Modal */}
      <Modal
        className={style.modal}
        // dialogClassName={`${style.modal}`}
        open={show}
        onClose={handleClose}
      >
        <div className={`bg-light p-3`}>
            <h3 className="text-center">Activities</h3>
            {activities && activities.length > 0 ? (
              <div className={style.modalBody}>
                <div className={`text-muted ${style.modalHeader}`}>
                  <div>Performer</div>
                  <div>Message</div>
                  <div>Timestamp</div>
                </div>

                {activities &&
                  activities.map((activitiy, i) => (
                    <div
                      key={i}
                      className={`font-weight-bold ${style.modalContent}`}
                    >
                      <div className={"text-capitalize"}>
                        {" "}
                        {activitiy.performer.name}
                      </div>
                      <div>
                        {activitiy.messageLogs.map((x, i) => (
                          <label key={i}>* {x}</label>
                        ))}
                      </div>

                      <TimeAgo
                        className={"text-muted text-capitalize"}
                        date={activitiy.timeStamp}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <h3 className="text-center">No activity yet.</h3>
            )}
            <div className={`text-right ${style.modalButtons}`}>
              <Button className={` ${style.button}`} onClick={handleClose}>
                Close
              </Button>
            </div>
          
        </div>

        {/* <Modal.Header closeButton>
          <Modal.Title>Activities</Modal.Title>
        </Modal.Header> */}
        {/* <Modal.Body className={"bg-light"}>
          {activities && activities.length > 0 ? (
            <div className={style.modalBody}>
              <div className={`text-muted ${style.modalHeader}`}>
                <div>Performer</div>
                <div>Message</div>
                <div>Timestamp</div>
              </div>

              {activities && activities.map((activitiy, i) => (
                <div key={i} className={`font-weight-bold ${style.modalContent}`}>
                  <div className={"text-capitalize"}> {activitiy.performer.name}</div>
                  <div>
                    {activitiy.messageLogs.map((x, i) => (
                      <label key={i}>* {x}</label>
                    ))}
                  </div>

                  <TimeAgo className={"text-muted text-capitalize"} date={activitiy.timeStamp} />
                </div>
              ))}
            </div>
          ) : <h3 className="text-center">No activity yet.</h3>}

        </Modal.Body>
        <Modal.Footer>
          <div className={style.modalButtons}>
            <Button className={`${style.button}`} onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default ActivitiesModal;
