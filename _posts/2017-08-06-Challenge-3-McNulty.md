---
layout: post
title: "Challenge 3 McNulty Project"
description: "Supervised learning: classification on climate change."
categories: [project]
tags: [classification, decision tree, random forest, jekyll]
redirect_from:
  - /2017/08/06/
---

# Project 3 McNulty Project --- Climate Change and Human Activities

## Story
Global warming is happening according to monthly global temperature data from Kaggle. To modeling climate change is a complicated problem. It's related to the sun, the sea, the current, and the human activities, etc. This project will only focus on several reasons that caused by human activities to the climate. 
<br>
<br>
![Jan global temperature]({{site.url }}/images/jan_global.png){: .left-image}{:style="float: left" height="40%" width="40%"}


![Jul global temperature]({{ site.url }}/images/jul_global.png){: .right-image}{:height="40%" width="40%"}


Well, how does it related to the countries? 
<br>
Which country's temperature is changing a lot?
<br>


## Data
[Global temperature data]("https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data")is from Kaggle.
<br>
Country economic data, like [GDP]("https://data.worldbank.org/data-catalog/GDP-ranking-table"), [world development indicator]("https://data.worldbank.org/data-catalog/world-development-indicators"), [climate change data]("https://data.worldbank.org/data-catalog/climate-change") and etc.,  is from World Bank.

## D3 Bubble Chart for Countires

<style>

.node {
  stroke: #fff;
  stroke-width: 1.5px;
}

.link {
  stroke: #999;
  stroke-opacity: .6;
}

</style>

<title>DeltaT vs Features</title>
<style>

/*remove some @import*/

#chart {
  margin-top: 20px;
  margin-left: 40px;
  height: 506px;
}
/*what if margin-lefrt is negtive. 
why is it # instead of .
This is how year goes to upper left*/

#legend {
  position: absolute;
  right: 200px;
  top: 1200px;
  font-size: 20px;
  font-family: Helvetica Neue;
}

h1 {
  /*color: white;*/
  font-family: Helvetica Neue;
}

#forh4 {
  font-family: Helvetica Neue;
}

text {
  font: 24px sans-serif;
}

/*body {
  background: linear-gradient(to bottom right,#90f9b0,white);
}*/


.dot {
  stroke: #000;
}

.axis path, .axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.label {
  fill: #777;
}

.year.label {
  font: 500 196px "Helvetica Neue";
  fill: #ddd;
}

.year.label.active {
  fill: #aaa;
}

.overlay {
  fill: none;
  pointer-events: all;
  cursor: ew-resize;
}

</style>

<!-- style including chart,dot,axis,label,year.label,year.label.active,overlay -->

<h2>Δ Temperature vs. Features over Time</h2>

<p id="chart"></p>

<div id="legend">
<br>Circles: Countries<br> 
<br>Radius: Population<br>
<br>Color: Δ Temperature
</div>

<!-- <aside>Mouseover the year to move forward and backwards through time.</aside> -->

<h4 id="forh4">Mouseover the year to move forward and backwards through time.</h4>


 <h4 id="forh4">This is inspired by <a https://bost.ocks.org/mike/nations>Mike Bostock's work</a> on Gapminder’s <a href="http://www.gapminder.org/tools/#_locale_id=en;&chart-type=bubbles">Wealth & Health of Nations</a>, made famous by Hans Rosling’s memorable <a href="http://www.ted.com/talks/hans_rosling_shows_the_best_stats_you_ve_ever_seen.html">2006 TED talk</a>. </h4>


<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>

<!-- keep this the same -->

<script src="//d3js.org/queue.v1.min.js"></script>
<script src="//d3js.org/d3-color.v1.min.js"></script>
<script src="//d3js.org/d3-interpolate.v1.min.js"></script>
<script src="//d3js.org/d3-scale-chromatic.v1.min.js"></script>

<script>

// Various accessors that specify the four dimensions of data to visualize.
function x(d) { return d.urban; }
function y(d) { return d.co2; }
function radius(d) { return d.pop; }
function color(d) { return d3.interpolateOranges(d.temp); }
function key(d) { return d.name; }
// change color to orange here

// Chart dimensions.
var margin = {top: 19.5, right: 19.5, bottom: 35, left: 39.5},
    width = 960 - margin.right,
    height = 500 - margin.top - margin.bottom;
// for whole chart size and posizion

// Various scales. These domains make assumptions of data, naturally.
var xScale = d3.scale.linear().domain([0, 100]).range([0, width]),
    yScale = d3.scale.sqrt().domain([0, 30]).range([height, 0]),
    radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]);

// The x & y axes.
var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d")),
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// Create the SVG container and set the origin.
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

// Add an x-axis label.
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Urban Proportion (%)");

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("CO2 Emissions (metric tons per capita)");

// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height - 320)
    .attr("x", width - 450)
    .text(1960);

// Load data
var pops = {{ site.data.pop_urban_co2_temp | jsonify}}

// Add a dot per nation. Initialize the data at 1960, and set the colors.
var dot = svg.append("g")
    .attr("class", "dots")
  .selectAll(".dot")
    .data(pops['1960'])
  .enter().append("circle")
    .attr("class", "dot")
    .call(fillColor)
    .call(position)
    .sort(order);

// Add a title.
dot.append("title")
    .text(function(d) { return d.name; });

// Add an overlay for the year label.
var box = label.node().getBBox();

var overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.width)
      .attr("height", box.height)
      .on("mouseover", enableInteraction);

// Start a transition that interpolates the data based on year.
svg.transition()
    .duration(20000)
    .ease("linear")
    .tween("year", tweenYear)
    .each("end", enableInteraction);

// Positions the dots based on data.
function position(dot) {
  dot .attr("cx", function(d) { return xScale(x(d)); })
      .attr("cy", function(d) { return yScale(y(d)); })
      .attr("r", function(d) { return radiusScale(radius(d)); });
}

// fill the color of dots based on data
function fillColor(dot) {
  dot.style("fill", function(d) { return color(d); })
}

// Defines a sort order so that the smallest dots are drawn on top.
function order(a, b) {
  return radius(b) - radius(a);
}

// After the transition finishes, you can mouseover to change the year.
function enableInteraction() {
  var yearScale = d3.scale.linear()
      .domain([1960, 2013])
      .range([box.x + 10, box.x + box.width - 10])
      .clamp(true);

  // Cancel the current transition, if any.
  svg.transition().duration(0);

  overlay
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("mousemove", mousemove)
      .on("touchmove", mousemove);

  function mouseover() {
    label.classed("active", true);
  }

  function mouseout() {
    label.classed("active", false);
  }

  function mousemove() {
    displayYear(yearScale.invert(d3.mouse(this)[0]));
  }
}

// Tweens the entire chart by first tweening the year, and then the data.
// For the interpolated data, the dots and label are redrawn.
function tweenYear() {
  var year = d3.interpolateNumber(1960, 2013);
  return function(t) { displayYear(year(t)); };
}

// Updates the display to show the specified year.
function displayYear(year) {
  dot.data(pops[''+Math.round(year)]).call(fillColor).call(position).sort(order);
  label.text(Math.round(year));
}

</script>

## Presentation Slides for the Project  


<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTm_jltFXLi381D9jKuGsMEfKOqn0eSFNmjEGy4JPd3U70ZrmBv-9M5vkP7TdYtLFm3K42953L3U-zd/embed?start=false&loop=true&delayms=5000" frameborder="0" width="700" height="422"></iframe>

### Reference
How to resize figure: https://github.com/hakimel/reveal.js/issues/1349