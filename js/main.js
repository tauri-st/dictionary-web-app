const themeSwitchInput = document.querySelector(".toggle-display"); //the switch display
const ball = document.querySelector(".toggle-display::before"); //the handle
const body = document.querySelector("body");
  
function init() {
  const toggleButton = document.querySelector('#toggle'); //toggle and label
    toggleButton.addEventListener('click', toggleButtonClickHandler);
    toggleButton.addEventListener('keydown', toggleButtonKeydownHandler);
    toggleButton.addEventListener('keyup', toggleButtonKeyupHandler);
  }
/**
  * Toggles the toggle button’s state if it’s actually a button element or has
  * the `role` attribute set to `button`.
  *
  * @param {MouseEvent} event
  */
 function toggleButtonClickHandler(event) {
   if (
     event.currentTarget.tagName === 'button' ||
     event.currentTarget.getAttribute('role') === 'button'
   ) {
     toggleButtonState(event.currentTarget);
   }
 }
 
 /**
  * Toggles the toggle button’s state with the enter key.
  *
  * @param {KeyboardEvent} event
  */
 function toggleButtonKeydownHandler(event) {
   if (event.code === 'Space') {
     event.preventDefault();
   } else if (event.code === 'Enter') {
     event.preventDefault();
     toggleButtonState(event.currentTarget);
   }
 }
 
 /**
  * Toggles the toggle button’s state with space key.
  *
  * @param {KeyboardEvent} event
  */
  function toggleButtonKeyupHandler(event) {
   if (event.code === 'Space') {
     event.preventDefault();
     toggleButtonState(event.currentTarget);
   }
 }
 
 /**
  * Toggles the toggle button’s state between *pressed* and *not pressed*.
  *
  * @param {HTMLElement} button
  */
 function toggleButtonState(button) {
   let isAriaPressed = button.getAttribute('aria-pressed') === 'true';
   button.setAttribute('aria-pressed', isAriaPressed ? 'false' : 'true');
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      themeSwitchInput.classList.remove("purple");
    } else {
      body.classList.add("dark");
      themeSwitchInput.classList.remove("gray");
      themeSwitchInput.classList.add("purple");
    }
 };

 window.onload = init;