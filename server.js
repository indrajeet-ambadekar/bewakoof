/**
* code created by indrajeet ambadekar
*/

var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var cors = require('cors');
var app     = express();
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/search', function(req, res){
  url = 'https://serpapi.com/search.json?source=homepage&q='+req.query.q;
  request(url, function(error, response, html){
    var list = response.body;
    if(response){
      res.set('Content-Type', 'application/json');
      res.send(list);
    }
    else{
      res.send({status:'failed','error':error});
      
    }
    return list;
  })
})


app.listen('9000')

console.log('Server running at 9000');
exports = module.exports = app;