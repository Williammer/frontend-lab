/**
 *  RxJS in Action
 *  Listing 5.3
 *  Note: make sure you have turned on CORS sharing in your browser so that you can make
 *  cross-site requests
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const searchBox = document.querySelector('#search'); //-> <input>
const results = document.querySelector('#results');  //-> <ul>
const count = document.querySelector('#count');  //-> <ul>
const errorPanel = document.querySelector(".error");  //-> <ul>

const notEmpty = input => !!input && input.trim().length > 0;

// Proxy around CORS -> https://en.wikipedia.org
const URL = '/external/wiki/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=';
const search$ = Rx.Observable.fromEvent(searchBox, "keyup")
  .pluck("target", "value")
  .debounceTime(1000)
  .filter(notEmpty)
  .distinctUntilChanged()
  .map(query => URL + query)
  .mergeMap(query =>
    Rx.Observable.ajax(query)
      .pluck("response", "query", "search")
      .defaultIfEmpty([])
  )
  .do(v => console.log(v))
  .map(entries => entries.map(({ title }) => title))
  // .map(R.map(R.prop("title")))
  .do(arr => (count.innerHTML = `${arr.length} results`))
  .subscribe({
    next(arr) {
      clearResults(results);
      appendResults(arr, results);
    },
    error(err) {
      console.log('error: ', err);
      errorPanel.textContent = err;
    }
  });


function clearResults(container) {
  while(container.childElementCount > 0) {
     container.removeChild(container.firstChild);
  }
}

function appendResults(results, container) {
  for (let result of results) {
    let li = document.createElement('li');
    let text = document.createTextNode(result);
    li.appendChild(text);
    container.appendChild(li);
  }
}
