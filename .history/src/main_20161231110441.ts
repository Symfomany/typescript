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

const resTwo = Observable.interval(100).take(8).map(x => [2, 6, "la", 9, "no", 15, 1, 3][x]); // etc 

const resu = resTwo
    .map(z => Number(z))
    .filter(x => !isNaN(x))
    .reduce((x, y) => x * y)

resu.subscribe(function (x) { console.log(x); });



// console.log(lib.demo.phrase);

// let d = new lib.demo.Demo('Cool :)');
// console.warn(d.out());

// lib.jQuery(function () {
//     console.log("Jquery ready!");
//     lib.jQuery('.demo').click(function () {
//         console.log('Ok...');
//     })
// })

