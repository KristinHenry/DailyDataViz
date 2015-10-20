var w = 850
var h = 200
var pad = 40




var bubbles = function(data){
    console.log("bubbles----------------------------------------");

    //1. Set the range functions ----yeah, yeah, functions don't always look like functions in d3.
    var xmin = d3.min(data, function(d){return d.atomicNum});
    var xmax = d3.max(data, function(d){return d.atomicNum});
    //var ymin = d3.min(data, function(d){return d.atomicWeight});
    //var ymax = d3.max(data, function(d){return d.atomicWeight});

    var x = d3.scale.linear().range([0+pad, w]);
    //var y = d3.scale.linear().range([h, 0]);
    x.domain([xmin,xmax]);
    //y.domain([ymin,ymax]);
    
    var vis = d3.select("#chart");

    vis.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return +d.atomicRadius * 10;})
        //.attr("cx", function(d){ return (+d.atomicNum * 10) + 40;})
        .attr("cx", function(d){ return x(+d.atomicNum);})
        .attr("cy", function(d){ return 100;})
        .attr("opacity", .15)
        .attr("fill", "red")

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
