require("dotenv").config();

var keys = require("./keys.js")
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var userInput = process.argv[3];

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
}

function bands() {
    axios
        .get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {
            //   console.log(response.data);
            for (var i = 0; i < 9; i++) {
                console.log("Event#" + (i + 1));
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Time: " + moment(response.data[i].datetime).format('LL'));
            }
        })
}

function movies() {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
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

function music() {
    if (userInput === null) {
        userInput = "The Sign";
    }

    spotify.search({ type: 'track', query: userInput }).then(function (response) {
        if (userInput === null) {
            userInput = "The Sign";
        }

        for (var i = 0; i < 5; i++) {
            var musicGroup = response.tracks.items[i].album.artists[0].name;
            var songName = response.tracks.items[i].name;
            var previewLink = response.tracks.items[i].preview_url;
            var album = response.tracks.items[i].album.name;
            console.log("Spotify Data-");
            console.log("Arist: " + musicGroup + "\nSong: " + songName + "\nPreview: " + previewLink + "\nAlbum: " + album + "\n");
        }

    }).catch(function (err) {
        console.log(err);
    });

}
