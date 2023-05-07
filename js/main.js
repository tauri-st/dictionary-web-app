var themeSwitchInput = document.querySelector("#toggle");
var ball = document.querySelector(".ball");
var body = document.querySelector("body");
var slider = document.querySelector(".switch");

themeSwitchInput.addEventListener("click", function () {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        ball.classList.remove("move-right");
        slider.classList.remove("switch-purple");
    } else {
    body.classList.add("dark");
    ball.classList.add("move-right");
    slider.classList.add("switch-purple");
    }
});