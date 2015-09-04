var w = 850
var h = 200
var pad = 0




var bubbles = function(data){
    console.log("bubbles----------------------------------------");

    //1. Set the range functions ----yeah, yeah, functions don't always look like functions in d3.
    //var xmin = d3.min(data, function(d){return d.atomicNum});
    var xmin = 0;
    var xmax = d3.max(data, function(d){return d.atomicNum});
    //var ymin = d3.min(data, function(d){return d.atomicWeight});
    //var ymax = d3.max(data, function(d){return d.atomicWeight});

    var x = d3.scale.linear().range([0+pad, w]);
    //var y = d3.scale.linear().range([h, 0]);
    x.domain([xmin,xmax]);
    //y.domain([ymin,ymax]);
    
    var vis = d3.select("#chart");

    var baseBars = 140;
    var baseDots = 40;

    var barWidth = 10;
    var yMult = 20;
    vis.selectAll(".cell")
        .data(data)
        .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d){ return +d.atomicNum*barWidth - barWidth; })
        .attr("y", function(d){ return baseBars - (d.atomicRadius* yMult); })
        .attr("height", function(d){ return +d.atomicRadius * yMult; })
        .attr("width", function(d){ return barWidth; })
        .attr("fill", "blue")
        .attr("stroke", "black")
        .attr("opacity", .35)


    vis.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d){ return +d.atomicNum*barWidth - barWidth/2; })
        //.attr("cy", function(d){ return 140 - (d.atomicRadius* yMult) ; })
        //.attr("cy", function(d) { return 140 - (d.atomicWeight) ;})
        .attr("cy", function(d){return baseDots - (d.density*yMult/8);}) // scale is problematic here
        .attr("r", function(d){ return 2; })
        .attr("fill", "red")
        .attr("opacity", .55)




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
