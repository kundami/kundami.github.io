var svgWidth = 890;
var svgHeight = 550;
var dataset ;
var margin = { top: 20, right: 60, bottom: 60, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

console.log("Line 17") 
var chart = svg.append("g");

// Append a div to the body to create tooltips, assign it a class
d3.select(".chart")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


 d3.csv("state_imm_stat.csv", function(err, statedata) {
  if (err) {
           console.log("error hit") 
           throw err;
         }
  dataset  = statedata;
  console.log(dataset);
  statedata.forEach(function(data) {
    data.ImmWorkNonWorkRatio = +data.ImmWorkNonWorkRatio;
    data.BaseWorkNonWorkRatio = +data.BaseWorkNonWorkRatio;
    data.index = +data.index;
    data.USStates = +data.USStates    
  });


console.log("Line 40")  
  // Create scale functions
  var yLinearScale1 = d3.scaleLinear()
  .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
  .range([height, 0]);

  var xLinearScale = d3.scaleLinear()
  .range([0, width]);

 

  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale) ;
  var leftAxis = d3.axisLeft( d3.scaleLinear().range([height, 0]) ) ;
  var RightAxis = d3.axisRight( d3.scaleLinear().range([height, 0]) ) ;
  
  console.log("line 57")
 // var RightAxis = d3.svg.axis().scale(d3.scaleLinear().range([height, 0]) )
  //  .orient("right").ticks(10);


  // Scale the domain
  
  xLinearScale.domain([(d3.min(statedata, function(data) {
    return +data.index-0.3;
  })), (d3.max(statedata, function(data){
      return +data.index+1.0}))]);  

 var y1 = yLinearScale1.domain([(d3.min(statedata, function(data) {
    return +data.ImmWorkNonWorkRatio-0.2;
  })), (d3.max(statedata, function(data){
      return +data.ImmWorkNonWorkRatio+0.2}))]);

 var y2 = yLinearScale2.domain([(d3.min(statedata, function(data) {
    return +data.BaseWorkNonWorkRatio-0.2;
  })), (d3.max(statedata, function(data){
      return +data.BaseWorkNonWorkRatio+0.2}))]);

console.log("Line 85")  ;
      

var toolTipImm = d3.tip()
      .attr("class", "tooltip")
      .offset([100, -100])
      .html(function(data) {
      var States = data.States;
      console.log(States)  ;
      var ImmWorkNonWorkRatio = +data.ImmWorkNonWorkRatio;
      //var BaseWorkNonWorkRatio = +data.BaseWorkNonWorkRatio;
      return ("<b>"+(States)+"</b>" + "<br> Immigrant Wo/NonWo ratio: " + ImmWorkNonWorkRatio + "<br> ");
      });

chart.call(toolTipImm) ;
console.log("Line 99")  ;

var toolTipBase = d3.tip()
      .attr("class", "tooltip")
      .offset([100, -100])
      .html(function(data) {
      var States = data.States;
      console.log(States)  ;
      var BaseWorkNonWorkRatio = +data.BaseWorkNonWorkRatio;
      //var BaseWorkNonWorkRatio = +data.BaseWorkNonWorkRatio;
      return ("<b>"+(States)+"</b>" + "<br> Local Wo/NonWo ratio: " + BaseWorkNonWorkRatio + "<br> ");
      });

chart.call(toolTipBase) ;

  
var circlesI = chart.selectAll("circle")
.data(dataset)
.enter()
.append("circle");

circlesI.attr("cx", function(data, index) {
        return xLinearScale(data.index);
      })
.attr("cy", function(data, index) {
        return y1(data.ImmWorkNonWorkRatio);
      })
      .attr("r", "6")
      .attr("fill", "green")
      .style("opacity", .75)
      .attr("stroke", "black")
      .on("click", function(data) {
        toolTipImm.show(data);
      })
      // onmouseout event
      .on("mouseout", function(data, index) {
         toolTipImm.hide(data);
      });

console.log("New circles 1")


var rectB = chart.selectAll("rect")
.data(dataset)
.enter()
.append("rect");

rectB.attr("x", function(data, index) {
        return xLinearScale(data.index);
      })
       .attr("y", function(data, index) {
        console.log("line 133");
        return y1(data.BaseWorkNonWorkRatio);
       })
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "blue")
      .style("opacity", .75)
      .attr("stroke", "black")
      .on("click", function(data) {
        toolTipBase.show(data);
      })
      // onmouseout event
      .on("mouseout", function(data, index) {
         toolTipBase.hide(data);
      });

console.log("New circles 2")


 // chart.data(dataset)
 //      .enter().append("circle")
 //      .attr("cx", function(data, index) {
 //        return xLinearScale(data.index);
 //      })
 //      .attr("cy", function(data, index) {
 //        return y2(data.BaseWorkNonWorkRatio);
 //      })
 //      .attr("r", "6")
 //      .attr("fill", "red")
 //      .style("opacity", .75)
 //      .attr("stroke", "black")
 //      .on("click", function(data) {
 //     //   toolTip.show(data);
 //      })
 //      // onmouseout event
 //      .on("mouseout", function(data, index) {
 //       // toolTip.hide(data);
 //      });

 console.log("Line 146")

chart.selectAll("g")
    .data(statedata)
    .enter()
    .append("text")
    .attr("dx", function(data, index){
      return xLinearScale(data.index)-11.5
    })
    .attr("dy", function(data){
      return y1(data.ImmWorkNonWorkRatio)+4
    })
    .text(function (data, index){
      //return data.States;
    });   

console.log("Line 162")

 console.log("Line 177")
chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
 
console.log("Line 185")


chart.append("g")
   .style("fill", "green")   
    .call(leftAxis);

chart.append("g")       
      .attr("class", "y axis")  
       .attr("transform", "translate(" + width + " ,0)")   
      .style("fill", "blue")   
      .call(RightAxis);



chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 1.2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .style("fill", "green")  
      .text("Ratio of ImmigrantS working to NonWorking Population");
 console.log("Line 198")

chart.append("text")
      .attr("transform",  "rotate(-90)")   
      .attr("y", 0 - margin.right +width+ 85)
      .attr("x", 0 - (height / 1.2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Ratio of Local working to NonWorking Population");
 console.log("Line 248")


// Append x-axis labels
chart.append("text")
    .attr("transform", "translate(" + (width / 3) + " ," + (height + margin.top + 30) + ")")
    .attr("class", "axisText")
    .text("States by Id (Refer ToolTip for States)");

chart.append("text")
    .attr("transform", "translate(" + (width*0.5) + " ," + (height - 405) + ")")
    .attr("class", "axisText")
    .text("*Working Population Age > 18 and Age < 64");

chart.append("text")
    .attr("transform", "translate(" + (width*0.5) + " ," + (height - 435) + ")")
    .attr("class", "axisText")
    .text("*Non Working Population Age < 18 and Age > 64");

} );

 console.log("Line 207")


