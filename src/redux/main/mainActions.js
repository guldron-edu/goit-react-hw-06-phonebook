// import { v4 as uuidv4 } from "uuid";
// import types from "./mainTypes";

// const addNewContact = (name, number) => ({
//   type: types.CREATE_CONTACT,
//   payload: {
//     items: {
//       id: uuidv4(),
//       name: name,
//       number: number,
//     },
//   },
// });

// const deleteContact = (targetId) => ({
//   type: types.DELETE_CONTACT,
//   payload: { targetId },
// });

// const changeFilter = (filterValue) => ({
//   type: types.CHANGE_FILTER,
//   payload: { filterValue },
// });

// export default { addNewContact, deleteContact, changeFilter };

import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const addNewContact = createAction("main/add", (name, number) => ({
  payload: {
    items: {
      id: uuidv4(),
      name: name,
      number: number,
    },
  },
}));

const pushContactsToState = createAction("main/pushContacts");

const pushFilterToState = createAction("main/pushFilter");

const deleteContact = createAction("main/delete");

const changeFilter = createAction("main/change");

export default {
  addNewContact,
  pushContactsToState,
  pushFilterToState,
  deleteContact,
  changeFilter,
};
