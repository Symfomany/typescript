// import * as lib from './vendor';

// import "./sass/main.scss";

import { Observable } from 'rxjs';


// const tab = lib.chunky(['a', 'b', 'c', 'd', 'e'], 2);
// console.log(tab);

// import * as moment from "moment";

// const date = moment().format("YYYY");
// console.log(date);

console.log("TS ready!!!");
console.log("RxJS lib is ready!");

const res = Observable.of(1, 3, 3).map(x => x + '!!!'); // etc 
res.subscribe(function (x) { console.log(x); });

const resTwo = Observable.interval(400).take(8).map(x => [2, 6, "la", 9, "no", 15, 1, 3][x]); // etc 

const resu = resTwo
    .map(z => Number(z))
    .filter(x => !isNaN(x))
    .reduce((x, y) => x + y)

resu.subscribe(function (x) { console.log(x); });


var button = document.querySelector('.button');
var label = document.querySelector('h4');

var clickStream = Observable.fromEvent(button, 'click');


var doubleClickStream = clickStream
    .buffer(x => clickStream.debounce(250))
    .map(arr => arr.length)
    .filter(len => len === 2);


doubleClickStream.subscribe(event => {
    label.textContent = 'double click';
});

doubleClickStream
    .delay(1000)
    .subscribe(suggestion => {
        label.textContent = '-';
    });



// console.log(lib.demo.phrase);

// let d = new lib.demo.Demo('Cool :)');
// console.warn(d.out());

// lib.jQuery(function () {
//     console.log("Jquery ready!");
//     lib.jQuery('.demo').click(function () {
//         console.log('Ok...');
//     })
// })

