var express = require('express');
var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var streams = require('memory-streams');

var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');

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
    // res.redirect('back');
    res.end('ok');
  });
  req.pipe(busboy);
});

app.listen(process.env.PORT || 3000);
