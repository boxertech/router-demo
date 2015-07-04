/**
 * Created by Ken on 3/29/14.
 */
var util = require('util'),
  events = require('events').EventEmitter;

var res = function() {

};

util.inherits(res, events);
res.prototype.send = function(payload, code){
  this.emit('response', {
    code: code,
    response: payload
  });
}

module.exports = function() {
  return new res();
};