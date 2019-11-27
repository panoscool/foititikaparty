import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropsStyle {
  width: string,
  height: string,
  id: string
}

function Wrapper({ width, height, id }: PropsStyle) {
  return <div id={id} style={{ width: width, height: height }}></div>
}

function PlaceInput() {
  const mapRef = useRef({});

  useEffect(() => {
    const map = L.map("map", {
      center: [51.5074, 0.1278],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    L.marker([51.5074, 0.1278]).addTo(map);
  }, []);


  return <Wrapper id='map' width='100%' height='320px' />
}

export default PlaceInput;

// https://material-ui.com/components/autocomplete/#google-maps-place
