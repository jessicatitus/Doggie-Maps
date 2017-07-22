import React, { Component } from "react";

const Arrow = (props) => {
  return(
    <div className='arrow-container'>
      <button className='arrow' onClick={props.onClick}>↗</button>
    </div>
  )
}

export default Arrow;
