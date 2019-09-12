// create varible to keep data from data from data.js
var tableData = data;

// select from html
var inputdate = d3.select("#datetime");
var tbody = d3.select("tbody");
var button = d3.select('#filter-btn');
var list = d3.select("li");

var labelForCountrySelection = list.append("label");
var countryselect = list.append("select");
var labelForStateSelection = list.append("label");
var stateselect = list.append("select");

labelForCountrySelection.text("Select a country");
labelForStateSelection.text("Select a state");

// Add an empty option under country section
countryselect.append("option")

// create an array to keep all unique country and add them to dropdown menu 
var allcountry = tableData.map(record => record.country);
var uniquecountry = [...new Set(allcountry)]; 
uniquecountry.forEach(country => countryselect.append("option").text(country));


// create an object to keep pair of country and state
var countryAndstate = {};

uniquecountry.forEach(function(country){
  var tableByCountry = tableData.filter(record => record.country === country);
  var stateByCountry = tableByCountry.map(record => record.state);
  var uniquestate = [...new Set(stateByCountry)]; 
  countryAndstate[country] = uniquestate;
});

//console.log(countryAndstate);

// create variables to keep the info input or selected by user
var date = "";
var country= "";
var state = "";

// save the date input by user to variable "date"
inputdate.on("change", function() {
    date = d3.event.target.value;
    //console.log(date);
    
  });

// save the country selected by user to variable "country"
countryselect.on("change", function() {
    country = d3.event.target.value;
    //console.log(country);
    if (!(country) ) {
      state = "";
    }

    // based on the country chosen create the list of state to choose from
    stateselect.html("");
    stateselect.append("option")
    countryAndstate[country].forEach(state => stateselect.append("option").text(state));
  });

 // save the state selected by user to variable "state" 
stateselect.on("change", function() {
    state = d3.event.target.value;
    //console.log(state);
  });

// design a function to filter the tableData based on "date", "country", and "state"  

function handleClick() {
    var filterTableData=tableData;
    console.log(date);
    console.log(country);
    console.log(state);

    if (date){
      filterTableData = filterTableData.filter(record => record.datetime === date);     
    }
    //console.log(filterTableData);

    if (country){
      filterTableData = filterTableData.filter(record => record.country === country);      
    }
    //console.log(filterTableData);

    if (state){
      filterTableData = filterTableData.filter(record => record.state === state);      
    }
    //console.log(filterTableData);

    tbody.html("");
    if (filterTableData.length != 0){
      filterTableData.forEach(function(record){
        //console.log(record);
        var row = tbody.append("tr");
        Object.values(record).forEach(function(value){
            row.append("td").text(value);
        });
      });
    }

    else {
      var row = tbody.append("tr") ;
      var heading = row.append("th");
      heading.text("No result is found.");
      heading.attr("colspan", "7");

    }

    d3.selectAll("td").style("text-align", "center");
};

button.on("click", handleClick);