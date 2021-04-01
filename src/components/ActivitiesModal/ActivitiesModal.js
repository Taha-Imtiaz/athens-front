import React from "react";
import style from "./ActivitiesModal.module.css";
import { Modal } from "react-bootstrap";
import TimeAgo from "react-timeago";
import { Button } from "@material-ui/core";

const ActivitiesModal = ({ show, activities, handleClose }) => {

  return (

    <div>
      {/* Activities Modal */}
      <Modal
        dialogClassName={`${style.modal}`}
        show={show}
        onHide={handleClose}
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Activities</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"bg-light"}>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActivitiesModal;
