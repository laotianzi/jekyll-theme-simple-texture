/**************************************************************/
/*                 Challenge 12         D3                    */
/**************************************************************/

var radcolor = [{r:50,c:'lightgreen',x:150,y:150},
				{r:40,c:'lightblue',x:100,y:100},
				{r:30,c:'lightgrey',x:60,y:60},
				{r:20,c:'yellow',x:30,y:30},
				{r:10,c:'orange',x:15,y:15}];

var triangles = [{x:138, y:120},
				{x:62, y:120},
				{x:100, y:55}];

var arc = d3.symbol()
			.type(d3.symbolTriangle)
			.size(2000);

/**************************************************************/
/*     1. Five circles using data with different colors       */
/**************************************************************/

var svgContainer1 = d3.select("#d1").append("svg")
                                    .attr("width", 200)
                                    .attr("height", 100);

svgContainer1.selectAll("circle")
		  .data(radcolor)
		  .enter()
		  .append("circle")
		  .attr("cx", 50)
		  .attr("cy", 50)
		  .attr("r", function(d) { return d.r; })
		  .style("fill", function(d) { return d.c; });

/**************************************************************/
/*        2. Five circles diagonally across the SVG           */
/**************************************************************/

var svgContainer2 = d3.select("#d2").append("svg")
                                    .attr("width", 200)
                                    .attr("height", 200);

svgContainer2.selectAll("circle")
		  .data(radcolor)
		  .enter()
		  .append("circle")
		  .attr("cx", function(d) {return d.x})
		  .attr("cy", function(d) {return d.y})
		  .attr("r", function(d) { return d.r; })
		  .style("fill", function(d) { return d.c; });

/**************************************************************/
/*         3. Five circles randomly ordered positions         */
/**************************************************************/

var svgContainer3 = d3.select("#d3").append("svg")
                                    .attr("width", 200)
                                    .attr("height", 200);

svgContainer3.selectAll("circle")
		  .data(radcolor)
		  .enter()
		  .append("circle")
		  .attr("cx", function(d) {return Math.random()*100+50})
		  .attr("cy", function(d) {return Math.random()*100+50})
		  .attr("r", function(d) { return d.r; })
		  .style("fill", function(d) { return d.c; });
                       
/**************************************************************/
/*               4. Three circles and a rectangle             */
/**************************************************************/

var svgContainer4 = d3.select("#d4").append("svg")
                                    .attr("width", 200)
                                    .attr("height", 200);

svgContainer4.selectAll("circle")
		  .data(radcolor.slice(0,3))
		  .enter()
		  .append("circle")
		  .attr("cx", function(d) {return Math.random()*100+50})
		  .attr("cy", function(d) {return Math.random()*100+50})
		  .attr("r", function(d) { return d.r; })
		  .style("fill", function(d) { return d.c; });

svgContainer4.selectAll("path")
			 .data(triangles.slice(0,1))
			 .enter()
			 .append("path")
			 .attr("d",arc)
			 .attr("transform", function(d) {
				return "translate(" + d.x + ",60)";			 	
			 })
			 .style("fill", "red")
			 .style("stroke","pink")
			 .style("stroke-width","2%");

/**************************************************************/
/*   5. Make a triangle with yellow fill and a blue border.   */
/**************************************************************/
var svgContainer5 = d3.select("#d5").append("svg")
                                    .attr("width", 200)
                                    .attr("height", 200);

svgContainer5.selectAll("path")
			 .data(triangles.slice(0,1))
			 .enter()
			 .append("path")
			 .attr("d",arc)
			 .attr("transform", function(d) {
			 	return "translate(" + d.x + "," + d.y + ")";			 	
			  })
			 .style("fill", "yellow")
			 .style("stroke","lightgreen")
			 .style("stroke-width","2%");

/**************************************************************/
/*              Extra. Make the triforce from Zelda           */
/**************************************************************/

var svgContainerE = d3.select("#dextra").append("svg")
                                    .attr("width", 200)
                                    .attr("height", 200);

svgContainerE.selectAll("path")
			 .data(triangles)
			 .enter()
			 .append("path")
			 .attr("d",arc)
			 .attr("transform", function(d) {
			 	return "translate(" + d.x + "," + d.y + ")";			 	
			  })

			 .style("fill", "yellow")
			 .style("stroke","orange")
			 .style("stroke-width","2%");


/**************************************************************/
/*         Super extra. Scraping and re-visualization         */
/**************************************************************/

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("#dsextra").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
  if (error) throw error;

  // Coerce the strings to numbers.
  data.forEach(function(d) {
    d.sepalWidth = +d.sepalWidth;
    d.sepalLength = +d.sepalLength;
  });

  // Compute the scales’ domains.
  x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
  y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();

  // Add the x-axis.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

  // Add the y-axis.
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)");

  // Add the points!
  svg.selectAll(".point")
      .data(data)
    .enter().append("path")
      .attr("class", "point")
      .attr("d", d3.symbol().type(d3.symbolTriangle))
      .attr("transform", function(d) { 
      	return "translate(" + x(d.sepalWidth) + "," + y(d.sepalLength) + ")"; })
      .style("fill", function(d) {return color(d.species); })
      .style("stroke", "silver");

  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});
	  
