// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {
  // Pure Javascript
  const vlSpec = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Genre").sort("-x"),
      vl.x().fieldN("Platform"),
      vl
        .color()
        .fieldQ("Global_Sales")
        .aggregate("sum")
        .title("Sum of Global Sales")
        .scale({ scheme: "greenblue" }),

      vl.tooltip([
        { field: "Genre", type: "nominal" },
        {
          field: "Global_Sales",
          type: "quantitative",
          aggregate: "sum",
          title: "Total Global Sales",
        },
      ]),
    )
    .width("container")
    .toSpec();

  const vlSpecB = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Genre").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum"),
      vl.color().fieldN("Genre").scale({ scheme: "tableau20" }),
      vl.tooltip([
        { field: "Genre", type: "nominal" },
        {
          field: "Global_Sales",
          type: "quantitative",
          aggregate: "sum",
          title: "Total Global Sales",
        },
      ]),
    )
    .width("container")
    .toSpec();

  // --------------

  const vlSpec2 = vl
    .markBar()
    .data(data)
    .transform(vl.filter("isValid(datum.Year) && datum.Year !== 'N/A'")) // Filters out null
    .encode(
      vl.facet().fieldN("Genre").columns(2),
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.x().fieldO("Year"),
      vl
        .color()
        .fieldN("Platform")
        .scale({ scheme: "spectral" })
        .legend({ columns: 5, direction: "horizontal", orient: "top" }),
      vl.tooltip([
        { field: "Platform", type: "nominal" },
        {
          field: "Global_Sales",
          type: "quantitative",
          aggregate: "sum",
          title: "Total Global Sales",
        },
      ]),
    )
    .resolve({ axis: { x: "independent" } }) // Forces Year to show on all graphs
    .width("500")
    .toSpec();

  const vlSpec2B = vl
    .markArea()
    .data(data)
    .transform(
      vl.filter(
        "datum.Publisher === 'Nintendo'" &&
          "datum.Genre === 'Role-Playing' && datum.Year !== 'N/A'",
      ),
    )
    .encode(
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.x().fieldO("Year"),
      vl.tooltip([
        { field: "Year", type: "Ordinal" },
        {
          field: "Global_Sales",
          type: "quantitative",
          aggregate: "sum",
          title: "Total Global Sales",
        },
      ]),
    )
    .resolve({ axis: { x: "independent" } }) // Forces Year to show on all graphs
    .width("container")
    .toSpec();

  // ----------------------
  const vlSpec3 = vl
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldQ(vl.repeat("repeat")).aggregate("sum"),
      vl.y().fieldN("Platform"),
      vl.color().fieldN("Platform").legend(null).scale({ scheme: "spectral" }),
      vl.tooltip([
        { field: "Platform", type: "nominal" },
        {
          field: vl.repeat("repeat"),
          type: "quantitative",
          aggregate: "sum",
          title: "Total Sales",
        },
      ]),
    )
    .repeat(["JP_Sales", "EU_Sales", "NA_Sales"])
    .resolve({ scale: { x: "shared" } }) //caluclate the max value across all three data sets
    .columns(3)
    .toSpec();

  const vlSpec3B = vl
    .markBar()
    .data(data)
    .transform(
      vl.filter("indexof(['XB', 'X360', 'XOne'], datum.Platform) >= 0"),
    )
    .encode(
      vl.x().fieldQ(vl.repeat("repeat")).aggregate("sum"),
      vl.y().fieldN("Platform"),
      vl.color().fieldN("Platform").legend(null).scale({ scheme: "spectral" }),
      vl.tooltip([
        { field: "Platform", type: "nominal" },
        {
          field: vl.repeat("repeat"),
          type: "quantitative",
          aggregate: "sum",
          title: "Total Sales",
        },
      ]),
    )
    .repeat(["JP_Sales", "EU_Sales", "NA_Sales"])
    .resolve({ scale: { x: "shared" } }) //caluclate the max value across all three data sets
    .columns(3)
    .toSpec();

  // ---------------
  const vlSpec4 = vl
    .markBar()
    .data(data)
    .transform(vl.filter("isValid(datum.Year) && datum.Year !== 'N/A'")) // Filters out null
    .encode(
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.x().fieldO("Year"),
      vl.color().fieldN("Genre").scale({ scheme: "tableau20" }),
      vl.tooltip([
        { field: "Genre", type: "nominal" },
        {
          field: "Global_Sales",
          type: "quantitative",
          aggregate: "sum",
          title: "Total Sales",
        },
      ]),
    )
    .width("container")
    .toSpec();

  const vlSpec4B = vl
    .markLine({point:true})
    .data(data)
    .transform(vl.filter("datum.Genre === 'Action' && datum.Year !== 'N/A'"))
    .encode(
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.x().fieldO("Year"),
      vl.tooltip([
        { field: "Year", type: "Ordinal" },
        {
          field: "Global_Sales",
          type: "quantitative",
          aggregate: "sum",
          title: "Total Global Sales",
        },
      ]),
    )
    .width("container")
    .toSpec();

  // --------------

  // Render the graphs
  render("#view", vlSpec);
  render("#view2", vlSpec2);
  render("#view3", vlSpec3);
  render("#view4", vlSpec4);

  render("#viewB", vlSpecB);
  render("#view2B", vlSpec2B);
  render("#view3B", vlSpec3B);
  render("#view4B", vlSpec4B);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}

