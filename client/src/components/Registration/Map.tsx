import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const Map = (props) => {
  return (
    <div className="map">
      {console.log("antes del marker", props.viewport.latitude)}

      <ReactMapGL
        {...props.viewport}
        marker={props.marker}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          props.setViewport(viewport);
        }}
        mapStyle="mapbox://styles/fonsogms/ck9h762i810v71io0zxm8bg2k"
      >
        <Marker
          longitude={props.marker.longitude}
          latitude={props.marker.latitude}
        >
          {console.log("dentro del marker", props.viewport.latitude)}
          <img src="/images/Webp.net-resizeimage.png" alt="" />{" "}
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
