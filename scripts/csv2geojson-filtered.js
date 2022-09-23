"use strict"

import fs from 'fs';
import csv2geojson from 'csv2geojson';

// read file as string
fs.readFile('data/austin-traffic-signals.csv', 'utf-8', (err, csvString) => {

  if(err) throw err

  console.log(csvString) // really long string

    // convert to GeoJSON
    csv2geojson.csv2geojson(csvString, {
        latfield: 'LATITUDE',
        lonfield: 'LONGITUDE',
        delimiter: ','
    }, (err, geojson) => {

        if(err) throw err;

        console.log(geojson); // this is our geojson!

        const filteredGeoJson = filterFields(geojson);
        
        // write file
        fs.writeFile('data/austin-traffic-signals.json', JSON.stringify(filteredGeoJson), 'utf-8', (err) => {
            
            if(err) throw err;
            
            console.log('done writing file');
        });
    });
});

function filterFields(geojson) {
    const features = geojson.features;   // shorthand to current features
    const newFeatures = [];              // empty array for new features

    // loop through all the features
    features.forEach((feature) => {
        
        // on each loop, create an empty object
        let tempProps = {};

        // loop through each of the properties for that feature
        for (var prop in feature.properties) {
            // if it's a match
            if (prop === 'COUNCIL_DISTRICT' || prop === 'SIGNAL_ID') {
                // create the prop/value
                tempProps[prop] = feature.properties[prop];
            }
        }
        // now push a new feature to the newFeatures array
        // we will use the existing feature type and geometry,
        // but we can use our new properties as the "properties" value
        newFeatures.push({
            "type": feature.type,
            "geometry": feature.geometry,
            "properties": tempProps
        });
    });
    // finally, return a GeoJSON object FeatureCollection,
    // using the new features as the "features" value
    return {
        "type": "FeatureCollection",
        "features": newFeatures
    }
}