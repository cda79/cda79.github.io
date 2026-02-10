import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const svg = d3.create("svg").attr("width", 600).attr("height",600);

const visContainer = document.querySelector("#visContainer"); //or getElementById

visContainer.append(svg.node());

function makeVis() {
    
}