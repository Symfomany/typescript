import { phrase, Demo } from './Demo';
// import * as sass from './sass/main.scss';
import * as $ from 'jquery';
import { chunk } from 'lodash/chunk'; // library external
import * as moment from "moment";
const tab = chunk(['a', 'b', 'c', 'd'], 2);
const date = moment().format("YYYY");

console.log("TS ready ...");
console.log(phrase);
console.log(tab);
console.log(date);

let d = new Demo('cool');
console.warn(d.out());

$(function () {
    $('.demo').click(function () {
        console.log('hello');
    })
})

console.log("Jquery ready ...");
