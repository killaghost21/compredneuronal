import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = ({ show }) => {
  const styles = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#607d8bb0",
    position: "fixed",
    top: "0px",
    zIndex: "100",
  };
  return show ? (
    <div style={styles}>
      <CircularProgress size="200px" color="secondary" />
    </div>
  ) : null;
};

export default Spinner;
