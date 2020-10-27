const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

const setDefaultDB = () => {
  // Set some defaults (required if your JSON file is empty)
  db.defaults({ games: [], teams: [] }).write();
};
exports.getByName = (name) => {
  return db.get(name).value();
};
exports.setDB = (path, data) => {
  // Set a user using Lodash shorthand syntax
  db.set(path, data).write();
};
const addToDB = () => {
  // Add a post
  db.get("posts").push({ id: 1, title: "lowdb is awesome" }).write();
};
exports.updateDB = (names) => {
  names.map((name) => {
    db.set(name, null).write();
  });
};
