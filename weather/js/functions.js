// Weather Site JS functions

//make sure script is attached correctly
console.log('My javascript is being read.')
// test variables ( currently  in production)
const temp = 31;
const speed = 5;
buildWC(speed,temp);

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