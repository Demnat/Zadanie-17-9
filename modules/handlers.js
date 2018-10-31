var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');

var fileName = '';
var filesPath = '';

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        //console.log(files.upload);
        fileName = files.upload.name;
        filesPath = './files/' + fileName;
        mv(files.upload.path, filesPath, function(err) {
            // done. it tried fs.rename first, and then falls back to
            // piping the source file to the dest file and then unlinking
            // the source file.
            if (err) throw err;
          });
        fs.readFile('templates/upload.html', function(err, html) {
            if (err) throw err;
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write(html);
            response.end();
        });
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
    fs.readFile(filesPath, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.css = function(request, response) {
    console.log("Rozpoczynam obsługę żądania css.");
      
    fs.readFile('css/style.css', function(err, css) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(css);
        response.end();
    });
}