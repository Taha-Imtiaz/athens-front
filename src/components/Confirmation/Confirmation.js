import React from "react";
import style from "./Confirmation.module.css";
import { Button, Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const Confirmation = ({ show, handleClose, type, action }) => {
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        className={style.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className={`bg-light p-3 w-50`}>
            <h3>Confirmation</h3>
            <h6>{`Are you sure you want to ${type}`}?</h6>
            <div className={style.modalButtons}>
              <Button className={style.button} onClick={handleClose}>
                Cancel
              </Button>
              <Button className={style.button} onClick={() => action()}>
                Confirm
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Confirmation;
