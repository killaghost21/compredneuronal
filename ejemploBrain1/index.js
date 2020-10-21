function calcular(peso1, peso2, bias, valores) {

  function entrenarPerceptron(x1, x2, salidaDeseada) {//funcion retorna el error
    let net = x1 * peso1 + x2 * peso2 + bias;
    console.log("net: ", net);

    //calcular  (salida)
    let salida;
    if (net > 0) {
      salida = 1;
    } else {
      salida = 0;
    }
    console.log("salida: ", salida);

    //calcular error
    let error = salidaDeseada - salida;
    console.log("error: ", error);
    if (error !== 0) {//si error es diferente a cero recalcula el error
      return { msj: "error - hacer paso4", valorError: error };
    } else {//cuando el error es igual a cero
      return { msj: "Funciona" };
    }
  }

  let finPrediccion = false;
  let iteraciones = 0;
  let start = performance.now(); //calcular tiempo ejecucion while

  while (finPrediccion === false) {
    countFuncionaron = 0;
    iteraciones += 1;

    //numero max de iteraciones
    let maxIteraciones = 5000;
    if (iteraciones > maxIteraciones) {
      finPrediccion = true;
      alert("maximo de iteraciones alcanzado >" + maxIteraciones);
    }

    valores.map((valor) => {//ciclo recalcular pesos
      console.log(valor);
      res = entrenarPerceptron(valor.x1, valor.x2, valor.salidaDeseada);
      console.log(res.msj);
      if (res.valorError) {// si es error  recalcula pesos
        //recalculando pesos
        peso1 = peso1 + res.valorError * valor.x1;
        peso2 = peso2 + res.valorError * valor.x2;
        console.log("reccalculando nuevo peso1....", peso1);
        console.log("reccalculando nuevo peso2....", peso2);

        //recalculando bias
        bias = bias + res.valorError;
        console.log("reccalculando nuevo bias....", bias);
      } else { // si no es error aumenta contador 
        countFuncionaron += 1;
        if (countFuncionaron === 4) { //si las 4 condiciones estan ok se sale del while
          finPrediccion = true;
        }
      }
    });
  }
  let end = performance.now(); //captura tiempo para capturar ejecucion
  let timeExec = parseFloat(end - start).toFixed(3) + "ms"; //calcula tiempo de ejecucion en milisegundos

  //imprime resultados
  console.log("timeExec", timeExec);
  console.log("los pesos y bias correctos son: ");
  console.log("peso1: ", peso1);
  console.log("peso2: ", peso2);
  console.log("bias: ", bias);
  console.log("iteraciones: ", iteraciones);
  return {
    peso1: peso1,
    peso2: peso2,
    bias: bias,
    iteraciones: iteraciones,
    timeExec: timeExec,
  };
}

function cardsHtml(nombre, img) {//tarjetas en html de bootsrap
  return `

<div class="col-md-4">
<div class="card mb-4 box-shadow">
  <h3 class="nombre-compuerta">${nombre}</h3>
  <img
    class="card-img-top"
    src="${img}"
  />
  <div class="card-body">
    <form action="">
      <input
        type="number"
        class="form-control m-1"
        id="peso1"
        placeholder="Ingrese Peso 1"
      />
      <input
        type="number"
        class="form-control m-1"
        id="peso2"
        placeholder="Ingrese Peso 2"
      />
      <input
        type="number"
        class="form-control m-1"
        id="bias"
        placeholder="Ingrese Bias"
      />
      <button type="submit" class="btn btn-primary calcularBtn">
        Calcular
      </button>
    </form>
    <div class="box-values">
      <p>Nuevos valores</p>
      <div
        class="d-flex justify-content-between align-items-center"
      >
        <small class="text-muted"
          >Peso1:
          <span class="badge badge-dark nuevoPeso1"
            >-</span
          ></small
        >
        <small class="text-muted"
          >Peso2:
          <span class="badge badge-dark nuevoPeso2"
            >-</span
          ></small
        >
        <small class="text-muted"
          >bias:
          <span class="badge badge-primary nuevoBias"
            >-</span
          ></small
        >
      </div>
    </div>
    <div class="box-values">
      <p>estadisticas</p>

      <div
        class="d-flex justify-content-between align-items-center"
      >
        <small class="text-muted"
          >Iteraciones:
          <span class="badge badge-success iteraciones"
            >-</span
          ></small
        >
        <small class="text-muted"
          >Tiempo:
          <span class="badge badge-info timeExec"
            >-</span
          ></small
        >
      </div>
    </div>
  </div>
</div>
</div>


`;
}

