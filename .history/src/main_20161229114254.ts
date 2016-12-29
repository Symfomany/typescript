import * as $ from 'jquery'
import * as sass from 'sass/main.scss'
import Demo from './demo'


console.log("TS ready ...");

let d = new Demo({
	autoplay: true,
	x: 12,
	success: function (toto) { }
});
d.demo();

$(function () {
	$('.demo').click(function () {
		console.log('hello');
	})
})

console.log("Jquery ready ...");
