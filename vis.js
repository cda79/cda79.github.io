// alert("HELLO")
// console.log("HELLO CONSOLE")

// let introContainer = document.querySelectorAll(".intro-container");
// console.log(introContainer);

// introContainer.forEach((text)=>{
//     text.style.color = "blue";
// });

// introContainer.forEach((text)=>{
//     text.addEventListener("click",()=>{
//     alert("HELLO CLICKED");
//     text.style.color = "blue";
//     })
// });


/* ------------------------------------------------------ */
/* ---------------- A1 VISUALIZATION SVG ---------------- */
/* ------------------------------------------------------ */

let svg = document.querySelector("svg");
console.log(svg);
const svgNS = "http://www.w3.org/2000/svg"


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
circle1.setAttributeNS(null,"r",3)
circle1.setAttributeNS(null,"cx",339);
circle1.setAttributeNS(null,"cy",114);
circle1.setAttributeNS(null,"fill",colorFill);

//2
circle2.setAttributeNS(null,"r",3)
circle2.setAttributeNS(null,"cx",289);
circle2.setAttributeNS(null,"cy",114);
circle2.setAttributeNS(null,"fill",colorFill);

//3
circle3.setAttributeNS(null,"r",3)
circle3.setAttributeNS(null,"cx",239);
circle3.setAttributeNS(null,"cy",214);
circle3.setAttributeNS(null,"fill",colorFill);

//4
circle4.setAttributeNS(null,"r",3)
circle4.setAttributeNS(null,"cx",192);
circle4.setAttributeNS(null,"cy",139);
circle4.setAttributeNS(null,"fill",colorFill);

//5
circle5.setAttributeNS(null,"r",3)
circle5.setAttributeNS(null,"cx",137);
circle5.setAttributeNS(null,"cy",164);
circle5.setAttributeNS(null,"fill",colorFill);

//6
circle6.setAttributeNS(null,"r",3)
circle6.setAttributeNS(null,"cx",89);
circle6.setAttributeNS(null,"cy",214);
circle6.setAttributeNS(null,"fill",colorFill);

//7
circle7.setAttributeNS(null,"r",3)
circle7.setAttributeNS(null,"cx",39);
circle7.setAttributeNS(null,"cy",164);
circle7.setAttributeNS(null,"fill",colorFill);

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
line1.setAttributeNS(null,"x1",339)
line1.setAttributeNS(null,"y1",114);
line1.setAttributeNS(null,"x2",289);
line1.setAttributeNS(null,"y2",114);
line1.setAttributeNS(null,"stroke",colorFill);

//2
line2.setAttributeNS(null,"x1",238)
line2.setAttributeNS(null,"y1",213);
line2.setAttributeNS(null,"x2",288);
line2.setAttributeNS(null,"y2",113);
line2.setAttributeNS(null,"stroke",colorFill);

//3
line3.setAttributeNS(null,"x1",238)
line3.setAttributeNS(null,"y1",214);
line3.setAttributeNS(null,"x2",191);
line3.setAttributeNS(null,"y2",139);
line3.setAttributeNS(null,"stroke",colorFill);

//4
line4.setAttributeNS(null,"x1",136)
line4.setAttributeNS(null,"y1",163);
line4.setAttributeNS(null,"x2",191);
line4.setAttributeNS(null,"y2",138);
line4.setAttributeNS(null,"stroke",colorFill);

//5
line5.setAttributeNS(null,"x1",137)
line5.setAttributeNS(null,"y1",164);
line5.setAttributeNS(null,"x2",89);
line5.setAttributeNS(null,"y2",214);
line5.setAttributeNS(null,"stroke",colorFill);

//6
line6.setAttributeNS(null,"x1",39)
line6.setAttributeNS(null,"y1",163);
line6.setAttributeNS(null,"x2",89);
line6.setAttributeNS(null,"y2",213);
line6.setAttributeNS(null,"stroke",colorFill);

