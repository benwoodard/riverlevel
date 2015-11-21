var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var routes = require('./routes/index');
var user = require('./routes/user');
var rivers = require('./routes/rivers');

var app = express();

app.engine('.hbs',exphbs({defaultLayout:'single',extname:'.hbs'}));
app.set('view engine','.hbs');

app.use(express.static(path.join(__dirname,'public')));

app.use('/', routes);
app.use('/user', user);
app.use('/river/',rivers);

module.exports = app;