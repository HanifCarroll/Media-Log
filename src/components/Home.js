import React, { Component } from "react";
import Axios from "axios";
import { Dropdown } from "semantic-ui-react";

import {
  extractServices,
  extractUsers,
  extractUserChart,
  extractServiceChart
} from "../helpers";
import Results from "./Results";
import AppHeader from "./AppHeader";
import Loading from "./Loading";
import ChartComponent from "./ChartComponent";
import MyButton from "./MyButton";

class Home extends Component {
  state = {
    fetchingData: true,
    userChartData: [],
    serviceChartData: [],
    mediaObjects: [],
    filteredObjects: [],
    users: [],
    userChart: true,
    showTable: false,
    services: [],
    selectedUser: "All Users",
    selectedService: "All Services"
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    Axios.get("https://media-logger-server.herokuapp.com/logger")
      .then(data =>
        this.setState({
          mediaObjects: data.data,
          filteredObjects: data.data,
          users: extractUsers(data.data),
          services: extractServices(data.data),
          userChartData: extractUserChart(data.data),
          serviceChartData: extractServiceChart(data.data),
          fetchingData: false
        })
      )
      .catch(e => console.log(e));
  };

  onChangeView = () => {
    this.setState({ showTable: !this.state.showTable });
  };

  onChangeChart = () => {
    this.setState({ userChart: !this.state.userChart });
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
          disabled={!this.state.showTable}
          placeholder="Filter by User"
          selection
          options={this.state.users}
          onChange={(event, data, prop) =>
            this.onFilterChange(event, data, "User")
          }
        />
        <Dropdown
          button
          disabled={!this.state.showTable}
          placeholder="Filter by Service"
          selection
          options={this.state.services}
          onChange={(event, data, prop) =>
            this.onFilterChange(event, data, "Service")
          }
        />
      </div>
      <div className="buttons">
        <div>
          <MyButton
            className="view-switch"
            onClick={this.onChangeView}
            content="Change View"
            icon={this.state.showTable ? "chart pie" : "table"}
          />
        </div>
        <div>
          {this.state.showTable ? null : (
            <MyButton
              className="chart-button"
              onClick={this.onChangeChart}
              content={this.state.userChart ? "Show Services" : "Show Users"}
              icon="chart pie"
            />
          )}
        </div>
      </div>
    </div>
  );

  renderResults = () => (
    <div className="results">
      <Results data={this.state.filteredObjects} />
    </div>
  );

  renderChart = () => (
    <ChartComponent
      userChart={this.state.userChart}
      chartData={
        this.state.userChart
          ? this.state.userChartData
          : this.state.serviceChartData
      }
    />
  );

  renderTable = () => {
    return this.state.fetchingData ? <Loading /> : this.renderResults();
  };

  renderView = () => {
    if (this.state.showTable) return this.renderTable();
    if (!this.state.showTable) return this.renderChart();
  };

  render() {
    return (
      <div className="content">
        {this.renderContent()}
        {this.renderView()}
      </div>
    );
  }
}

export default Home;
