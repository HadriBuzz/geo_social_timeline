const width = 1000;
const height = 550;

const points = [
  { name: "Paris", lon: 2.3522, lat: 48.8566, value: 120 },
  { name: "New York", lon: -74.0060, lat: 40.7128, value: 90 },
  { name: "Tokyo", lon: 139.6917, lat: 35.6895, value: 150 }
];

const svg = d3
  .select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const projection = d3
  .geoNaturalEarth1()
  .scale(180)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const radiusScale = d3
  .scaleSqrt()
  .domain([0, d3.max(points, d => d.value)])
  .range([4, 18]);

d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .then(worldData => {
    svg
      .selectAll("path")
      .data(worldData.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path);

    svg
      .selectAll("circle")
      .data(points)
      .join("circle")
      .attr("class", "point")
      .attr("cx", d => projection([d.lon, d.lat])[0])
      .attr("cy", d => projection([d.lon, d.lat])[1])
      .attr("r", d => radiusScale(d.value))
      .append("title")
      .text(d => `${d.name} (${d.value})`);
  })
  .catch(error => {
    console.error("Erreur lors du chargement de la carte :", error);
  });