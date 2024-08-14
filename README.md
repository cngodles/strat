# strat

An attempt to show stratigraphy information using HTML/CSS with JSON data. The color scheme needs a bit of work.

## Demo pages

* https://cngodles.github.io/strat/ General Demo.
* https://cngodles.github.io/strat/40n-36-30--79W-33-38-strat.html Sample from a specific locality.

## Stratigraphy Patterns from the USGS

* https://ngmdb.usgs.gov/fgdc_gds/geolsymstd/fgdc-geolsym-sec37.pdf

## Sample Data

```
var stratData = {
  seq:[
    {"name":"layer1","height":"240", "type":"619", "color":"blue"},
    {"name":"layer1","height":"24", "type":"627", "color":"gray"},
    {"name":"layer1","height":"12", "type":"619", "color":"yellow"},
    {"name":"layer1","height":"8", "type":"658", "color":"blue"}
  ]
}
```
