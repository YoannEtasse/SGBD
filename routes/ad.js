

var setup = function (username, password){
	return function (req, res, next){
		console.log('\nceci est le middleware active directory');
		console.log('tentative d\'authentification de '+username+' // '+password);

		var ActiveDirectory = require('activedirectory');
		var config = { url: 'ldap://i01.network',
		               baseDN: 'dc=network',
		               username: 'supervisor@network',
		               password: 'Koadrya2Marajo' };
		var ad = new ActiveDirectory(config);

		if (username && password){
			ad.authenticate(username, password, function(err, auth) {
			  if (err) {
			    console.log('ERROR: '+JSON.stringify(err));
			    return;
			  }
			  
			  if (auth) {
			  	console.log('auth : '+JSON.stringify(auth));
			    console.log('Authenticated! '+ username+' is member of ');
			  }
			  else {
			    console.log('Authentication failed!');
			  }
			});
		}
		
		next();
	};
};



module.exports = setup;