$(document).ready(function () {
  //arreglos de compuertas
  let compuertas = [
    {
      nombre: "AND",
      img:
        "https://hetpro-store.com/TUTORIALES/wp-content/uploads/2017/10/compuerta-and-1.png",
      valores: [
        { x1: "0", x2: "0", salidaDeseada: "0" },
        { x1: "0", x2: "1", salidaDeseada: "0" },
        { x1: "1", x2: "0", salidaDeseada: "0" },
        { x1: "1", x2: "1", salidaDeseada: "1" },
      ],
    },
    {
      nombre: "NAND",
      img:
        "https://hetpro-store.com/TUTORIALES/wp-content/uploads/2017/10/compuerta-nand-4.png",
      valores: [
        { x1: "0", x2: "0", salidaDeseada: "1" },
        { x1: "0", x2: "1", salidaDeseada: "1" },
        { x1: "1", x2: "0", salidaDeseada: "1" },
        { x1: "1", x2: "1", salidaDeseada: "0" },
      ],
    },
    {
      nombre: "OR",
      img:
        "https://hetpro-store.com/TUTORIALES/wp-content/uploads/2017/10/compuerta-or-2.png",
      valores: [
        { x1: "0", x2: "0", salidaDeseada: "0" },
        { x1: "0", x2: "1", salidaDeseada: "1" },
        { x1: "1", x2: "0", salidaDeseada: "1" },
        { x1: "1", x2: "1", salidaDeseada: "1" },
      ],
    },
    {
      nombre: "NOR",
      img:
        "https://hetpro-store.com/TUTORIALES/wp-content/uploads/2017/10/compuerta-nor-5.png",
      valores: [
        { x1: "0", x2: "0", salidaDeseada: "1" },
        { x1: "0", x2: "1", salidaDeseada: "0" },
        { x1: "1", x2: "0", salidaDeseada: "0" },
        { x1: "1", x2: "1", salidaDeseada: "0" },
      ],
    },
    {
      nombre: "XOR",
      img:
        "https://hetpro-store.com/TUTORIALES/wp-content/uploads/2017/10/compuerta-xor-6.png",
      valores: [
        { x1: "0", x2: "0", salidaDeseada: "0" },
        { x1: "0", x2: "1", salidaDeseada: "1" },
        { x1: "1", x2: "0", salidaDeseada: "1" },
        { x1: "1", x2: "1", salidaDeseada: "0" },
      ],
    },
    {
      nombre: "XNOR",
      img:
        "https://hetpro-store.com/TUTORIALES/wp-content/uploads/2017/10/compuerta-xnor-7.png",
      valores: [
        { x1: "0", x2: "0", salidaDeseada: "1" },
        { x1: "0", x2: "1", salidaDeseada: "0" },
        { x1: "1", x2: "0", salidaDeseada: "0" },
        { x1: "1", x2: "1", salidaDeseada: "1" },
      ],
    },
  ];
  compuertas.map((compuerta) => {// recorre compuertas para pintarlas en el html
    $(".compuertas").append(cardsHtml(compuerta.nombre, compuerta.img));
  });

  $(".calcularBtn").click(function (event) {//escucha el click para calcular segun card seleccionada
    event.preventDefault();
    let peso1 = $(this).siblings("#peso1").val().trim();
    let peso2 = $(this).siblings("#peso2").val().trim();
    let bias = $(this).siblings("#bias").val().trim();

    //agregar nombre compuerta en card
    let valores;
    let nombreCompuerta = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".nombre-compuerta")
      .html(); //capturar nombre compuerta del html
    compuertas.map((compuerta) => {
      if (compuerta.nombre === nombreCompuerta) {
        valores = compuerta.valores;
      }
    });

    if (peso1.length > 0 && peso2.length > 0 && bias.length > 0) {// valida info campos esten llenos
      let res = calcular(
        parseFloat(peso1),
        parseFloat(peso2),
        parseFloat(bias),
        valores
      );

      //agregar valores al html
      $(this).parent().parent().find(".nuevoPeso1").html(res.peso1);
      $(this).parent().parent().find(".nuevoPeso2").html(res.peso2);
      $(this).parent().parent().find(".nuevoBias").html(res.bias);
      $(this).parent().parent().find(".iteraciones").html(res.iteraciones);
      $(this).parent().parent().find(".timeExec").html(res.timeExec);
    } else {
      alert("1 o mas valores estan incompletos");
    }
  });

  //random para llenar con aleatorios
  $("#random").click(function (event) {
    event.preventDefault();
    $("input").each(function () {
      let rango = [-20, 20];
      $(this).val(
        (Math.floor(Math.random() * (rango[1] - rango[0])) + rango[0]) / 10 //genera aleatorio -20 y 20
      );
    });
  });
});
