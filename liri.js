require("dotenv").config();
const actionFuncs = require("./actions")

const action = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

switch (action) {
  case "concerts":
    actionFuncs.bands(userInput);
    break;
  case "movies":
    actionFuncs.movies(userInput);
    break;
  case "spotify":
    actionFuncs.music(userInput);
    break;
  case "random":
    actionFuncs.doIt();
    break;
}


