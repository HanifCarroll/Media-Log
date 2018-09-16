import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react";

import Home from "./Home";

import "../App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>
);

export default App;
