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

// const res = Observable.of(1, 3, 3).map(x => x + '!!!'); // etc 
// res.subscribe(function (x) { console.log(x); });

// const resTwo = Observable.interval(400).take(8).map(x => [2, 6, "la", 9, "no", 15, 1, 3][x]); // etc 

// const resu = resTwo
//     .map(z => Number(z))
//     .filter(x => !isNaN(x))
//     .reduce((x, y) => x + y)

// resu.subscribe(function (x) { console.log(x); });


const button = document.querySelector('.button');
const label = document.querySelector('h4');

const clickStream = Observable.fromEvent(button, 'click');


const doubleClickStream = clickStream
    .bufferWhen(() => clickStream.debounceTime(250))
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

doubleClickStream
    .delay(3000)
    .subscribe(suggestion => {
        label.textContent = '++';
    });
doubleClickStream
    .delay(3000)
    .subscribe(suggestion => {
        label.textContent = '+------+';
    });

// let a = 123;
// let b = 10 * a;

// console.log(b);

// a = 4;
// console.log(b);



console.clear();

var a = [3, 4];
var b = a.map((x) => x * 5);

var streamA = Observable.of(3, 4);
var streamB = streamA.map(a => 10 * a);
var streamC = streamB.map(a => 10 * a);

streamC.subscribe(b => console.log(b));


// console.log(lib.demo.phrase);

// let d = new lib.demo.Demo('Cool :)');
// console.warn(d.out());

// lib.jQuery(function () {
//     console.log("Jquery ready!");
//     lib.jQuery('.demo').click(function () {
//         console.log('Ok...');
//     })
// })

