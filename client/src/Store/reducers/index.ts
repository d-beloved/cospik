import { combineReducers } from "redux";
import adminReducer from "./auth.reducer";
import notify from "./notify.reducer";

const rootReducer = combineReducers({
  adminReducer,
  notify,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
