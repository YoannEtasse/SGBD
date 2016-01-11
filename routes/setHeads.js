var setup = function (arg1){
	return function (req, res, next){
		console.log('\nceci est le middleware setHeads');
		console.log(arg1);

		var head = {
			'Access-Control-Allow-Origin':req.headers.origin,
			'Access-Control-Allow-Methods':null
		};
		res.writeHead(200, {"Context-Type": "application/json",});
		console.log('body'+req.body);
		console.log('body'+JSON.stringify(req.body, null, 2));

		next();
		};
};



module.exports = setup;