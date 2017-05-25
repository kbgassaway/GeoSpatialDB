var express = require('express');
var mysql = require('./dbcon.js');
var moments = require('moments');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8227);


//HOME Page
app.get('/', function(req,res,next){
    var context = {};
    mysql.pool.query('SELECT first_name, last_name, job_title, city, cert_name FROM employees e LEFT JOIN offices o ON o.id = e.office LEFT JOIN employee_cert ec ON ec.eid=e.id LEFT JOIN certifications c ON c.id=ec.cid', function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        res.render('home');
    });
});

//Loads the existing table, if one exists
app.get('/loadTable', function(req,res,next){
    var context = {};
    mysql.pool.query('SELECT first_name, last_name, job_title, city, cert_name FROM employees e LEFT JOIN offices o ON o.id = e.office LEFT JOIN employee_cert ec ON ec.eid=e.id LEFT JOIN certifications c ON c.id=ec.cid',function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        res.send(rows);
    });
});

app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500- Server Error');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://flip3.engr.oregonstate.edu:' +app.get('port') +';press Ctrl-C to terminate.');
});
