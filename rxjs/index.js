/**
 * Rx -> Observer pattern + Iterator + functionalProgramming
 * 	it's an higher-order structure with powerful handling for various kind of events,
 * 	such as click, ajax, timeout, callback, promise, etc.
 */
var Rx = require('rxjs/Rx');

const obsArr = Rx.Observable.of(1,2,3);

// obsArr.forEach(console.log.bind(console))
obsArr
.filter(value => value > 1)
.subscribe(value => console.log('observed item: '+value));