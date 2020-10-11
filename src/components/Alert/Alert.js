import React from "react";
import PropTypes from "prop-types";

import styles from "./Alert.module.css";

const Alert = ({ close }) => {
  return (
    <div className={styles.alert}>
      <span className={styles.close} onClick={close}></span>Contact alredy exist
    </div>
  );
};

Alert.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Alert;
