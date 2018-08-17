import _ from "lodash";
// import _join from "lodash/join";
import "./style.scss";
import TestImgUrl from "./test.jpg";
import Test from "./Test";
// import createPrint from "./print";
import { cube } from "./math";

function component() {
  let element = document.createElement("div");

  const addImg = () => {
    const img = new Image();
    img.src = `./${TestImgUrl}`;
    img.addEventListener("click", async ({ target }) => {
      const module = await import(/* webpackChunkName: "print" */ "./print");
      const print = module.default();
      print(target.src);
    });
    return img;
  };

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack", `* ${cube(2)}`], " ");
  element.classList.add("hello");
  element.appendChild(addImg());

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept("./print.js", function(someArr) {
    console.log("sth changed in print!", someArr);
  });
}
