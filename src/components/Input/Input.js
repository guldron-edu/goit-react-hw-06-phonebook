import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import mainActions from "../../redux/main/mainActions";
import styles from "./Input.module.css";

const Input = ({
  type,
  name,
  value,
  inputTracking,
  placeholder,
  minLength,
  required,
  autoFocus,
  changeFilter,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      onChange={(ev) =>
        inputTracking ? inputTracking(ev) : changeFilter(ev.target.value)
      }
      value={value}
      placeholder={placeholder || ""}
      minLength={minLength}
      autoFocus={autoFocus}
      required={required}
    ></input>
  );
};

Input.propTypes = {
  changeFilter: PropTypes.func,
  inputTracking: PropTypes.func,

  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  minLength: PropTypes.number,
  required: PropTypes.bool,
};
const mapDispatchToProps = {
  changeFilter: mainActions.changeFilter,
};
export default connect(null, mapDispatchToProps)(Input);
