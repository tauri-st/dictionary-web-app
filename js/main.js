const themeSwitchInput = document.querySelector("#toggle");
const ball = document.querySelector(".ball");
const body = document.querySelector("body");
const moon = document.querySelector(".moon");
const toggle = document.querySelector("switch");

themeSwitchInput.addEventListener("click", function () {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        ball.classList.remove("move-right");
        moon.classList.remove("purple");
        toggle.classList.remove("purple");
    } else {
    body.classList.add("dark");
    ball.classList.add("move-right");
    moon.classList.add("purple");
    toggle.classList.add("purple");
    }
});