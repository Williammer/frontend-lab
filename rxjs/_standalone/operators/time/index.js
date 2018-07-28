// timer - Debounce/throttle
const deRottle$ = Rx.Observable.fromEvent(document, "mousemove")
  .debounceTime(2000) // invoke func 2000ms after not bounced(use the end value of 2s)
  // .throttleTime(2000) // invoke func after 2000ms's bouncing(ignore within 2000ms)
  .subscribe(event => {
    console.log(`Mouse at: ${event.x} and ${event.y}`);
  });
deRottle$.unsubscribe();


// timer - Buffer
const startBufferBtn = document.getElementById("start-buffer");
const startBufferBtnClicked = Rx.Observable.fromEvent(startBufferBtn, "click");

const buffer$ = Rx.Observable.timer(0, 50)
  // .bufferWhen(() => shClicked)
  .bufferWhen(() =>
    Rx.Observable.race(
      // handled window closed
      startBufferBtnClicked,
      Rx.Observable.fromEvent(window, "beforeunload")
    )
  )
  // .bufferTime(1000)
  // .bufferCount(15)
  // .buffer(Rx.Observable.timer(500))
  .subscribe(function(val) {
    console.log(`Data in buffer: [${val}]`);
  });
