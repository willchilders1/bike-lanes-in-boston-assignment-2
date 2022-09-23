"use strict";
var fs = require("fs");
var csv2geojson = require("csv2geojson"); // read file as string
fs.readFile("data/austin-traffic-signals.csv", "utf-8", (err, csvString) => {
  if (err) throw err; // convert to GeoJSON
  csv2geojson.csv2geojson(
    csvString,
    {
      latfield: "LATITUDE",
      lonfield: "LONGITUDE",
      delimiter: ",",
    },
    (err, geojson) => {
      if (err) throw err;
      console.log(geojson); // this is our geojson!        // write file
      fs.writeFile(
        "data/austin-traffic-signals.json",
        JSON.stringify(geojson),
        "utf-8",
        (err) => {
          if (err) throw err;
          console.log("done writing file");
        }
      );
    }
  );
});
