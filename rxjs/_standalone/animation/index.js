/* global Rx */
const { Observable, Scheduler } = Rx;

const msElapsed = (scheduler = Scheduler.animationFrame) =>
  Observable.defer(() => {
    const start = scheduler.now();
    return Observable.interval(0, scheduler)
      .map(() => scheduler.now() - start);
  });

const durationUgly$ = (msDuration) =>
  msElapsed()
    .takeWhile(t => t < msDuration);

const duration$ = (msDuration) =>
  msElapsed()
    .map(t => t / msDuration)
    .takeWhile(p => p < 1);

duration$(3000)
  .subscribe((percent) => {
    console.log('percent: ', percent);
  });
