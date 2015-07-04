/**
 * Created by Ken on 3/29/14.
 */
var request = require('request');

function Requester () {
  this.get = function(path, callback){
    request("http://localhost:3000#{path}", callback);
  };

  this.post = function(path, body, callback){
    request.post({url:"http://localhost:3000#{path}", body: body}, callback);
  };

}

//module.exports = {
//  var app;
//  withServer: function(callback){
//    asyncSpecWait();
//
//    {app} = require('../../server.js');
//  }
//
//};