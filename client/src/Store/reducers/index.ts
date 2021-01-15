import { combineReducers } from "redux";
import adminReducer from "./auth.reducer";

const rootReducer = combineReducers({
  adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
