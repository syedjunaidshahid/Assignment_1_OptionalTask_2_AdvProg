// Initialize the Leaflet map 
var map = L.map('map').setView([37.7596, -122.4990], 12);

// Add a tile layer from ArcGIS to the map with zoom level of 16
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Esri, HERE, Garmin, © OpenStreetMap',
}).addTo(map);

// Load GeoJSON data for San Francisco crimes
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/sf_crime.geojson", function(data) {
    var chucknorris = L.icon({
        iconUrl: 'https://images01.military.com/sites/default/files/styles/full/public/2021-04/chucknorris.jpeg.jpg?itok=2b4A6n29',
        iconSize: [60, 60]
    });

    // Create GeoJSON layer with custom markers
    var crime = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {icon: chucknorris});

            // Bind a popup to the marker 
            if (feature.properties && feature.properties.description) {
                marker.bindPopup(feature.properties.description);
            }
            return marker;
        }
    });

    // Create a marker cluster group
    var cluster = L.markerClusterGroup();
    cluster.addLayer(crime);
    map.addLayer(cluster);
});
