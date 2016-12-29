// import { Demo } from './demo';

import * as sass from 'sass/main.scss';
import * as $ from 'jquery';

console.log("TS ready ...");

let d = new Demo('cool');
console.warn(d.out());

$(function () {
	$('.demo').click(function () {
		console.log('hello');
	})
})

console.log("Jquery ready ...");
