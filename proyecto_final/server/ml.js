const chalk = require("chalk");
const manageDB = require("./database");

const FeedforwardNeuralNetwork = require("ml-fnn");

// example from https://www.npmjs.com/package/ml-fnn/v/0.0.2

// let FNN = new FeedforwardNeuralNetwork([2, 4, 1]);
// let trainingSet = [[0, 0], [0, 1], [1, 0], [1, 1]];
// let predictions = [[0], [0], [0], [1]];
// FNN.train(trainingSet, predictions, 0.3, 0.3);
// let dataset = [[0, 0], [0, 1], [1, 0], [1, 1]];
// let ans = FNN.predict(dataset);
// console.log(ans);

// local test

// let FNN = new FeedforwardNeuralNetwork([2, 4, 1]);
// let trainingSet = [
//   ["Celtics", "Clippers"],
//   ["Clippers", "Celtics"],
//   ["Celtics", "Clippers"],
// ];
// let predictions = ["Clippers", "Clippers", "Celtics"];

// FNN.train(trainingSet, predictions, 0.3, 0.3);

// let dataset = [["Celtics", "Clippers"]];

// let ans = FNN.predict(dataset);

// console.log(chalk.blueBright.inverse(ans));

exports.predict = (competingTeams, winners) => {
  let FNN = new FeedforwardNeuralNetwork([2, 4, 1]);
  let trainingSet = competingTeams;
  let predictions = winners;

  FNN.train(trainingSet, predictions, 0.3, 0.3);

  // [...new Set(...trainingSet)] remove duplicates from trainingSet

  let dataset = [[...new Set(...trainingSet)]];

  let ans = FNN.predict(dataset);
  manageDB.setDB("mlInfo", FNN); //save in database (JSON)

  console.log(chalk.blueBright.inverse(ans));
  return ans;
};
