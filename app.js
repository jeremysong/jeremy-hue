let args = process.argv.slice(2);
let state = args[0];
if (!state) {
    // State state to "on" if it's undefined.
    args = ['on'];
}

var Hue = require('philips-hue-api'),
    hue = Hue('http://192.168.4.35/api/nrY2S1lbZthmEJ3QwMfXuHpYzUC7wWrOk4Ex1dOL/');

const LIGHT_NAMES = ["Kitchen 1", "Kitchen 2", "Task Lamp"]

let controlLights = function(command, args) {
    LIGHT_NAMES
.forEach(name => {
        hue.lights(name)[command](args);
    })
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function executeSequence() {
    for (let arg of args) {
        if (arg.startsWith('sleep')) {
            console.log("Sleeping...");
            await sleep(arg.split(':')[1]);
        } else {
            console.log(arg);
            let command = arg.split(':')[0];
            let value = arg.split(':')[1];
            if (parseInt(value, 10)) {
                value = parseInt(value, 10);
            }
            controlLights(command, value);
        }
    }
}

executeSequence();