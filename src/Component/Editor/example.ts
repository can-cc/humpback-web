import d3 from 'd3';

var width = 960,
    height = 500;

var fields = [
  {value: 24, size: 24, label: "h", update: function(date) { return date.getHours(); }},
  {value: 60, size: 60, label: "m", update: function(date) { return date.getMinutes(); }},
  {value: 60, size: 60, label: "s", update: function(date) { return date.getSeconds(); }}
];

var arc = d3.svg.arc()
    .innerRadius(width / 6.5 - 60)
    .outerRadius(width / 6.5 - 5)
    .startAngle(0)
    .endAngle(function(d) { return (d.value / d.size) * 2 * Math.PI; });

    const node = document.createElement("div");

var svg = d3.select(node).append("svg")
    .attr("width", width)
    .attr("height", height);

var field = svg.selectAll(".field")
    .data(fields)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(" + (i * 2 + 1.25) / 6.5 * width + "," + height / 2 + ")"; })
    .attr("class", "field");

field.append("path")
    .attr("class", "path path--background")
    .attr("d", arc);

var path = field.append("path")
    .attr("class", "path path--foreground");



(function update() {
  var now = new Date();

  field
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      .each(function(d: any) { d.previous = d.value, d.value = d.update(now); });

  path.transition()
      .ease("elastic")
      .duration(750)
      .attrTween("d", arcTween);

 
  setTimeout(update, 1000 - (now as any % 1000));
})();

function arcTween(b) {
  var i = d3.interpolate({value: b.previous}, b);
  return function(t) {
    return arc(i(t));
  };
}

export default node;