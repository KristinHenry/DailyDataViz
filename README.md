# DailyDataViz


Aug 19, 2015
SSA Disability Claims 

data source: Social Security Administration
(http://catalog.data.gov/dataset/ssa-disability-claim-data)

## Some D3.JS gotcha's

**styles in html header can make debugging your javascript applied styles confusing.**
> is your color scale not showing up? Check the style classes defined in the head of your html doc.

**tracking mouse events for a group**
>problematic for line graphs, with multiple lines and crossovers (have to check out Bostock's veronoi solution for this) http://bl.ocks.org/mbostock/8033015
>one approach, working best for non-crossing groups. http://stackoverflow.com/questions/16918194/d3-js-mouseover-event-not-working-properly-on-svg-group

