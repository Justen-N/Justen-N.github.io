// Weather Site JS functions

//make sure script is attached correctly
console.log('My javascript is being read.')
// test variables ( currently  in production)
const temp = 31;
const speed = 5;
const direction = "NE";
buildWC(speed,temp);
windDial(direction);

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
    
   }