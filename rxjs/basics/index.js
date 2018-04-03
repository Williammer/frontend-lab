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


// `using` for dispsable like objects
class SessionDisposable {
  constructor(sessionToken) {
    this.token = sessionToken;
    this.disposed = false;
    let expiration = moment().add(1, 'days').toDate(); //#A
    document.cookie = `session_token=${sessionToken}; expires=${expiration.toUTCString()}`;   //#B
    console.log('Session created: ' + this.token);
  }

  getToken() {
    return this.token;
  }

  unsubscribe() { //#C
    if (!this.disposed) {
      this.disposed = true;
      this.token = null;
      document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      console.log('Ended session! This object has been disposed.');
    }
  }
}

function generateSessionToken() {
     return 'xyxyxyxy'.replace(/[xy]/g, c => {
         return Math.floor(Math.random() * 10);
     });
}

const $countDownSession = Rx.Observable.using(
   () => new SessionDisposable(generateSessionToken()),
   () => Rx.Observable.interval(1000)
     .startWith(10)
     .scan(val => val - 1)
     .take(10)
);

$countDownSession.subscribe(console.log);
