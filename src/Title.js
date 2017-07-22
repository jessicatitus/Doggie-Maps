import React, { Component } from "react";

const Title = (props) => {
  return(
    <div className='title-container'>
      <h1 className='title'> {props.children} </h1>
    </div>
  )
}

export default Title;
