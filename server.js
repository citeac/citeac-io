/**
 * Dependencies
 */

var mydb = require('mydb');
var http = require('http').Server();
var url = require('url').parse;

var redis = process.env.REDIS;
var secret = process.env.SECRET;

if (!redis) throw new Error('no redis port');
if (!secret) throw new Error('no secret');


/**
 * Pass server into mydb
 */

mydb(http, {
  redis: url(redis).host,
  secret: secret
});


// cache and clean up listeners
var listeners = http.listeners('request').slice();
http.removeAllListeners('request');

// add request handler
http.on('request', function(req, res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  for (var i = 0, l = listeners.length; i < l; i++) {
    listeners[i].call(http, req, res);
  }
});

/**
 * Starting Server
 */

http.listen(8080);
console.log('mydb started on port 8080');