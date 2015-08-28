(function () {

	squares = [
		{
			x: 100,
			y: 100,
			dim: 25
		},
		{
			x: 200,
			y: 400,
			dim: 20
		},
		{
			x: 450,
			y: 110,
			dim: 40
		},
		{
			x: 550,
			y: 550,
			dim: 32
		}
	];

	function draw(squareData) {
		setup(600, 600);
		drawLines(squareData);
		createSquares(squareData);
	}

	function setup(width, height) {
		d3.select("svg").attr("width", width)
  		.attr("height", height);
	}

  function createSquares(squareData) {
  	var squares = d3.select("svg")
										.selectAll("rect")
										.data(squareData)
										.enter()
										.append("rect");
		squares.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; })
			.attr("height", function(d) { return d.dim; })
			.attr("width", function(d) { return d.dim; })
			.attr("fill", "#063d6b")
			.on("mouseover", function() {
				d3.select(this).classed("active", true);
			})
			.on("mouseout", function() {
				d3.select(this).classed("active", false);
			});
  }

  function setCenters(squareData) {
  	var updatedData = [];
  	for(var i=0; i<squareData.length; i++) {
  		squareData[i].cx = squareData[i].x + squareData[i].dim / 2.0;
  		squareData[i].cy = squareData[i].y + squareData[i].dim / 2.0;
  	}
  }

  function drawLines(squareData) {
  	var points = [],
  			svgContainer = d3.select("svg"),
  			lineFunction = d3.svg.diagonal();
  			lineFunction
  				.source(function(d) { 
  					return { x: d.source.cx, y: d.source.cy }; 
  				});
  			lineFunction
					.target(function(d) { return { x: d.target.cx, y: d.target.cy }; });
					//.projection(function(d) {return [d.]});

  	for(var i=0; i<squareData.length; i++) {
  		points.push({
  			cx: squareData[i].cx,
  			cy: squareData[i].cy
  		});
  	}

  	for(var i=0; i<points.length; i++) {
  		for(var j=i+1; j<points.length; j++) {
  			// Create line between i and j once for every pair of unique points
  			if (i !== j) {
  				svgContainer.append("path")
  					.attr("d", lineFunction({source: points[i], target: points[j]}))
  					.attr("stroke", "#6bb2ed")
  					.attr("stroke-width", squareData[j].dim / 4)
  					.attr("fill", "none")
  					.on("mouseover", function() {
							d3.select(this).classed("active", true);
						})
						.on("mouseout", function() {
							d3.select(this).classed("active", false);
						});
  			}
  		}
  	}
  }
  setCenters(squares);
	draw(squares);
})();