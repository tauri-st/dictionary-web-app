var button = document.querySelector("#dark-mode-toggle");
var body = document.querySelector("body");

button.addEventListener("click", function () {
    if (body.classList.contains("dark-mode-switch")) {
        body.classList.remove("dark-mode-switch");
    } else {
    body.classList.add("dark-mode-switch");
    }
});