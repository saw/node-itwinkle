var Transport = require('./transport');

var ON = "kleCMD28ff0f0000(&'+\00";
var OFF = "kleCMD2800000000(&'+\00\00";
var COLOR_WAVE = "kleCMD2a00000000(&'+.";


// All the commands spam 10 udp packets to make sure
// it works. Yes. 
function init() {
	var transport = new Transport();


	return {
		on: function() {
			return transport.sendCommand(ON, 10);
		},

		off: function() {
			return transport.sendCommand(OFF, 10);
		},

		setColor: function(color) {
			return transport.sendCommand("kleCMD28fe" + color + "(&'+\00", 10);
		},

		colorWave: function() {
			return transport.sendCommand(COLOR_WAVE, 10);
		}
	};
}

module.exports = {
	init: init
};
