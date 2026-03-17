// let svg;
// let circle; // This will now represent the "all circles" selection

// const width = 800;
// const height = 600;
// const duration = 800;
// const clickFrameCount = 5;

// async function prepareVis() {
//   // Select the container and append the SVG
//   svg = d3
//     .select("#visContainer")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .style("border", "1px solid black");

//   // Add click listener to the SVG canvas
//   svg.on("click", (event) => {
//     const coords = d3.pointer(event);
//     addNewCircle(coords[0], coords[1]);
//   });
// }

// function addNewCircle(x, y) {
//   // Check if we already have 10 circles
//   const currentCircles = svg.selectAll("circle");
//   if (currentCircles.size() >= 10) {
//     // Optional: Remove the oldest circle to make room
//     currentCircles.filter((d, i) => i === 0).remove();
//   }

//   // Add the new circle at click location
//   const newCircle = svg
//     .append("circle")
//     .attr("cx", x)
//     .attr("cy", y)
//     .attr("r", 15)
//     .attr("fill", "black")
//     .style("cursor", "pointer")
//     .on("click", (event) => {
//       event.stopPropagation(); // Prevent SVG click from firing
//       playAnimation(d3.select(event.currentTarget));
//     });
// }

// async function drawVis() {
//   // Initial circle as requested
//   addNewCircle(55, 25);
// }

// async function playAnimation(targetCircle) {
//   let index = 0;

//   const interval = setInterval(() => {
//     let randomX = Math.random() * width;
//     let randomY = Math.random() * height;
//     let randomR = Math.random() * 25 + 5;

//     // Transition the specific circle clicked
//     targetCircle
//       .transition()
//       .duration(duration - 50) // slightly shorter than interval to avoid overlap
//       .attr("cx", randomX)
//       .attr("cy", randomY)
//       .attr("r", randomR)
//       .attr("fill", `hsl(${Math.random() * 360}, 70%, 50%)`);

//     index++;
//     if (index >= clickFrameCount) {
//       clearInterval(interval);
//     }
//   }, duration);
// }

// async function runApp() {
//   await prepareVis();
//   await drawVis();
// }

// runApp();

// // ------------

// (function() {
//     var svg = d3.select('svg');

//     function getRandom(min, max) {
//       return Math.floor(Math.random() * (max - min) + min);
//     }

//     function drawCircle(x, y, size) {
//         console.log('Drawing circle at', x, y, size);
//         svg.append("circle")
//             .attr('class', 'click-circle')
//             .attr("cx", x)
//             .attr("cy", y)
//             .attr("r", size);
//     }

//     svg.on('click', function() {
//         var coords = d3.mouse(this);
//         console.log(coords);
//         drawCircle(coords[0], coords[1], getRandom(5,50));
//     });

// })();

// ---

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
const width = 800;
const height = 600;
const duration = 500;

function prepareVis() {
  svg = d3
    .select("#visContainer")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black");

  // Listener for creating new circles
  svg.on("click", (event) => {
    // Only create a circle if we clicked the BACKGROUND, not an existing circle
    if (event.target.tagName === "svg") {
      const [x, y] = d3.pointer(event);
      drawCircle(x, y);
    }
  });
}

function drawCircle(x, y) {
  const currentCircles = svg.selectAll("circle");

  // Remove oldest if we hit the limit of 10
  if (currentCircles.size() >= 10) {
    currentCircles.filter((d, i) => i === 0).remove();
  }

  // Draw new circle
  svg
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", Math.random() * 25 + 10) // New random size per circle
    .attr("fill", "black")
    .style("cursor", "pointer")
    .on("click", playAnimation); // Attach the animation listener here
}

function playAnimation(event) {
  // Stop the click from reaching the SVG background
  event.stopPropagation();

  // Select the specific circle that was clicked
  const selectedCircle = d3.select(event.currentTarget);

  // Apply a transition to change scale (r) and color
  selectedCircle
    .transition()
    .duration(duration)
    .attr("r", Math.random() * 50 + 5) // Randomly increase/decrease scale
    .attr("fill", `hsl(${Math.random() * 360}, 70%, 50%)`);
}

// Simplified startup
prepareVis();
