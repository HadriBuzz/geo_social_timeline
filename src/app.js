const width = 1000;
const height = 550;

const dates = ["2026-01", "2026-02", "2026-03", "2026-04"];

const points = [
  {
    name: "Paris",
    lon: 2.3522,
    lat: 48.8566,
    values: {
      "2026-01": 80,
      "2026-02": 120,
      "2026-03": 100,
      "2026-04": 250,
    }
  },
  {
    name: "New York",
    lon: -74.0060,
    lat: 40.7128,
    values: {
      "2026-01": 60,
      "2026-02": 90,
      "2026-03": 140,
      "2026-04": 50,
    }
  },
  {
    name: "Tokyo",
    lon: 139.6917,
    lat: 35.6895,
    values: {
      "2026-01": 100,
      "2026-02": 70,
      "2026-03": 150,
      "2026-04": 130,
    }
  }
];

const svg = d3
  .select("#map")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g");

const projection = d3
  .geoNaturalEarth1()
  .scale(180)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const zoomBehavior = d3
  .zoom()
  .scaleExtent([1, 8])
  .translateExtent([[-width, -height], [width * 2, height * 2]])
  .on("start", () => {
    svg.classed("is-dragging", true);
  })
  .on("zoom", (event) => {
    currentZoomScale = event.transform.k;
    g.attr("transform", event.transform);
    g.selectAll(".point")
      .attr("r", d => radiusScale(d.values[dates[+slider.value]]) / currentZoomScale);
  })
  .on("end", () => {
    svg.classed("is-dragging", false);
  });

const maxValue = d3.max(points, p => d3.max(Object.values(p.values)));

const radiusScale = d3
  .scaleSqrt()
  .domain([0, maxValue])
  .range([4, 20]);

const slider = document.getElementById("timeSlider");
const timeLabel = document.getElementById("timeLabel");
const cityFilters = document.getElementById("cityFilters");
const selectAllBtn = document.getElementById("selectAllBtn");
const playButton = document.getElementById("playButton");
const filterPanel = document.getElementById("filterPanel");
const toggleFiltersBtn = document.getElementById("toggleFiltersBtn");
const collapseLabel = toggleFiltersBtn.querySelector(".collapse-label");

let playbackInterval = null;
let currentZoomScale = 1;

slider.max = dates.length - 1;

function getSelectedCities() {
  return points.filter(point => {
    const input = document.querySelector(`input[data-city="${point.name}"]`);
    return input?.checked;
  });
}

function updatePoints(selectedDate) {
  timeLabel.textContent = selectedDate;

  g.selectAll(".point")
    .data(getSelectedCities(), d => d.name)
    .join(
      enter => enter
        .append("circle")
        .attr("class", "point")
        .attr("cx", d => projection([d.lon, d.lat])[0])
        .attr("cy", d => projection([d.lon, d.lat])[1])
        .attr("r", 0)
        .each(function() {
          d3.select(this).append("title");
        })
        .call(enter => enter
          .transition()
          .duration(300)
          .attr("r", d => radiusScale(d.values[selectedDate]) / currentZoomScale)),
      update => update,
      exit => exit
        .transition()
        .duration(200)
        .attr("r", 0)
        .remove()
    )
    .transition()
    .duration(300)
    .attr("r", d => radiusScale(d.values[selectedDate]) / currentZoomScale);

  g.selectAll(".point title")
    .text(d => `${d.name} - ${selectedDate} : ${d.values[selectedDate]}`);
}

function updatePlaybackButton() {
  const isPlaying = playbackInterval !== null;
  playButton.setAttribute("aria-label", isPlaying ? "Pause timeline" : "Play timeline");
  playButton.classList.toggle("is-playing", isPlaying);
}

function stopPlayback() {
  if (playbackInterval !== null) {
    clearInterval(playbackInterval);
    playbackInterval = null;
    updatePlaybackButton();
  }
}

function showDateAtIndex(index) {
  slider.value = index;
  updatePoints(dates[index]);
}

function startPlayback() {
  if (+slider.value >= dates.length - 1) {
    showDateAtIndex(0);
  }

  playbackInterval = window.setInterval(() => {
    const currentIndex = +slider.value;

    if (currentIndex >= dates.length - 1) {
      stopPlayback();
      return;
    }

    showDateAtIndex(currentIndex + 1);
  }, 900);

  updatePlaybackButton();
}

function renderCityFilters() {
  cityFilters.innerHTML = "";

  points.forEach(point => {
    const label = document.createElement("label");
    label.className = "filter-item";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.dataset.city = point.name;

    const text = document.createElement("span");
    text.textContent = point.name;

    input.addEventListener("change", () => {
      updatePoints(dates[+slider.value]);
    });

    label.append(input, text);
    cityFilters.append(label);
  });
}

function updateFiltersPanelState() {
  const isExpanded = filterPanel.classList.contains("is-expanded");
  toggleFiltersBtn.setAttribute("aria-expanded", String(isExpanded));
  collapseLabel.textContent = isExpanded ? "Collapse" : "Expand";
}

d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .then(worldData => {
    svg.call(zoomBehavior);

    renderCityFilters();

    g.selectAll(".country")
      .data(worldData.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path);

    updatePoints(dates[0]);

    slider.addEventListener("input", (event) => {
      const index = +event.target.value;
      const selectedDate = dates[index];
      updatePoints(selectedDate);
    });

    selectAllBtn.addEventListener("click", () => {
      cityFilters.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = true;
      });
      updatePoints(dates[+slider.value]);
    });

    playButton.addEventListener("click", () => {
      if (playbackInterval !== null) {
        stopPlayback();
        return;
      }

      startPlayback();
    });

    toggleFiltersBtn.addEventListener("click", () => {
      filterPanel.classList.toggle("is-expanded");
      updateFiltersPanelState();
    });

    updatePlaybackButton();
    updateFiltersPanelState();
  })
  .catch(error => {
    console.error("Erreur lors du chargement de la carte :", error);
  });
