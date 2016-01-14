var http = require('http');
var fs = require('fs');
var connect = require('connect');
var bodyParser = require('body-parser');
var util = require('util');

var port = 8080;
var app = connect();

var mysql = require('./mysql');		//gère la connection mysql
//var serveur = require ('./PGPD'); 	//emet les requetes GET POST DELETE UPDATE

// Mes middlewares :
var ldap = require('./routes/ldap');
var ad = require('./routes/ad');
var showURL = require('./routes/showURL');
var showBody = require('./routes/showBody');
var checkUser = require('./routes/checkUsers');
var setHeads = require('./routes/setHeads');

function send404Response(response){
	response.writeHead(404, {"Content-Types":"text/plain"});
	response.end('Erreur 404 : Page non trouvÃ©');
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
		mysql.closeMysql();
		}
	});	
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) ;
// parse application/json 
app.use(bodyParser.json());

// Mes middlewares :
app.use(showURL(null));
app.use(showBody(null));
//app.use(ad('testldap','test'));
app.use(setHeads(null));
app.use(ldap('testldap','test'));

app.use('/mysql', connectMysql);
app.use('/', home);

http.createServer(app).listen(port);
console.log('server running on :' + port+'\n\n');

