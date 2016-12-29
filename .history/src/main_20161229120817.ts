import * as $ from 'jquery';
import * as sass from 'sass/main.scss';
// import { Demo } from './demo';

console.log("TS ready ...");

// let d = new Demo('cool');
// console.warn(d.out());

$(function () {
	$('.demo').click(function () {
		console.log('hello');
	})
})

console.log("Jquery ready ...");
