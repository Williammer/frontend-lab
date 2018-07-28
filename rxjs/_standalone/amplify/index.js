const { Observable } = Rx;

Observable.prototype.amplifier = function amplifier(power) {
  const input = this;
  return Observable.create(function subscribe(observer) {
    input.subscribe(
      ({ width, height }) => {
        observer.next({
          width: power * width,
          height: power * height
        });
      },
      e => observer.error("output err:", e),
      () => console.log("output complete")
    );
  });
};

const circle = document.getElementById("circle");
const source = Observable.fromEvent(circle, "click")
  .map(({ target: { clientWidth, clientHeight } }) => {
    return { width: clientWidth, height: clientHeight };
  })
  .delay(250);

source.amplifier(4).subscribe(
  ({ width, height }) => {
    circle.style.width = width + "px";
    circle.style.height = height + "px";
  },
  e => console.log(`error: ${e}`),
  () => console.log("complete")
);
