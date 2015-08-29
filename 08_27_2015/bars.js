var w = 850
var h = 400


var zero_fill = function(arr){
    var i = arr.length;
    console.log(arr);
    console.log(i);
    while(i>0){
        i--;
        console.log(i);
        arr[i] = 0;
        
    }
    console.log(arr);
}

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

    // used by menu to determine if line for state is active/visible
    var isActive = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1];

   var color = d3.scale.category20c()
        .domain(stateCodes);


    //1. Set the range functions ----yeah, yeah, functions don't always look like functions in d3.
    var x = d3.scale.linear().range([0, w]);
    var y = d3.scale.linear().range([h, 0]);

    

    // 2 Define the line function. What are we plugging into x and y, on our graph. Passing our data into the ranges we set up earlier
    var valueline = d3.svg.line()
        .x(function(d){ return x(d.year)})
        .y(function(d) { return y(d.value); });

    
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
            d.active = 1;

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


        


    var hideAll = chart.append("g")
        //.append("text")

         // hideAll.append("text")
    //     .attr("x", 26)
    //     .attr("y",-34)
    //     .attr("fill", "black";})
    //     //.style("text-anchor", "middle")
    //     .text(function(d){return "Hide All"; })

    


    hideAll.append("rect")
        .attr("x", w-50)
        .attr("y", -44)
        .attr("width", 50)
        .attr("height", 40)
        .style("fill", "#ccc")
        // .attr('class', 'click-capture')
        // .style('visibility', 'hidden')


        .on("click", function(){
                        console.log("-----------------hide all"); 
                        zero_fill(isActive); // set all states to inactive

                        chart.selectAll(".legend")
                            .transition()
                            .duration(10)
                            .style("fill", function(){return "#ccc";})
                            .attr("opacity", .3)
                        d3.select("#linechart").selectAll("path")
                            .transition()
                            .duration(10)
                            .style("stroke", function(){return "#ccc"})
                            .attr("opacity", .3)

                    })

    hideAll.append("text")
        .attr("x", w-44)
        .attr("y", -14)
        .attr("fill", "black")
        .text("Hide All")


    // building the interactive legend 
    var maxrow = 26;
    var legend = chart.selectAll(".legend")  // ToDo: study dif btwn select(#classname) and selectAll(.clasname)
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i){ return "translate(" + (30*(i%maxrow)) +"," + (Math.floor(i/maxrow))*20 +")";})

    var txt = legend.append("text")
        .attr("x", 26)
        .attr("y",-34)
        .attr("dy", ".45em")
        .attr("fill", function(d){return color(d);})
        .style("text-anchor", "end")
        .text(function(d){return d; })
    

    // this makes the text buttons interactive, capturing mouseover over text
    legend.on("mouseover", 
            function(d){ 
                d3.select(this).transition()
                    .duration(10)
                    .style("font-size", "16px")
                d3.select("#linechart").selectAll("path#"+d)
                    .transition()
                    .duration(10)
                    .style('stroke-width', 14);
            })

    legend.on("mouseout", 
            function(d){ 
                d3.select(this).transition()
                    .duration(10)
                    .style("font-size", "12px")
                d3.select("#linechart").selectAll("path#"+d)
                    .transition()
                    .duration(10)
                    //.style('stroke', function(){console.log("  mouse out d: ", this.id); return color(this.id);})
                    .style('stroke-width', 2);
                })

    legend.on("click", 
            function(d){
                var activity = isActive[stateCodes.indexOf(d)];
                
                // console.log("clicked: ", d, "index of state: ", stateCodes.indexOf(d), " active: ", activity );
                // console.log(isActive);
                
                var alpha;
                var tint;
                if(activity == 1){
                    //console.log("  this state was active");
                    alpha = 0.5;
                    tint = '#CCC';
                    isActive[stateCodes.indexOf(d)] = 0; 
                } else {
                    //console.log("  this state was NOT active");
                    alpha = 1;
                    tint = color(d);
                    isActive[stateCodes.indexOf(d)] = 1; 
                }

                console.log("--------------- tint: ", tint);

                // update coloring of legend text button 
                d3.select(this)
                    .transition()
                    .duration(10)
                    .attr('fill', tint)
                    .style('stroke', tint)
                    .attr("opacity", alpha)

                // update coloring of line on chart, for this state
                d3.select("#linechart").selectAll("path#"+d)
                    .transition()
                    .duration(10)
                    .style('stroke', tint)
                    .attr("opacity", alpha)

            })
    
    // define click-area, so text is more clickable
    .append('rect')
    .attr('class', 'click-capture')
    .style('visibility', 'hidden')
    .attr('x',26)
    .attr('y', -34)
    .attr('width', 18)
    .attr('height', 18);


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
        .attr("id", "linechart")
        .attr("transform", "translate(50,50)")      
    
}
