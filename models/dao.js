var mysql = require('mysql');
var config_db = require('./config_db.js');


var connection;

// handle error connection
function handleDisconnect() {
	connection = mysql.createConnection(config_db); // Recreate the connection, since
	// the old one cannot be reused.
	connection.connect(function(err) {              // The server is either down
		if(err) {                                     // or restarting (takes a while sometimes).
			console.log('error when connecting to db:', err);
			setTimeout(handleDisconnect, 5000); // We introduce a delay before attempting to reconnect,
		}else{
			console.log('Connected as id ' + connection.threadId);
		}                                       // to avoid a hot loop, and to allow our node script to
	});                                     // process asynchronous requests in the meantime.
	// If you're also serving http, display a 503 error.
	connection.on('error', function(err) {
		console.log('db error', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
			handleDisconnect();                         // lost due to either server restart, or a
		} else {                                      // connnection idle timeout (the wait_timeout
			throw err;                                  // server variable configures this)
		}
	});
}

handleDisconnect();

module.exports = connection;