/*var http = require('http');
var url = require('url');
var querystring = require('querystring');
var moduleAdd = require('./test')

var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if ('taux' in params && 'valeur' in params)
    {
    	var resultat = moduleAdd.conversion(params['taux'], params['valeur']);
    	res.write('le resultat est: ' + resultat);
    }
    else{ 
    	res.write("rien n'a ete entre");
    }
    res.end();
});
server.listen(8080);
*/
var http = require('http');
var url = require('url');
var querystring = require('querystring');

response = function(req,res)
{var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if ('prenom' in params && 'nom' in params) {
        res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
    }
    else {
        res.write('Vous devez bien avoir un prénom et un nom, non ?');
    }
    res.end();
}}

var server = http.createServer(function(req, res) {
    );
server.listen(8080); 