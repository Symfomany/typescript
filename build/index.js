// Utiliser webpack ou la commande tsc -w
// Checker le fichier de configuration tsconfig.json
// Utilisation de typings pour charger les modules
"use strict";
var demo_1 = require("./demo");
var d = new demo_1.default({
    autoplay: true,
    x: 12,
    success: function (toto) { }
});
d.demo();
$('.demo').click(function () {
    console.log('hello');
});
