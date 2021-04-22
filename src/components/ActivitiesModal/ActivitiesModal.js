import React from "react";
import style from "./ActivitiesModal.module.css";
import TimeAgo from "react-timeago";
import { Button, Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";


const ActivitiesModal = ({ show, activities, handleClose }) => {
  return (
    <div>
      {/* Activities Modal */}
      <Modal
        className={style.modal}
        // dialogClassName={`${style.modal}`}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className={`bg-light p-3 ${style.modalContainer}`}>
            <h3>Activities</h3><hr />
            {activities && activities.length > 0 ? (
              <div className={style.modalBody}>
                <div className={`text-muted ${style.modalHeader}`}>
                  <div>Performer</div>
                  <div>Message</div>
                  <div>Timestamp</div>
                </div>
                <div className={style.modalContentContainer}>
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

              </div>
            ) : (
              <h3 className="text-center">No activity yet.</h3>
            )}<hr />
            <div className={`text-right ${style.modalButtons}`}>
              <Button className={` ${style.button}`} onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </Fade>

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
