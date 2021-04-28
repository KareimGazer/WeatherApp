// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log(`server running on localhost: ${port}`);
}

let index = 0;

//get route
app.get('/getData', function(request, response){
    //check if needs to be converted to string first
    console.log('data to be send to client');
    console.log(projectData[index-1]);
    response.send(projectData[index-1]);
});

//post route
app.post('/addData', function(request, response){
    let newEntry = {
        temperature:request.body.temperature,
        date:request.body.date,
        userResponse: request.body.userResponse
    }
    projectData[index] = newEntry;
    index+=1;
    console.log(projectData);
});



