var github = require('octonode');
var qs = require('querystring');
var client=null;
var ghrepo =null;

var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    qs = require('qs');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    console.log(uri);
    var sha;
    if (uri=='/login') {
        var body = '';
        req.on('data', function (data) {
        body += data;
        });
        req.on('end', function () {
        parsedBody = qs.parse(body);

        var auth_url = github.auth.config({
            id: "EmelineD",
            secret: "lespaces33"
            }).login(['user', 'repo']);
        // console.log(auth_url);
            var state = auth_url.match(/&state=([0-9a-z]{32})/i);
            var values = qs.parse(uri.query);
            console.log(values)
            if (!state || state[1] != values.state) {
                client = github.client({
                    username: parsedBody.githublog,
                    password: parsedBody.githubpass
                });
                client.get('/user', {}, function (err, status, body, headers) {
  // console.log(body); //json object
                 });
                ghrepo= client.repo('master-bioinfo-bordeaux/master-bioinfo-bordeaux.github.io');

                res.writeHead(403, {'Content-Type': 'text/plain'});
                 res.end('Faux');
            }
            else{
                res.writeHead(403, {'Content-Type': 'text/plain'});
                res.end('Vrai');
        }
        });
    }
    // Callback url from github login
    else if (uri=='/auth') {
        var values = qs.parse(uri.query);
    // Check against CSRF attacks
        if (!state || state[1] != values.state) {
            res.writeHead(403, {'Content-Type': 'text/plain'});
            var newCourse={};
            var ID="C2F20150825T085836@EmelineD";
            newCourse[ID]={};
            newCourse[ID].ID="C2F20150825T085836@EmelineD";
            newCourse[ID].summary="B1BS7M06-Anglais";
            newCourse[ID].date_start="20150825T0000";
            newCourse[ID].date_end="20150825T0000";
            newCourse[ID].group="All";
            newCourse[ID].lecturer="Beurton-Aimar M";
            newCourse[ID].location="AmphiA5::Carreire";
            newCourse[ID].description="Essai";
            newCourse[ID].comment="AEB-Stats";
            newCourse=JSON.stringify(newCourse,'',4);
            ghrepo.contents('data/test.json', function(err, data, headers) {
                setSHA(data.sha);
                ghrepo.updateContents('data/test.json', 'Essai de modif de JSON', newCourse, sha, function(err, data, headers) {
                res.end("error: " + err)
                });
            });
        }
        else {
            github.auth.login(values.code, function (err, token) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(token);
            });
        }
    }

    else if(uri=='/createcourse'){
        if (req.method === 'POST') {
            // var body = '';
            // req.on('data', function (data) {
            // body += data;
            // });
            // req.on('end', function () {
            // parsedBody = qs.parse(body);
            // // console.log(parsedBody);
            // var newCourse={};
            // var sem=parsedBody.semester;
            // if (sem===7 || sem===8){
            //     var year=1;
            // }
            // else{
            //     var year=2;
            // }
            // var author=parsedBody.author
            // var datecrea = new Date();
            // var cday = ("0" + (datecrea.getDate())).slice(-2);
            // var cmonth = ("0" + (datecrea.getMonth()+1)).slice(-2);
            // var cyear = datecrea.getFullYear().toString();
            // var chour = ("0" + (datecrea.getHours())).slice(-2);
            // var cmin = ("0" + (datecrea.getMinutes())).slice(-2);
            // var csec = ("0" + (datecrea.getSeconds())).slice(-2);
            // var creadate = cyear+cmonth+cday+"T"+chour+cmin+csec;
            // var summary=parsedBody.uesemester;
            // var ue= summary.split("-"); //séparation pour obtenir l'ID et l'acronyme de l'UE 
            // // var acronym=parsedBody.uesemester.dataset.acronym;
            // var uetot=
            // console.log(uetot); //récupération de l'acronyme pour le titre
            // // newCourse.comment=acronym;
            // //var stu= course_data[ue[0]].students; //sauvegarde de l'ID puis recherche des étudiants pour cette UE
            // // var stusplit = stu.split(","); //séparation des différents groupes
            // // var parc=[];
            // // for (var i in stusplit){
            // //     var parca = stusplit[i].split("["); 
            // //     parc.push(parca[0]); //récupération des noms de groupes seuls
            // // }   
            // // sumsum="F" //passage de la valeur en hexadecimal
            // // newCourse.id = "C"+year+sumsum+creadate+"@"+author;
            // // newCourse.summary=summary
            // // console.log(newCourse);


            // });
        var body='';

        req.on('data', function(data){
            body+=data
        });

        req.on('end', function(){
            var post=qs.parse(body);
        });
    
        }
        else{
            console.log("Rien");
        }
    }
    
    else{
        var filename = path.join(process.cwd(), uri);
        path.exists(filename, function(exists) {
        if(!exists) {
            console.log("not exists: " + filename);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            res.end();
            return;
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, {'Content-Type':mimeType});

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
        }) //end path.exists
    }

    function setSHA(a_sha) {
        sha = a_sha;
    }
}).listen(8000);
