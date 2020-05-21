
lastChecked = "";
countryName = "";
var settings = {
  "url": "https://api.covid19api.com/countries",
  "method": "GET",
  "timeout": 0,
};
var listOfCountries = ""
$.ajax(settings).done(function (response) {
  listOfCountries = response;
});

$("select#countriesSelect").on("change", function(e){
  $("div#numberOfConfirmed").text("");
  countryName = $("select#countriesSelect").val();
  countryNameFormatted = getCountryFormatted(countryName);
  retrieveDataForCountry(countryNameFormatted);
});


function getCountryFormatted(countryName){
  formattedName = "";
  for (var i = 0; i < listOfCountries.length; i++) {
    if(listOfCountries[i].Country == countryName)
    formattedName = listOfCountries[i].Slug;
  }
  return formattedName;
}

function animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(duration / range);
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}


function retrieveDataForCountry(slugForCountry){
  var settingsConfirmed = {
    "url": "https://api.covid19api.com/country/"+slugForCountry+"/status/confirmed",
    "method": "GET",
    "timeout": 0,
  };
$.ajax(settingsConfirmed).done(function (response) {
  lastUpdate = response.slice(-1)[0]
  lastUpdateCases = lastUpdate.Cases;
  if(lastUpdate.Province != ""){
    for (var i = 0; i < response.length; i++) {
      if(response[i].Province == "" && response[i].Cases != 0){
      lastUpdateCases = response[i].Cases
    }
    }
  }
  lastChecked = lastUpdate.Date;
  lastChecked = lastChecked.slice(0, -10);
  $("div#countryForData").text(countryName + " data, " + " (last updated: " + lastChecked + ")");

  console.log(slugForCountry + " has " + lastUpdateCases +" confirmed");
var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
  $('div#numberOfConfirmed').animateNumber({
    number: lastUpdateCases,
    numberStep: comma_separator_number_step });
});

var settingsDeaths = {
  "url": "https://api.covid19api.com/country/"+slugForCountry+"/status/deaths",
  "method": "GET",
  "timeout": 0,
};
$.ajax(settingsDeaths).done(function (response) {
lastUpdate = response.slice(-1)[0]
lastUpdateDeaths = lastUpdate.Cases;
if(lastUpdate.Province != ""){
  for (var i = 0; i < response.length; i++) {
    if(response[i].Province == "" && response[i].Cases){
    lastUpdateDeaths = response[i].Cases
  }
  }

}

var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
$('div#numberOfDeaths').animateNumber({
  number: lastUpdateDeaths,
  numberStep: comma_separator_number_step });
});

var settingsRecovered = {
  "url": "https://api.covid19api.com/country/"+slugForCountry+"/status/recovered",
  "method": "GET",
  "timeout": 0,
};
$.ajax(settingsRecovered).done(function (response) {
lastUpdate = response.slice(-2)[0]
lastUpdateRecovered = lastUpdate.Cases;
if(lastUpdate.Province != ""){
  for (var i = 0; i < response.length; i++) {
    if(response[i].Province == "" && response[i].Cases != 0){
    lastUpdateRecovered = response[i].Cases
  }
  }
}
console.log(lastUpdate)
console.log(slugForCountry + " has " + lastUpdateRecovered +" recovered");
var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
$('div#numberOfRecovered').animateNumber({
  number: lastUpdateRecovered,
  numberStep: comma_separator_number_step });
});

}
