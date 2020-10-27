const express = require("express");
const app = express();
const axios = require("axios");
const chalk = require("chalk");
const manageDB = require("./database");
const bodyParser = require("body-parser");

require("dotenv").config();

const port = 5001;

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

process.env.API_KEY
  ? console.log(chalk.green.inverse("environment's vars OK!"))
  : console.log(chalk.red.inverse("first define .env y/o environment's vars"));

//instance axios
const freeNbaInstance = axios.create({
  timeout: 20000,
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

  gamesDB = manageDB.getByName("games"); //read games from DB

  if (!gamesDB) {
    console.log(chalk.yellow.inverse("get games from API"));

    //generate array of promises to paginate
    let promisesArray = [];
    for (let i = 1; i < 20; i++) {
      promisesArray.push(
        freeNbaInstance.get("https://rapidapi.p.rapidapi.com/games", {
          params: {
            page: i,
            per_page: 100,
          },
        })
      );
    }

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
    console.log(chalk.blue.inverse("get games from DB"));

    res.send({
      gamesByTeams: gamesByTeams(gamesDB, team1, team2),
      games: gamesDB,
    });
  }
});

app.get("/teams", async (req, res) => {
  teamsDB = manageDB.getByName("teams"); //read teams from DB

  if (!teamsDB) {
    console.log(chalk.yellow.inverse("get teams from API"));
    //get promise using async/await
    result = await freeNbaInstance.get("https://rapidapi.p.rapidapi.com/teams");
    manageDB.setDB("teams", result.data.data); //save in database (JSON)
    res.send({ teams: result.data.data });
  } else {
    console.log(chalk.blue.inverse("get teams from DB"));
    //get data from DB
    res.send({ teams: teamsDB });
  }
});

app.get("/clean-db", (req, res) => {
  console.log(chalk.yellow.inverse("cleanDB"));
  manageDB.updateDB(["games", "teams"]); //save in database (JSON)
  res.send({ message: "clean DB ok" });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

// cuando le al boton predecir ,
// debe capturar los nombres de los dos equipos
// y llevarlos al backend
// para buscar en el listado de todos los juegos
// y lo que le retorne mostrarlo en consola
