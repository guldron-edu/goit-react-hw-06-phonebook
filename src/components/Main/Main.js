import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import mainActions from "../../redux/main/mainActions";

import InputForm from "../InputForm/InputForm";
import Contacts from "../Contacts/Contacts";

import LS from "../../utils/LS";
import parseSearch from "../../utils/parseQueryString";

import styles from "./Main.module.css";

class Main extends Component {
  static propTypes = {
    pushContactsToState: PropTypes.func.isRequired,
    pushFilterToState: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
  };

  componentDidMount() {
    const { search } = this.props.location;
    const LsContacts = LS.restoreFromLS("contacts");
    const LsFilter = LS.restoreFromLS("filter");
    const currentFilter = parseSearch(search).filter;

    if (LsContacts) {
      this.props.pushContactsToState(JSON.parse(LsContacts));
    }
    if (!currentFilter && LsFilter) {
      this.props.pushFilterToState(JSON.parse(LsFilter));
    }
    if (currentFilter) {
      this.props.pushFilterToState(currentFilter);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { filter } = this.props;
    if (prevProps && prevProps.contacts !== this.props.contacts) {
      LS.saveToLS("contacts", this.props.contacts);
    }

    if (prevProps.filter !== this.props.filter) {
      LS.saveToLS("filter", this.props.filter);

      if (filter) {
        this.props.history.push({
          ...this.props.location,
          search: `filter=${filter}`,
        });
      } else {
        this.props.history.push({
          ...this.props.location,
          search: ``,
        });
      }
    }
  }

  render() {
    return (
      <>
        <section className={styles.wrapper}>
          <InputForm />
          <Contacts />
        </section>
      </>
    );
  }
}

Main.propTypes = {
  pushContactsToState: PropTypes.func.isRequired,
  pushFilterToState: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,

  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state) => {
  return { filter: state.contacts.filter, contacts: state.contacts.items };
};

const mapDispatchToProps = {
  pushContactsToState: mainActions.pushContactsToState,
  pushFilterToState: mainActions.pushFilterToState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
