var fs = require('fs');
var buildings = JSON.parse(fs.readFileSync('vendor/overpass-api-export.json'));

var features = buildings.features
	.filter(function(feature) {
		return feature.geometry.type === 'Polygon';
	})
	.map(function(feature) {
		feature.properties = {
			id: feature.id,
			name: feature.properties.name
		};
		delete feature.id;
		return feature;
	});

var geojson = {
	type: 'FeatureCollection',
	features: features
};

fs.writeFileSync('json/buildings.json', JSON.stringify(geojson, null ,2));