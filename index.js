var express  = require('express');

var app      = express();

var bodyParser   = require('body-parser');

var webdir = __dirname +'/inker/public'

app.use(bodyParser.json({limit: '50mb'}));

app.use(express.static(webdir))

require('./route/gmRoutes')(app); // load our routes and pass in our app and fully configured passport
app.listen(8080)
