/* Global Variables */
const url = "https://community-open-weather-map.p.rapidapi.com/weather?id=";
const APIKey = "a1e14af756msh8cbb345f9d16d18p1d942djsn81e657c479b0";

//placeholder for weather data
let weatherData = {};

//selects the button
const generate = document.getElementById('generate');
//selects the input field
const zip = document.getElementById('zip');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

generate.addEventListener('click', getWeatherData);

/*
*this function calls the openWeatherMap, then posts user data to the server
*, then get the latest user data from the server and updates the UI
*/
function getWeatherData(e){
    //get the user zip code value
    let code = zip.value

    callOpenWeatherMap(url, code, APIKey).then(function(data){
        console.log("got data from API");
        console.log(data);
        postData('/addData', data);
    }).then(async()=>{
      const temp = document.getElementById('temp');
      const date = document.getElementById('date');
      const content = document.getElementById('content');
      const userData = await getData('/getData');
      console.log('got user data from server');
      console.log(userData);
      temp.innerHTML = 'Tempreature :' + userData.temperature;
      date.innerHTML = 'Date : ' + userData.date;
      content.innerHTML = 'User Story :' + userData.userResponse;
    });
}


  /*
  *this function makes a POST request to publish the least user data
  *to the server
  *@param: - url : the base url of the API
  *        - code: zip code entered by the user and use as the id parameter in the get request
  *        - key : user credentials of the API
  * returns : weather data object
  */

const callOpenWeatherMap = async(url, code, key)=>{
    const res = await fetch(url+code, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": key,
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
    })
    try {
      const data = await res.json();
      console.log(data);
      return data;
    }  catch(error) {
      console.log("error", error);
    }
}

  /*
  *this function makes a POST request to publish the latest user data
  *to the server
  *@param: - url : the url of the end point to get the data from
  *        - datain: data object containing temperature, current date and user story
  */
const postData = async (url='', datain={})=>{
    const feelings = document.getElementById('feelings');
    let data = {
        temperature : datain.main.temp,
        date : newDate,
        userResponse : feelings.value
    }
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  /*
  *this function makes a get request to get the latest user data
  *available from the server
  *@param: - url : the url of the end point to get the data from
  * returns data object containing temperature, current date and user story
  */
  const getData = async(url)=>{
    const response = await fetch(url);
    try{
      const data = await response.json();
      console.log('got data');
      console.log(data);
      return data;
    }catch(error){
      console.log('error', error);
    }
  }
