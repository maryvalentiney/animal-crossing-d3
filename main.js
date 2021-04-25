var width = 450;
var height = 450;
var svg = d3.select("#chart1")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("text-align", "center");

d3.csv("villagers.csv").then(function(data) {
  // console.log(data[16]);
  var color = d3.scaleOrdinal().domain(["Peppy", "Cranky", "Smug", "Big Sister", "Snooty", "Jock", "Lazy", "Normal"]).range(["#4B3B40", "#DE6449", "#F6AE2D", "#9CDE9F", "#407899", "#B7C3F3", "#EF27A6", "#F9B4ED"]);

  var Tooltip = d3.select("#chart1")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("padding", "5px")
    .attr("width", width)
    .attr("height", height);



  var node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 5)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", function(d) {
      return color(d.Personality);
    })
    .on("mouseover", function(mouseover, d) {
      console.log(d.Name);
      Tooltip
        .style("opacity", 1)
      return d.Name;
    }) // What to do when hovereds
    .on("mousemove", function(mousemove, d) {
      Tooltip
        .html(d.Name)
        .style("left", d3.select(this).attr("cx") + "px")
        .style("top", d3.select(this).attr("cy") + "px");
    })
    .on("mouseleave", function(mouseleave, d) {
      Tooltip
        .style("opacity", 0)
    });

  var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.01).radius(10).iterations(1)); // Force that avoids circle overlapping

  simulation
    .nodes(data)
    .on("tick", function(d) {
      node
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        })
    });
});

console.log("success");