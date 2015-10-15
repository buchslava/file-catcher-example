var express = require('express');
var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var streams = require('memory-streams');

var app = express();

app.post('/api', function(req, res) {
    var fstream;
    var files = [];
    var busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename) {
        // fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
        // stub
        fstream = new streams.WritableStream();
        file.pipe(fstream);
        fstream.on('close', function() {
            console.log('file ' + filename + ' uploaded');
            files.push(filename);
        });
    });

    busboy.on('finish', function(){
        res.redirect('back');
    });
    req.pipe(busboy);
});

app.listen(3000);
