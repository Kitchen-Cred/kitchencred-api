var restify = require('restify');
var pg = require("pg");
 
var ip_addr = '127.0.0.1';
var port    =  '8080';
 
var pgConnect = "postgres://kitchencred:kitchen@localhost:5432/kitchencred";

var client = new pg.Client(pgConnect);
client.connect();

var server = restify.createServer({
    name : "kitchencred"
});
 
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});