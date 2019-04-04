import React from "react";
import "./style.css";

function Charactercard(props) {

    const { image, name, handleClick,id, } = props
    return (

    <img onClick={() => handleClick (id,)} className="character"alt={name} src={image} />
   
    );
}

export default Charactercard; 