/* ------------------------------------------------------ */
/* ---------------- A2 VISUALIZATION SVG ---------------- */
/* ------------------------------------------------------ */

let svg = document.querySelector("svg");
const svgNS = "http://www.w3.org/2000/svg";

//------Dots on the graph-----\\
const circle1 = document.createElementNS(svgNS, "circle");
const circle2 = document.createElementNS(svgNS, "circle");
const circle3 = document.createElementNS(svgNS, "circle");
const circle4 = document.createElementNS(svgNS, "circle");
const circle5 = document.createElementNS(svgNS, "circle");
const circle6 = document.createElementNS(svgNS, "circle");
const circle7 = document.createElementNS(svgNS, "circle");
colorFill = "#2CA9BC";

//1
circle1.setAttributeNS(null, "r", 3);
circle1.setAttributeNS(null, "cx", 339);
circle1.setAttributeNS(null, "cy", 114);
circle1.setAttributeNS(null, "fill", colorFill);

//2
circle2.setAttributeNS(null, "r", 3);
circle2.setAttributeNS(null, "cx", 289);
circle2.setAttributeNS(null, "cy", 114);
circle2.setAttributeNS(null, "fill", colorFill);

//3
circle3.setAttributeNS(null, "r", 3);
circle3.setAttributeNS(null, "cx", 239);
circle3.setAttributeNS(null, "cy", 214);
circle3.setAttributeNS(null, "fill", colorFill);

//4
circle4.setAttributeNS(null, "r", 3);
circle4.setAttributeNS(null, "cx", 192);
circle4.setAttributeNS(null, "cy", 139);
circle4.setAttributeNS(null, "fill", colorFill);

//5
circle5.setAttributeNS(null, "r", 3);
circle5.setAttributeNS(null, "cx", 137);
circle5.setAttributeNS(null, "cy", 164);
circle5.setAttributeNS(null, "fill", colorFill);

//6
circle6.setAttributeNS(null, "r", 3);
circle6.setAttributeNS(null, "cx", 89);
circle6.setAttributeNS(null, "cy", 214);
circle6.setAttributeNS(null, "fill", colorFill);

//7
circle7.setAttributeNS(null, "r", 3);
circle7.setAttributeNS(null, "cx", 39);
circle7.setAttributeNS(null, "cy", 164);
circle7.setAttributeNS(null, "fill", colorFill);

//add element into container
svg.appendChild(circle1);
svg.appendChild(circle2);
svg.appendChild(circle3);
svg.appendChild(circle4);
svg.appendChild(circle5);
svg.appendChild(circle6);
svg.appendChild(circle7);

//------Lines connecting dots-----\\
const line1 = document.createElementNS(svgNS, "line");
const line2 = document.createElementNS(svgNS, "line");
const line3 = document.createElementNS(svgNS, "line");
const line4 = document.createElementNS(svgNS, "line");
const line5 = document.createElementNS(svgNS, "line");
const line6 = document.createElementNS(svgNS, "line");
const line7 = document.createElementNS(svgNS, "line");

