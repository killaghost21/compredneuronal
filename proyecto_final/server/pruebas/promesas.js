const seDemora = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(11);
    }, 2000);
  });
};

const ultimaFuncion = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(22);
    }, 3000);
  });
};

(async () => {
  // await seDemora();
  // await ultimaFuncion();
  Promise.all([seDemora, ultimaFuncion]).then((values) => {
    console.log(values);
    console.log("fin.............");
  });
})();

var p1 = Promise.resolve(3);
var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "fex");
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000, "foo");
});

Promise.all([p1, p2, p3]).then((values) => {
  console.log(values); // [3, 1337, "foo"]
});

let promises = [];
let times = [200,3000,6000];
for (let i = 0; i < 5; i++) {
  promises.push(
    new Promise((resolve, reject) => {
      setTimeout(resolve, times[i], "foo"+i);
    })
  );
}
Promise.all(promises).then((values) => {
  console.log(values); // [3, 1337, "foo"]
});