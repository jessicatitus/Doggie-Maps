import React, { Component } from "react";

const Arrow = (props) => {
  return(
    <div className='arrow-container'>
      <button onClick={props.onClick}>↗</button>
    </div>
  )
}

export default Arrow;