//1
line1.setAttributeNS(null, "x1", 339);
line1.setAttributeNS(null, "y1", 114);
line1.setAttributeNS(null, "x2", 289);
line1.setAttributeNS(null, "y2", 114);
line1.setAttributeNS(null, "stroke", colorFill);

//2
line2.setAttributeNS(null, "x1", 238);
line2.setAttributeNS(null, "y1", 213);
line2.setAttributeNS(null, "x2", 288);
line2.setAttributeNS(null, "y2", 113);
line2.setAttributeNS(null, "stroke", colorFill);

//3
line3.setAttributeNS(null, "x1", 238);
line3.setAttributeNS(null, "y1", 214);
line3.setAttributeNS(null, "x2", 191);
line3.setAttributeNS(null, "y2", 139);
line3.setAttributeNS(null, "stroke", colorFill);

//4
line4.setAttributeNS(null, "x1", 136);
line4.setAttributeNS(null, "y1", 163);
line4.setAttributeNS(null, "x2", 191);
line4.setAttributeNS(null, "y2", 138);
line4.setAttributeNS(null, "stroke", colorFill);

//5
line5.setAttributeNS(null, "x1", 137);
line5.setAttributeNS(null, "y1", 164);
line5.setAttributeNS(null, "x2", 89);
line5.setAttributeNS(null, "y2", 214);
line5.setAttributeNS(null, "stroke", colorFill);

//6
line6.setAttributeNS(null, "x1", 39);
line6.setAttributeNS(null, "y1", 163);
line6.setAttributeNS(null, "x2", 89);
line6.setAttributeNS(null, "y2", 213);
line6.setAttributeNS(null, "stroke", colorFill);

//7
line7.setAttributeNS(null, "x1", 39);
line7.setAttributeNS(null, "y1", 164);
line7.setAttributeNS(null, "x2", 7);
line7.setAttributeNS(null, "y2", 294);
line7.setAttributeNS(null, "stroke", colorFill);

//add element into container
svg.appendChild(line1);
svg.appendChild(line2);
svg.appendChild(line3);
svg.appendChild(line4);
svg.appendChild(line5);
svg.appendChild(line6);
svg.appendChild(line7);

//----------- Graph -----------\\
const graph1 = document.createElementNS(svgNS, "line");
const graph2 = document.createElementNS(svgNS, "line");
const graph3 = document.createElementNS(svgNS, "line");
const graph4 = document.createElementNS(svgNS, "line");
const graph5 = document.createElementNS(svgNS, "line");
const graph6 = document.createElementNS(svgNS, "line");
const graph7 = document.createElementNS(svgNS, "line");
const graph8 = document.createElementNS(svgNS, "line");
const graph9 = document.createElementNS(svgNS, "line");
const graph10 = document.createElementNS(svgNS, "line");
const graph11 = document.createElementNS(svgNS, "line");
const graph12 = document.createElementNS(svgNS, "line");
const graph13 = document.createElementNS(svgNS, "line");
const graph14 = document.createElementNS(svgNS, "line");
const graph15 = document.createElementNS(svgNS, "line");

//1
graph1.setAttributeNS(null, "x1", 1.5);
graph1.setAttributeNS(null, "y1", 63.5);
graph1.setAttributeNS(null, "x2", 13);
graph1.setAttributeNS(null, "y2", 63.5);
graph1.setAttributeNS(null, "stroke", "black");

//2
graph2.setAttributeNS(null, "x1", 1.5);
graph2.setAttributeNS(null, "y1", 113.5);
graph2.setAttributeNS(null, "x2", 13);
graph2.setAttributeNS(null, "y2", 113.5);
graph2.setAttributeNS(null, "stroke", "black");

//3
graph3.setAttributeNS(null, "x1", 1.5);
graph3.setAttributeNS(null, "y1", 163.5);
graph3.setAttributeNS(null, "x2", 13);
graph3.setAttributeNS(null, "y2", 163.5);
graph3.setAttributeNS(null, "stroke", "black");

