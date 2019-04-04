import React from "react";
import "./style.css";

function wrapper(props) {
  return <div className="wrapper">{props.children}</div>;
}

export default wrapper;