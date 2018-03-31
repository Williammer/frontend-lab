const { Observable } = Rx;
const startBtn = document.getElementById("start-prog");
const prog = document.getElementById("prog");

const progressCount$ = Observable.create(observer => {
  let SPEED = 10;
  let value = 0;

  const prog = () => {
    if (value < 100) {
      observer.next(value++);
      setTimeout(prog, SPEED);
    } else {
      observer.complete();
    }
  };

  prog();

  return unsubVal => {
    console.log("in unsubscribe!!! unsubVal: ", unsubVal);
  };
});


const clickStart = Observable.fromEvent(startBtn, "click")
.switchMap(() => {
  return progressCount$;
})
.take(10)
.repeat()
.subscribe({
  next(v) {
    prog.textContent = v + "%";
  },
  error(e) {
    prog.textContent = "Err!" + e;
  },
  complete() {
    prog.textContent = "DONE!"; // why it didn't complete unless take(...)? click didn't complete?
  }
});
