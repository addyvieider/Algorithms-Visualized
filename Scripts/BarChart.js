function drawChart(data, curr) {

    var max = Math.max.apply(null, data);
    var maxWidth = document.getElementById("chart").offsetWidth;
    var onePercent = maxWidth / max;

    d3.select("#chart")
        .selectAll("div")
        .remove();

    d3.select("#chart")
        .selectAll("div")
        .data(data)
        .enter()
        .append("div")
        .style("width", function (d) {return (d * onePercent) + "px";})
        .style("margin-bottom", "5px")
        .style("background-color", "dodgerblue")
        .text(function (d) { return d; })
        .filter(function (d, i) { return i === curr })
        .style("background-color", "skyblue");

}