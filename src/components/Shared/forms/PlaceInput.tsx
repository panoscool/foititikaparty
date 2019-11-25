import React, { useEffect } from 'react';
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
  useEffect(() => {
    const map = L.map('map', {
      center: [37.7833, -122.4167],
      zoom: 10,
      zoomControl: false
    });

    L.marker([37.7833, -122.4167]).addTo(map);

    L.control.scale().addTo(map);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }, [])

  return <Wrapper id='map' width='720px' height='520px' />
}

export default PlaceInput;

// https://material-ui.com/components/autocomplete/#google-maps-place
