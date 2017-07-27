var pg = require('pg');
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response){
  response.send(cool());
});

app.get('/times', function(request, response){
  var result = '';
  var times = process.env.TIMES || 5;
  for (var index = 0; index < times; index++) {
    result += index.toString() + ' '; 
  }
  response.send(result);
});

app.get('/db', function(request, response) {
  var client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query('SELECT * FROM test_table', function(err, result){
    if (err) {
      console.error(err); 
      response.send("Error " + err);
    }
    else {
      response.render('pages/db', {results: result.rows});
    }
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


