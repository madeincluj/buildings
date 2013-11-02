var fs = require('fs-extra');
var yaml = require('js-yaml');

var file = fs.readFileSync('tools/selected-buildings.yaml', 'utf8');
var selected_buildings = yaml.load(file).buildings;

var bldg = {};
selected_buildings.forEach(function(building) {
	bldg[building.id] = building.name;
});

var all_buildings = JSON.parse(fs.readFileSync('json/buildings.json', 'utf8'));

var selected_features = all_buildings.features.filter(function(feature) {
	return bldg[feature.properties.id];
});

var geojson = {
	type: 'FeatureCollection',
	features: selected_features.map(function(feature) {
		feature.properties.name = bldg[feature.properties.id];
		return feature;
	})
};

fs.writeFileSync('json/selected-buildings.json', JSON.stringify(geojson, null, 2));
console.log('Written ' + selected_features.length + ' features.');