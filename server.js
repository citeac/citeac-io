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


/**
 * Starting Server
 */

http.listen(8080);
console.log('mydb started on port 8080');