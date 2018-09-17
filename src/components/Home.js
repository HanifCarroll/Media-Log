import React, { Component } from "react";
import Axios from "axios";
import { Dropdown, Loader, Segment } from "semantic-ui-react";

import { extractServices, extractUsers } from "../helpers";
import Results from "./Results";
import AppHeader from "./AppHeader";

class Home extends Component {
  state = {
    fetchingData: true,
    mediaObjects: [],
    filteredObjects: [],
    users: [],
    services: [],
    selectedUser: "All Users",
    selectedService: "All Services"
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    Axios.get("https://media-logger-server.herokuapp.com/logger/")
      .then(data =>
        this.setState({
          mediaObjects: data.data,
          filteredObjects: data.data,
          users: extractUsers(data.data),
          services: extractServices(data.data),
          fetchingData: false
        })
      )
      .catch(e => console.log(e));
  };

  filterByUser = (data, user) => {
    return data.filter(mediaObject => mediaObject.fields.user === user);
  };

  filterByService = (data, service) => {
    return data.filter(mediaObject => mediaObject.fields.service === service);
  };

  onFilterChange = (event, data, type) => {
    const prop = `selected${type}`;
    this.setState({ [prop]: data.value }, this.onFilterSet);
  };

  onFilterSet = () => {
    const { selectedUser, selectedService, mediaObjects } = this.state;

    if (selectedUser === "All Users" && selectedService === "All Services") {
      return this.setState({ filteredObjects: mediaObjects });
    }

    if (selectedUser === "All Users") {
      return this.setState({
        filteredObjects: this.filterByService(mediaObjects, selectedService)
      });
    }

    if (selectedService === "All Services") {
      return this.setState({
        filteredObjects: this.filterByUser(mediaObjects, selectedUser)
      });
    }

    const filteredByUser = this.filterByUser(mediaObjects, selectedUser);
    return this.setState({
      filteredObjects: this.filterByService(filteredByUser, selectedService)
    });
  };

  renderContent = () => (
    <div>
      <div className="header">
        <AppHeader />
      </div>
      <div className="filters">
        <Dropdown
          button
          placeholder="Filter by User"
          selection
          options={this.state.users}
          onChange={(event, data, prop) =>
            this.onFilterChange(event, data, "User")
          }
        />
        <Dropdown
          button
          placeholder="Filter by Service"
          selection
          options={this.state.services}
          onChange={(event, data, prop) =>
            this.onFilterChange(event, data, "Service")
          }
        />
      </div>
    </div>
  );

  renderResults = () => (
    <div className="results">
      <Results data={this.state.filteredObjects} />
    </div>
  );

  renderLoader = () => (
    <div>
      <Segment className="loading">
        <Loader inverted content="Loading" />
      </Segment>
    </div>
  );

  render() {
    return (
      <div className="content">
        {this.renderContent()}
        {this.state.fetchingData ? this.renderLoader() : this.renderResults()}
      </div>
    );
  }
}

export default Home;