//4
graph4.setAttributeNS(null, "x1", 1.5);
graph4.setAttributeNS(null, "y1", 213.5);
graph4.setAttributeNS(null, "x2", 13);
graph4.setAttributeNS(null, "y2", 213.5);
graph4.setAttributeNS(null, "stroke", "black");

//5
graph5.setAttributeNS(null, "x1", 1.5);
graph5.setAttributeNS(null, "y1", 263.5);
graph5.setAttributeNS(null, "x2", 13);
graph5.setAttributeNS(null, "y2", 263.5);
graph5.setAttributeNS(null, "stroke", "black");

//6-1
graph6.setAttributeNS(null, "x1", 339.5);
graph6.setAttributeNS(null, "y1", 287);
graph6.setAttributeNS(null, "x2", 339.5);
graph6.setAttributeNS(null, "y2", 300);
graph6.setAttributeNS(null, "stroke", "black");

//7
graph7.setAttributeNS(null, "x1", 289.5);
graph7.setAttributeNS(null, "y1", 287);
graph7.setAttributeNS(null, "x2", 289.5);
graph7.setAttributeNS(null, "y2", 300);
graph7.setAttributeNS(null, "stroke", "black");

//8
graph8.setAttributeNS(null, "x1", 239.5);
graph8.setAttributeNS(null, "y1", 287);
graph8.setAttributeNS(null, "x2", 239.5);
graph8.setAttributeNS(null, "y2", 300);
graph8.setAttributeNS(null, "stroke", "black");

//9
graph9.setAttributeNS(null, "x1", 189.5);
graph9.setAttributeNS(null, "y1", 287);
graph9.setAttributeNS(null, "x2", 189.5);
graph9.setAttributeNS(null, "y2", 300);
graph9.setAttributeNS(null, "stroke", "black");

//10
graph10.setAttributeNS(null, "x1", 139.5);
graph10.setAttributeNS(null, "y1", 287);
graph10.setAttributeNS(null, "x2", 139.5);
graph10.setAttributeNS(null, "y2", 300);
graph10.setAttributeNS(null, "stroke", "black");

//11
graph11.setAttributeNS(null, "x1", 89.5);
graph11.setAttributeNS(null, "y1", 287);
graph11.setAttributeNS(null, "x2", 89.5);
graph11.setAttributeNS(null, "y2", 300);
graph11.setAttributeNS(null, "stroke", "black");

//12
graph12.setAttributeNS(null, "x1", 39.5);
graph12.setAttributeNS(null, "y1", 287);
graph12.setAttributeNS(null, "x2", 39.5);
graph12.setAttributeNS(null, "y2", 300);
graph12.setAttributeNS(null, "stroke", "black");

//13 = x-axis line
graph13.setAttributeNS(null, "x1", 7);
graph13.setAttributeNS(null, "y1", 293.5);
graph13.setAttributeNS(null, "x2", 358);
graph13.setAttributeNS(null, "y2", 293.5);
graph13.setAttributeNS(null, "stroke", "black");

//14 = y-axis line
graph14.setAttributeNS(null, "x1", 7);
graph14.setAttributeNS(null, "y1", 2);
graph14.setAttributeNS(null, "x2", 6);
graph14.setAttributeNS(null, "y2", 294);
graph14.setAttributeNS(null, "stroke", "black");

//add element into container
svg.appendChild(graph1);
svg.appendChild(graph2);
svg.appendChild(graph3);
svg.appendChild(graph4);
svg.appendChild(graph5);
svg.appendChild(graph6);
svg.appendChild(graph7);
svg.appendChild(graph8);
svg.appendChild(graph9);
svg.appendChild(graph10);
svg.appendChild(graph11);
svg.appendChild(graph12);
svg.appendChild(graph13);
svg.appendChild(graph14);

//------ y-axis labels -----\\
const count1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const count2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const count3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const count4 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const count5 = document.createElementNS("http://www.w3.org/2000/svg", "text");

svg.appendChild(count1);
count1.setAttribute("x", 15);
count1.setAttribute("y", 268);
count1.textContent = "10";

