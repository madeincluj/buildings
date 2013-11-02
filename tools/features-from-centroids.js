var fs = require('fs-extra');
var geojson = require('geojson-utils');

var buildings = JSON.parse(fs.readFileSync('json/selected-buildings.json', 'utf8'));

buildings.features.forEach(function(feature) {
	feature.geometry = geojson.centroid(feature.geometry);
});

fs.outputFile('../collection/dg/json/buildings.json', JSON.stringify(buildings, null, 2));