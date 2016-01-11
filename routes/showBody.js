var setup = function (arg1){
	return function (req, res, next){
		console.log('\nceci est le middleware showBody');
		console.log(arg1);

		console.log(req.body);
		console.log(JSON.stringify(req.body, null, 2));

		next();
	};
};



module.exports = setup;