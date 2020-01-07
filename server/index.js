require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const model = require('./model.js');
// const cors = require('cors');
const db = require('../db/index.js');

// app.use(cors());

const port = 3004;

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/:id', express.static(path.join(__dirname, '../public')));
// app.use('/bundle.js', express.static(path.join(__dirname, '../public/bundle.js')));

app.get('/airbnb/listings/:id', (req, res) => {
  // model.getData(req.params.id, res);
  console.log("Got a get request with id ", req.params.id);
  db.getUserById(req.params.id, res);

});
//
app.post('/airbnb/listings/:id', (req, res) => {
  console.log("got a post request with id", req.params.id);
  db.createUser(req.params.id, res);
  // console.log("got a post request");
});
app.delete('/airbnb/listings/:id', (req, res) => {
  res.send(200);
  console.log("got a delete request");
});
app.put('/airbnb/listings/:id', (req, res) => {
  res.send(200);
  console.log("got a put request");
});
app.listen(port, () => {
  console.log(`listening at port !!! ${port}`);
});
