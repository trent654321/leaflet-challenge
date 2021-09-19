//Creates an initial map object centered in the middle of the United States and zoomed to show the whole US
var myMap = L.map("map").setView([39.82, -98.58], 5);

//adds the background map image
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
//chose colors using multihue palette from colorbrewer2.org
color1 = '#fef0d9'
color2 = '#fdd49e'
color3 = '#fdbb84'
color4 = '#fc8d59'
color5 = '#e34a33'
color6 = '#b30000'

var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth</h4>";
  div.innerHTML += '<i style="background: #fef0d9"></i><span>Less than 10</span><br>';
  div.innerHTML += '<i style="background: #fdd49e"></i><span>Between 10 and 30</span><br>';
  div.innerHTML += '<i style="background: #fdbb84"></i><span>Between 30 and 50</span><br>';
  div.innerHTML += '<i style="background: #fc8d59"></i><span>Between 50 and 70</span><br>';
  div.innerHTML += '<i style="background: #e34a33"></i><span>Between 70 and 90</span><br>';
  div.innerHTML += '<i style="background: #b30000"></i><span>Greater than 90</span><br>';
  
  

  return div;
};

legend.addTo(myMap);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data) {
    features = data['features'];
    for (var i = 0; i < features.length; i++) {
        coords = features[i]['geometry']['coordinates'];
        mag = features[i]['properties']['mag'];
        adjusted_mag = 4*mag;
        lat = coords[1];
        lng = coords[0];
        depth = coords[2];
        if (depth < 10) {
            color = color1
        }
        else if (depth < 30) {
            color = color2
        }
        else if (depth < 50) {
            color = color3
        }
        else if (depth < 70) {
            color = color4
        }
        else if (depth < 90) {
            color = color5
        }
        else {
            color = color6
        }
        L.circleMarker([lat,lng],{'radius':adjusted_mag,'color':color}).bindPopup("<h1>Magnitude: " + mag + "<h1>" + "<h1> Depth: " + depth + "<h1>").addTo(myMap);
    }
  });