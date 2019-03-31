require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

switch (action) {
    case "concert-this":
        bands();
        break;
    case "movies-this":
        movies();
        break;
    case "spotify-this-song":
        music();
        break;
    case "do-what-it-says":
        doIt();
        break;
}

function bands() {
    axios
        .get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response, Error) {

            if (Error){
                console.log(userInput + " is not currently touring.");
            } else {
                for (var i = 0; i < 9; i++) {
                    console.log("Event#" + (i + 1));
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log("Time: " + moment(response.data[i].datetime).format('LL'));
                }
            }

        })
}

function movies() {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

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

function music() {
    if (userInput === null) {
        userInput = "The Sign";
    }

    spotify.search({ type: 'track', query: userInput }).then(function (response) {

        for (var i = 0; i < 5; i++) {
            var musicGroup = response.tracks.items[i].album.artists[0].name;
            var songName = response.tracks.items[i].name;
            if (response.tracks.items[i].preview_url === null){
                var previewLink = "No preview available."
            } else {
                var previewLink = response.tracks.items[i].preview_url;
            }
            var album = response.tracks.items[i].album.name;
            console.log("Spotify Data-");
            console.log("Arist: " + musicGroup + "\nSong: " + songName + "\nPreview: " + previewLink + "\nAlbum: " + album + "\n");
        }

    }).catch(function (err) {
        console.log(err);
    });

}

function doIt(){
    fs.readFile("random.txt", "utf8", function(error, text) {
        if (error) {
          return console.log(error);
        }
        var data = text.split(",");
        action = data[0];
        userInput = data[1];
        console.log(data);
        music();
      });
}
