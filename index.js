var express = require('express');
var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var streams = require('memory-streams');

var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type');
    res.setHeader('Access-Control-Request-Headers', 'access-control-allow-origin, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api', function (req, res) {
  res.end('file catcher example');
});

app.post('/api', function (req, res) {
  var fstream;
  var files = [];
  var busboy = new Busboy({headers: req.headers});
  busboy.on('file', function (fieldname, file, filename) {
    // fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
    // memory stub
    fstream = new streams.WritableStream();
    file.pipe(fstream);
    fstream.on('close', function () {
      console.log('file ' + filename + ' uploaded');
      files.push(filename);
      file.resume();
    });
  });

  busboy.on('finish', function () {
    res.end('ok');
  });
  req.pipe(busboy);
});

app.listen(process.env.PORT || 3000);
