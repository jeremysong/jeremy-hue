const LIGHT_NAMES = ["Kitchen 1", "Kitchen 2", "Task Lamp"]
const DEFAULT_SEQUENCE = ["on"]

let argv = require('yargs').argv;

let sequence =  argv.seq ? argv.seq.split(/\s+/) : undefined;
if (!sequence) {
    // State state to "on" if it's undefined.
    sequence = DEFAULT_SEQUENCE;
}

if (argv.random) {
    sequence = randomSequence();
}
console.log(sequence);

let lights = argv.lights ? argv.lights.split(/\s+/) : undefined;
if (!lights) {
    lights = LIGHT_NAMES;
}
console.log(lights);

let hue = require('philips-hue-api')('http://192.168.4.35/api/nrY2S1lbZthmEJ3QwMfXuHpYzUC7wWrOk4Ex1dOL/');

let controlLights = function(command, args) {
    lights.forEach(name => {
        hue.lights(name)[command](args);
    })
}

function randomSequence() {
    let seq = [];
    for (let i of Array(20)) {
        seq.push(`hue:${Math.floor(Math.random() * 65535)}`);
        seq.push(`brightness:${Math.floor(Math.random() * 254)}`);
        seq.push(`saturation:${Math.floor(Math.random() * 254)}`);
        seq.push(`sleep:500`);
    }
    seq.push("brightness:254");
    seq.push("hue:34000");
    seq.push("saturation:254");
    return seq;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function executeSequence() {
    for (let seq of sequence) {
        console.log(`executing ${seq}`);
        if (seq.startsWith('sleep')) {
            await sleep(seq.split(':')[1]);
        } else {
            let command = seq.split(':')[0];
            let value = seq.split(':')[1];
            if (!isNaN(parseInt(value, 10))) {
                value = parseInt(value, 10);
            }
            controlLights(command, value);
        }
    }
}

executeSequence();