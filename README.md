# LIRI-Bot

Liri-Bot is a text-based command line application that allows the user to search for movies, songs, and upcoming concerts based on command line arguments (input).  The user's input is received and fed to one of a number of APIs and then returned to the user.  

## Installation

Use the package manager [NPM](https://www.npmjs.com/) to install axios.

```bash
npm install axios
```

## How to run the program

Use any of the available commands to run the program:
- **"concert-this"** - Will search the API for BandsinTown and give you the next 10 upcoming concerts for the group you search for.
- **"movies-this"** - Will search for movies in the OMDB API.
- **"spotify-this-song"** - Will search Spotify for a song and return 5 matches.
- **"do-what-it-says"** - Is the equivalent of a random search.  It will search spotify for a song that I have saved in a file.

Example of running the application below:

```bash
node liri.js "movies-this" Ghostbusters
```

## Demo Video

Here is a link to a live demo:  [Google Drive](https://drive.google.com/open?id=16jARW34jBNajQlBxs4tBDxNSe0nr6jik)

