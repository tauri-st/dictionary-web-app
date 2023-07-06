/**
 * Copyright © 2023 W3C®. This software or document includes material copied from 
 * or derived from [Button Examples]https://www.w3.org/WAI/ARIA/apg/patterns/button/examples/button/
 * and [the Navigation Button Example]https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/.
 * [Full text of W3CSoftware License]https://www.w3.org/copyright/document-license-2023/
 */

/****************** DARKMODE TOGGLE ******************/
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

 /****************** FONT DROPDOWN MENU ******************/
 'use strict';

class MenuButtonLinks {
  constructor(domNode) {
    this.domNode = domNode;
    this.buttonNode = domNode.querySelector('button');
    this.menuNode = domNode.querySelector('[role="menu"]');
    this.menuitemNodes = [];
    this.firstMenuitem = false;
    this.lastMenuitem = false;
    this.firstChars = [];

    this.buttonNode.addEventListener(
      'keydown',
      this.onButtonKeydown.bind(this)
    );
    this.buttonNode.addEventListener('click', this.onButtonClick.bind(this));

    var nodes = domNode.querySelectorAll('[role="menuitem"]');

    // Jump to menu item where first letter matches typed letter
    for (var i = 0; i < nodes.length; i++) {
      var menuitem = nodes[i];
      this.menuitemNodes.push(menuitem);
      menuitem.tabIndex = -1;
      this.firstChars.push(menuitem.textContent.trim()[0].toLowerCase());

      menuitem.addEventListener('keydown', this.onMenuitemKeydown.bind(this));

      menuitem.addEventListener(
        'mouseover',
        this.onMenuitemMouseover.bind(this)
      );

      if (!this.firstMenuitem) {
        this.firstMenuitem = menuitem;
      }
      this.lastMenuitem = menuitem;
    }

    domNode.addEventListener('focusin', this.onFocusin.bind(this));
    domNode.addEventListener('focusout', this.onFocusout.bind(this));

    window.addEventListener(
      'mousedown',
      this.onBackgroundMousedown.bind(this),
      true
    );
  }

  setFocusToMenuitem(newMenuitem) {
    this.menuitemNodes.forEach(function (item) {
      if (item === newMenuitem) {
        item.tabIndex = 0;
        newMenuitem.focus();
      } else {
        item.tabIndex = -1;
      }
    });
  }

  setFocusToFirstMenuitem() {
    this.setFocusToMenuitem(this.firstMenuitem);
  }

  setFocusToLastMenuitem() {
    this.setFocusToMenuitem(this.lastMenuitem);
  }

  setFocusToPreviousMenuitem(currentMenuitem) {
    var newMenuitem, index;

    if (currentMenuitem === this.firstMenuitem) {
      newMenuitem = this.lastMenuitem;
    } else {
      index = this.menuitemNodes.indexOf(currentMenuitem);
      newMenuitem = this.menuitemNodes[index - 1];
    }

    this.setFocusToMenuitem(newMenuitem);

    return newMenuitem;
  }

  setFocusToNextMenuitem(currentMenuitem) {
    var newMenuitem, index;

    if (currentMenuitem === this.lastMenuitem) {
      newMenuitem = this.firstMenuitem;
    } else {
      index = this.menuitemNodes.indexOf(currentMenuitem);
      newMenuitem = this.menuitemNodes[index + 1];
    }
    this.setFocusToMenuitem(newMenuitem);

    return newMenuitem;
  }

  setFocusByFirstCharacter(currentMenuitem, char) {
    var start, index;

    if (char.length > 1) {
      return;
    }

    char = char.toLowerCase();

    // Get start index for search based on position of currentItem
    start = this.menuitemNodes.indexOf(currentMenuitem) + 1;
    if (start >= this.menuitemNodes.length) {
      start = 0;
    }

    // Check remaining slots in the menu
    index = this.firstChars.indexOf(char, start);

    // If not found in remaining slots, check from beginning
    if (index === -1) {
      index = this.firstChars.indexOf(char, 0);
    }

    // If match was found...
    if (index > -1) {
      this.setFocusToMenuitem(this.menuitemNodes[index]);
    }
  }

  // Utilities

  getIndexFirstChars(startIndex, char) {
    for (var i = startIndex; i < this.firstChars.length; i++) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  }

  // Popup menu methods

  openPopup() {
    this.menuNode.style.display = 'block';
    this.buttonNode.setAttribute('aria-expanded', 'true');
  }

  closePopup() {
    if (this.isOpen()) {
      this.buttonNode.removeAttribute('aria-expanded');
      this.menuNode.style.display = 'none';
    }
  }

  isOpen() {
    return this.buttonNode.getAttribute('aria-expanded') === 'true';
  }

  // Menu event handlers

  onFocusin() {
    this.domNode.classList.add('focus');
  }

  onFocusout() {
    this.domNode.classList.remove('focus');
  }

  onButtonKeydown(event) {
    var key = event.key,
      flag = false;

    switch (key) {
      case ' ':
      case 'Enter':
      case 'ArrowDown':
      case 'Down':
        this.openPopup();
        this.setFocusToFirstMenuitem();
        flag = true;
        break;

      case 'Esc':
      case 'Escape':
        this.closePopup();
        this.buttonNode.focus();
        flag = true;
        break;

      case 'Up':
      case 'ArrowUp':
        this.openPopup();
        this.setFocusToLastMenuitem();
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onButtonClick(event) {
    if (this.isOpen()) {
      this.closePopup();
      this.buttonNode.focus();
    } else {
      this.openPopup();
      this.setFocusToFirstMenuitem();
    }

    event.stopPropagation();
    event.preventDefault();
  }

  onMenuitemKeydown(event) {
    var tgt = event.currentTarget,
      key = event.key,
      flag = false;

    function isPrintableCharacter(str) {
      return str.length === 1 && str.match(/\S/);
    }

    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    if (event.shiftKey) {
      if (isPrintableCharacter(key)) {
        this.setFocusByFirstCharacter(tgt, key);
        flag = true;
      }

      if (event.key === 'Tab') {
        this.buttonNode.focus();
        this.closePopup();
        flag = true;
      }
    } else {
      switch (key) {
        case ' ':
          window.location.href = tgt.href;
          break;

        case 'Esc':
        case 'Escape':
          this.closePopup();
          this.buttonNode.focus();
          flag = true;
          break;

        case 'Up':
        case 'ArrowUp':
          this.setFocusToPreviousMenuitem(tgt);
          flag = true;
          break;

        case 'ArrowDown':
        case 'Down':
          this.setFocusToNextMenuitem(tgt);
          flag = true;
          break;

        case 'Home':
        case 'PageUp':
          this.setFocusToFirstMenuitem();
          flag = true;
          break;

        case 'End':
        case 'PageDown':
          this.setFocusToLastMenuitem();
          flag = true;
          break;

        case 'Tab':
          this.closePopup();
          break;

        default:
          if (isPrintableCharacter(key)) {
            this.setFocusByFirstCharacter(tgt, key);
            flag = true;
          }
          break;
      }
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onMenuitemMouseover(event) {
    var tgt = event.currentTarget;
    tgt.focus();
  }

  onBackgroundMousedown(event) {
    if (!this.domNode.contains(event.target)) {
      if (this.isOpen()) {
        this.closePopup();
        this.buttonNode.focus();
      }
    }
  }
}

// Initialize menu buttons

window.addEventListener('load', function () {
  var menuButtons = document.querySelectorAll('.menu-button-links');
  for (let i = 0; i < menuButtons.length; i++) {
    new MenuButtonLinks(menuButtons[i]);
  }
});