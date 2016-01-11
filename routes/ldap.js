var setup = function (arg1){
	return function (req, res, next){
		console.log('\nceci est le middleware ldap');
		console.log(arg1);


		
		next();
	};
};



module.exports = setup;