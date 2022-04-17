// Generate the US Map
$.getJSON("https://coronavirus-us-api.p.rapidapi.com/api/state/all?source=nyt&rapidapi-key=73403c6c67msha0632541172766bp194ccejsn820ec377a86a", function (data) {
    var fillColor; // to hold fill color for hover
    // console.log(data);
    let covidData = data.locations;
    jsonData = []
    // {fips: 1011, state: "AL", area_name: "Bullock County", bachelorsOrHigher: 14.1}
    let educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
    let educationData
    let tooltip = d3.select('#tooltip')

    // The svg
    var svg = d3.select("#us_map_svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    svg.classed("#us-map-container", true)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1000 600")

    // svg.call(responsivefy);
    // Map and projection
    var projection = d3.geoMercator()
        .center([0, 20])                // GPS of location to zoom on
        .scale(99)                       // This is like the zoom
        .translate([width / 2, height / 2])

    d3.queue()
        .defer(d3.json, "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json")  // World shape
        .defer(d3.json, educationURL)
        .await(ready);

    function ready(error, data, eduData) {
        // console.log(data)
        // // console.log(eduData)
        // console.log(covidData)

        dataGeo = topojson.feature(data, data.objects.states).features;

        // Draw the world map
        svg.append("g")
            .selectAll("path")
            .data(dataGeo)
            .enter()
            .append("path")
            .style("stroke", "white")
            .attr('d', d3.geoPath()) // method that converts geometry into string given to svg 
            .attr('class', 'county')
            // Add a fill color based on the number of covid cases
            .attr('fill', (dataGeoItem) => {
                let id = dataGeoItem.id // get state id

                let state = covidData.find((item) => { // like a for loop, searches each item to see if it matches id
                    return item['fips'] === id;
                })

                let confirmed = state.latest.confirmed;
                // return color based on number of cases
                if (confirmed <= 1000) {
                    return '#fadbd8'
                } else if (confirmed <= 10000) {
                    return '#f1948a'
                } else if (confirmed <= 100000) {
                    return '#e74c3c'
                } else {
                    return '#b03a2e'
                }
            })
            .attr('data-fips', (dataGeoItem) => {
                return dataGeoItem.id
            })
            .attr('data-cases', (dataGeoItem) => { // set attribute to number of cases per state
                let id = dataGeoItem.id // get state id
                let state = covidData.find((item) => {
                    return item['fips'] === id;
                })
                let cases = state.latest.confirmed;
                return cases;
            })
            .attr('data-state', (dataGeoItem) => { // set attribute to the state
                let id = dataGeoItem.id // get state id
                let state = covidData.find((item) => {
                    return item['fips'] === id;
                })
                let foundState = state['state'];
                return foundState;
            })
            .on('mouseover', (dataGeoItem) => {
                fillColor = d3.event.target.attributes[2].nodeValue;
                d3.event.target.attributes[2].nodeValue = '#f4d03f'
                tooltip.transition()
                    .style('visibility', 'visible')
                let id = dataGeoItem.id; // get county id
                let state = covidData.find((item) => {
                    return item['fips'] === id;
                })
                tooltip.text(state['state'] + ': ' + formatNumber(state.latest.confirmed) + " cases");
            })
            .on('mouseout', (countyDataItem) => {
                d3.event.target.attributes[2].nodeValue = fillColor;
                tooltip.transition()
                    .style('visibility', 'hidden');
            })

        svg.append("rect").attr("x", 825).attr("y", 400).attr("width", 40).attr("height", 40).style("fill", "#fadbd8")
        svg.append("rect").attr("x", 825).attr("y", 440).attr("width", 40).attr("height", 40).style("fill", "#f1948a")
        svg.append("rect").attr("x", 825).attr("y", 480).attr("width", 40).attr("height", 40).style("fill", "#e74c3c")
        svg.append("rect").attr("x", 825).attr("y", 520).attr("width", 40).attr("height", 40).style("fill", "#b03a2e")
        svg.append("text").attr("x", 875).attr("y", 420).text("<= 1,000 cases").style("font-size", "12px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 875).attr("y", 460).text("<= 10,000 cases").style("font-size", "12px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 875).attr("y", 500).text("<= 100,000 cases").style("font-size", "12px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 875).attr("y", 540).text("<= 1,000,000 cases").style("font-size", "12px").attr("alignment-baseline", "middle")
    }

});

function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;
    console.log(container);
    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
