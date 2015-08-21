var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('../CalendarForm.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    socket.emit('message', '<input type="text" name="author" id="authorevent" required/>');
});


fs.writeFileSync("essai_calendar.json", newCourse, "UTF-8");

server.listen(8080);

/*http://itinet.fr/thire/cours/cours_nodejs_lecture_ecriture_fichier/slide5.html
http://www.faire-des-jeux.com/node-js-express-servir-des-fichiers-html/
http://connect.ed-diamond.com/GNU-Linux-Magazine/GLMF-136/Node.js-du-Javascript-sur-votre-serveur
http://naholyr.fr/2011/06/bonnes-pratiques-asynchrone-javascript-nodejs/
http://blog.idleman.fr/nodejs-03-construction-dun-mini-projet-partie-1/
http://blog.idleman.fr/nodejs-04-construction-dun-mini-projet-partie2/

Pour Windows : http://blog.lesieur.name/installer-et-utiliser-nodejs-sous-windows/

*/