//7
line7.setAttributeNS(null,"x1",39)
line7.setAttributeNS(null,"y1",164);
line7.setAttributeNS(null,"x2",7);
line7.setAttributeNS(null,"y2",294);
line7.setAttributeNS(null,"stroke",colorFill);

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
graph1.setAttributeNS(null,"x1",1.5)
graph1.setAttributeNS(null,"y1",63.5);
graph1.setAttributeNS(null,"x2",13);
graph1.setAttributeNS(null,"y2",63.5);
graph1.setAttributeNS(null,"stroke","black");

//2
graph2.setAttributeNS(null,"x1",1.5)
graph2.setAttributeNS(null,"y1",113.5);
graph2.setAttributeNS(null,"x2",13);
graph2.setAttributeNS(null,"y2",113.5);
graph2.setAttributeNS(null,"stroke","black");

//3
graph3.setAttributeNS(null,"x1",1.5)
graph3.setAttributeNS(null,"y1",163.5);
graph3.setAttributeNS(null,"x2",13);
graph3.setAttributeNS(null,"y2",163.5);
graph3.setAttributeNS(null,"stroke","black");

//4
graph4.setAttributeNS(null,"x1",1.5)
graph4.setAttributeNS(null,"y1",213.5);
graph4.setAttributeNS(null,"x2",13);
graph4.setAttributeNS(null,"y2",213.5);
graph4.setAttributeNS(null,"stroke","black");

//5
graph5.setAttributeNS(null,"x1",1.5)
graph5.setAttributeNS(null,"y1",263.5);
graph5.setAttributeNS(null,"x2",13);
graph5.setAttributeNS(null,"y2",263.5);
graph5.setAttributeNS(null,"stroke","black");

//6-1
graph6.setAttributeNS(null,"x1",339.5)
graph6.setAttributeNS(null,"y1",287);
graph6.setAttributeNS(null,"x2",339.5);
graph6.setAttributeNS(null,"y2",300);
graph6.setAttributeNS(null,"stroke","black");

//7
graph7.setAttributeNS(null,"x1",289.5)
graph7.setAttributeNS(null,"y1",287);
graph7.setAttributeNS(null,"x2",289.5);
graph7.setAttributeNS(null,"y2",300);
graph7.setAttributeNS(null,"stroke","black");

//8
graph8.setAttributeNS(null,"x1",239.5)
graph8.setAttributeNS(null,"y1",287);
graph8.setAttributeNS(null,"x2",239.5);
graph8.setAttributeNS(null,"y2",300);
graph8.setAttributeNS(null,"stroke","black");

//9
graph9.setAttributeNS(null,"x1",189.5)
graph9.setAttributeNS(null,"y1",287);
graph9.setAttributeNS(null,"x2",189.5);
graph9.setAttributeNS(null,"y2",300);
graph9.setAttributeNS(null,"stroke","black");

//10
graph10.setAttributeNS(null,"x1",139.5)
graph10.setAttributeNS(null,"y1",287);
graph10.setAttributeNS(null,"x2",139.5);
graph10.setAttributeNS(null,"y2",300);
graph10.setAttributeNS(null,"stroke","black");

//11
graph11.setAttributeNS(null,"x1",89.5)
graph11.setAttributeNS(null,"y1",287);
graph11.setAttributeNS(null,"x2",89.5);
graph11.setAttributeNS(null,"y2",300);
graph11.setAttributeNS(null,"stroke","black");

//12
graph12.setAttributeNS(null,"x1",39.5)
graph12.setAttributeNS(null,"y1",287);
graph12.setAttributeNS(null,"x2",39.5);
graph12.setAttributeNS(null,"y2",300);
graph12.setAttributeNS(null,"stroke","black");

//13 = x-axis line
graph13.setAttributeNS(null,"x1",7)
graph13.setAttributeNS(null,"y1",293.5);
graph13.setAttributeNS(null,"x2",358);
graph13.setAttributeNS(null,"y2",293.5);
graph13.setAttributeNS(null,"stroke","black");

//14 = y-axis line
graph14.setAttributeNS(null,"x1",7)
graph14.setAttributeNS(null,"y1",2);
graph14.setAttributeNS(null,"x2",6);
graph14.setAttributeNS(null,"y2",294);
graph14.setAttributeNS(null,"stroke","black");


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
svg.appendChild(count1);
count1.setAttribute("x", 25);
count1.setAttribute("y", 50);
count1.textContent = "10";