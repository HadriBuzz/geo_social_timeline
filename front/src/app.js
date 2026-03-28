const width = 1000;
const height = 550;
const API_URL = "http://127.0.0.1:8000/data";

let dates = [];
let interests = [];
let points = [];

const interestColors = {
  politics: "#f4a6a6",
  economy: "#9dc7f7",
  sports: "#9ad8b4",
  entertainment: "#d6b3f7",
  "Artificial Intelligence": "#fff4b8",
};

const fallbackPalette = ["#f9c7c7", "#bdd7fb", "#b8e7cd", "#e3cbfb", "#ffe4b8", "#cce7ef"];

const DONUT_OUTER_RADIUS = 22;
const DONUT_INNER_RATIO = 0.52;

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

const cityFilters = document.getElementById("cityFilters");
const interestFilters = document.getElementById("interestFilters");
const selectAllCitiesBtn = document.getElementById("selectAllCitiesBtn");
const selectAllInterestsBtn = document.getElementById("selectAllInterestsBtn");
const slider = document.getElementById("timeSlider");
const timeLabel = document.getElementById("timeLabel");
const playButton = document.getElementById("playButton");
const interestLegend = document.getElementById("interestLegend");

const collapsiblePanels = [
  {
    panel: document.getElementById("interestPanel"),
    button: document.getElementById("toggleInterestsBtn"),
  },
  {
    panel: document.getElementById("cityPanel"),
    button: document.getElementById("toggleCitiesBtn"),
  },
];

let playbackInterval = null;
let currentZoomScale = 1;

const pie = d3
  .pie()
  .sort(null)
  .value(d => d.value);

const zoomBehavior = d3
  .zoom()
  .scaleExtent([1, 8])
  .translateExtent([[-width, -height], [width * 2, height * 2]])
  .on("start", () => {
    svg.classed("is-dragging", true);
  })
  .on("zoom", event => {
    currentZoomScale = event.transform.k;
    g.attr("transform", event.transform);

    if (dates.length > 0) {
      updatePoints(dates[+slider.value]);
    }
  })
  .on("end", () => {
    svg.classed("is-dragging", false);
  });

function getInterestColor(interest, index) {
  return interestColors[interest] ?? fallbackPalette[index % fallbackPalette.length];
}

function getSelectedCities() {
  return points.filter(point => {
    const input = document.querySelector(`input[data-city="${point.name}"]`);
    return input?.checked;
  });
}

function getSelectedInterests() {
  return interests.filter(interest => {
    const input = document.querySelector(`input[data-interest="${interest}"]`);
    return input?.checked;
  });
}

function getInterestValue(point, interest, selectedDate) {
  return point.interests[interest]?.[selectedDate] ?? 0;
}

function getDonutGeometry() {
  const outerRadius = DONUT_OUTER_RADIUS / currentZoomScale;
  const innerRadius = outerRadius * DONUT_INNER_RATIO;
  return {
    innerRadius,
    arc: d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),
    labelArc: d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),
  };
}

