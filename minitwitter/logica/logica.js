
/* En este fichero definiremos la lógica de nuestro proyecto final
 * utilizando NODE.
 * Autor: Alejandro Marco Ibáñez
 * 2017
*/

//Importamos biblioteca para base de datos
var sqlite3 = require("sqlite3");

//Conectamos con nuestra base de datos
var laBaseDeDatos = new sqlite3.Database("../bd/bdpf1");

//Listado de peticiones a la base de datos
var verUsuario = "select * from usuario;"
var verMensajito = "select * from mensajito;"


												//  MÉTODOS PRIVADOS  //
///////////////////////////////////////////////////////////////////////////////
//Funcion para imprimir por consola
function print(msg) {
	console.log (" logica.js:   >" + msg + "<");
} // ()

///////////////////////////////////////////////////////////////////////////////

//Verificamos identidad
comprobarPassword = function(nombre,password,callback) {

	//Escribimos la consulta
	var consulta = "select * from usuario where nombre = '" + nombre + "';";

	laBaseDeDatos.get (consulta, function (err, resultado) {

			if (err) {
				callback ( new Error ("ERROR EN CONSULTA"), null);
				return;
			}

			//Si no he encontrado nada
			if (resultado == undefined) {
				callback (new Error ("NO EXISTE EL USUARIO"), undefined);
				return;

			}else{

						if(resultado.password == password){
							callback(null, 'OK');
							return;
						} else {
							callback ( new Error ("CONTRASEÑA INCORRECTA"), null);
							return;
						}
			}

  	} // function ()
   );
}

//****************************************************************************//


                              // MÉTODOS //
///////////////////////////////////////////////////////////////////////////////

//Funcion para hacer una prueba
exports.consultaDePrueba = function() {

	laBaseDeDatos.each (verMensajito, function (err, fila) {

    print ( fila.nombre + " / " + fila.instante +  " / " + fila.texto);

	                                              } // function ()
					           );
} // ()

//Ver usuarios
exports.verUsuarios = function() {

	laBaseDeDatos.each (verUsuario, function (err, fila) {

    print ( fila.nombre + " / " + fila.password );

	                                              } // function ()
					           );
} // ()

///////////////////////////////////////////////////////////////////////////////

//Para guardar un tweet
exports.guardarTweet= function(nombre,password,mensaje,callback) {


	comprobarPassword(nombre,password,function(err, resultado){

			if (err) {
				callback ( new Error (err), null);
				return;
				}

				if (resultado == undefined) {
				callback ( new Error (err), null);
				return;

				}else{

						//Si todo va bien inserto el mensaje
						if(resultado=='OK'){

						//Antes debo definir el momento
						var instante = new Date();
						instante = instante.getTime();

						//Creo el mensaje
						var sql = "insert into mensajito values ('"
							+ nombre + "', '"
							+ instante + "', '"
							+ mensaje + "');";

						//Leo la instruccióm SQL
						laBaseDeDatos.run (sql, function(err, resultado){
									if (err) {
						        callback ( new Error ("ALGO VA MAL"), null);
										return;
									}else{
										callback (null, 'Escribiste: ' + mensaje);
										return;
									}
						});
						return;
						//
						}
				return;
				}
	}); //Fin comprobarPassword

}


///////////////////////////////////////////////////////////////////////////////


//Pedir ver los últimos mensajitos

exports.verTweets = function(nombre,password,cantidad,autor, callback) {

	comprobarPassword(nombre,password,function(err, resultado){

			if (err) {
				callback ( new Error ( err), null);
				return;
				}

				if (resultado == undefined) {
				callback ( new Error (err), null);
				return;

				}else{

							if(resultado=='OK' && autor==null){

									//Pasamos los tweets si no se ha especificado autor
									var consulta = "select * from mensajito ORDER BY instante DESC LIMIT " +cantidad+ ";";
									//Leo la instrucción SQL
									laBaseDeDatos.all (consulta, function(err, resultado){

												if (err) {
													callback ( new Error ("ERROR EN CONSULTA"), null);
													return;

												}else{
													// devolveremos el array de resultados:
													callback(null,resultado);
										}});
							return;

						}else{

							//Pasamos los tweets si se ha especificado autor
							var consulta =  "select * from mensajito where nombre = '"
							 								+ autor + "' ORDER BY instante DESC LIMIT "
															+cantidad+ ";";
							//Leo la instrucción SQL
							laBaseDeDatos.all (consulta, function(err, resultado){

										if (err) {
											callback ( new Error ("ERROR EN CONSULTA"), null);
											return;
										}else{
											//devolveremos el array de resultados:
											callback(null,resultado);
										}});

							return;
					}

	}}); //Fin comprobarPassword

}//FIN PEDIR TWEETS
////////////////////////////////////////////////////////////////////////////////

exports.login = function(nombre,password,callback) {

	comprobarPassword(nombre,password,function(err, resultado){

			if (err) {
						callback ( new Error (err), null);
						return;
				}

				if (resultado == undefined) {
						callback ( new Error (err), null);
						return;

				}else{
						callback (null, nombre);
						return;
				}
	}); //Fin comprobarPassword

}//FIN LOGIN

////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// UTILIDADES /////////////////////////////////////

exports.limpiarBaseDeDatos = function() {

	laBaseDeDatos.run('delete from mensajito');

}

////////////////////////////////////////////////////////////////////////////////

function darFormatoMensajes (mensajes,cantidad,autor) {
//Cramos una variable donde guardar la respuesta al completo
var respuesta= "";

//Si no especificamos ningun autor devolvemos los primeros mensajes
if(autor==null){

   for(var i=0; i<cantidad; i++){
			var nombre= mensajes[i].nombre; // Coger el nombre
			respuesta = respuesta + nombre + "/";
			var mensaje = mensajes[i].texto; // Cogemos el mensaje
			respuesta=respuesta + mensaje + "\n";
		}

}else{

//Si especificamos autor devolvemos solo los de ese autor
	for(var i=0; i<cantidad; i++){

		 var nombre= mensajes[i].nombre; // Coger el nombre

				 if (nombre==autor){
					 respuesta = respuesta + nombre + "/";
					 var mensaje = mensajes[i].texto; // Cogemos el mensaje
				 	 respuesta=respuesta + mensaje + "\n";
			 	}else{
				 cantidad=cantidad+1; //Sumamos uno a la cantidad ya que este tweet no cuenta
			 	}

			}


	}
	return respuesta;

}//FIN METODO
