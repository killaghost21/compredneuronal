const admin = require("firebase-admin"); //importa lib de firebase para conexion

// conexion firebase con llave privada
let serviceAccount = require("./dbredesneuronales1-firebase-adminsdk-1f1x9-895a3cd9e2.json"); //sergio
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//guarda conexion en var db
let db = admin.firestore();

// funcion para leer la coleccion Mensajes
//export: exporta el metodo para ser usado en otro archivo en el index

exports.getData = () => {
  return new Promise((resolve, reject) => {
    db.collection("Mensajes")
      .get()
      .then((snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          data.push({
            input: doc.data().mensaje,
            output: convertTipo(doc.data().tipo),
          });
        });
        resolve(data);
      })
      .catch((err) => {
        reject(console.log("Error getting documents", err));
      });
  });
};

const convertTipo = (tipo) => {
  let newTipo;
  switch (tipo) {
    case "spam":
      newTipo = { spam: 1 };
      break;
    case "seguro":
      newTipo = { seguro: 1 };
      break;
    default:
      newTipo = { spam: 1 };
      break;
  }

  return newTipo;
};
