import { configureStore } from "@reduxjs/toolkit";
import userLogReducer from "../Features/userLog";
import userDetailsReducer from "../Features/userDetails";
import userRegisterReducer from "../Features/createNewUser"


export const store = configureStore({
  reducer: {
    authentication: userLogReducer,
    userdetails: userDetailsReducer,
    userRegister:userRegisterReducer,
  },
});
