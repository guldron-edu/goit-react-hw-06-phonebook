import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Input from "../Input/Input";

import styles from "./Filter.module.css";

const Filter = ({ filter }) => {
  console.log(filter);
  return (
    <div className={styles.wrapper}>
      <Input
        type={"input"}
        name={"filter"}
        placeholder={"Search"}
        value={filter ? filter : ""}
      />
    </div>
  );
};

Filter.propTypes = {
  dispatch: PropTypes.func,
  filter: PropTypes.string,
};
const mapStateToProps = (state) => {
  return {
    filter: state.contacts.filter,
  };
};

export default connect(mapStateToProps)(Filter);
