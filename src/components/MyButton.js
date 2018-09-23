import React from "react";
import { Button } from "semantic-ui-react";

const MyButton = ({ className, onClick, icon, content }) => (
  <Button
    size="small"
    className={className}
    onClick={onClick}
    content={content}
    icon={icon}
    labelPosition="right"
  />
);

export default MyButton;
