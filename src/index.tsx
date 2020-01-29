import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import './style.scss'

ReactDOM.render(
  <ErrorBoundry>
    <Router>
      <App/>
    </Router>
  </ErrorBoundry>,
  document.getElementById("root")
);
