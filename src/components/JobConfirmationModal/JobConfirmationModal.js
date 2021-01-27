import React from 'react'
import style from "./JobConfirmation.module.css"
import { Modal } from "react-bootstrap";

const JobConfirmationModal = () => {
    return (
        <div>
                {/* Confirmtation Modal */}
          <Modal
            dialogClassName={`${style.modal}`}
            show={showBooking}
            onHide={() => setShowBooking(false)}
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
