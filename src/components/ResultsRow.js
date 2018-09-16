import React from "react";
import { Table } from "semantic-ui-react";
import format from "date-fns/format";

const ResultsRow = props => {
  const {
    title,
    user,
    url,
    thumbnail_url,
    service,
    time_posted
  } = props.data.fields;

  const thumbnail = () => {
    if (thumbnail_url) {
      return <img src={thumbnail_url} alt={title} />;
    }
  };

  return (
    <Table.Row className="table-row">
      <Table.Cell>{thumbnail()}</Table.Cell>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>
        <a href={url} target="_blank" rel="noopener">
          {url}
        </a>
      </Table.Cell>
      <Table.Cell>{user}</Table.Cell>
      <Table.Cell>{service}</Table.Cell>
      <Table.Cell>{format(time_posted, "M/D/YY h:mm A")}</Table.Cell>
    </Table.Row>
  );
};
export default ResultsRow;
