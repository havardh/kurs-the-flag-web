import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import { Provider } from "react-redux";

import reducers from "./reducers";
import App from "./components/app.js";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('app')
);
