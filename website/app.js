// base URL for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=11c7cee1165ceb404637d6f6777b30a5&units=imperial'; // &units=imperial is for Fahrenheit - &units=metric is for Celsius

// real-time date function
let t = new Date;
let newDate = `${t.getMonth() + 1}/${t.getDate()}/${t.getFullYear()}`; // getMonth() index is from 0 to 11 we must add 1 to get current month

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getPostUpdate)

/* Function called by event listener */
function getPostUpdate(evt) {
  let zipCode = document.getElementById('zip').value; // the user entered zipCode
  let feelings = document.getElementById('feelings').value; // user Input

  getData(baseUrl,zipCode,apiKey) // get data with fetch from the webApi

  // post data to the weather object in server
  .then(function(data) {
    console.log(data)
    // post request function that add returned data to our project endpoint in serverSide
    postData('/weather', {temperature: data.main.temp, date: newDate, userResponse:feelings});
  })

  // update UI using weather object
  .then(function() {
    useData();
  })

  
}

/*Function to GET Web API Data*/
const getData = async (baseUrl,zipCode,key) => {
  const request = await fetch(baseUrl+zipCode+key) // the format to get apiData

  // try in case of success(resolve), catch in case of failure(reject)
  try {
    const data = await request.json();
    return data; // return data so we can use in our post request
  } catch(error) {
    console.log('error',error); // appropriately handle the error
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match headers Content-Type 
  })

  try {
    const newData = await response.json() 
    return newData;
  } catch(error) {
    console.log('error',error);
  }
}

/* Function to GET Project Data*/
const useData = async () => {
  const response = await fetch('/all') // serverSide route which is set to respond with weatherData object

  try {
    const allData = await response.json();
    // converting to fahrenheit 
    /*const f = ((allData[0].temperature - 273.15)*9/5+32).toFixed(2);*/
    // update UI
    document.getElementById('date').innerHTML = `Date: ${allData.date}`; // date value from post req.body object
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature} F&deg`; // temperature value
    document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`; // userInput value
  } catch(error) {
    console.log('error', error);
  }
}