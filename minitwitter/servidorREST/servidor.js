
// ------------------------------------------------------
// servidor.js
// ver: http://expressjs.com/4x/api.html
// ------------------------------------------------------

// .......................................................
// requires
// .......................................................

var fs = require('fs');
var express = require('express');
var laLogica = require('../logica/logica.js');

var servidorExpress = express();

// ------------------------------------------------------
// ------------------------------------------------------
// servidorExpress.use (bodyParser());
// Esto es para copiar lo que haya en el cuerpo
// de la peticion HTTP al campo "body"  de "req"
// y que se pueda consultar luego.
//


// ------------------------------------------------------
// reglas de peticiones REST
// ------------------------------------------------------

// .......................................................
// buscarUsuario()
// ej. GET /usuario/12341234
// devuelve en el cuerpo los datos del usuario en formato JSON
// .......................................................
servidorExpress.get('GET/usuario/:elTelefono', function(request, response){


	// se ejecuta cuanto llega una petición GET de cliente http
	console.log (" * GET /usuario/:elTelefono      " + request.url );

	var telefono = request.params.elTelefono;

	laLogica.buscarUsuario(telefono, function (err, resultado) {

		if (err) {
			response.writeHead(409, {'Content-Type': 'text/plain'});
			response.end();
			return;
		}

		if (resultado == undefined) {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end();
			return;
		}

		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write ( JSON.stringify (resultado) + "\n");
		response.end();

	});

});

// .......................................................
// .......................................................
// ACREDITACION DEL USUARIO (LOGIN)
// POST /login?usuario=xxx&password=yyy
// .......................................................
// .......................................................
/*
servidorExpress.post('/login', function(req, response){

	console.log (" * POST /login      " + req.url );

	var user = req.query.usuario; <---
	var password = req.query.password;

	req.body (para sacar el cuerpo)
	*/

// .......................................................
// "main()"
// .......................................................

servidorExpress.listen (8080);

console.log ("todo preparado, espero en 8080 (http)");
