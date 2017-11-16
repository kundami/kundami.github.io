// Get references to the tbody element, input field and button
//var $tbody = document.querySelector("tbody");
// var dataSet = [
//   {
//     datetime: "1/1/2010",
//     city: "benton",
//     state: "ar",
//     country: "us",
//     shape: "circle",
//     durationMinutes: "5 mins.",
//     comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."
//   }


$(document).ready(function() {
  dataSet1 = renderData(dataSet) ;
  console.log(dataSet1[0][0]) ;
  console.log(dataSet1[0][1]) ;
  console.log(dataSet1[0][2]) ;
  console.log(dataSet1[0][3]) ;
 
  console.log("creating DataTable")
    $('#example').DataTable( {
        data: dataSet1,
        columns: [
            { title: "datetime" },
            { title: "city" },
            { title: "state" },
            { title: "country" },
            { title: "shape" },
            { title: "durationMinutes" } ,           
            { title: "comments" }
        ]
    } );
} );
// Add an event listener to the searchButton, call handleSearchButtonClick when clicked


function renderData(dataSet) {
  //Convert an array of dict to an array of arrays
  console.log("Start Rendering")
  dataSet_new = [];
  for (i=0; i < dataSet.length; i++)
  {
    array = [] ;
//    datetime: "1/1/2010",
// //     city: "benton",
// //     state: "ar",
// //     country: "us",
// //     shape: "circle",
// //     durationMinutes: "5 mins.",
// //     comments: "4 bright greshapeles high in the sky going in circles then one bright green    light at my front doorduration 
    array.push(dataSet[i]['datetime']) ;
    array.push(dataSet[i]['city']) ;
    array.push(dataSet[i]['state']) ;
    array.push(dataSet[i]['country']) ;
    array.push(dataSet[i]['shape']) ;       
    array.push(dataSet[i]['durationMinutes'] );
    array.push(dataSet[i]['comments'] );
    dataSet_new.push(array)   
  }
 return dataSet_new
}