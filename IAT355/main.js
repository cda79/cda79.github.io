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
        labelColor: "#eee",
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
      background: "#ffffff00",
      axis: {
        labelFont: "Arial",
        labelColor: "gray",
        titleFont: "Arial",
        titleColor: "black",
      },
      view: { stroke: "transparent" },
    })
    .toSpec();

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
  render("#P3-1", vlSpec3);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
