// @TODO: YOUR CODE HERE!
var svgWidth = 700;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {
    // Casting necessary data as numbers
    data.forEach(function(d) {
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
    });

    // Defining X & Y Scales
    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(data, d => d.poverty)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([4, d3.max(data, d => d.healthcare)])
    .range([height, 0]);

    // Creating axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Appending axis to chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    var cRadius = 8

    // Circles!
    var circleGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", cRadius)

    var text = chartGroup.selectAll("circle_label")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .classed("state", true)
        .attr("x", d => xLinearScale(d.poverty)-(cRadius/1.5))
        .attr("y", d => yLinearScale(d.healthcare)+(cRadius/2.5));

    // Axis Labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");

});