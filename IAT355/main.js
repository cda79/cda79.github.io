// -----------------Initialize Lenis for Smooth Scrolling-----------------
const lenis = new Lenis({
  autoRaf: true,
  autoToggle: true,
  anchors: true,
  allowNestedScroll: true,
  naiveDimensions: true,
  stopInertiaOnNavigate: true,
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ------------ IntersectionObserver for animations ------------
const documentEntries = document.querySelectorAll(".question-text");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // check if each one is intersecting, then add the class
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0, rootMargin: "0px 0px 0px 0px" },
);

documentEntries.forEach((img) => observer.observe(img));

// ------------Data loading & Visualizations---------------

async function fetchData() {
  const data = await d3.csv("./src/broadway_shows_finalized.csv");
  return data;
}

fetchData().then(async (data) => {
  // Pure Javascript

  const vlSpec = vl
    .markLine({ point: true })
    .data(data)
    .encode(
      // group the specific dates into Years - Year Opened
      vl.x().fieldT("opening_date").timeUnit("year").title(null),

      // count the number of titles in that year - Number of Titles Opened
      vl.y().count().title(null),
      vl.color().value("#222116"),
      // show the year and the count
      vl.tooltip([
        { field: "opening_date", timeUnit: "year", title: "Year" },
        { aggregate: "count", title: "Total Titles Opened" },
      ]),
    )
    .width("container")
    .height(500)
    .config({
      font: "IM Fell Double Pica, serif, sans-serif",
      background: "#c2baa6",
      axis: {
        domainColor: "#333", // The actual axis line color
        tickColor: "#333", // The tick marks color
        gridColor: "#eee", // The background grid color
        labelFont: "Courier", // Specific font for labels if different from global
        titleFont: "Arial", // Specific font for titles
        labelFont: "Arial",
        labelColor: "#222116",
        titleColor: "red",
      },
      line: {
        // stroke: "blue",
        strokeWidth: 3, // Optional: make the line thicker
      },
      view: { stroke: "transparent" },
    })
    .toSpec();

  const showtypes = [
    ...new Set(
      data
        .map((d) => d.show_type)
        .filter((val) => val !== null && val !== undefined),
    ),
  ];

  const selectType = vl
    .selectPoint("Select")
    .fields("show_type")
    .bind(
      vl
        .menu([null, ...showtypes])
        .labels(["All", ...showtypes])
        .name("Choose Show Type: "),
    );

  const vlSpec2 = vl
    .markCircle()
    .data(data)
    .params(selectType)
    .encode(
      vl.x().fieldT("opening_date").timeUnit("year").title("Year Opened"),
      vl.y().count().title("Number of Titles Opened"),
      vl.color().fieldN("show_type").title("Show Type"),
      vl.opacity().if(selectType, vl.value(1)).value(0.08),
      vl.tooltip([
        { field: "opening_date", timeUnit: "year", title: "Year" },
        { field: "show_type", title: "Show Type" },
        { aggregate: "count", title: "Count" },
      ]),
    )
    .width("container")
    .height(500)
    .config({
      background: "#c2baa6",
      axis: {
        labelFont: "Arial",
        labelColor: "gray",
        titleFont: "Arial",
        titleColor: "black",
      },
      view: { stroke: "transparent" },
    })
    .toSpec();

  // interactive pie chart

  const actualData = [
    { show_type: "Musical", total_performances: 417539 },
    { show_type: "Play", total_performances: 532390 },
    { show_type: "Opera", total_performances: 2304 },
    { show_type: "Revue", total_performances: 50604 },
    { show_type: "Burlesque", total_performances: 32 },
    { show_type: "Special", total_performances: 4741 },
    { show_type: "Concert", total_performances: 1932 },
  ];

  function getGuessData() {
    return [
      {
        show_type: "Musical",
        total_performances: +document.getElementById("musical").value,
      },
      {
        show_type: "Play",
        total_performances: +document.getElementById("play").value,
      },
      {
        show_type: "Opera",
        total_performances: +document.getElementById("opera").value,
      },
      {
        show_type: "Revue",
        total_performances: +document.getElementById("revue").value,
      },
      {
        show_type: "Burlesque",
        total_performances: +document.getElementById("burlesque").value,
      },
      {
        show_type: "Special",
        total_performances: +document.getElementById("special").value,
      },
      {
        show_type: "Concert",
        total_performances: +document.getElementById("concert").value,
      },
    ];
  }

  function updateChart() {
    const revealed = document.getElementById("revealed").checked;
    const data = revealed ? actualData : getGuessData();

    document.getElementById("sliders").style.opacity = revealed ? "0.4" : "1";

    const spec = {
      mark: "arc",
      data: { values: data },
      encoding: {
        theta: { field: "total_performances", type: "quantitative" },
        color: { field: "show_type", type: "nominal", title: "Show Type" },
        tooltip: [
          { field: "show_type", title: "Show Type", type: "nominal" },
          {
            field: "total_performances",
            title: "Total Performances",
            type: "quantitative",
          },
        ],
      },
      width: 400,
      height: 400,
      title: "Total Showings by Show Type on Broadway (1850s–2010s)",
    };

    vegaEmbed("#chart", spec);
  }

  const musicalData = data.filter((d) => d.show_type === "Musical");

  const vlSpec3 = vl
    .markBar()
    .data(musicalData)
    .transform(
      // 1. Extract the year, 2. Calculate the decade
      vl.calculate("year(datum.opening_date)").as("year_only"),
      vl.calculate("floor(datum.year_only / 10) * 10").as("decade"),
    )
    .encode(
      vl.x().fieldO("decade").title("Decade"),
      vl.y().count().title("Number of Shows"),
      vl.color().fieldN("production_type").title("Production Type"),
      vl.tooltip([
        { field: "decade", title: "Decade" },
        { field: "production_type", title: "Production Type" },
        { aggregate: "count", title: "Count" },
      ]),
    )
    .width("container")
    .height(300)
    .config({
      font: "IM Fell Double Pica, serif, sans-serif",
      background: "#ffffff00",
      axis: {
        domainColor: "#333", // The actual axis line color
        tickColor: "#333", // The tick marks color
        gridColor: "#eee", // The background grid color
        labelFont: "Courier", // Specific font for labels if different from global
        titleFont: "Arial", // Specific font for titles
        labelFont: "Arial",
        labelColor: "#eee",
        titleColor: "red",
      },

      view: { stroke: "transparent" },
    })
    .title("Original vs Revival Plays on Broadway by Decade")
    .toSpec();

  // Render the graphs
  render("#P1-1", vlSpec);
  render("#P2-1", vlSpec2);
  render("#P2-2", vlSpec2B);
  render("#P3-1", vlSpec3);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
