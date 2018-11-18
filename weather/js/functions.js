// Weather Site JS functions

//make sure script is attached correctly
console.log('My javascript is being read.')
// test variables ( currently  in production)
const temp = 31;
const speed = 5;
const direction = "NE";
const condition = "overcast";
let selectedCondition = getCondition(condition);
buildWC(speed,temp);
windDial(direction);
getSummaryImage(selectedCondition);

//build and display the "Feels Like" section
function buildWC(speed,temp){
    const feelTemp = document.getElementById('feel');

    // make the windchill calculations work ( break out in individual pieces if not working)
    let wc = Math.floor(35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16));
    console.log(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    
    // Display the windchill
    console.log(wc);
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
        switch(condition){
            case "clear":
                image.setAttribute("class", condition);
                break;
            case "rain":
                image.setAttribute("class", condition);
                break;

            case "fog":
                image.setAttribute("class", condition);
                break;
            case "cloud":
                image.setAttribute("class", condition);
                break;
            case "snow":
                image.setAttribute("class", condition);
                break;
        }
    }