// import { combineReducers } from "redux";
// import types from "./mainTypes";
// import mainActions from "./mainActions";

// const itemsReducer = (state = [], { type, payload }) => {
//   switch (type) {
//     case mainActions.addNewContact.type:
//       return [...state, payload.items];
//     case mainActions.deleteContact.type:
//       return (state = state.filter(({ id }) => id !== payload));
//     default:
//       return state;
//   }
// };

// const filterReducer = (state = "", { type, payload }) => {
//   switch (type) {
//     case mainActions.changeFilter.type:
//       return (state = payload);
//     default:
//       return state;
//   }
// };

// export default combineReducers({ items: itemsReducer, filter: filterReducer });
import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import mainActions from "./mainActions";

const onDeleteContact = (state, action) => {
  return (state = state.filter(({ id }) => id !== action.payload));
};

const itemToolkitReducer = createReducer([], {
  [mainActions.addNewContact]: (state, action) => [
    ...state,
    action.payload.items,
  ],
  [mainActions.pushContactsToState]: (state, action) =>
    (state = action.payload),

  [mainActions.deleteContact]: onDeleteContact,
});

const filterToolkitReducer = createReducer("", {
  [mainActions.changeFilter]: (state, action) => (state = action.payload),
  [mainActions.pushFilterToState]: (state, action) => (state = action.payload),
});

export default combineReducers({
  items: itemToolkitReducer,
  filter: filterToolkitReducer,
});
