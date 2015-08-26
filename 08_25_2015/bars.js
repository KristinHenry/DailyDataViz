// still working, here. Lots more to get done!

// Generates a tooltip for a SVG circle element based on its ID
function addTooltip(circle) {
    var x = parseFloat(circle.attr("cx"));
    var y = parseFloat(circle.attr("cy"));
    var r = parseFloat(circle.attr("r"));
    var text = circle.attr("info"); 


    var tooltip = d3.select("#barchart")
        .append("text")
        .text(text)
        .attr("x", x)
        .attr("y", y)
        .attr("dy", -r * 2)
        .attr("id", "tooltip");


    var offset = tooltip.node().getBBox().width / 2;

    if ((x - offset) < -radius) {
        tooltip.attr("text-anchor", "start");
        tooltip.attr("dx", -r);
    }
    else if ((x + offset) > (radius)) {
        tooltip.attr("text-anchor", "end");
        tooltip.attr("dx", r);
    }
    else {
        tooltip.attr("text-anchor", "middle");
        tooltip.attr("dx", 0);
    }
}

var w = 850
var h = 400


// Drawing line graphs now
//-------------------------------------------------------------------------------

var lines = function(data){

    console.log("lines ----------------------------------------------");
    console.log(data[0]['values'])

    var values = data[0]['values'];

    // for converting from string to date
    var parseYear = d3.time.format("%Y").parse;

    var stateCodes = ["AL", "FL", "GA", "KY", "MS", "NC", "SC", "TN", "CT", "MA",
             "ME", "NH", "RI", "VT", "IL", "IN", "MI", "MN", "OH", "WI", 
             "AR", "LA", "NM", "OK", "TX", "CO", "MT", "ND", "SD", "UT",
             "WY", "IA", "KS", "MO", "NE", "NJ", "NY", "PR", "DC", "DE",
             "MD", "PA", "VA", "WV", "AK", "ID", "OR", "WA", "AZ", "CA",
             "HI", "NV"];


   var color = d3.scale.category20c()
   .domain(stateCodes);


    //1. Set the range functions ----yeah, yeah, functions don't always look like functions in d3.
    var x = d3.scale.linear().range([0, w]);
    var y = d3.scale.linear().range([h, 0]);

    

    // 2 Define the line function. What are we plugging into x and y, on our graph. Passing our data into the ranges we set up earlier
    var valueline = d3.svg.line()
        .x(function(d){ return x(d.year)})
        .y(function(d) { return y(d.value); })
        ;

    
    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(7)
        .tickFormat(function(d){ return d; });

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5)
        .tickFormat(function(d){ return d + "% "; });


    // using this to get max values for all subsets ToDo: better way of doing this
    var allValues = [];
    var allYears = [];


    

    //------------------------------------------------------------------------------------------
    data.forEach(function(d){
        // at this point, we're looping through each state.
        console.log("-----------------------------------------------------------------");
        console.log(d.key)
   

        // a little data cleaning/trimming/formatting
        // make sure we have nums, not strings for year and values
        var set = d.values
        set.forEach(function(d) {       
            d.year = +d.year; 
            d.value = +d.value;

            // this is a lazy fix, but will do for now
            // ToDo: filter out zero value objects (from data set?) that are breaking viz
            if(d.year > 1900){
                allValues.push(d.value); // use this to update domain as we add more subsets
                allYears.push(d.year);
            }
        });


        // 3b. set the x/y domain range, based on our data
        // domain is our data, range is what we squash it into...how scale works in d3.
        x.domain([d3.min(allYears), d3.max(allYears)]);
        y.domain([0, d3.max(allValues)]);

        //console.log("domain y: ", y.domain());
        //console.log("x domain: ", x.domain())


        // select the svg element we're drawing our graph into, we defined this in init()
        var vis = d3.select("#linechart")

        // 3c. now pass our data to  drawline funciton, and add to our graph objectnd add it to our chart
        // at this point, we're drawing a lint from the data for this state
        vis.append("path")
            .attr("class", "line")
            //.attr("pointer-events", "all")
            .attr("d", valueline(set))
            .attr("stroke", function(set) { console.log(d.key.trim(), color(d.key.trim())); return color(d.key.trim()); })
            .attr("id", function(set){console.log("-------------path's set is: ", d.key.trim()); return d.key.trim();})
            //.attr('class', function(set){return 'line'+d.key.trim();})
    })

    // now we're adding to the whole graph, not just state-by-state
    var chart = d3.select("#linechart")
    // Add the X Axis
    chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis)

    // Add the Y Axis
    chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);


    var maxrow = 26;
    var legend = chart.selectAll(".legend")  // ToDo: study dif btwn select(#classname) and selectAll(.clasname)
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d,i){ return "translate(" + (30*(i%maxrow)) +"," + (Math.floor(i/maxrow))*20 +")";})

    legend.append("text")
    .attr("x", 26)
    .attr("y",-34)
    .attr("dy", ".45em")
    .attr("class", "mybutton")
    .style("fill", function(d){return color(d);})
    .style("text-anchor", "end")
    .text(function(d){return d; })

    // this makes the text buttons interactive, capturing mouseover over text
    legend.on("mouseover", 
            function(d){ 
                var st = d;
                console.log("legend for: ", d);
                d3.select(this).transition()
                    .duration(10)
                    .style("stroke", function(d){return color(d)})
                    .style("stroke-width", 2);
                d3.select("#linechart").selectAll("path#"+d)
                    .transition()
                    .duration(10)
                    .style('stroke', function(){console.log("    over: ", this.id); return 'red'})
                    .style('stroke-width', 10);
            })

    legend.on("mouseout", 
            function(d){ 
                console.log("legend for mouse out: ", d);
                d3.select(this).transition()
                    .duration(10)
                    .style("stroke", function(d){return color(d);})
                    .style("stroke-width", 0)
                d3.select("#linechart").selectAll("path#"+d)
                    .transition()
                    .duration(10)
                    .style('stroke', function(){console.log("  mouse out d: ", this.id); return color(this.id);})
                    .style('stroke-width', 2);
            })
    
    .append('rect')
    .attr('class', 'click-capture')
    .style('visibility', 'hidden')
    .attr('x',26)
    .attr('y', -34)
    .attr('width', 18)
    .attr('height', 18);


}




