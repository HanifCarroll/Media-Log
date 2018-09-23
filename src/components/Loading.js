import React from "react";
import { Loader, Segment } from "semantic-ui-react";

const Loading = () => (
  <div>
    <Segment className="loading">
      <Loader inverted content="Loading" />
    </Segment>
  </div>
);

export default Loading;
