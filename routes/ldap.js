var setup = function (username, password){
	return function (req, res, next){
		console.log('\nceci est le middleware ldap');

		//création du client ldap
		var ldap = require('ldapjs');
		var client = ldap.createClient({
			url: 'ldap://i01.network',
		});
		
		//bind se connecter au serveur ldap en tant que "IIS_APP","I4Got6tmPswd"
		client.bind('user1', 'password', function(err) {
			//assert.ifError(err);
			if (err) {
				console.log('bindERR : '+err);
			} else {
				console.log('bind ok');
			}

			//requete search
			var opts = {
				filter: '(&(objectCategory=person)(|(SAMaccountname='+username+')(UserPrincipalName='+username+')))',
				scope: 'sub',
				attributes: ["mail", "SAMAccountName","userPrincipalName"]
			};
			client.search('dc=network', opts, function(err, res) {
				//assert.ifError(err);
				res.on('searchEntry', function(entry) {
					console.log('entry: ' + JSON.stringify(entry.object));
				});
				res.on('searchReference', function(referral) {
					console.log('referral: ' + referral.uris.join());
				});
				res.on('error', function(err) {
					console.error('error: ' + err.message);
				});
				res.on('end', function(result) {
					console.log('status: ' + result.status);
				});
			});
		});
		next();	//à replacer au bon endroit
	};
};



module.exports = setup;
