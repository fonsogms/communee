import React, { useState, useEffect } from "react";
import Map from "./Map";
const getQuery = (address: string): string => {
  return `
  
  {
    findAddress(address:"${address}"){
      place_name
      center
    }
  }
  `;
};

const Mapbox = (props) => {
  interface results {
    place_name: string;
    center: Array<number>;
  }
  let mapboxResults: results = {
    place_name: "",
    center: [30, 10],
  };
  interface firstViewInt {
    longitude: number;
    latitude: number;
    width: string;
    height: string;
    zoom: number;
  }
  let firstView: firstViewInt = {
    longitude: 2.090591,
    latitude: 41.563046,
    width: "60vw",
    height: "60vh",
    zoom: 15,
  };
  const [marker, setMarker] = useState({
    longitude: firstView.longitude,
    latitude: firstView.latitude,
  });
  const [viewport, setViewport] = useState(firstView);
  const [input, setInput] = useState("");
  const [addresses, setAddress] = useState([mapboxResults]);
  const changeInput = (e): void => {
    setInput(e.target.value);
    handleChange(e.target.value);
  };

  const handleChange = async (val): Promise<void> => {
    const value: string = val;
    const body = await fetch(`http://localhost:4000/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getQuery(value),
      }),
    });
    const {
      data: { findAddress },
    } = await body.json();
    if (findAddress) {
      setAddress(findAddress);
    } else {
      setAddress([]);
    }
  };

  const pickAdress = (index: number, name: string): void => {
    let latitude = addresses[index].center[1];
    let longitude = addresses[index].center[0];
    let data = { ...viewport, latitude, longitude };
    setMarker({ latitude, longitude });
    setViewport(data);
    setInput(name);
    props.setAddress(name);
  };

  useEffect(() => {
    setAddress([]);
  }, [marker]);
  return (
    <div>
      <div className="introduction">
        <div className="searchBlock">
          <h4>Find your address here:</h4>
          <div className="searchBar">
            <div>
              <input
                className="searchInput"
                type="text"
                onChange={changeInput}
                value={input}
              />
            </div>
            <ul>
              {addresses.length <= 1
                ? null
                : addresses.map((elem, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => pickAdress(index, elem.place_name)}
                      >
                        {elem.place_name}
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
      {}
      <Map viewport={viewport} setViewport={setViewport} marker={marker}></Map>
    </div>
  );
};

export default Mapbox;
