
//----------------------------
//           MAIN
//-----------------------------

console.log("Hola")

var a=5;


console.log("a vale " + a);

//Función sincrona

function f1Sinc (x,y) {

  return x+y;

}

//Función Asíncrona
function f1Async(x,y){

    var resultado = x+y;
    //para
    setTimeout (function(){callback(resultado)},500);

}
//Lamada a una función Asíncrona

function f1Async(8,5,function(r)){

      console.log("r = " + r);
      a=111;
}

console.log("ostia="+ ostia)
