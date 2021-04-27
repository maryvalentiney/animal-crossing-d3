var width = 450;
var height = 450;
var svg = d3.select("#chart1")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var svg2 = d3.select("#chart2")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.csv("villagers.csv").then(function(data) {
  // console.log(data[16]);
  var color = d3.scaleOrdinal().domain(["Cranky", "Peppy", "Smug", "Big Sister", "Snooty", "Jock", "Lazy", "Normal"]).range(["#4B3B40", "#EF27A6", "#F6AE2D", "#9CDE9F", "#407899", "#B7C3F3", "#DE6449", "#F9B4ED"]);


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
      d3.select('#tooltip').style('opacity', 1).html(d.Name + "<br>" + d.Species);
    })
    .on("mousemove", function(mousemove, d) {
      d3.select('#tooltip')
        .style('left', d3.pointer.pageX + 'px')
        .style('top', d3.pointer.pageY + 'px');
    })
    .on("mouseout", function(mouseout, d) {
      d3.select('#tooltip').style('opacity', 0);
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