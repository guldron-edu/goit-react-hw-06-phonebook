import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import mainActions from "../../redux/main/mainActions";
import FirstLetterUpperCase from "../../utils/FirstUpperCase";
import styles from "./SingleContact.module.css";

const SingleContact = ({ name, number, deleteContact }) => {
  return (
    <li className={styles.item}>
      <span className={styles.text}>{name}</span>

      <span className={styles.text}>{number}</span>
      <button type="button" onClick={deleteContact}>
        Delete
      </button>
    </li>
  );
};

SingleContact.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const currentContact = state.contacts.items.find(
    (item) => item.id === ownProps.id
  );
  const correctContact = {
    ...currentContact,
    name: currentContact && FirstLetterUpperCase(currentContact.name),
  };

  return {
    ...correctContact,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteContact: () => dispatch(mainActions.deleteContact(ownProps.id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleContact);
