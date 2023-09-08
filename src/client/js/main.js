import "../scss/styles.scss";
import regeneratorRuntime from "regenerator-runtime";

console.log("it works");

window.addEventListener("load", function () {
  if (document.body.scrollHeight > window.innerHeight * 1.0) {
    // Check if body is bigger than 100vh
    document.body.classList.add("relativePosition");
  } else {
    document.body.classList.remove("relativePosition");
  }
});
