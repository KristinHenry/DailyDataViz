# DailyDataViz

Pushing myself to improve my d3 skills, with open data sources and daily practice.


**Data sources:**

Social Security Administration
(http://catalog.data.gov/dataset/ssa-disability-claim-data)

## Some D3.JS and JS gotcha's

**styles in html header can make debugging your javascript applied styles confusing.**
> is your color scale not showing up? Check the style classes defined in the head of your html doc.

**tracking mouse events for a group**
>problematic for line graphs, with multiple lines and crossovers (have to check out Bostock's veronoi solution for this) http://bl.ocks.org/mbostock/8033015

>one approach, working best for non-crossing groups. http://stackoverflow.com/questions/16918194/d3-js-mouseover-event-not-working-properly-on-svg-group


**Making text (usually for buttons) unselectable for better user experience **
>Why make any text unselectable?  You might be using text as a button, and the cursor can be confusing, especiall if you just want user to mouse over the text-button to highlight another area in the graph.
>This is a css thing, and complicated by the browsers doing things completely differently. Here's a css style solution: http://jsfiddle.net/Marcel/jH36t/

