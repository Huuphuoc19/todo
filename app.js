var express = require('express');
var app = express();
var middleware = require('./middlewares/header.js')

// middle for accept header
app.use(middleware.handleRequestHeader);
// log user connect
app.use(middleware.logUserConnect);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(require('./route/api.js'))

app.listen(3000,function() {
 	console.log('Listening on port 3000...')
})
