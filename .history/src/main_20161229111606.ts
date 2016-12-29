// Utiliser webpack ou la commande tsc -w
// Checker le fichier de configuration tsconfig.json
// Utilisation de typings pour charger les modules
import * as $ from 'jquery';
import * as sass from 'sass/main.scss';

import Demo from './demo'
console.log("TS ready ...");

let d = new Demo({
	autoplay: true,
	x: 12,
	success: function (toto) { }
});
d.demo();


$('.demo').click(function () {
	console.log('hello');
})
console.log("Jquery ready ...");
