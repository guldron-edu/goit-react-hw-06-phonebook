// import { createStore } from "redux";
// import rootReducer from "./rootReducer";

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./main/mainReducer";

const store = configureStore({
  reducer: {
    contacts: mainReducer,
  },
});
export default store;
