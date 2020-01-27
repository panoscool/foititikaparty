// @ts-nocheck
import React from 'react';
import GoogleMapReact from 'google-map-react';
import Room from '@material-ui/icons/Room';

const Marker = () => <Room fontSize="large" color='error' />;

function GoogleMap({ lat, lng }) {
  const zoom = 14;

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCVZkdsgp0HsR1PjDyknzHPutHJj04I_6o" }}
        defaultCenter={{ lat, lng }}
        defaultZoom={zoom}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;
