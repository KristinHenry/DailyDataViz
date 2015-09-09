var w = 850
var h = 200
var pad = 0


var dotChart = function(data, className, targSVG, yOffset, dotColor, xname, yname, dx, r){

    var yMin = d3.min(data, function(d){return Math.floor(d[yname]); });
    var yMax = d3.max(data, function(d){return Math.floor(d[yname]); });
    var yScale = d3.scale.linear().range([0,80]);
    yScale.domain([yMin, yMax]);


    targSVG.selectAll("." + className)
        .data(data)
        .enter().append("circle")
        .attr("class", className)
        .attr("cx", function(d){ console.log(xname, d[xname]); return d[xname]*dx - dx/2; })
        .attr("cy", function(d){ console.log(yname, d[yname]); return yOffset - yScale(d[yname]); })
        .attr("r", function(d){ return r; })
        .attr("fill", function(d){ return dotColor; })
        .attr("opacity", .55)
}


var barChart = function(data, className, targSVG, yOffset, fillColor, xname, yname, dx, dy){
    console.log(className);

    var yMin = d3.min(data, function(d){return Math.floor(d[yname]); });
    var yMax = d3.max(data, function(d){return Math.floor(d[yname]); });
    var yScale = d3.scale.linear().range([0,80]);
    yScale.domain([yMin, yMax]);

    targSVG.selectAll("." + className)
        .data(data)
        .enter().append("rect")
        .attr("class", className)
        .attr("x", function(d){return d[xname]*dx - dx; })
        .attr("y", function(d){return yOffset - yScale(d[yname]); })
        .attr("height", function(d){ return yScale(d[yname]); })
        .attr("width", function(d){ return dx; })
        .attr("fill", fillColor)
        .attr("stroke", "black")
        .attr("opacity", .35)
}




var bubbles = function(data){
    console.log("bubbles----------------------------------------");

    // this is the svg we'e drawing into
    var vis = d3.select("#chart");

    var baseBars = 240;
    var baseDots = 130;
    var baseDots2 = 50;

    var barWidth = 10;
    var yMult = 20;


    //experimenting with abstracting chart drawing
    barChart(data, "cell2", vis, baseBars, "blue", "atomicNum", "atomicRadius", barWidth);
    dotChart(data, "dot3", vis, baseDots, "red", "atomicNum", "density", barWidth, 2);
    dotChart(data, "dot4", vis, baseDots2, "grey", "atomicNum", "meltingPoint", barWidth, 2);

}




var init = function()
{
    console.log("init graphs");

    //setup the svg
    var svg = d3.select("#svg")
        .attr("width", w+100)
        .attr("height", h+100)
    

    svg.append("svg:rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke", "#000")
        .attr("fill", "none")


    svg.append("svg:g")
        .attr("id", "chart")
        .attr("transform", "translate(50,50)")         
    
}
