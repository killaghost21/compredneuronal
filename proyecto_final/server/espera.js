const express = require("express");

const app = express();
const port = 5002;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    // allowed XHR methods
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});
app.post("/espera", (req, res) => {
  setTimeout(() => {
    res.send({ message: "espera finalizada" });
  }, 5000);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
