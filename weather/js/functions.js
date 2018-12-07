// Weather Site JS functions

//make sure script is attached correctly
console.log('My javascript is being read.')
// test variables 
//const temp = 31;
//const speed = 5;
//const direction = "NE";
//const condition = "overcast";
//let selectedCondition = getCondition(condition);
//buildWC(speed,temp);
//windDial(direction);
//getSummaryImage(selectedCondition);

//build and display the "Feels Like" section
function buildWC(speed,temp){
    const feelTemp = document.getElementById('feel');

    // make the windchill calculations work ( break out in individual pieces if not working)
    let wc = Math.floor(35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16));
    console.log(wc+ "calculated windchill");

    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    
    // Display the windchill
    console.log(wc+ "rounded windchill");
    wc = 'Feels like ' + wc + '&deg;F';
    feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction){
    // Get the container
    const dial = document.getElementById("pointer");
    console.log(direction);
    // Determine the dial class
    switch (direction){
     case "North":
     case "N":
      dial.setAttribute("class", "n"); //"n" is the CSS rule selector
      break;
     case "NE":
     case "NNE":
     case "ENE":
      dial.setAttribute("class", "ne");
      break;
     case "NW":
     case "NNW":
     case "WNW":
      dial.setAttribute("class", "nw");
      break;
     case "South":
     case "S":
      dial.setAttribute("class", "s");
      break;
     case "SE":
     case "SSE":
     case "ESE":
      dial.setAttribute("class", "se");
      break;
     case "SW":
     case "SSW":
     case "WSW":
      dial.setAttribute("class", "sw");
      break;
     case "East":
     case "E":
      dial.setAttribute("class", "e");
      break;
     case "West":
     case "W":
      dial.setAttribute("class", "w");
      break;
    }
   }

   // finds the current condition for background display

   function getCondition(currentCondition){
        //debug
        console.log("inside getCondition");
        // lowercase sanitization
        cond = currentCondition.toUpperCase();
        console.log(cond);
            //takes currentCondition variable and attempts to find a matching weather condition
            if (cond.includes("WET") ||
            cond.includes("RAIN") ||
            cond.includes("STORM") ||
            cond.includes("THUNDER")){
                console.log(cond + " rain");
                return "rain";}

            else if(cond.includes("SNOW")||
            cond.includes("SLEET")||
            cond.includes("FLURRIES")||
            cond.includes("BLIZZARD")){
                console.log(cond =" snow");
                return "snow";
            }
            else if( 
            cond.includes("FOG")||
            cond.includes("HAZE")||
            cond.includes("MIST")||
            cond.includes("MURK")){
                console.log(cond + " fog.");
                return "fog";
            }
            else if(
            cond.includes("CLOUD")||
            cond.includes("OVERCAST")||
            cond.includes("SLIGHTLY CLOUDY")||
            cond.includes("PARTLY CLOUDY")){
                console.log(cond + "cloud");
                return "cloud";
            }
            else{
                console.log("default case")
                return "clear";
            }
        }
    function getSummaryImage(condition){
        console.log(condition + "in getSummaryImage")
        const image = document.getElementById("flex-container");
        const small_image = document.getElementById("weather_img");
        switch(condition){
            case "clear":
                image.setAttribute("class", condition);
                small_image.setAttribute("class", condition);
                break;
            case "rain":
                image.setAttribute("class", condition);
                small_image.setAttribute("class", condition);
                break;

            case "fog":
                image.setAttribute("class", condition);
                small_image.setAttribute("class", condition);
                break;
            case "cloud":
                image.setAttribute("class", condition);
                small_image.setAttribute("class", condition);
                break;
            case "snow":
                image.setAttribute("class", condition);
                small_image.setAttribute("class", condition);
                break;
        }
    }

    function getCode(LOCALE) {
        const API_KEY = 'MQv9yHvhKRzuqis8pW460KHVjOjmE6El';
        const URL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey='+API_KEY+'&q='+LOCALE;
        fetch(URL)
         .then(response => response.json())
         .then(function (data) {
          console.log('Json object from getCode function:');
          console.log(data);
          const locData = {}; // Create an empty object
          locData['key'] = data.Key; // Add the value to the object
          locData['name'] = data.LocalizedName;
          locData['postal'] = data.PrimaryPostalCode;
          locData['state'] = data.AdministrativeArea.LocalizedName;
          locData['stateAbbr'] = data.AdministrativeArea.ID;
          locData['geoposition'] = LOCALE;
          locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
          getWeather(locData);
          })
         .catch(error => console.log('There was a getCode error: ', error))
      } // end getCode function
    // url 
    //"http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=MQv9yHvhKRzuqis8pW460KHVjOjmE6El&q=43.816667%2C-111.783333"
    // Get Current Weather data from API
    function getWeather(locData) {
        const API_KEY = 'MQv9yHvhKRzuqis8pW460KHVjOjmE6El';
        const CITY_CODE = locData['key']; // We're getting data out of the object
        const URL = "https://dataservice.accuweather.com/currentconditions/v1/"+CITY_CODE+"?apikey="+API_KEY+"&details=true";
        fetch(URL)
         .then(response => response.json())
         .then(function (data) {
          console.log('Json object from getWeather function:');
          console.log(data); // Let's see what we got back
          // Start collecting data and storing it
          locData['currentTemp'] = data[0].Temperature.Imperial.Value;
          locData['summary'] = data[0].WeatherText;
          locData['windSpeed'] = data[0].Wind.Speed.Imperial.Value;
          locData['windUnit'] = data[0].Wind.Speed.Imperial.Unit;
          locData['windDirection'] = data[0].Wind.Direction.Localized;
          locData['windGust'] = data[0].WindGust.Speed.Imperial.Value;
          locData['pastLow'] = data[0].TemperatureSummary.Past12HourRange.Minimum.Imperial.Value;
          locData['pastHigh'] = data[0].TemperatureSummary.Past12HourRange.Maximum.Imperial.Value;
          getHourly(locData); // Send data to getHourly function
          })
         .catch(error => console.log('There was an error: ', error))
      } // end getWeather function
    
      // Get next 12 hours of forecast data from API
    function getHourly(locData) {
        const API_KEY = 'MQv9yHvhKRzuqis8pW460KHVjOjmE6El';
        const CITY_CODE = locData['key'];
        const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/"+CITY_CODE+"?apikey="+API_KEY;
        fetch(URL)
          .then(response => response.json())
          .then(function (data) {
          console.log('Json object from getHourly function:');
          console.log(data); // See what we got back
          // Get the first hour in the returned data
          let date_obj = new Date(data[0].DateTime);
          let nextHour = date_obj.getHours(); // returns 0 to 23
          // Store into the object
          locData["nextHour"] = nextHour;
          // Counter for the forecast hourly temps
          var i = 1;
          // Get the temps for the next 12 hours
          data.forEach(function (element) {
            let temp = element.Temperature.Value;
            let hour = 'hourTemp' + i;
            locData[hour] = temp; // Store hour and temp to object
            // New hiTemp variable, assign value from previous 12 hours
            let hiTemp = locData.pastHigh;
            // New lowTemp variable, assign value from previous 12 hours
            let lowTemp = locData.pastLow;
            // Check current forecast temp to see if it is 
            // higher or lower than previous hi or low
            if(temp > hiTemp){
              hiTemp = temp;
            } else if (temp < lowTemp){
              lowTemp = temp;
            }
            // Replace stored low hi and low temps if they changed
            if(hiTemp != locData.pastHigh){
              locData["pastHigh"] = hiTemp; // When done, this is today's high temp
            }
            if(lowTemp != locData.pastLow){
              locData["pastLow"] = lowTemp; // When done, this is today's low temp
            }
            i++; // Increase the counter by 1
          }); // ends the foreach method
          console.log('Finished locData object and data:');
          console.log(locData);
          buildPage(locData); // Send data to buildPage function
          })
          .catch(error => console.log('There was an error: ', error))
      } // end getHourly function

      function buildPage(locData){
            //Task 1 - feed data to Windchill, Dial and Image Functions
            
            //windchill data and function call
            let windSpeed = locData.windSpeed;
            console.log(windSpeed + " windspeed for buildpage");
            let currentTemp = locData.currentTemp;
            console.log(currentTemp + " temp for buildpage");
            buildWC(windSpeed,currentTemp);

            //Dial call
            windDial(locData.windDirection);
            
            // Summary Image call
            let condition = getCondition(locData.summary);
            getSummaryImage(condition);
            //Task 2 - Populate Location information   
            
            //set location specific information
            document.getElementById("zip").innerHTML = locData.postal+ " |";
            document.getElementById("elevation").innerHTML = locData.elevation +" ft. |";
            document.getElementById("commonName").innerHTML = locData.name + ", " + locData.stateAbbr;
            
            // round coordinates to small numbers and add a space
            let coord = locData.geoposition.split(",");
            let coordLat = Math.round(coord[0]*100)/100;
            let coordLong = Math.round(coord[1]*100)/100;
            console.log(coordLat);
            document.getElementById("coords").innerHTML = coordLat + ", "+ coordLong;
            //Task 3 - Populate Weather Information
            
            // modify temps
            document.getElementById("current-temp").innerHTML = locData.currentTemp +"&deg;F";
            document.getElementById("high-temp").innerHTML = locData.pastHigh + "&deg;F";
            document.getElementById("low-temp").innerHTML = locData.pastLow +"&deg;F";

            // modify wind info
            document.getElementById("windspeed").innerHTML = locData.windSpeed + " mph";
            document.getElementById("direction").innerHTML = "<b>Direction: </b>"+locData.windDirection;
            document.getElementById("gust").innerHTML = "<b>Gusts: </b>" + locData.windGust;

            // set weather condition
            document.getElementById("condition").innerHTML = locData.summary;
            
            // set title element
            document.title = locData.name +", "+locData.stateAbbr + " | Weather Site";
            // Hide status and show main
            const unhide = document.getElementById("main");
            unhide.setAttribute('class','show');
            const shown = document.getElementById("status");
            shown.setAttribute('class','hide')
      }
// Get location info, based on city key, from API
function getLocationByKey(cityKey) {
    const API_KEY = 'MQv9yHvhKRzuqis8pW460KHVjOjmE6El';
    const URL = 'https://dataservice.accuweather.com/locations/v1/'+cityKey+'?apikey='+API_KEY;
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getLocationByKey function:');
      console.log(data);
      const locData = {}; // Create an empty object
      locData['key'] = data.Key; // Add the value to the object
      locData['name'] = data.LocalizedName;
      locData['postal'] = data.PrimaryPostalCode;
      locData['state'] = data.AdministrativeArea.LocalizedName;
      locData['stateAbbr'] = data.AdministrativeArea.ID;
      let lat = data.GeoPosition.Latitude;
      let long = data.GeoPosition.Longitude;
      const LOCALE = lat+', '+long;
      locData['geoposition'] = LOCALE;
      locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
      getWeather(locData);
      })
     .catch(error => console.log('There was a getLocationByKey error: ', error))
    } // end getLocationByKey function