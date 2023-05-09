var themeSwitchInput = document.querySelector("#toggle");
var ball = document.querySelector(".ball");
var body = document.querySelector("body");

themeSwitchInput.addEventListener("click", function () {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        ball.classList.remove("move-right");
    } else {
    body.classList.add("dark");
    ball.classList.add("move-right");
    }
});