/**
 * Rx -> Observer pattern + Iterator + functionalProgramming
 * 	it's an higher-order structure with powerful handling for various kind of events,
 * 	such as click, ajax, timeout, callback, promise, etc.
 */

const startBtn = document.getElementById('startBtn');
const console = document.getElementById('console');
const dblClick = Rx.Observable.fromEvent(startBtn, "dblclick").subscribe(() => {
    console.textContent = "ddddouble clicked! ";
});