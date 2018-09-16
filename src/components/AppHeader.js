import React from "react";
import { Header, Icon } from "semantic-ui-react";

const AppHeader = () => (
  <Header as="h1" icon textAlign="center">
    <Icon name="play" />
    <Header.Content>Media Logger</Header.Content>
  </Header>
);

export default AppHeader;
