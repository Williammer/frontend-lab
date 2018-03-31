// concat, merge, switchMap
const source1$ = Rx.Observable.interval(1000)
  .map(x => `Source 1 ${x}`)
  .take(3);
const source2$ = Rx.Observable.interval(1000)
  .map(y => `Source 2 ${y}`)
  .take(3);
const ssource1$ = Rx.Observable.of([1,2,3]);

source2$
  .do(console.log)
  .switchMap(() => ssource1$.delay(500))
  // .map(() => ssource1$.delay(500))
  // .switch()
  .subscribe(console.log);
// source2$.merge(source1$).subscribe(console.log);
// Rx.Observable.merge(source2$, source1$).subscribe(console.log);


// the Do side effect
const candidates = [1, 2, 3, 4];
const do$ = Rx.Observable.from(candidates)
  .take(2)
  .do(val => {
    console.log(`DO show: ${val}`);
    return val * 1000;
  })
  .subscribe(value => {
    console.log("sub: " + value);
  });
do$.unsubscribe();


// mess with creator under the hood
const intervalObserable$ = Rx.Observable.create(observer => {
  let num = 0;
  const id = setInterval(() => {
    observer.next(`Next ${num++}`);
  }, 1000);
  return () => {
    console.log("----clearInterval");
    clearInterval(id);
  };
});

const subscription = intervalObserable$
  .do(val => console.log("Produced: ", val))
  .delay(4000) // doesn't affect observable generation
  .subscribe(
    next => console.log(next),
    error => console.log(error.message),
    () => console.log("Done!")
  );
subscription.unsubscribe();
setTimeout(function() {
  subscription.unsubscribe();
}, 6000);


// timer - Debounce/throttle
const deRottle$ = Rx.Observable.fromEvent(document, "mousemove")
  .debounceTime(2000) // invoke func 2000ms after not bounced(use the end value of 2s)
  // .throttleTime(2000) // invoke func after 2000ms's bouncing(ignore within 2000ms)
  .subscribe(event => {
    console.log(`Mouse at: ${event.x} and ${event.y}`);
  });
deRottle$.unsubscribe();


// timer - Buffer
const shBtn = document.getElementById("sth-happen");
const shClicked = Rx.Observable.fromEvent(shBtn, "click");

const buffer$ = Rx.Observable.timer(0, 50)
  .bufferWhen(() => shClicked)
  // .bufferTime(1000)
  // .bufferCount(15)
  // .buffer(Rx.Observable.timer(500))
  .subscribe(function(val) {
    console.log(`Data in buffer: [${val}]`);
  });
buffer$.unsubscribe();
