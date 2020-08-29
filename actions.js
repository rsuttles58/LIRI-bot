const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const keys = require("./keys.js");

const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

function bands(userInput) {
  if (!userInput) {
    userInput = "Johnny Cash";
  }
  axios
    .get(
      `https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`
    )
    .then((response, Error) => {
      if (Error) {
        console.log(`${userInput} is not currently touring.`);
      } else {
        for (let i = 0; i < 9; i++) {
          const data = response.data[i];
          console.log("Event#" + (i + 1));

          !data.venue.name ? console.log('No venue announced') : console.log(`Venue: ${data.venue.name}`);
          !data.venue.city && !data.venue.country ? 
          `Location Not Provided` : console.log(`Location: ${data.venue.city}, ${data.venue.country}`);

          console.log(`Time:  ${moment(data.datetime).format("LL")}`);
        }
      }
    });
}

function movies(userInput) {
  if (!userInput) {
    userInput = "Ghostbusters";
  }
  axios
    .get(`http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`)
    .then(function (response) {
      const data = response.data
      console.log(`Title:  ${data.Title}`);
      console.log(`Year Released: ${data.Released}`);
      console.log(`imdb Rating: ${data.imdbRating}`);
      console.log(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`);
      console.log(`Country: ${data.Country}`);
      console.log(`Language: ${data.Language}`);
      console.log(`Plot: ${data.Plot}`);
      console.log(`Actors: ${data.Actors}`);
    });
}

function music(userInput) {
  if (!userInput) {
    userInput = "The Sign";
  }

  spotify
    .search({ type: "track", query: userInput })
    .then( response => {
      for (let i = 0; i < 5; i++) {
        const data = response.tracks.items[i]
        let musicGroup = data.album.artists[0].name;
        let songName = data.name;
        let previewLink;
        if (data.preview_url === null) {
          previewLink = "No preview available.";
        } else {
          previewLink = data.preview_url;
        }
        let album = data.album.name;
        console.log("Spotify Data-");
        console.log(
          `Arist: ${musicGroup} \nSong: ${songName} \nPreview: ${previewLink} \nAlbum: ${album} + \n`
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function doIt() {
  fs.readFile("random.txt", "utf8", (error, text) =>{
    if (error) {
      return console.log(error);
    }
    let data = text.split(",");
    action = data[0];
    userInput = data[1];
    music(userInput);
  });
}

exports.bands = bands;
exports.movies = movies;
exports.music = music;
exports.doIt = doIt;
