import { phrase, Demo } from './Demo';
import * as $ from 'jquery';
// import { chunk } from 'lodash'; // library external
// const tab = chunk(['a', 'b', 'c', 'd', 'e'], 2);
// console.log(tab);

// import * as moment from "moment";

// const date = moment().format("YYYY");
// console.log(date);

console.log("TS ready!");
console.log(phrase);

let d = new Demo('Cool :)');
console.warn(d.out());

$(function () {
    console.log("Jquery ready!");
    $('.demo').click(function () {
        console.log('Ok...');
    })
})

