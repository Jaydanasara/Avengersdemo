import React from "react";
import "./style.css";

function wrap(props) {
  return <div className="wrap">{props.children}</div>;
}

export default wrap;