/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('socket', process.env.SOCKET || '/tmp/cnonim.name.socket');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.engine('ejs', require('ejs-locals'));

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('lime_speed'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var umask = process.umask(0000);
http.createServer(app).listen(app.get('socket'), function () {
  process.umask(umask);
  console.log('Express server listening on socket ' + app.get('socket'));
});
