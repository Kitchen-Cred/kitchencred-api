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

server.get({path:  '/api/stores',             version: '0.0.1'}, findAllStores);
server.get({path:  '/api/stores' + '/:jobId', version: '0.0.1'}, findStore);
server.post({path: '/api/stores',             version: '0.0.1'}, postNewStore);
server.del({path:  '/api/stores' + '/:jobId', version: '0.0.1'}, deleteStore);

function findAllJobs(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    jobs.find().limit(20).sort({postedOn : -1} , function(err , success){
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if(success){
            res.send(200 , success);
            return next();
        } else {
            return next(err);
        }
    });
}
 
function findJob(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    jobs.findOne({_id:mongojs.ObjectId(req.params.jobId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }
        return next(err);
    })
}
 
function postNewJob(req , res , next){
    var job = {};
    job.title = req.params.title;
    job.description = req.params.description;
    job.location = req.params.location;
    job.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    jobs.save(job , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , job);
            return next();
        }else{
            return next(err);
        }
    });
}
 
function deleteJob(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    jobs.remove({_id:mongojs.ObjectId(req.params.jobId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(204);
            return next();      
        } else{
            return next(err);
        }
    })
 
}
server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});
