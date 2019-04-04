import React from "react";
import "./style.css";

function HomeWrap(props) {
  return <div className="homeWrap">{props.children}</div>;
}

export default HomeWrap;