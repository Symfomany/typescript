import * as lib from './vendor';

import "sass/main.scss";

const tab = lib.chunky.chunk(['a', 'b', 'c', 'd', 'e'], 2);
console.log(tab);

// import * as moment from "moment";

// const date = moment().format("YYYY");
// console.log(date);

console.log("TS ready!");
console.log(lib.demo.phrase);

let d = new lib.demo.Demo('Cool :)');
console.warn(d.out());

$(function () {
    console.log("Jquery ready!");
    $('.demo').click(function () {
        console.log('Ok...');
    })
})

