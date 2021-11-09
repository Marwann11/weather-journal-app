// base URL for OpenWeatherMap API
const baseUrl = 'api.openweathermap.org/data/2.5/weather?zip='
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=11c7cee1165ceb404637d6f6777b30a5';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getPostUpdate)

/* Function called by event listener */
function getPostUpdate(evt) {
  let zipCode = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;

  getData(baseUrl,zipCode,apiKey)
  .then(function(data) {
    console.log(data); // for debugging

  })
}

/* Function to GET Web API Data*/
const getData = async (baseUrl,zipCode,key) => {
  const request = await fetch(`${baseUrl}${zipCode}${key}`); // the format to get apiData

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
    console.log('error',error); // appropriately handle the error
  }
}

/* Function to GET Project Data and update UI */
