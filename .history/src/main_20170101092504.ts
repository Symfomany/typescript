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



//console.clear();

// var a = [3, 4];
// var b = a.map((x) => x * 5);
// console.table(b);



// refreshClickStream: -------f------------->
// requestStream:      r------r------------->
// responseStream:     ---R-------R--------->
// closeClickStream:   ---------------x----->
// suggestion1Stream:  N--u---N---u---u----->

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
    .shareReplay(1);

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


// let streamA = Observable.of(3, 4);
// let streamB = streamA.map(a => 10 * a);
// // streamA.map(a => console.log(a));
// streamB.subscribe(b => console.log(b));

// let requestStream = Observable.of('https://api.github.com/users');
// const refreshButton = document.querySelector('.refresh');
// const closeButton1 = document.querySelector('.close1');
// const closeButton2 = document.querySelector('.close2');
// const closeButton3 = document.querySelector('.close3');


// const refreshClickStream = Observable.fromEvent(refreshButton, 'click');
// const startupRequestStream = Observable.of('https://api.github.com/users');

// const requestOnRefreshStream = refreshClickStream
//     .map(ev => {
//         console.log(ev);
//         const randomOffset = Math.floor(Math.random() * 500);
//         return 'https://api.github.com/users?since=' + randomOffset;
//     });

// let responseStream = startupRequestStream.merge(requestOnRefreshStream)
//     .flatMap(requestUrl => {
//         console.log('do network request...');
//         Observable.fromPromise(jQuery.getJSON(requestUrl))
//     });

// setTimeout(() => {
//     responseStream.subscribe(user => console.log(user))
// }, 3000);

// /**
//  * Create Suggestion of User
//  */
// function createSuggestionStream(responseStream) {
//     return responseStream.map(listUser =>
//         listUser[Math.floor(Math.random() * listUser.length)]
//     )
//         .startWith(null)
//         .merge(refreshClickStream.map(ev => null));
// }



// let suggestionStream = createSuggestionStream(responseStream);
// let suggestionTwoStream = createSuggestionStream(responseStream);
// let suggestionThreeStream = createSuggestionStream(responseStream);




/**
 * Rendering in DOM
 */
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

suggestionStream.subscribe(user => {
    console.log(user)
    renderSuggestion(user, '.suggestion1')
});
suggestionTwoStream.subscribe(user => {
    console.log(user)
    renderSuggestion(user, '.suggestion2');
});
suggestionThreeStream.subscribe(user => {
    console.log(user)
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

