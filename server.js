// Setup empty JS object to act as endpoint for all routes
weatherData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser'); // is deprecated, it is now included as a built-in express

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({extended: false})); // to parse url-encoded bodies
app.use(express.json()); // to parse JSON bodies

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
app.post('/weather', (req,res) => {
  weatherData = req.body; // assign our posted data JSON as our app endPoint
  res.send(weatherData); // sends it back to clientSide as returned promise in postData function
})