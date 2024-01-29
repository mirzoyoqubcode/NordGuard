import React from "react";
import styles from "./Modal.module.scss";
const Modal = ({ children, onClose }) => {
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "8px",
      position: "relative",
      width: "80%",
      maxWidth: "800px",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
    },
  };
  return (
    <div>
      <div style={styles.overlay}>
        <div style={styles.modal}>
          {children}
          <button style={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
