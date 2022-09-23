"use strict"

import fs from 'fs';

// read the file with a synchronous fs request
const rawData = fs.readFileSync('../data/cartocolors.json');

// use JSON.parse() to parse raw string to JSON
const data = JSON.parse(rawData);

// create a new object with key 'Emrld' and value the object
const outputData = {'Emrld': data['Emrld'] };

// write the output file, stringifying the JS object
fs.writeFileSync('../data/emrldcolors.json', JSON.stringify(outputData));

console.log('data/emrldcolors.json written to file!');