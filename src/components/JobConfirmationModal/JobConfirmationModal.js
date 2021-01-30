import React from 'react'
import style from "./JobConfirmationModal.module.css"
import { Modal } from "react-bootstrap";
import JobConfirmation from '../../pages/Job/JobConfirmation/JobConfirmation';

const JobConfirmationModal = ({job,show,handleCloseAndRefresh,closeJobConfirmationModal}) => {
    return (
        <div>
                {/* Confirmtation Modal */}
          <Modal
            dialogClassName={`${style.modal}`}
            show={show}
            onHide={closeJobConfirmationModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Booking Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <JobConfirmation data={job} close={handleCloseAndRefresh} />
            </Modal.Body>
          </Modal>
        </div>
    )
}

export default JobConfirmationModal
