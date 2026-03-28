const width = 1000;
const height = 550;
const API_URL = "http://127.0.0.1:8000/data";

let dates = [];
let themes = [];
let points = [];

const themeColors = {
  Politics: "#f4a6a6",
  Economy: "#9dc7f7",
  Sports: "#9ad8b4",
  Entertainement: "#d6b3f7",
  "Artificial Intelligence": "#fff4b8",
  Quantum: "#6a93b0",
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
const themeFilters = document.getElementById("themeFilters");
const selectAllCitiesBtn = document.getElementById("selectAllCitiesBtn");
const selectAllThemesBtn = document.getElementById("selectAllThemesBtn");
const clearAllCitiesBtn = document.getElementById("clearAllCitiesBtn");
const clearAllThemesBtn = document.getElementById("clearAllThemesBtn");
const slider = document.getElementById("timeSlider");
const speedSlider = document.getElementById("speedSlider");
const timeLabel = document.getElementById("timeLabel");
const playButton = document.getElementById("playButton");
const themeLegend = document.getElementById("themeLegend");
const downloadDataLink = document.getElementById("downloadDataLink");

const collapsiblePanels = [
  {
    panel: document.getElementById("themePanel"),
    button: document.getElementById("toggleThemesBtn"),
  },
  {
    panel: document.getElementById("cityPanel"),
    button: document.getElementById("toggleCitiesBtn"),
  },
];

let playbackInterval = null;
let currentZoomScale = 1;
let playbackDelay = 500;

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

function getThemeColor(theme, index) {
  return themeColors[theme] ?? fallbackPalette[index % fallbackPalette.length];
}

function getSelectedCities() {
  return points.filter(point => {
    const input = document.querySelector(`input[data-city="${point.name}"]`);
    return input?.checked;
  });
}

function getSelectedThemes() {
  return themes.filter(theme => {
    const input = document.querySelector(`input[data-theme="${theme}"]`);
    return input?.checked;
  });
}

function getThemeValue(point, theme, selectedDate) {
  return point.themes[theme]?.[selectedDate] ?? 0;
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

function getDonutLabelFontSize() {
  return Math.max(2.5, 8 / currentZoomScale);
}

function updatePoints(selectedDate) {
  timeLabel.textContent = selectedDate;

  const selectedCities = getSelectedCities();
  const selectedThemes = getSelectedThemes();
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
      selectedThemes.map(theme => ({
        theme,
        value: getThemeValue(point, theme, selectedDate),
      }))
    ).filter(segment => segment.data.value > 0);

    group.selectAll(".donut-slice")
      .data(donutData, d => d.data.theme)
      .join(
        enter => enter
          .append("path")
          .attr("class", "donut-slice")
          .attr("fill", d => getThemeColor(d.data.theme, themes.indexOf(d.data.theme)))
          .attr("d", arc),
        update => update
          .attr("fill", d => getThemeColor(d.data.theme, themes.indexOf(d.data.theme)))
          .attr("d", arc),
        exit => exit.remove()
      );

    group.select(".donut-hole")
      .attr("r", donutData.length > 0 ? innerRadius : 0);

    group.selectAll(".donut-label")
      .data(donutData, d => d.data.theme)
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
      .style("font-size", `${getDonutLabelFontSize()}px`)
      .style("display", d => d.data.value >= 10 ? "block" : "none");

    const breakdown = selectedThemes
      .map(theme => `${theme}: ${getThemeValue(point, theme, selectedDate)}`)
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

function renderThemeLegend() {
  themeLegend.innerHTML = "";
  const selectedThemes = getSelectedThemes();

  if (selectedThemes.length === 0) {
    return;
  }

  const title = document.createElement("p");
  title.className = "legend-title";
  title.textContent = "Themes";
  themeLegend.append(title);

  selectedThemes.forEach((theme, index) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.backgroundColor = getThemeColor(theme, index);

    const label = document.createElement("span");
    label.textContent = theme;

    item.append(swatch, label);
    themeLegend.append(item);
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

function getPlaybackDelay() {
  const speedValue = Number(speedSlider.value);
  return 1200 - ((speedValue - 1) * 225);
}

function startPlayback() {
  if (+slider.value >= dates.length - 1) {
    showDateAtIndex(0);
  }

  playbackDelay = getPlaybackDelay();
  playbackInterval = window.setInterval(() => {
    const currentIndex = +slider.value;

    if (currentIndex >= dates.length - 1) {
      stopPlayback();
      return;
    }

    showDateAtIndex(currentIndex + 1);
  }, playbackDelay);

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

function clearAllIn(container, attribute) {
  container.querySelectorAll(`input[data-${attribute}]`).forEach(input => {
    input.checked = false;
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
    themes = data.themes;
    points = data.points;
    downloadDataLink.href = API_URL;

    slider.max = dates.length - 1;
    slider.value = 0;

    svg.call(zoomBehavior);

    renderFilterList(cityFilters, points.map(point => point.name), "city", () => {
      updatePoints(dates[+slider.value]);
    });

    renderFilterList(themeFilters, themes, "theme", () => {
      renderThemeLegend();
      updatePoints(dates[+slider.value]);
    });

    renderThemeLegend();

    g.selectAll(".country")
      .data(worldData.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path);

    updatePoints(dates[0]);

    slider.addEventListener("input", event => {
      updatePoints(dates[+event.target.value]);
    });

    speedSlider.addEventListener("input", () => {
      playbackDelay = getPlaybackDelay();

      if (playbackInterval !== null) {
        stopPlayback();
        startPlayback();
      }
    });

    selectAllCitiesBtn.addEventListener("click", () => {
      selectAllIn(cityFilters, "city");
      updatePoints(dates[+slider.value]);
    });

    clearAllCitiesBtn.addEventListener("click", () => {
      clearAllIn(cityFilters, "city");
      updatePoints(dates[+slider.value]);
    });

    selectAllThemesBtn.addEventListener("click", () => {
      selectAllIn(themeFilters, "theme");
      renderThemeLegend();
      updatePoints(dates[+slider.value]);
    });

    clearAllThemesBtn.addEventListener("click", () => {
      clearAllIn(themeFilters, "theme");
      renderThemeLegend();
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
