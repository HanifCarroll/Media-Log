import React from "react";

const MediaObject = props => (
  <div>
    <a href={props.url}>
      {props.user} - {props.title}
    </a>
  </div>
);

export default MediaObject;
