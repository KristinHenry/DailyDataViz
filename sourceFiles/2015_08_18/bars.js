
// based on http://bl.ocks.org/enjalot/1525346 and http://bl.ocks.org/Caged/6476579 (for tool tips)



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
//var colors = d3.scale.catecory20c()
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
    console.log("vis", vis)



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
    console.log("svg", svg)
    svg.append("svg:rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke", "#000")
        .attr("fill", "none")

    svg.append("svg:g")
        .attr("id", "barchart")
        .attr("transform", "translate(50,50)")
    
}
