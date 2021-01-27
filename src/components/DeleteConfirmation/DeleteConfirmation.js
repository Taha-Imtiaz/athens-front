import { Modal } from "react-bootstrap";
import React from "react";
import style from "./DeleteConfirmation.module.css";
import { Button } from "@material-ui/core";

const DeleteConfirmation = ({ show, handleClose, type, deleteItem }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>{`Are you sure you want to delete ${type}`}?</Modal.Body>
        <Modal.Footer>
          <div className={style.modalButtons}>
            <Button className={style.button} onClick={handleClose}>
              Cancel
            </Button>
            <Button className={style.button} onClick={() => deleteItem()}>
              Confirm
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteConfirmation;
