var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'sql.network',
  user     : 'Paul',
  password : 'test',
  database : 'fnam_paul'
});

// obsolète pour une simple query
function connectMysql(){
	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
	console.log('connected as id ' + connection.threadId);
	});
}

function queryMysql(query, callback){
// conection
	// connection.query réalise implicitement la connection
// query
	connection.query(query, function(err, rows, fields) {
  		if (err) {
			callback(err, null);
		}else{
		console.log('connected as id ' + connection.threadId);
 		//console.log('The usr_iden is : ', rows[0].usr_iden);
		//console.log('The solution is: ', rows[0].solution);
		callback(null, JSON.stringify(rows[0]));
		}
	});
}

function closeMysql(){
	connection.end();
}

module.exports.connect = connectMysql;
module.exports.query = queryMysql;
module.exports.close = closeMysql;

/*
function(err) {
		if (err) {
			console.log('erreur close : '+ err);
		} else {
  			console.log(connection.threadId + ' has ended');
  		}
	}
*/
	

