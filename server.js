// MEAN Stack RESTful API Tutorial - Contact List App
// get, post, delete, put

//npm install express 
var express = require('express');

//npm install express
var app = express();

//npm install mongojs
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

//npm install body-parser
var bodyParser = require('body-parser');


// create new a folder as for public
app.use(express.static(__dirname + '/public'));
// because of body-parser
app.use(bodyParser.json());

// from express framework search for contactlist
app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  // showing on your git.bash (command prompt) .find() list
  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    // have to be add the req.body.* (* is name, email, number shortcut)
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");