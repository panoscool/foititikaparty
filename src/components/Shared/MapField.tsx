import React, { useEffect } from 'react';
import L from 'leaflet';

interface PropsStyle {
  width: string,
  height: string,
  id: string
}

function Wrapper({ width, height, id }: PropsStyle) {
  return <div id={id} style={{ width: width, height: height }}></div>
}

function MapField() {

  useEffect(() => {
    const map = L.map("map", {
      center: [51.5074, 0.1278],
      zoom: 16,
      dragging: !L.Browser.mobile,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    map.locate({ setView: true, maxZoom: 16 });

    function onLocationFound(e: any) {
      var radius = e.accuracy;

      L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);

  }, []);


  return <Wrapper id='map' width='100%' height='320px' />
}

export default MapField;
