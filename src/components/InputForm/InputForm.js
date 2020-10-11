import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import mainActions from "../../redux/main/mainActions";

import Input from "../Input/Input";
import Filter from "../Filter/Filter";
import Alert from "../Alert/Alert";

import styles from "./InputForm.module.css";

class InputForm extends Component {
  static propTypes = {
    addNewContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    name: "",
    number: "",
    onAlert: false,
  };

  inputTracking = (ev) => {
    ev.preventDefault();
    this.setState({ [ev.target.name]: ev.target.value });
  };

  submitForm = (ev) => {
    const { name, number } = this.state;
    ev.preventDefault();
    this.checkExistingName(name)
      ? this.showAlert()
      : this.props.addNewContact(name, number);
    this.resetInputForm();
  };

  checkExistingName = (targetName) => {
    return this.props.contacts
      .map((contact) => contact.name.toLowerCase().trim())
      .includes(targetName.toLowerCase().trim());
  };

  showAlert = () => {
    this.setState({ onAlert: true });
    setTimeout(this.closeAlert, 4000);
  };
  closeAlert = () => {
    this.setState({ onAlert: false });
  };

  resetInputForm = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { onAlert } = this.state;
    const onFilter = this.props.contacts.length > 1;

    return (
      <>
        <div className={styles.wrapper}>
          <CSSTransition
            in={onFilter}
            timeout={250}
            classNames={styles}
            unmountOnExit
          >
            <Filter />
          </CSSTransition>
          <form className={styles.inputForm} onSubmit={this.submitForm}>
            <label className={styles.label}>
              Name
              <Input
                type={"input"}
                name={"name"}
                placeholder={"Add name"}
                value={this.state.name}
                inputTracking={this.inputTracking}
                minLength={3}
                required
                autoFocus
              />
            </label>
            <label className={styles.label}>
              Number
              <Input
                type={"number"}
                name={"number"}
                placeholder={"Add phone"}
                value={this.state.number}
                inputTracking={this.inputTracking}
                minLength={10}
                required
              />
            </label>
            <button className={styles.btn} type={"submit"}>
              Add contact
            </button>
          </form>
        </div>
        <CSSTransition
          in={onAlert}
          timeout={250}
          classNames={styles}
          unmountOnExit
        >
          <Alert close={this.closeAlert} />
        </CSSTransition>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.items,
  };
};

const mapDispatchToProps = {
  addNewContact: mainActions.addNewContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
