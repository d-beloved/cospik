import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";

const loggerMiddleware = () => {
  if (process.env.NODE_ENV === "development") {
    const logger = createLogger({
      collapsed: true,
    });
    return [logger];
  }

  return [];
};
const configureStore = () => {
  const composedEnhancers = composeWithDevTools(
    applyMiddleware(thunk, ...loggerMiddleware())
  );

  return createStore(reducers, composedEnhancers);
};

export default configureStore;
