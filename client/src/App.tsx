import React from"react";
import { Provider } from "react-redux";
import configureStore from 'Store';
import Routes from "Router";
import setUser from 'Utils/setUser';
import './App.scss';

const store = configureStore();
setUser(store);
function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
