var express = require('express');
var Busboy = require('busboy');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var streams = require('memory-streams');

var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var whitelist = ['http://valor-software.github.io'];

var corsOptionsDelegate = function(req, callback){
  var corsOptions;
  if(whitelist.indexOf(req.header('Origin')) !== -1){
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.get('/', function (req, res) {
  res.end('Ok!');
});

// cors(corsOptionsDelegate)

app.post('/api', function (req, res) {
  var fstream;
  var files = [];
  var busboy = new Busboy({headers: req.headers});
  busboy.on('file', function (fieldname, file, filename) {
    // fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
    // stub
    fstream = new streams.WritableStream();
    file.pipe(fstream);
    fstream.on('close', function () {
      console.log('file ' + filename + ' uploaded');
      files.push(filename);
    });
  });

  busboy.on('finish', function () {
    res.redirect('back');
  });
  req.pipe(busboy);
});

app.listen(process.env.PORT || 3000);
