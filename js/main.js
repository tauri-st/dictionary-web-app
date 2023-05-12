const themeSwitchInput = document.querySelector("#toggle");
const ball = document.querySelector(".ball");
const body = document.querySelector("body");

themeSwitchInput.addEventListener("click", function () {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        ball.classList.remove("move-right");
    } else {
    body.classList.add("dark");
    ball.classList.add("move-right");
    }
});