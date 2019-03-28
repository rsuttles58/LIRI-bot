require("dotenv").config();

var keys = require("./keys.js")

// var spotify = new spotify(keys.spotify);

var action = process.argv[2];
var userInput = process.argv[3];

console.log(action);
console.log(userInput);