svg.appendChild(count2);
count2.setAttribute("x", 15);
count2.setAttribute("y", 220);
count2.textContent = "20";

svg.appendChild(count3);
count3.setAttribute("x", 15);
count3.setAttribute("y", 170);
count3.textContent = "30";

svg.appendChild(count4);
count4.setAttribute("x", 15);
count4.setAttribute("y", 120);
count4.textContent = "40";

svg.appendChild(count5);
count5.setAttribute("x", 15);
count5.setAttribute("y", 70);
count5.textContent = "50";

//------ x-axis labels -----\\
const dim1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const dim2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const dim3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const dim4 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const dim5 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const dim6 = document.createElementNS("http://www.w3.org/2000/svg", "text");
const dim7 = document.createElementNS("http://www.w3.org/2000/svg", "text");

svg.appendChild(dim1);
dim1.setAttribute("x", 32);
dim1.setAttribute("y", 315);
dim1.textContent = "Mo";

svg.appendChild(dim2);
dim2.setAttribute("x", 80);
dim2.setAttribute("y", 315);
dim2.textContent = "Tu";

svg.appendChild(dim3);
dim3.setAttribute("x", 130);
dim3.setAttribute("y", 315);
dim3.textContent = "We";

svg.appendChild(dim4);
dim4.setAttribute("x", 180);
dim4.setAttribute("y", 315);
dim4.textContent = "Th";

svg.appendChild(dim5);
dim5.setAttribute("x", 230);
dim5.setAttribute("y", 315);
dim5.textContent = "Fri";

svg.appendChild(dim6);
dim6.setAttribute("x", 280);
dim6.setAttribute("y", 315);
dim6.textContent = "Sa";

svg.appendChild(dim7);
dim7.setAttribute("x", 325);
dim7.setAttribute("y", 315);
dim7.textContent = "Sun";

/* ------------------------------------------------------ */
/* ----------------- A2 ILLUSTRATION SVG ---------------- */
/* ------------------------------------------------------ */

let artworkContainer = document.getElementById("artworkContainer");

const rect1 = document.createElementNS(svgNS, "rect");
const rect2 = document.createElementNS(svgNS, "rect");
const rect3 = document.createElementNS(svgNS, "rect");
const rect4 = document.createElementNS(svgNS, "rect");
const rect5 = document.createElementNS(svgNS, "rect");
const rect6 = document.createElementNS(svgNS, "rect");
const rect7 = document.createElementNS(svgNS, "rect");
const rect8 = document.createElementNS(svgNS, "rect");
const rect9 = document.createElementNS(svgNS, "rect");
const rect10 = document.createElementNS(svgNS, "rect");
const rect11 = document.createElementNS(svgNS, "rect");
const rect12 = document.createElementNS(svgNS, "rect");
const rect13 = document.createElementNS(svgNS, "rect");
const rect14 = document.createElementNS(svgNS, "rect");
const eye1 = document.createElementNS(svgNS, "rect");
const eye2 = document.createElementNS(svgNS, "rect");

dogFill1 = "#362e2e";
dogFill2 = "#C8AB76";
dogStroke = "#1D1919";

rect13.setAttributeNS(null, "x", 105);
rect13.setAttributeNS(null, "y", 202);
rect13.setAttributeNS(null, "width", 151);
rect13.setAttributeNS(null, "height", 98);
rect13.setAttributeNS(null, "fill", dogFill2);
artworkContainer.appendChild(rect13);

rect12.setAttributeNS(null, "x", 94);
rect12.setAttributeNS(null, "y", 48);
rect12.setAttributeNS(null, "width", 173);
rect12.setAttributeNS(null, "height", 176);
rect12.setAttributeNS(null, "fill", dogFill1);
artworkContainer.appendChild(rect12);

rect11.setAttributeNS(null, "x", 129);
rect11.setAttributeNS(null, "y", 146);
rect11.setAttributeNS(null, "width", 104);
rect11.setAttributeNS(null, "height", 100);
rect11.setAttributeNS(null, "fill", dogFill1);
rect11.setAttributeNS(null, "stroke", dogStroke);
rect11.setAttributeNS(null, "stroke-width", 4);
artworkContainer.appendChild(rect11);

