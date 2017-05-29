var express = require('express');
var mysql = require('./dbcon.js');

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
    mysql.pool.query('SELECT first_name, last_name, job_title, department, salary, city FROM employees e LEFT JOIN offices o ON e.office= o.id; ', function(err, rows, fields){
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
    mysql.pool.query('SELECT first_name, last_name, job_title, department, salary, city FROM employees e LEFT JOIN offices o ON e.office= o.id; ',function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        res.send(rows);
    });
});

//Loads the Employees Job Titles for the dynamic filter
app.get('/loadJobTitles', function(req,res,next){
    var context = {};
    mysql.pool.query('SELECT DISTINCT job_title FROM employees',function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        res.send(rows);
    });
});

//Loads the Employees table by the selected job_title
app.get('/fltrByJT', function(req,res,next){
    mysql.pool.query('SELECT first_name, last_name, job_title FROM employees WHERE job_title=?', [req.query.job_title], function(err, row, fields){
        if(err){
            next(err);
            return;
        }
        res.send(row);
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
