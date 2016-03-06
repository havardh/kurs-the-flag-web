import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";

import reducers from "./reducers";
import App from "./components/app.js";

const store = createStore(reducers);

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
);
