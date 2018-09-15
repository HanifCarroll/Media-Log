import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Axios from "axios";

import Home from "./Home";
import NoMatch from "./NoMatch";

import "../App.css";

class App extends Component {
  state = {
    mediaObjects: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    Axios.get("http://localhost:8000/logger/")
      .then(data => this.setState({ mediaObjects: data.data }))
      .catch(e => console.log(e));
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
