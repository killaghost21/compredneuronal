const express = require("express");
const app = express();
const axios = require("axios");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const manageDB = require("./database");
const ml = require("./ml");

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

const filterGames = (games, team1, team2) => {
  let gamesByTeams = [];
  let winners = [];
  let competingTeams = [];

  games.map((game) => {
    let home_team = game.home_team.full_name;
    let visitor_team = game.visitor_team.full_name;
    if (
      (home_team === team1 && visitor_team == team2) ||
      (home_team === team2 && visitor_team == team1)
    ) {
      competingTeams.push([game.home_team.name, game.visitor_team.name]);
      winners.push(
        game.home_team_score > game.visitor_team_score
          ? game.home_team.name
          : game.visitor_team.name
      );
      gamesByTeams.push(game);
    }
  });

  return {
    gamesByTeams: gamesByTeams,
    competingTeams: competingTeams,
    winners: winners,
    finalWinner: ml.predict(competingTeams, winners),
  };
};

app.post("/games", async (req, res) => {
  // get json params
  let team1 = req.body.team1;
  let team2 = req.body.team2;

  gamesDB = manageDB.getByName("games"); //read games from DB

  if (!gamesDB) {
    console.log(chalk.yellow.inverse("get games from API"));

    //generate array of promises to paginate
    let promisesArray = [];
    for (let i = 1; i < 21; i++) {
      promisesArray.push(
        freeNbaInstance.get("https://rapidapi.p.rapidapi.com/games", {
          params: {
            page: i,
            per_page: 100,
          },
        })
      );
    }

    const results = await Promise.all(
      promisesArray.map((p) => p.catch((e) => e))
    );
    const validResults = results.filter((result) => !(result instanceof Error));

    // save all results in array
    let games = [];
    validResults.forEach((element) => {
      element.data.data && games.push(...element.data.data);
    });

    let gamesFilter = filterGames(games, team1, team2);
    res.send({
      gamesByTeams: gamesFilter.gamesByTeams,
      competingTeams: gamesFilter.competingTeams,
      winners: gamesFilter.winners,
      finalWinner: gamesFilter.finalWinner,
      mlInfo: manageDB.getByName("mlInfo"),
      games: games,
    });
    manageDB.setDB("games", games); //save in database (JSON)
  } else {
    console.log(chalk.blue.inverse("get games from DB"));
    let gamesFilter = filterGames(gamesDB, team1, team2);
    res.send({
      gamesByTeams: gamesFilter.gamesByTeams,
      competingTeams: gamesFilter.competingTeams,
      winners: gamesFilter.winners,
      finalWinner: gamesFilter.finalWinner,
      mlInfo: manageDB.getByName("mlInfo"),
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
    res.send({ teams: result.data.data });
    manageDB.setDB("teams", result.data.data); //save in database (JSON)
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
