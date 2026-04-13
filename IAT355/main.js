// Initialize Lenis
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

// Data loading & Visualizations

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
      // group the specific dates into Years
      vl.x().fieldT("opening_date").timeUnit("year").title("Year Opened"),

      // count the number of titles in that year
      vl.y().count().title("Number of Titles Opened"),

      // show the year and the count
      vl.tooltip([
        { field: "opening_date", timeUnit: "year", title: "Year" },
        { aggregate: "count", title: "Total Titles Opened" },
      ]),
    )
    .width("container")
    .height(500)
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
      vl.opacity().if(selectType, vl.value(0.75)).value(0.05),
      vl.tooltip([
        { field: "opening_date", timeUnit: "year", title: "Year" },
        { field: "show_type", title: "Show Type" },
        { aggregate: "count", title: "Count" },
      ]),
    )
    .width("container")
    .height(500)
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
