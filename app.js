let args = process.argv.slice(2);
let state = args[0];
if (!state) {
    // State state to "on" if it's undefined.
    state = 'on';
}

var Hue = require('philips-hue-api'),
    hue = Hue('http://192.168.4.35/api/nrY2S1lbZthmEJ3QwMfXuHpYzUC7wWrOk4Ex1dOL/');

let lightNames = ["Kitchen 1", "Kitchen 2", "Task Lamp"]

lightNames.forEach(name => {
    hue.lights(name)[state]();
});