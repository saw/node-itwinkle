var dgram = require('dgram');
// var async = require('async');
var Promise = require('bluebird');


var Transport = function() {
	this.client = dgram.createSocket('udp4');
	this.port = 1281;
	this.ip = '192.168.1.100';
};

Transport.prototype.close = function() {
	this.client.close();
};

Transport.prototype.sendCommand = function(message, tries) {
	var tasks = [];
	var self = this;
	this.client = dgram.createSocket('udp4');
	for (var i = 0; i < tries; i++) {
		tasks.push(this.send(message));
	}
	return Promise.all(tasks).then(function() {
		self.close();
	});
};

Transport.prototype.send = function(message) {
	var self = this;
	return new Promise(function (resolve, reject) {
		var buff = new Buffer(message);
		self.client.send(buff, 0, buff.length, self.port, self.ip, function(err, bytes) {
			if(err) {
				reject();
			}
			resolve(self);
		});
	});
	

};

module.exports = Transport;