import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
let circle;

const width = 800;
const height = 600;
const duration = 800;
const clickFrameCount = 5;

async function prepareVis() {
  svg = d3
    .select("#visContainer")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black");

  //only creates a circle when the background is clicked not a existing one
  svg.on("click", (event) => {
    if (event.target.tagName === "svg") {
      const [x, y] = d3.pointer(event);
      drawCircle(x, y);
    }
  });
}

function drawCircle(x, y, size) {
  //check for 10
  const currentCircles = svg.selectAll("circle");

  if (currentCircles.size() >= 10) {
    //remove oldest one
    currentCircles.filter((d, i) => i === 0).remove();
  }

  // draw the circle
  svg
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", Math.random() * 25 + 10) // New random size per circle
    .attr("fill", "black")
    .style("cursor", "pointer")
    .on("click", playAnimation); // Attach the animation listener here
}

async function drawVis() {
  circle = svg
    .append("circle")
    .attr("r", 15)
    .attr("fill", "black")
    .attr("cx", 55)
    .attr("cy", 25)
    .style("cursor", "pointer")
    .on("click", playAnimation);
}

async function playAnimation(event) {
  event.stopPropagation(); // prevents circle clipping
  const targetCircle = d3.select(this);
  let index = 0;

  const interval = setInterval(() => {
    // Generate inside the interval for random movement/scaling
    const newX = Math.random() * width;
    const newY = Math.random() * height;
    const newR = Math.random() * 50 + 5;

    targetCircle
      .transition()
      .duration(duration)
      .attr("cx", newX)
      .attr("cy", newY)
      .attr("r", newR)
      .attr("fill", `hsl(${Math.random() * 360}, 70%, 50%)`);

    index++;
    if (index >= clickFrameCount) {
      clearInterval(interval);
    }
  }, duration);
}

async function runApp() {
  await prepareVis();
  await drawVis();
}

runApp();

// IGNORE - TEST CODE
// let svg;
// const width = 800;
// const height = 600;

// function drawVis() {
//   svg = d3
//     .select("#visContainer")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .style("border", "1px solid black");

//   svg
//     .append("circle")
//     .attr("cx", 200)
//     .attr("cy", 300)
//     .attr("r", 20)
//     .attr("fill", "black");
// }

// function animateCircles() {
//   let circle = svg.selectAll("circle");
//   let duration = 500;

//   setInterval(() => {
//     let randomX = Math.random() * width;
//     let randomY = Math.random() * height;
//     circle
//       .transition()
//       .duration(duration)
//       .attr("cx", randomX)
//       .attr("cy", randomY);
//   }, duration);
// }

// drawVis();
// animateCircles();
