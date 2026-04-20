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
      color: {
        field: "show_type",
        type: "nominal",
        title: null,
      },
      tooltip: [
        { field: "show_type", title: "Show Type:", type: "nominal" },
        {
          field: "total_performances",
          title: "Total Performances:",
          type: "quantitative",
        },
      ],
    },
    width: "container",
    height: 450,
    autosize: {
      type: "fit",
      resize: "true",
      contains: "padding",
    },
    config: {
      font: "IM Fell Double Pica, serif, sans-serif",
      background: "#b8231e00",
      fontSize: "3rem",
      title: {
        fontSize: 20,
      },
      legend: {
        titleFontSize: 20,
        titleColor: "blue",
        fillColor: "#c2baa600",
        labelFont: "Enriqueta",
        labelColor: "#27271D",
        labelFontSize: 20,
      },
      line: { strokeWidth: 3 }, // Optional: make the line thicker
      view: { stroke: "transparent" },
    },
  };

  vegaEmbed("#chart", spec);
}

[
  "musical",
  "play",
  "opera",
  "revue",
  "burlesque",
  "special",
  "concert",
].forEach((id) => {
  const slider = document.getElementById(id);
  slider.addEventListener("input", function () {
    document.getElementById(id + "Val").textContent = this.value;
    updateChart();
  });
});

document.getElementById("revealed").addEventListener("change", updateChart);

updateChart();
