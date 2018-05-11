var size = 600;
var color = d3.scaleOrdinal(d3.schemeCategory20c);

var pack = d3.pack()
    .size([size, size])
    .padding(size*0.005);

function makeChart(data) {

    d3.select('svg').remove();

    var chart = d3.select("#bubbles")
        .append('svg')
        .attr("width", size)
        .attr("height", size);

    var root = generateRoot(data);

    var node = chart.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
        .attr("id", function(d) { return d.data; })
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color(d.data); });

    node.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.data + ")"; })
        .append("tspan")
        .attr("x", 0)
        .attr("y", function(d) { return d.r/8; })
        .attr("font-size", function(d) {
            return d.r*3/d.data.length;
        })
        .text(function(d) { return d.data; });
}

function generateRoot (data) {
    var keys = [];

    var counts = data.reduce(function(obj, word) {
        if(!obj[word]) {
            obj[word] = 0;
            keys.push(word);
        }
        obj[word]++;
        return obj;
    }, {});

    keys.sort(function(a,b) {
        return counts[b] - counts[a];
    });

    return d3.hierarchy({children: keys})
        .sum(function(d) { return counts[d]; });
}