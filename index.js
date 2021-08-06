async function chart(id) {
const Tooltip = d3
.select(`#${id}`)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

const formatTime = d3.timeFormat("%b %d, %Y");
    const mouseover = function(event,d) {
      Tooltip
        .style("opacity", 1)
    }
    const mousemove = function(event,d) {
      Tooltip
        .html("Date: " + formatTime(d.date) + " Price: $" + d.value)
        .style("left", (event.x)/2 + "px")
        .style("top", (event.y)/2 + "px")
    }
    const mouseleave = function(event,d) {
      Tooltip
        .style("opacity", 0)
    }

const margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

    const svg = d3.select(`#${id}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left+20},${margin.top-10})`);

    svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 20)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Price");

    svg
    .append("text")             
    .attr("transform",
        "translate(" + (width/2) + " ," + 
                        (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Date");

d3.csv(id === 'US' ? "https://eliash0913.github.io/datasets/US_Sales.csv" : "https://eliash0913.github.io/datasets/State_Sales.csv",
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.DATE), value : id === 'US' ? d.PRICE : d[id] }
  }).then(
  function(data) {

    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
   
  
      svg.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
          .attr("class", "myCircle")
          .attr("cx", d => x(d.date))
          .attr("cy", d => y(d.value))
          .attr("r", 2)
          .attr("stroke", "#69b3a2")
          .attr("stroke-width", 3)
          .attr("fill", "white")
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
})
}
async function customChart(id) {
  const allGroup = ["CA","TX","NY","FL","IL","PA","OH","MI","GA","NC","NJ","VA","WA","MA","IN","AZ","TN","MO","MD","WI","MN","CO","AL","SC","LA","KY","OR","OK","CT","IA","MS","AR","KS","UT","NV","NM","WV","NE","ID","HI","ME","NH","RI","MT","DE","SD","AK","ND","VT","DC","WY","STATECODE","CA","TX","NY","FL","IL","PA","OH","MI","GA","NC","NJ","VA","WA","MA","IN","AZ","TN","MO","MD","WI","MN","CO","AL","SC","LA","KY","OR","OK","CT","IA","MS","AR","KS","UT","NV","NM","WV","NE","ID","HI","ME","NH","RI","MT","DE","SD","AK","ND","VT","DC","WY","STATECODE","CA","TX","NY","FL","IL","PA","OH","MI","GA","NC","NJ","VA","WA","MA","IN","AZ","TN","MO","MD","WI","MN","CO","AL","SC","LA","KY","OR","OK","CT","IA","MS","AR","KS","UT","NV","NM","WV","NE","ID","HI","ME","NH","RI","MT","DE","SD","AK","ND","VT","DC","WY","STATECODE","CA","TX","NY","FL","IL","PA","OH","MI","GA","NC","NJ","VA","WA","MA","IN","AZ","TN","MO","MD","WI","MN","CO","AL","SC","LA","KY","OR","OK","CT","IA","MS","AR","KS","UT","NV","NM","WV","NE","ID","HI","ME","NH","RI","MT","DE","SD","AK","ND","VT","DC","WY","STATECODE","CA","TX","NY","FL","IL","PA","OH","MI","GA","NC","NJ","VA","WA","MA","IN","AZ","TN","MO","MD","WI","MN","CO","AL","SC","LA","KY","OR","OK","CT","IA","MS","AR","KS","UT","NV","NM","WV","NE","ID","HI","ME","NH","RI","MT","DE","SD","AK","ND","VT","DC","WY","STATECODE","CA","TX","NY","FL","IL","PA","OH","MI","GA","NC","NJ","VA","WA","MA","IN","AZ","TN","MO","MD","WI","MN","CO","AL","SC","LA","KY","OR","OK","CT","IA","MS","AR","KS","UT","NV","NM","WV","NE","ID","HI","ME","NH","RI","MT","DE","SD","AK"]

  d3.csv("https://eliash0913.github.io/datasets/State_Sales.csv",
    function(d){
      return { date : d3.timeParse("%Y-%m-%d")(d.DATE), value : d[id]}
    }).then(
    function(data) {
      const Tooltip = d3
      .select(`#CUSTOM`)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

      const margin = {top: 20, right: 50, bottom: 30, left: 50},
      width = 1000 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;
      d3.select(`#CUSTOM`).selectAll('svg').remove();
      const svg = d3.select(`#CUSTOM`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left+20},${margin.top-10})`);
      d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(d => d) 
      .attr("value", d => d) 

      svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left - 20)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Price");
  
      svg
      .append("text")             
      .attr("transform",
          "translate(" + (width/2) + " ," + 
                          (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");
      
    const formatTime = d3.timeFormat("%b %d, %Y");
      const mouseover = function(event,d) {
        Tooltip
          .style("opacity", 1)
      }
      const mousemove = function(event,d) {
        Tooltip
          .html("Date: " + formatTime(d.date) + " Price: $" + d.value)
          .style("left", (event.x)/2 + "px")
          .style("top", (event.y)/2 + "px")
      }
      const mouseleave = function(event,d) {
        Tooltip
          .style("opacity", 0)
      }

      const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);

      svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));
    
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
    
      svg.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
          .attr("class", "myCircle")
          .attr("cx", d => x(d.date))
          .attr("cy", d => y(d.value))
          .attr("r", 2)
          .attr("stroke", "#69b3a2")
          .attr("stroke-width", 3)
          .attr("fill", "white")
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)

            d3.select("#selectButton").on("change", function(event, d) {
              let selectedOption = d3.select(this).property("value")
              d3.select("#CUSTOMTITLE").html(selectedOption + " State Average Price of Property over time");
              customChart(selectedOption)
          })
  })

}