rect1.setAttributeNS(null, "x", 206);
rect1.setAttributeNS(null, "y", 81);
rect1.setAttributeNS(null, "width", 42);
rect1.setAttributeNS(null, "height", 19);
rect1.setAttributeNS(null, "fill", dogFill2);
artworkContainer.appendChild(rect1);

rect2.setAttributeNS(null, "x", 110);
rect2.setAttributeNS(null, "y", 81);
rect2.setAttributeNS(null, "width", 42);
rect2.setAttributeNS(null, "height", 19);
rect2.setAttributeNS(null, "fill", dogFill2);
artworkContainer.appendChild(rect2);

//eyeball2
rect3.setAttributeNS(null, "x", 110);
rect3.setAttributeNS(null, "y", 111);
rect3.setAttributeNS(null, "width", 21);
rect3.setAttributeNS(null, "height", 19);
rect3.setAttributeNS(null, "fill", "black");
artworkContainer.appendChild(rect3);

eye2.setAttributeNS(null, "x", 110);
eye2.setAttributeNS(null, "y", 111);
eye2.setAttributeNS(null, "width", 10);
eye2.setAttributeNS(null, "height", 10);
eye2.setAttributeNS(null, "fill", "white");
artworkContainer.appendChild(eye2);
//

//eyeball1
rect4.setAttributeNS(null, "x", 227);
rect4.setAttributeNS(null, "y", 111);
rect4.setAttributeNS(null, "width", 21);
rect4.setAttributeNS(null, "height", 19);
rect4.setAttributeNS(null, "fill", "black");
artworkContainer.appendChild(rect4);

eye1.setAttributeNS(null, "x", 227);
eye1.setAttributeNS(null, "y", 111);
eye1.setAttributeNS(null, "width", 10);
eye1.setAttributeNS(null, "height", 10);
eye1.setAttributeNS(null, "fill", "white");
artworkContainer.appendChild(eye1);
//

rect5.setAttributeNS(null, "x", 152);
rect5.setAttributeNS(null, "y", 161);
rect5.setAttributeNS(null, "width", 57);
rect5.setAttributeNS(null, "height", 28);
rect5.setAttributeNS(null, "fill", "black");
artworkContainer.appendChild(rect5);

rect6.setAttributeNS(null, "x", 173);
rect6.setAttributeNS(null, "y", 189);
rect6.setAttributeNS(null, "width", 15);
rect6.setAttributeNS(null, "height", 42);
rect6.setAttributeNS(null, "fill", "black");
artworkContainer.appendChild(rect6);

rect7.setAttributeNS(
  null,
  "transform",
  "matrix(-0.890252 0.455469 0.455469 0.890252 100.013 6)",
);
rect7.setAttributeNS(null, "width", 91);
rect7.setAttributeNS(null, "height", 20);
rect7.setAttributeNS(null, "fill", dogFill1);
artworkContainer.appendChild(rect7);

rect8.setAttributeNS(
  null,
  "transform",
  "matrix(-0.890252 0.455469 0.455469 0.890252 100.468 6.89025)",
);
rect8.setAttributeNS(null, "width", 53);
rect8.setAttributeNS(null, "height", 67);
rect8.setAttributeNS(null, "fill", dogFill1);
artworkContainer.appendChild(rect8);

rect9.setAttributeNS(null, "x", 257.972);
rect9.setAttributeNS(null, "y", 6);
rect9.setAttributeNS(null, "width", 91);
rect9.setAttributeNS(null, "height", 20);
rect9.setAttributeNS(null, "transform", "rotate(27.0951 257.972 6)");
rect9.setAttributeNS(null, "fill", dogFill1);
artworkContainer.appendChild(rect9);

rect10.setAttributeNS(null, "x", 257.516);
rect10.setAttributeNS(null, "y", 6.89025);
rect10.setAttributeNS(null, "width", 53);
rect10.setAttributeNS(null, "height", 67);
rect10.setAttributeNS(null, "transform", "rotate(27.0951 257.516 6.89025)");
rect10.setAttributeNS(null, "fill", dogFill1);
artworkContainer.appendChild(rect10);
