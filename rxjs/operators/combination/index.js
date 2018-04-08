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
  // .subscribe(console.log);
// source2$.merge(source1$).subscribe(console.log);
// Rx.Observable.merge(source2$, source1$).subscribe(console.log);


// combineLatest, forkJoin, zip
const letter$ = Rx.Observable.from(["a", "b", "c"]);
const number$ = Rx.Observable.from([1, 2, 3, 4]);
Rx.Observable.combineLatest(letter$, number$)
  .subscribe(
    v => console.log("combineLatest: ", v)
    // [c, 1], [c, 2], [c, 3], [c, 4]
  );
Rx.Observable.forkJoin(letter$, number$)
  .subscribe(
    v => console.log("forkJoin: ", v)
    // [c, 4]
  );
Rx.Observable.zip(letter$, number$, (l, n) => l + ' - ' + n)
  .subscribe(
    v => console.log("zip: ", v)
    // [a, 1], [b, 2], [c, 3]
  );