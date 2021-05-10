import React from "react";
import style from "./JobConfirmationModal.module.css";
import { Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import JobConfirmation from "../../pages/Job/JobConfirmation/JobConfirmation";

const JobConfirmationModal = ({
  job,
  show,
  handleCloseAndRefresh,
  closeJobConfirmationModal,
}) => {
  return (
    <div>
      {/* Confirmtation Modal */}
      <Modal
        className={`${style.modal}`}
        open={show}
        onClose={closeJobConfirmationModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className={`bg-white p-3 w-75`}>
            <h3>Booking Confirmation</h3>

            <div className={style.jobConfirmContentContainer}>
              <JobConfirmation data={job} close={handleCloseAndRefresh} />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default JobConfirmationModal;
