var w = 850
var h = 200
var pad = 0


//var dotChart = function(data, base, dotType){
var dotChart = function(data, dotType, targSVG, yOffset, dotColor, xname, yname, dx, r){
    console.log(" draw dot chart ---------------");
    console.log(" yOffset: ", yOffset);
    console.log(" dot color: ", dotColor);
    console.log("  value: ", xname, " ," , yname);

    //console.log("  dot type: ", dotType);


    var yMin = d3.min(data, function(d){return Math.floor(d[yname]); });
    var yMax = d3.max(data, function(d){return Math.floor(d[yname]); });
    var yScale = d3.scale.linear().range([0,80]);
    yScale.domain([yMin, yMax]);


    targSVG.selectAll("." + dotType)
        .data(data)
        .enter().append("circle")
        .attr("class", dotType)
        .attr("cx", function(d){ console.log(xname, d[xname]); return d[xname]*dx - dx/2; })
        .attr("cy", function(d){ console.log(yname, d[yname]); return yOffset - yScale(d[yname]); })
        .attr("r", function(d){ return r; })
        .attr("fill", function(d){ return dotColor; })
        .attr("opacity", .55)


     // vis.selectAll(".dot")
     //    .data(data)
     //    .enter().append("circle")
     //    .attr("class", "dot")
     //    .attr("cx", function(d){ return +d.atomicNum*barWidth - barWidth/2; })
     //    //.attr("cy", function(d){return baseDots - (d.density*yMult/8);}) // scale is problematic here
     //    .attr("cy", function(d){return baseDots - densScale(d.density); })
     //    .attr("r", function(d){ return 2; })
     //    .attr("fill", "red")
     //    .attr("opacity", .55)

}




var bubbles = function(data){
    console.log("bubbles----------------------------------------");

    //1. Set the range functions ----yeah, yeah, functions don't always look like functions in d3.
    //var xmin = d3.min(data, function(d){return d.atomicNum});
    var xmin = 0;
    var xmax = d3.max(data, function(d){return d.atomicNum; });
    //var ymin = d3.min(data, function(d){return d.atomicWeight});
    //var ymax = d3.max(data, function(d){return d.atomicWeight});

    

    var x = d3.scale.linear().range([0+pad, w]);
    //var y = d3.scale.linear().range([h, 0]);
    x.domain([xmin,xmax]);
    //y.domain([ymin,ymax]);
    console.log("x scale: ", x.range());


     // set up so we can scale data values plotted to fit n graph
    var radMin = d3.min(data, function(d){return Math.floor(d.atomicRadius); });
    var radMax = d3.max(data, function(d){return Math.floor(d.atomicRadius); });
    var radScale = d3.scale.linear().range([0,80]);
    radScale.domain([radMin, radMax]);

    var densMin = d3.min(data, function(d){return Math.floor(d.density); });
    var densMax = d3.max(data, function(d){return Math.floor(d.density); });
    var densScale = d3.scale.linear().range([0,80]);
    densScale.domain([densMin, densMax]);

    var meltMin = d3.min(data, function(d){return Math.floor(d.meltingPoint); });
    var meltMax = d3.max(data, function(d){return Math.floor(d.meltingPoint); });
    var meltScale = d3.scale.linear().range([0, 80]); // can make this subchart size-based
    meltScale.domain([meltMin, meltMax]);


    // this is the svg we'e drawing into
    var vis = d3.select("#chart");

    var baseBars = 240;
    var baseDots = 130;
    var baseDots2 = 50;

    var barWidth = 10;
    var yMult = 20;
    vis.selectAll(".cell")
        .data(data)
        .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d){ return +d.atomicNum*barWidth - barWidth; })
        .attr("y", function(d){ return baseBars - radScale(+d.atomicRadius); })
        //.attr("height", function(d){ return +d.atomicRadius * yMult; })
        .attr("height", function(d){return radScale(+d.atomicRadius)})
        .attr("width", function(d){ return barWidth; })
        .attr("fill", "blue")
        .attr("stroke", "black")
        .attr("opacity", .35)


    //experimenting with abstracting chart drawing
    dotChart(data, "dot3", vis, baseDots, "red", "atomicNum", "density", barWidth, 2);



    vis.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d){ return +d.atomicNum*barWidth - barWidth/2; })
        //.attr("cy", function(d){return baseDots - (d.density*yMult/8);}) // scale is problematic here
        .attr("cy", function(d){return baseDots - densScale(d.density); })
        .attr("r", function(d){ return 2; })
        .attr("fill", "red")
        .attr("opacity", .55)

    vis.selectAll(".dot2")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot2")
        .attr("cx", function(d){ return +d.atomicNum*barWidth - barWidth/2; })
        .attr("cy", function(d){ return baseDots2 - meltScale(d.meltingPoint); }) 
        .attr("r", function(d){ return 2; })
        .attr("fill", "grey")
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
