var Hue = require('philips-hue-api'),
    hue = Hue('http://192.168.4.35/api/nrY2S1lbZthmEJ3QwMfXuHpYzUC7wWrOk4Ex1dOL/');

hue.lights(4).on();

hue.lights().list(function (error, lights) {
    console.log(lights);
})