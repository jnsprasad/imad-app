var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
                        ${date}
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

var counter = 0;
app.get('/counter', function (req, res) {
   counter = counter + 1; 
   res.send(counter.toString());
});

app.get('/:pagenum', function (req,res) {
  var pageno = req.params.pagenum;
  res.send(createTemplate(pages[pageno]));
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

var names=[];
app.get('/submit-name/:name', function(req.res) {
   //Get the name from the request
   var name = req.params.name;
   names.push(name);
   // JSON: Javascript Object Notation
   res.send(JSON.strngify(names)); //TODO
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
