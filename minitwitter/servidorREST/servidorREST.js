
/* En este fichero definiremos nuestro servidor
 * Autor: Alejandro Marco Ibáñez
 * 2017
*/

//Importamos la API y nuestra lógica
var express = require('express');
var laLogica = require('../logica/logica.js');
var server = express();

//PARA PODER COPIAR LUEGO
server.use (function(req, res, next) {

    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
       data += chunk;
    });
    req.on('end', function() {
        req.body = data;

        next(); // la petición continúa
    });
});


//PARA PEDIR tweets
////////////////////////////////////////////////////////////////////////////////

server.get('/tweets/:usuario/:password/:cantidad/:autor', function(request, response){

	// se ejecuta cuanto llega una petición GET de cliente http
	console.log (" * GET /tweets " + request.url );

  var usuario = request.params.usuario;
  var password = request.params.password;
  var cantidad = request.params.cantidad;
  var autor = request.params.autor;
	if (autor == 'null') {autor=null;}

  laLogica.verTweets(usuario,password, cantidad, autor, function(err,resultados){

    if (err) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
			response.write(err + "\n");
      response.end();
      return;

    }else{
      resultado = JSON.stringify(resultados);
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write ( resultado + "\n" );
      response.end();
			return;

	  }

  });

});

//PARA POSTEAR un tweet
////////////////////////////////////////////////////////////////////////////////

server.post('/publicar', function(req, response){

	// se ejecuta cuanto llega una petición GET de cliente http
	console.log (" * POST publicar " + req.url );

  var usuario = req.query.usuario;
  var password = req.query.password;
  var mensaje = req.body;
	if (mensaje == null) {mensaje='No tengo nada que decir';}

  laLogica.guardarTweet(usuario,password, mensaje, function(err,resultados){

    if (err) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
			response.write(err + "\n");
      response.end();
      return;

    }else{
      resultado = JSON.stringify(resultados);
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write ( resultado + "\n" );
      response.end();
			return;

	  }

  });

});

//Para hacer LOGIN
////////////////////////////////////////////////////////////////////////////////

server.post('/login', function(req, response){

	// se ejecuta cuanto llega una petición GET de cliente http
	console.log (" * POST login " + req.url );

  var usuario = req.query.usuario;
  var password = req.query.password;

  laLogica.login(usuario,password,function(err,resultados){

    if (err) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
			response.write(err + "\n");
      response.end();
      return;

    }else{
      resultado = JSON.stringify(resultados);
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write ( resultado + "\n" );
      response.end();
			return;
	  }
  });
});

////////////////////////////////////////////////////////////////////////////////

//MÉTODO DE PRUEBA
server.get('', function(request, response){
 console.log('GET');
});

//Dejamos al servidor escuchando
server.listen(8080, function() {
    console.log('%s Estoy escuchando en el puerto 8080');
});
