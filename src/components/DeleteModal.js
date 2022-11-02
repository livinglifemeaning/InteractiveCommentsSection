import ReactDOM from "react-dom";
import classes from "../styles/DeleteModal.module.scss";
import Button from "./UI/Button";
const Backdrop = () => {
  return <div className={classes.backdrop}  />;
};

const portalElement = document.getElementById("overlays");

const DeleteModal = ({ closeModal, deleteComment }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop/>,
        portalElement
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>
          <p className={classes.header}>Delete Comment</p>
          <p className={classes.message}>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className={classes.buttonsBox}>
            <Button type="gray" onClick={closeModal}>
              No, Cancel
            </Button>
            <Button type="red" onClick={deleteComment}>Yes, Delete</Button>
          </div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default DeleteModal;
