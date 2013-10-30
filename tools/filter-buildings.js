var fs = require('fs-extra');
var yaml = require('js-yaml');

var file = fs.readFileSync('tools/selected-buildings.yaml', 'utf8');
var selected_buildings = yaml.load(file).buildings;

var all_buildings = JSON.parse(fs.readFileSync('json/buildings.json', 'utf8'));

var selected_features = all_buildings.features.filter(function(feature) {
	return selected_buildings.indexOf(feature.properties.id) > -1;
});

var geojson = {
	type: 'FeatureCollection',
	features: selected_features
};

fs.writeFileSync('json/selected-buildings.json', JSON.stringify(geojson, null, 2));
console.log('Written ' + selected_features.length + ' features.');