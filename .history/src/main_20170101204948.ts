import { jQuery } from './vendor';
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
console.info("Documenation : https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md");

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

/**
 * Documentation ici: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferWhen
 */
const doubleClickStream = clickStream
    .bufferWhen(() => clickStream.debounceTime(800))
    .map(arr => arr.length)
    .filter(len => len === 2) // nb de clique égale a 2 sue la longeur du tableau des clicks
    .map(x => console.log(x))


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


var numbers = Observable.of(10, 20, 30);
var letters = Observable.of('a', 'b', 'c');
var interval = Observable.interval(1000);
var result = numbers.concat(letters).concat(interval);
console.log(result);
result.subscribe(x => console.log(x));


// Convert jQuery's getJSON to an Observable API
// Suppose we have jQuery.getJSON('/my/url', callback)
var getJSONAsObservable = Observable.bindCallback(jQuery.getJSON);
var result = getJSONAsObservable('https://jsonplaceholder.typicode.com/users');
result.subscribe(x => console.log(x), e => console.error(e));


// let a = 123;
// let b = 10 * a;

// console.log(b);

// a = 4;
// console.log(b);



//console.clear();

// var a = [3, 4];
// var b = a.map((x) => x * 5);
// console.table(b);



// refreshClickStream: -------f------------->
// requestStream:      r------r------------->
// responseStream:     ---R-------R--------->
// closeClickStream:   ---------------x----->
// suggestion1Stream:  N--u---N---u---u----->

var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var refreshClickStream = Observable.fromEvent(refreshButton, 'click');
var close1Clicks = Observable.fromEvent(closeButton1, 'click');
var close2Clicks = Observable.fromEvent(closeButton2, 'click');
var close3Clicks = Observable.fromEvent(closeButton3, 'click');


var startupRequestStream = Observable.of('https://api.github.com/users');

var requestOnRefreshStream = refreshClickStream
    .map(ev => {
        var randomOffset = Math.floor(Math.random() * 500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });

var requestStream = startupRequestStream.merge(requestOnRefreshStream);

var responseStream = requestStream
    .flatMap(requestUrl =>
        Observable.fromPromise(jQuery.getJSON(requestUrl))
    )
    .publishReplay(1).refCount();

function getRandomUser(listUsers) {
    return listUsers[Math.floor(Math.random() * listUsers.length)];
}

function createSuggestionStream(responseStream, closeClickStream) {
    return responseStream.map(getRandomUser)
        .startWith(null)
        .merge(refreshClickStream.map(ev => null))
        .merge(
        closeClickStream.withLatestFrom(responseStream,
            (x, R) => getRandomUser(R))
        );
}

var suggestion1Stream = createSuggestionStream(responseStream, close1Clicks);
var suggestion2Stream = createSuggestionStream(responseStream, close2Clicks);
var suggestion3Stream = createSuggestionStream(responseStream, close3Clicks);

// Rendering ---------------------------------------------------
function renderSuggestion(suggestedUser, selector) {
    var suggestionEl = document.querySelector(selector);
    if (suggestedUser === null) {
        suggestionEl.style.visibility = 'hidden';
    } else {
        suggestionEl.style.visibility = 'visible';
        var usernameEl = suggestionEl.querySelector('.username');
        usernameEl.href = suggestedUser.html_url;
        usernameEl.textContent = suggestedUser.login;
        var imgEl = suggestionEl.querySelector('img');
        imgEl.src = "";
        imgEl.src = suggestedUser.avatar_url;
    }
}

suggestion1Stream.subscribe(user => {
    renderSuggestion(user, '.suggestion1');
});

suggestion2Stream.subscribe(user => {
    renderSuggestion(user, '.suggestion2');
});

suggestion3Stream.subscribe(user => {
    renderSuggestion(user, '.suggestion3');
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

