import React from "react";
import PropTypes from "prop-types";
import SingleContact from "../SingleContact/SingleContact";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from "./Contacts.module.css";
import { connect } from "react-redux";

const Contacts = ({ contacts }) => {
  return (
    <section className={styles.contacts}>
      <div className={styles.contactsHead}>
        <p className={styles.text}>Name</p>
        <p className={styles.text}>Phone</p>
      </div>
      <TransitionGroup component="ul" className={styles.list}>
        {contacts.map((contact) => (
          <CSSTransition key={contact.id} timeout={250} classNames={styles}>
            <SingleContact id={contact.id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
};

Contacts.propTypes = {
  dispatch: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

const mapStateToProps = (state) => {
  const { items, filter } = state.contacts;
  const visibleContacts = items.filter((contact) =>
    (contact.name.toLowerCase() + contact.number.toLowerCase()).includes(
      filter.toLowerCase()
    )
  );
  return {
    contacts: visibleContacts,
  };
};

export default connect(mapStateToProps)(Contacts);
