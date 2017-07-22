/* global google */
import React, { Component } from "react";

import {
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";


const google = window.google;

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  />
));

export default class SimpleMapExample extends Component {
  render() {
    return (
      <div style={{height: 400, width: 400}}>
        <SimpleMapExampleGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
      </div>
    );
  }
}
