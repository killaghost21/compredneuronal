// const firebase = require("./firebase/firebase.js");
const firebase = require("./firebase/firebasePromises");

const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const puerto = 3000;
const brain = require("brain.js");
let entrenamientonet;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/consultar", async function (req, res) {
  console.log("llega la información", req.body);
  //console.log(ejecutar(req.body.twit));

  let resultado = await ejecutar(req.body.twit);
  res.send(resultado);
});

function codificar(arg) {
  return arg.split("").map((x) => x.charCodeAt(0) / 400);
}

function procesodeEntrenamiento(data) {
  return data.map((d) => {
    return {
      input: codificar(d.input),
      output: d.output,
    };
  });
}

async function entrenamiento() {
  const dataFirebase = await firebase.getData();
  const data = obtenerDataEntranamiento(dataFirebase);
  let net = new brain.NeuralNetwork();
  net.train(
    procesodeEntrenamiento(data, {
      iterations: 1,
      log: true,
      learningRate: 0.1,
      timeout: 500,
    })
  );
  entrenamientonet = net.toFunction();
  console.log("Ha finalizado el entrenamiento");
}

function ejecutar(entrada_usuario) {
  let resultado = entrenamientonet(codificar(ajustartexto(entrada_usuario)));
  let salida;
  console.log("resultado", resultado);
  resultado.seguro > resultado.spam
    ? (salida = "en un mensaje de la universidad")
    : (salida = "es un mensaje de spam");
  return salida;
}

function obtenerDataEntranamiento(data) {
  let trainingData = data;
  console.log(trainingData);

  longitudtext = trainingData.reduce((a, b) =>
    a.input.length > b.input.length ? a : b
  ).input.length;

  for (let i = 0; i < trainingData.length; i++) {
    trainingData[i].input = ajustartexto(trainingData[i].input);
  }

  return trainingData;
}

entrenamiento();

function ajustartexto(string) {
  while (string.length < longitudtext) {
    string += " ";
  }
  return string;
}

// console.log(ejecutar("ofertas de publicidad"));

app.listen(puerto, () => {
  console.log(`se esta escuchando en el puerto ${puerto}`);
});
