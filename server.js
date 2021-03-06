var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'jnsprasad2',
    database: 'jnsprasad2',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


var pages = {
  page1: {
      title: 'Page One | Siva',
      heading: 'Page1',
      date: 'August 19 2017',
      content: `
            <p>
                Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck.
            </p>
            <p>
                Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck.
            </p>
            <p>
                Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck. Page1 is hosted from the server Good Luck.
            </p>`
  },
  page2: {
      title: 'Page Two | Siva',
      heading: 'Page2',
      date: 'August 20 2017',
      content: `
            <p>
                Page2 is hosted from the server Good Luck.
            </p>`
  },
  page3: {
      title: 'Page Three | Siva',
      heading: 'Page3',
      date: 'August 21 2017',
      content: `
            <p>
                Page3 is hosted from the server Good Luck.
            </p>`
  }
};

function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
        <html>
            <head>
                <title>
                    ${title}
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <hr/>
                    <h3>
                        ${heading}
                    </h3>
                    <div>
                        ${date.toDateString()}
                    </div>
                    <div>
                        ${content}
                        </p>
                    </div>
                </div>
            </body>
        </html>`;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res){
    // make a select request and
    // return a respnse with the results
    pool.query('SELECT * FROM test', function (err, result){
       if (err){
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
});

var counter = 0;
app.get('/counter', function (req, res) {
   counter = counter + 1; 
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function(req, res) { // /submit-name?name=xxxx
   //Get the name from the request
   var name = req.query.name;
   
   names.push(name);
   // JSON: Javascript Object Notation
   res.send(JSON.stringify(names)); //TODO
});

app.get('/pages/:pagenum', function (req,res) {
  
  pool.query("SELECT * FROM page WHERE heading = $1", [req.params.pagenum], function(err,result){
     if (err){
         res.status(500).send(err.toString());
     } else {
         if (result.rows.length === 0){
             res.status(404).send('Page not found');
         } else {
             var pagedata = result.rows[0];
             res.send(createTemplate(pagedata));
         }
     }
  });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
