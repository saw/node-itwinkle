var Transport = require('./transport');

var ON = "kleCMD28ff0f0000(&'+\00";
var OFF = "kleCMD2800000000(&'+\00\00";
var COLOR_WAVE = "kleCMD2a00000000(&'+.";
var PACKET_COUNT = 3;

// All the commands spam 3 udp packets to make sure
// it works. Yes. 
function init() {
	var transport = new Transport();


	return {

		/**
		 * Turn the strand on
		 * @return {Promise}
		 */
		on: function() {
			return transport.sendCommand(ON, PACKET_COUNT);
		},

		/**
		 * Turn the strand off
		 * @return {Promise}
		 */
		off: function() {
			return transport.sendCommand(OFF, PACKET_COUNT);
		},

		/**
		 * Set the color
		 * @param {string} color color to set.
		 * @return {Promise}
		 */
		setColor: function(color) {
			return transport.sendCommand("kleCMD28ff" + color + "(&'+\00", PACKET_COUNT);
		},

		/**
		 * Set three bulbs at a time, identified 
		 * by the code in set
		 *
		 * @param {string} set the set id (0-12 in hex)
		 * @param {string} color the color to set
		 * @return {Promise}
		 */
		setColorSet: function(set, color) {
			console.log("kleCMD050" + set + color + "(&'+\00");
			return transport.sendCommand("kleCMD050" + set + color + "(&'+\00", PACKET_COUNT);
		},	

		/**
		 * Activate color wave
		 * @return {Promise}
		 */
		colorWave: function() {
			return transport.sendCommand(COLOR_WAVE, PACKET_COUNT);
		},

		/**
		 * Send an abitrary command
		 *
		 * @param {string} cmd the command
		 * @return {Promise}
		 */
		sendCommand: function(cmd) {
			return transport.sendCommand(cmd, PACKET_COUNT);
		}
	};
}

module.exports = {
	init: init
};
