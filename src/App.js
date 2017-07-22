/* global google */
import React, { Component } from "react";
import currentLocation from './currentLocation.js';
import { Marker, withGoogleMap, GoogleMap, } from "react-google-maps";
import Title from './Title'
import Arrow from './arrow'

// Required for create react app to not complain
const google = window.google;

const SimpleMapExampleGoogleMap = withGoogleMap(({lat, lng, markers, onMount, ...rest}) => (
  <GoogleMap
    ref={onMount}
    defaultZoom={15}
    defaultCenter={{ lat, lng }}
    center={{lat, lng}}
    {...rest}
  >

    {markers.map(marker => {
      return (
        <Marker
          onClick={ function markerClickHandler() { alert('Location: ' + marker.address) } }
          position={{ lat: marker.lat, lng: marker.lng }}
          key={marker.key}
          icon="http://aminoapps.com/static/bower/emojify.js/images/emoji/dog.png"
          />
      );
    })}
  </GoogleMap>
));

export default class SimpleMapExample extends Component {
  state = {
    // current dog parkes we found
    places: [],

    // used for making map take up the whole screen
    mapH: 0,
    mapW: 0,

    // starting position be launch academy
    lat: 42.3540204,
    lng: -71.0610617
  }

  componentDidMount() {
    this.setState({mapH: window.innerHeight, mapW: window.innerWidth});
    window.addEventListener('resize', this.handleResize);
    // if we want to reposition to current location on mount
    currentLocation(this.handleCurrentPosition);
    this.findParks();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  findParks = () => {
    const request = {
      location: {lat: this.state.lat, lng: this.state.lng},
      radius: 2000,
      type: ['park'],
    };

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.nearbySearch(request, (places) => {
      this.setState({places: places || []})
    })
  }

  handleResize = () => {
    this.setState({mapH: window.innerHeight, mapW: window.innerWidth});
  }

  handleCurrentPosition = ({latitude, longitude}) => {
    this.setState({lat: latitude, lng: longitude}, this.findParks);
  }

  handleBoundsChange = () => {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleMapMounted = (map) => {
    this._map = map;
  }

  handleCenterChange = () => {
    if (this._map) {
      const center = this._map.getCenter();
      this.setState({
        lat: center.lat(), lng: center.lng()
      }, this.findParks)
    }
  }

  render() {
    const markers = this.state.places.map(place => {
      const { geometry: { location } } = place;
      return { key: place.id, lat: location.lat(), lng: location.lng(), address: place.vicinity };
    });

    return (
      <div style={{height: this.state.mapH, width: this.state.mapW, position: 'relative'}}>
        <Title>
          Doggie Park 🐶
        </Title>
        <Arrow
          onClick={() => currentLocation(this.handleCurrentPosition)}
        />
        <SimpleMapExampleGoogleMap
          onBoundsChange={this.handleBoundsChange}
          onMount={this.handleMapMounted}
          onCenterChanged={this.handleCenterChange}
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
