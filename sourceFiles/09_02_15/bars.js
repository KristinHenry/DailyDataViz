var w = 850
var h = 200
var pad = 0




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


    // set up so we can scale melting point ranges to fit n graph
    var meltMin = d3.min(data, function(d){return Math.floor(d.meltingPoint); });
    var meltMax = d3.max(data, function(d){return Math.floor(d.meltingPoint); });
    var meltScale = d3.scale.linear().range([0, 80]); // can make this subchart size-based
    meltScale.domain([meltMin, meltMax]);
    console.log("meltMin", meltMin);
    console.log("meltMax", meltMax);
    console.log("meltscale: ", meltScale.range(), meltScale.domain());
    console.log("meltScale(100): ", meltScale(1000));


    
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

    vis.selectAll(".dot2")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot2")
        .attr("cx", function(d){ return +d.atomicNum*barWidth - barWidth/2; })
        .attr("cy", function(d){ return baseDots2 - meltScale(d.meltingPoint);
                                }) // scale is problematic here
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
