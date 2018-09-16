import React from "react";
import { Table } from "semantic-ui-react";

import ResultsRow from "./ResultsRow";

const Results = props => {
  const renderRows = () => {
    if (props.data) {
      return props.data.map(mediaObject => (
        <ResultsRow data={mediaObject} key={mediaObject.pk} />
      ));
    }
  };

  return (
    <div className="results-table">
      <h3>Results</h3>
      <Table celled selectable sortable fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>URL</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Service</Table.HeaderCell>
            <Table.HeaderCell>Time Posted</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{renderRows()}</Table.Body>
      </Table>
    </div>
  );
};

export default Results;
