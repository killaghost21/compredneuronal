const express = require("express");
const app = express();
const axios = require("axios");
require('dotenv').config();

const port = 5001;
var bodyParser = require("body-parser");
const manageDB = require("./database");

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//allow cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

//instance axios
const instance = axios.create({
  timeout: 30000,
  headers: {
    "x-rapidapi-host": "free-nba.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
  },
});

const gamesByTeams = (games, team1, team2) => {
  let res = [];
  games.map((game) => {
    let home_team = game.home_team.full_name;
    let visitor_team = game.visitor_team.full_name;
    if (
      (home_team === team1 && visitor_team == team2) ||
      (home_team === team2 && visitor_team == team1)
    ) {
      res.push(game);
    }
  });
  return res;
};

app.post("/games", (req, res) => {
  // get json params
  let team1 = req.body.team1;
  let team2 = req.body.team2;

  gamesDB = manageDB.getByName("games"); //read DB

  //generate array of promises to paginate
  let promisesArray = [];
  for (let i = 1; i < 20; i++) {
    promisesArray.push(
      instance.get("https://rapidapi.p.rapidapi.com/games", {
        params: {
          page: i,
          per_page: 100,
        },
      })
    );
  }

  if (!gamesDB) {
    // read all promises at same time
    Promise.all(promisesArray).then(function (results) {
      // save all results in array
      let games = [];
      results.forEach((element) => {
        games.push(...element.data.data);
      });
      manageDB.setDB("games", games); //save in database (JSON)
      res.send({
        gamesByTeams: gamesByTeams(games, team1, team2),
        games: games,
      });
    });
  } else {
    res.send({
      gamesByTeams: gamesByTeams(gamesDB, team1, team2),
      games: gamesDB,
    });
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});


// cuando le al boton predecir ,
// debe capturar los nombres de los dos equipos
// y llevarlos al backend
// para buscar en el listado de todos los juegos
// y lo que le retorne mostrarlo en consola