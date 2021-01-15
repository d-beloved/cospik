import React from"react";
// import { Provider } from "react-redux";
import { StoreContext } from "redux-react-hook";
import store from 'Store';
import Routes from "Router";
import setUser from 'Utils/setUser';
import './App.scss';

// const store = configureStore();
setUser(store);
function App() {
  return (
    <StoreContext.Provider value={store}>
      <Routes />
    </StoreContext.Provider>
  );
}

export default App;
