var url = require('url');

var setup = function (arg1){
	return function (req, res, next){
		console.log('\nceci est le middleware showURL');
		console.log(arg1);

		console.log(req.method+' '+req.url);
		/*
		var parsedURL = url.parse(req.url);
		console.log('pathname : '+ parsedURL.pathname);
		console.log('query : '+ parsedURL.query);
		console.log('href : '+ parsedURL.href);
		console.log('host : '+ parsedURL.host);
		console.log('port : '+ parsedURL.port);
		//console.log('Access-Control-req-Origin : ' + req.header('Origin'));
		//console.log('Access-Control-req-Method : ' + req.header('Access-Control-req-Method'));
		//console.log('Access-Control-Allow-Headers : ' + req.header('Access-Control-Allow-Headers'));
		//console.log('req : '+ util.inspect(req));
		//console.log('res : '+ util.inspect(res));
		console.log('headers.host : '+ req.headers.host);
*/
		next();
	};
};



module.exports = setup;