function updatePoints(selectedDate) {
  timeLabel.textContent = selectedDate;

  const selectedCities = getSelectedCities();
  const selectedInterests = getSelectedInterests();
  const { innerRadius, arc, labelArc } = getDonutGeometry();

  const donutGroups = g.selectAll(".donut")
    .data(selectedCities, d => d.name)
    .join(
      enter => enter
        .append("g")
        .attr("class", "donut")
        .each(function() {
          d3.select(this).append("circle").attr("class", "donut-hole");
          d3.select(this).append("title");
        }),
      update => update,
      exit => exit.remove()
    )
    .attr("transform", d => {
      const [x, y] = projection([d.lon, d.lat]);
      return `translate(${x}, ${y})`;
    });

  donutGroups.each(function(point) {
    const group = d3.select(this);
    const donutData = pie(
      selectedInterests.map(interest => ({
        interest,
        value: getInterestValue(point, interest, selectedDate),
      }))
    ).filter(segment => segment.data.value > 0);

    group.selectAll(".donut-slice")
      .data(donutData, d => d.data.interest)
      .join(
        enter => enter
          .append("path")
          .attr("class", "donut-slice")
          .attr("fill", d => getInterestColor(d.data.interest, interests.indexOf(d.data.interest)))
          .attr("d", arc),
        update => update
          .attr("fill", d => getInterestColor(d.data.interest, interests.indexOf(d.data.interest)))
          .attr("d", arc),
        exit => exit.remove()
      );

    group.select(".donut-hole")
      .attr("r", donutData.length > 0 ? innerRadius : 0);

    group.selectAll(".donut-label")
      .data(donutData, d => d.data.interest)
      .join(
        enter => enter
          .append("text")
          .attr("class", "donut-label")
          .attr("transform", d => `translate(${labelArc.centroid(d)})`)
          .text(d => d.data.value),
        update => update
          .attr("transform", d => `translate(${labelArc.centroid(d)})`)
          .text(d => d.data.value),
        exit => exit.remove()
      )
      .style("display", d => d.data.value >= 10 ? "block" : "none");

    const breakdown = selectedInterests
      .map(interest => `${interest}: ${getInterestValue(point, interest, selectedDate)}`)
      .join(" | ");

    group.select("title")
      .text(`${point.name} - ${selectedDate} - ${breakdown}`);
  });
}

function renderFilterList(container, items, key, onChange) {
  container.innerHTML = "";

  items.forEach(item => {
    const label = document.createElement("label");
    label.className = "filter-item";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.dataset[key] = item;
    input.addEventListener("change", onChange);

    const text = document.createElement("span");
    text.textContent = item;

    label.append(input, text);
    container.append(label);
  });
}

function renderInterestLegend() {
  interestLegend.innerHTML = "";
  const selectedInterests = getSelectedInterests();

  if (selectedInterests.length === 0) {
    return;
  }

  const title = document.createElement("p");
  title.className = "legend-title";
  title.textContent = "Interests";
  interestLegend.append(title);

  selectedInterests.forEach((interest, index) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.backgroundColor = getInterestColor(interest, index);

    const label = document.createElement("span");
    label.textContent = interest;

    item.append(swatch, label);
    interestLegend.append(item);
  });
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

function updatePanelState(panel, button) {
  const isExpanded = panel.classList.contains("is-expanded");
  button.setAttribute("aria-expanded", String(isExpanded));
  button.querySelector(".collapse-label").textContent = isExpanded ? "Collapse" : "Expand";
}

function selectAllIn(container, attribute) {
  container.querySelectorAll(`input[data-${attribute}]`).forEach(input => {
    input.checked = true;
  });
}

async function loadData() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

async function init() {
  try {
    const [worldData, data] = await Promise.all([
      d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
      loadData(),
    ]);

    dates = data.dates;
    interests = data.interests;
    points = data.points;

    slider.max = dates.length - 1;
    slider.value = 0;

    svg.call(zoomBehavior);

    renderFilterList(cityFilters, points.map(point => point.name), "city", () => {
      updatePoints(dates[+slider.value]);
    });

    renderFilterList(interestFilters, interests, "interest", () => {
      renderInterestLegend();
      updatePoints(dates[+slider.value]);
    });

    renderInterestLegend();

    g.selectAll(".country")
      .data(worldData.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path);

    updatePoints(dates[0]);

    slider.addEventListener("input", event => {
      updatePoints(dates[+event.target.value]);
    });

    selectAllCitiesBtn.addEventListener("click", () => {
      selectAllIn(cityFilters, "city");
      updatePoints(dates[+slider.value]);
    });

    selectAllInterestsBtn.addEventListener("click", () => {
      selectAllIn(interestFilters, "interest");
      renderInterestLegend();
      updatePoints(dates[+slider.value]);
    });

    playButton.addEventListener("click", () => {
      if (playbackInterval !== null) {
        stopPlayback();
        return;
      }

      startPlayback();
    });

    collapsiblePanels.forEach(({ panel, button }) => {
      button.addEventListener("click", () => {
        panel.classList.toggle("is-expanded");
        updatePanelState(panel, button);
      });

      updatePanelState(panel, button);
    });

    updatePlaybackButton();
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
}

init();
