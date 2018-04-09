
/* En este fichero probaremos la lógica de nuestro proyecto final
 * Autor: Alejandro Marco Ibáñez
 * 2017
*/

//Indicamos que vamos a realizar un test
console.log ( " haciendo tests ");

//Importamos nuestro archivo donde tenemos programada la logica
var laLogica = require('./logica.js');

//Probamos la base de datos
//laLogica.consultaDePrueba();

//Primero probaremos la lógica de comprobar la identidad

/*
laLogica.comprobarPassword('Alejandro','12345',function(err,resultados){

  if (resultados == 'OK') {
    console.log ('GREAT');
    return;
  }else{
    console.log('CACA');
  }
});
*/

//Ahora ya podemos llamar a guardarTweet
//laLogica.guardarTweet('Clara','1234567','Buenos dias');

//Para limpiar todos los mensajes
//laLogica.limpiarBaseDeDatos();

//Para ver los tweets


laLogica.verTweets('Alejandro','12345', 2, null, function(err,resultados){

  if (err) {
    console.log ('Tenemos un error:' + err);
    return;
  }else{
    console.log('TODO OK');
    resultado = JSON.stringify(resultados);
    console.log(resultado);
  }

});
