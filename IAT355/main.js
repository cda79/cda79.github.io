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
    .toSpec();

  // Render the graphs
  render("#P1-1", vlSpec);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
