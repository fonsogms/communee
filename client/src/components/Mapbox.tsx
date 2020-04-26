import React, { Component } from "react";
import ReactMapGL from "react-map-gl";

let api: string =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/oderberger.json?types=address&access_token=pk.eyJ1IjoiZm9uc29nbXMiLCJhIjoiY2swbWRsZWo3MTV6bTNkcW9vc29ybDZyMSJ9.EiT_I5moTDeyh3CM_Uc5CQ";
export default class Mapbox extends Component {
  render() {
    return (
      <div>
        <ReactMapGL></ReactMapGL>
      </div>
    );
  }
}
