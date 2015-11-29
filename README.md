# node-itwinkle
Control GE iTwinkle lights via node

## useage

Connect your computer to your "iTwinkle" access point.

Right now supports on, off, setColor, and setColorSet. Color is right now using the native color format for the lights, which seem to be little-endian so therefor BGR. Each color is only 4 bits (0-f) but the format seems to support eight bits and ignores the value of the first digit, so it is always 0.

setColorSet takes two params, the color "set", which is a hex value from 0-12 (0-C) which represents sets of three bulbs from the start to the end of the strand.

To see this in use in a simple web app checkout https://github.com/saw/lightctrl


```
$ npm install --save node-itwinkle


var iTwinkle = require('node-itwinkle');

iTwinkle.on()
.then(function() {
	// turn it red
	iTwinkle.setColor('00000f');
});
```
