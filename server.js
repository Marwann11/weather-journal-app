// Setup empty JS object to act as endpoint for all routes
const weatherData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;

const server = app.listen(port, listener);

// server callback
function listener() {
  console.log(`server is running at localhost:${port}`);
}

// Initialize all route with a callback function
app.get('/all', getProjectData)

// Callback function to complete GET '/all'
function getProjectData(req,res) {
  res.send(weatherData);
};

// Post Route
app.post('/post', (req,res) => {
  const newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  };

  weatherData.splice(0,0,newEntry); // add every new entry as the zero index in our object
})