/* global google */
import React, { Component } from "react";
import currentLocation from './currentLocation.js';
import { Marker, withGoogleMap, GoogleMap, } from "react-google-maps";


// Required for create react app to not complain
const google = window.google;

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.lat, lng:  props.lng }}
    center={{lat: props.lat, lng: props.lng}}
  >
    {props.markers.map(marker => {
      <Marker
        position={{ lat: marker.lat, lng: marker.lng }}
        key={marker.key}
      />
    })}
  </GoogleMap>
));

export default class SimpleMapExample extends Component {
  state = { places: [], mapH: 0, mapW: 0, lat: 42.3540204, lng: -71.0610617 }

  componentDidMount() {
    this.setState({mapH: window.innerHeight, mapW: window.innerWidth});
    window.addEventListener('resize', this.handleResize);

    const request = {
      location: {lat: this.state.lat, lng: this.state.lng},
      radius: 1000,
      type: ['park'],
    };

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.nearbySearch(request, (places) => {
      this.setState({places})
    })

    currentLocation(this.handleCurrentPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({mapH: window.innerHeight, mapW: window.innerWidth});
  }

  handleCurrentPosition = ({latitude, longitude}) => {
    this.setState({lat: latitude, lng: longitude});
  }

  render() {
    const markers = this.state.places.map(place => {
      const { geometry: { location } } = place;
      return { key: place.id, lat: location.lat(), lng: location.lng() };
    });

    return (
      <div style={{height: this.state.mapH, width: this.state.mapW}}>
        <SimpleMapExampleGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          lat={this.state.lat}
          lng={this.state.lng}
          markers={markers}
        />
      </div>
    );
  }
}
