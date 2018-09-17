import React from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";

import ResultsRow from "./ResultsRow";

class Results extends React.Component {
  state = {
    column: null,
    data: null,
    direction: null
  };

  static getDerivedStateFromProps = (props, state) => {
    return { data: props.data };
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  renderRows = () => {
    if (this.state.data) {
      return _.map(this.state.data, mediaObject => (
        <ResultsRow data={mediaObject} key={mediaObject.pk} />
      ));
    }
  };
  render() {
    const { column, direction } = this.state;

    return (
      <div className="results-table">
        <Table celled selectable sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                width={2}
                sorted={column === "thumbnail_url" ? direction : null}
                onClick={this.handleSort("thumbnail_url")}
              />
              <Table.HeaderCell
                sorted={column === "artist" ? direction : null}
                onClick={this.handleSort("artist")}
              >
                Artist
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "title" ? direction : null}
                onClick={this.handleSort("title")}
              >
                Title
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "url" ? direction : null}
                onClick={this.handleSort("url")}
              >
                URL
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "user" ? direction : null}
                onClick={this.handleSort("user")}
              >
                User
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "service" ? direction : null}
                onClick={this.handleSort("service")}
              >
                Service
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "time_posted" ? direction : null}
                onClick={this.handleSort("time_posted")}
              >
                Time Posted
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderRows()}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default Results;
