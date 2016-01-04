var http = require('http');
var fs = require('fs');
var connect = require('connect');
var url = require('url');

var mysql = require('./mysql');		//gère la connection mysql
var serveur = require ('./PGPD'); 	//emet les requetes GET POST DELETE UPDATE

var port = 8080;
var app = connect();

function send404Response(response){
	response.writeHead(404, {"Content-Types":"text/plain"});
	response.end('Erreur 404 : Page non trouvÃ©');
}

// vérifications
function checkUser (request, response, next){
	console.log('user approved');
	next();
}

// module url
function showURL (request, response, next){
	var parsedURL = url.parse(request.url);
	console.log('pathname : '+ parsedURL.pathname);
	console.log('query : '+ parsedURL.query);
	console.log('href : '+ parsedURL.href);
	console.log('host : '+ parsedURL.host);
	console.log('port : '+ parsedURL.port);
	next();
}

// /
function home(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});
	fs.createReadStream('./home.html').pipe(response);
}

// /mysql
function connectMysql(request, response){
	response.writeHead(200, {"Context-Type": "application/json"});
	mysql.query('select * from usr;',function(err, rows, field){
		if (err) {
			console.log('erreur query : '+ err);
			response.end('erreur detecté');
		} else {
		console.log('response : ' + rows);
		response.end(rows);
		mysql.closeMysql;
		}
	});	
}

app.use(showURL);
app.use('/mysql', connectMysql);
app.use('/', home);

http.createServer(app).listen(port);
console.log('server running on :' + port);

