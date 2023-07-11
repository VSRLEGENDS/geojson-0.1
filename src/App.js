import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

mapboxgl.accessToken = "pk.eyJ1IjoidnNyLTIzIiwiYSI6ImNsanNuaGRuNTBlc3QzbG11aDA5bWF4cmcifQ.m4N3QPEdWjtg6QHYLoeNBQ";

const App = () => {
  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-96, 37.8],
        zoom: 3,
      });

      fetch("https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson")
        .then((response) => response.json())
        .then((data) => {
          map.on("load", () => {
            map.addSource("income-data", {
              type: "geojson",
              data,
            });

            map.addLayer({
              id: "income-layer",
              type: "fill",
              source: "income-data",
              paint: {
                "fill-color": {
                  property: "income",
                  stops: [
                    [0, "#f1eef6"],
                    [10000, "#bdc9e1"],
                    [20000, "#74a9cf"],
                    [30000, "#2b8cbe"],
                    [40000, "#045a8d"],
                  ],
                },
                "fill-opacity": 0.8,
              },
            });
          });
        })
        .catch((error) => {
          console.error("Failed to fetch GeoJSON data:", error);
        });
    };

    if (!mapboxgl.accessToken) {
      console.error("Mapbox access token not set.");
    } else {
      initializeMap();
    }
  }, []);

  return <div id="map" />;
};

export default App;
