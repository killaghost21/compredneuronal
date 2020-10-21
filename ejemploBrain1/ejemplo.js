///*
//███████╗     ██╗███████╗██████╗  ██████╗██╗ ██████╗██╗ ██████╗
//██╔════╝     ██║██╔════╝██╔══██╗██╔════╝██║██╔════╝██║██╔═══██╗
//█████╗       ██║█████╗  ██████╔╝██║     ██║██║     ██║██║   ██║
//██╔══╝  ██   ██║██╔══╝  ██╔══██╗██║     ██║██║     ██║██║   ██║
//███████╗╚█████╔╝███████╗██║  ██║╚██████╗██║╚██████╗██║╚██████╔╝
//╚══════╝ ╚════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝ ╚═════╝╚═╝ ╚═════╝
//*/

data = {
  info: {
    name: "ESCUINTLA ",
    latitude: "14.300901",
    longitude: "-90.785616",
    categories: {
      list: [
        { code: "9", name: "Visceras de res" },
        { code: "158", name: "Auto Servicio" },
        { code: "146", name: "V\u00edsceras de res" },
        { code: "152", name: "Tiendas bebidas" },
        { code: "12", name: "Granos B\u00e1sicos" },
        { code: "155", name: "Tiendas miscel\u00e1neos" },
        { code: "6", name: "Carne de cerdo" },
        { code: "98", name: "Sal" },
        { code: "149", name: "Tiendas productos l\u00e1cteos" },
        { code: "8", name: "Tiendas productos l\u00e1cteos" },
        { code: "101", name: "Huevos" },
        { code: "7", name: "Carne de pollo" },
        { code: "8", name: "Tiendas grasas y aceites" },
        { code: "1", name: "Verduras" },
        { code: "153", name: "Tiendas embutidos" },
        { code: "10", name: "Embutidos" },
        { code: "196", name: "Tortillas de ma\u00edz" },
        { code: "104", name: "Pastas alimenticias" },
        { code: "4", name: "Panaderia" },
        { code: "147", name: "L\u00e1cteos" },
        { code: "96", name: "Bebidas" },
        { code: "105", name: "Pan sandwich" },
        { code: "13", name: "Grasas y aceites" },
        { code: "5", name: "Tortilleria" },
        { code: "8", name: "Tiendas granos b\u00e1sicos" },
        { code: "99", name: "Caf\u00e9" },
        { code: "16", name: "Gas Propano" },
        { code: "102", name: "Harinas de ma\u00edz" },
        { code: "2", name: "Frutas" },
        { code: "154", name: "Tiendas granos y cereales" },
        { code: "103", name: "Sopas" },
        { code: "97", name: "Az\u00facar" },
        { code: "157", name: "Servicio Completo" },
        { code: "8", name: "Carne de res" },
        { code: "151", name: "Tiendas miscelaneos" },
        { code: "100", name: "Cereales" },
      ],
    },
  },
};

console.dir(data, { depth: null, colors: true }); //solo imprime en consola el objeto "data" de forma organizada.

/*
mostrar en consola el objeto "data" con los valores de la llave "code" de forma ascendente
y no quiero mostrar los que tengan valor de 8
ejemplo deberia quedar asi
{ info:
   { name: 'ESCUINTLA ',
     latitude: '14.300901',
     longitude: '-90.785616',
     categories:
      { list:
         [ { code: '1', name: 'Verduras' },
           { code: '2', name: 'Frutas' },
           { code: '4', name: 'Panaderia' },
           { code: '5', name: 'Tortilleria' },
           { code: '6', name: 'Carne de cerdo' },
           { code: '7', name: 'Carne de pollo' },
           { code: '9', name: 'Visceras de res' },
           { code: '10', name: 'Embutidos' },
           ...
           ...
           ..
           .
*/
