require("dotenv").config();

var keys = require("./keys.js")
var axios = require("axios");
var moment = require("moment");

var action = process.argv[2];
var userInput = process.argv[3];

if (action === "concert-this"){
    bands();
} else if (action === "movies-this"){
    movies();
}

// switch(action){
//     case "concert-this":
//     bands();
//     break;
//     case "movies-this":
//     movies();
//     break;
// }

function bands(){
    axios
    .get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
    .then(function(response) {
    //   console.log(response.data);
        for (var i = 0; i < 9; i++){
            console.log("Event#" + (i+1));
            console.log("Venue: " + response.data[i].venue.name);
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            console.log("Time: " + moment(response.data[i].datetime).format('LL'));
        }
    })
}

function movies(){
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // console.log(response.data);
    console.log("Title: " + response.data.Title);
    console.log("Year Released: " + response.data.Released);
    console.log("imdb Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
);
}