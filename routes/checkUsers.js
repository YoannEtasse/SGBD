var setup = function (arg1){
	return function (req, res, next){

		console.log('\nceci est le middleware checkUsers');
		console.log(arg1);
		console.log('user approved');
		
		next();
	};
};



module.exports = setup;