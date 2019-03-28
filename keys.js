console.log('this is loaded');
var spotify = require("./env");
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};