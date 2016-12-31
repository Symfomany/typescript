import { phrase, Demo } from './Demo';
import * as $ from 'jquery';
// import { chunk } from 'lodash'; // library external
// const tab = chunk(['a', 'b', 'c', 'd', 'e'], 2);
// console.log(tab);

// import * as moment from "moment";

// const date = moment().format("YYYY");

console.log("TS ready!");
console.log(phrase);
// console.log(date);

let d = new Demo('cool');
console.warn(d.out());

$(function () {
    $('.demo').click(function () {
        console.log('laaa');
    })
})

console.log("Jquery ready ...");
