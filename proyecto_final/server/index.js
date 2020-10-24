console.log("server init");
// cuando le al boton predecir ,
// debe capturar los nombres de los dos equipos
// y llevarlos al backend
// para buscar en el listado de todos los juegos
// y lo que le retorne mostrarlo en consola

const express = require("express");
var bodyParser = require("body-parser");
var unirest = require("unirest");

const app = express();
const port = 5001;
let games = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let promisesArray = [];

  for (let i = 1; i < 4; i++) {
    promisesArray.push(
      new Promise((resolve, reject) => {
        let req = unirest("GET", "https://rapidapi.p.rapidapi.com/games");

        req.query({
          page: i,
          per_page: 50,
        });

        req.headers({
          "x-rapidapi-host": "free-nba.p.rapidapi.com",
          "x-rapidapi-key":
            "...",//TODO: falta key
          useQueryString: true,
        });

        req.end(function (res) {
          if (res.error) {
            reject(res.error);
            throw new Error(res.error);
          }
          resolve(res.body);
        });
      })
    );
  }
  if (games.length === 0) {
    Promise.all(promisesArray).then((promisesResponse) => {
      games = promisesResponse.map((promise) => {
        return { ...promise.data };
      });
      res.send({ responses: games });
    });
  } else {
    res.send({ responses: games });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