var bars = function(data)
{

    max = d3.max(data, function(d) 
    {
        return d.value
    })

    //nice breakdown of d3 scales
    //http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/
    y = d3.scale.linear()
        .domain([0, max])
        .range([0, h])

    x = d3.scale.ordinal()
        .domain(d3.range(data.length/12))  /// make these bigger, not fitting full set
        .rangeBands([0, w], .2)

     // ToDo: update this so domain is extracted from the data set!
    //var colors=d3.scale.category20c()
    var colors = d3.scale.ordinal()
    .domain(["2001", "2002", "2003", "2004", "2005", "2006", "2007",
             "2008", "2009", "2010", "2011", "2012", "2013", "2014"])
    .range(colorbrewer.Blues[9]);
    // .range(["#cce5ff","#99ccff","#66b2ff","#3399ff","#0080ff","#0066cc","#003366","#004c99",
    //        "#cce5ff","#99ccff","#66b2ff","#3399ff","#0080ff","#0066cc"]);
             


    var vis = d3.select("#barchart")
    



    //a good written tutorial of d3 selections coming from protovis
    //http://www.jeromecukier.net/blog/2011/08/09/d3-adding-stuff-and-oh-understanding-selections/
    var bars = vis.selectAll("rect.bar")
        .data(data)

    //update
    bars
        .style("fill", "#0a0")
        .attr("stroke", "#050")

    //enter
    bars.enter()
        .append("svg:rect")
        .attr("class", "bar")
        // don't forget to trim whitespace from raw data, when comparing
        .filter(function(d) { return d.state.trim() === "AZ" || d.state.trim() === "CA" || d.state.trim() === "NV" })
            .attr("stroke-width", 2)
            .attr("height", function(d,i) 
            {
                return y(d.value)
            })
            .attr("width", x.rangeBand())
            .attr("transform", function(d,i) {
                return "translate(" + [x(i), h - y(d.value)] + ")"
            })
            // remember that stroke is attr, and fill is style
            .attr("stroke", function(d,i){
                console.log(d)
                console.log(d.year)
                console.log(colors(d.year))
                return colors(d.year)
            })
            .style("fill", function(d,i){
                return colors(d.year)
            })
            .attr("info", function(d, i) { return d.state + " " + d.year + " "  + d.value; })

            .on("mouseover", function(d, i) {
                d3.select(this)
                .style("stroke", "red")
                addTooltip(d3.select(this))
            })

            .on("mouseout", function(d, i) {
                d3.select(this)
                .style("stroke", function(d,i){ return colors(d.year) })
                d3.select("#tooltip").remove(); 
            })

           
        

    //exit 
    bars.exit()
        .remove()


  

}


function init()
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
        //.attr("fill", "#fff")

    svg.append("svg:g")
        .attr("id", "barchart")
        .attr("transform", "translate(50,50)")

    svg.append("svg:g")
        .attr("id", "linechart")
        .attr("transform", "translate(50,50)")




       
    
}
