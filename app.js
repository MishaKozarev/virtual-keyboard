import KEYBOARD from './js/keyboard.js';
import LAYOT_EN from './js/layot-en.js';
import LAYOT_RU from './js/layot-ru.js';

const body = document.querySelector('.body');
body.insertAdjacentHTML('afterbegin', KEYBOARD);
const DISPLEY = document.querySelector('.display');
const keyboardRow = document.querySelector('.keyboard__row');
const KEYS = document.querySelectorAll('.key');

const KEY_DELETE = document.querySelector('.key-delete');
const KEY_SHIFT = document.querySelectorAll('.key-shift');
const KEY_SPACE = document.querySelector('.key-space');
const KEY_BACKSPACE = document.querySelector('.key-backspace');
const KEY_TAB = document.querySelector('.key-tab');
const KEY_CAPS = document.querySelector('.key-capslock');
const KEY_CONTROL = document.querySelectorAll('.key-сontrol');
const KEY_ALT = document.querySelectorAll('.key-alt');
const KEY_ENTER = document.querySelector('.key-enter');

const LAYOT_EN_NORMAL = LAYOT_EN.normal.split(' ');
const LAYOT_EN_CAPSLOCK = LAYOT_EN.capsLock.split(' ');
const LAYOT_EN_SHIFT = LAYOT_EN.shift.split(' ');
const LAYOT_EN_CAPSLOCK_SHIFT = LAYOT_EN.capsLockAndShift.split(' ');
const LAYOT_RU_NORMAL = LAYOT_RU.normal.split(' ');
const LAYOT_RU_CAPSLOCK = LAYOT_RU.capsLock.split(' ');
const LAYOT_RU_SHIFT = LAYOT_RU.shift.split(' ');
const LAYOT_RU_CAPSLOCK_SHIFT = LAYOT_RU.capsLockAndShift.split(' ');

let lang = localStorage.getItem('lang');
// let lang = 'en';
let flag = false;
let count = [];
let caps = false;
let shift = false;
let current;
let inner;
DISPLEY.focus();


// Добавить раскладку
function addLayot(layot) {
  for (let i = 0; i < layot.length; i++) {
    keyboardRow.children[i].innerHTML = layot[i];
  }
}
// Инициализация
function init() {
  if(lang === 'en') {
    addLayot(LAYOT_EN_NORMAL);
  }else{
    addLayot(LAYOT_RU_NORMAL);
  }
}
init();

document.onload = function() {
  console.log(lang)
  lang = localStorage.getItem('lang');
}

window.onkeydown = function (event) {
  current = document.querySelector(`.press[data-key="${event.code}"]`)
  if(current = true) {
    event.preventDefault();
  }else{
    return true;
  }
}

// Ввод с клавиатуры
window.onkeydown = function (event) {
  console.log(lang)
  current = document.querySelector(`.press[data-key="${event.code}"]`)
  current.classList.add('active');
  setTimeout(() => current.classList.remove('active'), 300);
  if(event.code === 'Delete') {
    DISPLEY.value += '';
    count.pop();
    DISPLEY.value = count.join('');
  }
  else if(event.code === 'Backspace') {
    DISPLEY.value += '';
    count.pop();
    DISPLEY.value = count.join('');
  }
  else if(event.code === 'Enter') {
    DISPLEY.value += '\n';
    count = DISPLEY.value.split('');
    DISPLEY.value = count.join('');
  }
  else if(event.code === 'Tab') {
    DISPLEY.value += '\t';
    count = DISPLEY.value.split('');
    DISPLEY.value = count.join('');
  }
  else if(event.code === 'Space') {
    DISPLEY.value += ' ';
    count = DISPLEY.value.split('');
    DISPLEY.value = count.join('');
  }
  else if(event.code === 'CapsLock') {
    if(lang === 'en') {
      if(caps === false) {
        KEY_CAPS.classList.add('active-all')
        addLayot(LAYOT_EN_CAPSLOCK);
        caps = true;
      }else{
        KEY_CAPS.classList.remove('active-all')
        addLayot(LAYOT_EN_NORMAL);
        caps = false;
      }
    }else{
      if(caps === false) {
        KEY_CAPS.classList.add('active-all')
        addLayot(LAYOT_RU_CAPSLOCK);
        caps = true;
      }else{
        KEY_CAPS.classList.remove('active-all')
        addLayot(LAYOT_RU_NORMAL);
        caps = false;
      }
    }
    DISPLEY.value += '';
    count = DISPLEY.value.split('');
    DISPLEY.value = count.join('');
  }
  else if(event.key === 'Shift') {
    if(lang === 'en') {
      addLayot(LAYOT_EN_SHIFT);
    }else{
      addLayot(LAYOT_RU_SHIFT);
    }
    DISPLEY.value += '';
    count = DISPLEY.value.split('');
    DISPLEY.value = count.join('');
    shift = true;
  }
  else if(event.key === 'Alt') {
    if(lang === 'en') {
      if(shift === true) {
        if(caps === true) {
          addLayot(LAYOT_RU_CAPSLOCK);
          lang = localStorage.setItem('lang', 'ru');
          lang = 'ru'
        }else{
          lang = localStorage.setItem('lang', 'ru');
          addLayot(LAYOT_RU_NORMAL);
          lang = 'ru'
        }
      }else{
        addLayot(LAYOT_EN_NORMAL);
        lang = localStorage.setItem('lang', 'en');
        lang = 'en'
      }
    }else{
      if(shift === true) {
        lang = localStorage.setItem('lang', 'en');
        addLayot(LAYOT_EN_NORMAL);
        lang = 'en'
      }else{
        addLayot(LAYOT_RU_NORMAL);
        lang = localStorage.setItem('lang', 'ru');
        lang = 'ru'
      }
    }
    DISPLEY.value += '';
    count = DISPLEY.value.split('');
    DISPLEY.value = count.join('');
  }
  else if(event.key === 'Control'){
  DISPLEY.value += '';
  count = DISPLEY.value.split('');
  DISPLEY.value = count.join('');
  }
  else if(event.code === 'MetaLeft'){
  DISPLEY.value += '';
  count = DISPLEY.value.split('');
  DISPLEY.value = count.join('');
  }
  else{
    if(lang === 'en') {
      if(caps === true) {
        if(shift === true) {
          addLayot(LAYOT_EN_CAPSLOCK_SHIFT);
          inner = LAYOT_EN_CAPSLOCK_SHIFT[current.id];
          DISPLEY.value += inner;
        }else{
          addLayot(LAYOT_EN_CAPSLOCK);
          inner = LAYOT_EN_CAPSLOCK[current.id];
          DISPLEY.value += inner;
        }
      }else{
        if(shift === true) {
          addLayot(LAYOT_EN_SHIFT);
          inner = LAYOT_EN_SHIFT[current.id];
          DISPLEY.value += inner;
          count = DISPLEY.value.split('');
        }else{
          addLayot(LAYOT_EN_NORMAL);
          inner = LAYOT_EN_NORMAL[current.id];
          DISPLEY.value += inner;
          count = DISPLEY.value.split('');
        }
      }
    }else if(lang === 'ru') {
      if(caps === true) {
        if(shift === true) {
          addLayot(LAYOT_RU_CAPSLOCK_SHIFT);
          inner = LAYOT_RU_CAPSLOCK_SHIFT[current.id];
          DISPLEY.value += inner;
        }else{
          addLayot(LAYOT_RU_CAPSLOCK);
          inner = LAYOT_RU_CAPSLOCK[current.id];
          DISPLEY.value += inner;
        }
      }else{
        if(shift === true) {
          addLayot(LAYOT_RU_NORMAL);
          inner = LAYOT_RU_SHIFT[current.id];
          DISPLEY.value += inner;
          count = DISPLEY.value.split('');
        }else{
          addLayot(LAYOT_RU_SHIFT);
          inner = LAYOT_RU_NORMAL[current.id];
          DISPLEY.value += inner;
          count = DISPLEY.value.split('');
        }
      }
    }
  }

}

document.onkeyup = function(event) {
  if(event.key === 'Shift') {
    if(lang === 'en') {
      if(caps === true) {
        addLayot(LAYOT_EN_CAPSLOCK);
      }else{
        addLayot(LAYOT_EN_NORMAL);
      }
    }else{
      if(caps === true) {
        addLayot(LAYOT_RU_CAPSLOCK);
      }else{
        addLayot(LAYOT_RU_NORMAL);
      }
    }
    shift = false;
    DISPLEY.value += '';
    count = DISPLEY.value.split('');
    DISPLEY.value = count.join('');
  }
}


//-------------------ВИРТУАЛЬНАЯ КЛАВИАТУРА
function pressKeysKeyboard() {
  KEYS.forEach((element) => {
    element.addEventListener('click', ()=> {
      pressEffect(element);
      DISPLEY.value += element.innerText;
      count = DISPLEY.value.split('');
    })
  });
};

function pressKeyDeleteKeyboard () {
  KEY_DELETE.addEventListener('click',() => {
    pressEffect(KEY_DELETE);
    count.pop();
    DISPLEY.value = count.join('');
  });
};

function pressKeyBackspaceKeyboard() {
  KEY_BACKSPACE.addEventListener('click',() => {
    pressEffect(KEY_BACKSPACE);
    count.pop();
    DISPLEY.value = count.join('');
  });
};

function pressKeyTabKeyboard(){
  KEY_TAB.addEventListener('click',() => {
    pressEffect(KEY_TAB);
    DISPLEY.value = count.join('');
  });
};

function pressKeyEnterKeyboard() {
  KEY_ENTER.addEventListener('click',() => {
    pressEffect(KEY_ENTER);
    DISPLEY.value = count.join('');
  });
};

function pressKeySpaceKeyboard() {
  KEY_SPACE.addEventListener('click',() => {
    pressEffect(KEY_SPACE);
    count.push(' ');
    DISPLEY.value = count.join('');
  });
};

function pressKeyControlKeyboard() {
  KEY_CONTROL.forEach((element) => {
    element.addEventListener('click', ()=> {
      pressEffect(element);
      DISPLEY.value = count.join('');
    });
  });
};

function pressKeyAltKeyboard() {
  KEY_ALT.forEach((element) => {
    element.addEventListener('click', ()=> {
      pressEffect(element);
      DISPLEY.value = count.join('');
    });
  });
};


function pressKeyCapsKeyboard() {
  KEY_CAPS.addEventListener('click',() => {
    if(lang === 'en') {
      if(caps === false) {
        if(shift === false) {
          addLayot(LAYOT_EN_CAPSLOCK);
          caps = true;
          KEY_CAPS.classList.add('active-all')
        }else{
          addLayot(LAYOT_EN_CAPSLOCK_SHIFT);
          KEY_CAPS.classList.add('active-all');
          caps = true;
          shift = true;
        }
      }else{
        if(shift === false) {
          addLayot(LAYOT_EN_NORMAL);
          caps = false;
          shift = false;
          KEY_CAPS.classList.remove('active-all')
        }else{
          addLayot(LAYOT_EN_SHIFT);
          KEY_CAPS.classList.remove('active-all')
          caps = false;
        }
      }
    }else{
      if(caps === false) {
        if(shift === false) {
          addLayot(LAYOT_RU_CAPSLOCK);
          caps = true;
          KEY_CAPS.classList.add('active-all')
        }else{
          addLayot(LAYOT_RU_CAPSLOCK_SHIFT);
          KEY_CAPS.classList.add('active-all');
          caps = true;
          shift = true;
        }
      }else{
        if(shift === false) {
          addLayot(LAYOT_RU_NORMAL);
          caps = false;
          shift = false;
          KEY_CAPS.classList.remove('active-all')
        }else{
          addLayot(LAYOT_RU_SHIFT);
          KEY_CAPS.classList.remove('active-all')
          caps = false;
        }
      }
    }
  });
};

function pressKeyShiftKeyboard() {
  KEY_SHIFT.forEach((element) => {
    element.addEventListener('click',() => {
      if(lang === 'en') {
        if(shift === false) {
          if(caps === false) {
            addLayot(LAYOT_EN_SHIFT);
            shift = true;
            element.classList.add('active-all')
          }else{
            addLayot(LAYOT_EN_CAPSLOCK_SHIFT);
            element.classList.add('active-all')
            shift = true;
            caps = true;
          }
        }else{
          if(caps === false) {
            addLayot(LAYOT_EN_NORMAL);
            shift = false;
            caps = false;
            element.classList.remove('active-all')
          }else{
            addLayot(LAYOT_EN_CAPSLOCK);
            element.classList.remove('active-all')
            shift = false;
          }
        }
      }else{
        if(shift === false) {
          if(caps === false) {
            addLayot(LAYOT_RU_SHIFT);
            shift = true;
            element.classList.add('active-all')
          }else{
            addLayot(LAYOT_RU_CAPSLOCK_SHIFT);
            element.classList.add('active-all')
            shift = true;
            caps = true;
          }
        }else{
          if(caps === false) {
            addLayot(LAYOT_RU_NORMAL);
            shift = false;
            caps = false;
            element.classList.remove('active-all')
          }else{
            addLayot(LAYOT_RU_CAPSLOCK);
            element.classList.remove('active-all')
            shift = false;
          }
        }
      }
    });
  });
};

function changeLanguage() {
  KEY_ALT.forEach((element) => {
    element.addEventListener('click',() => {
      console.log(lang)
      if(lang === 'en') {
        if(shift === true) {
          if(caps === true) {
            addLayot(LAYOT_RU_CAPSLOCK_SHIFT);
            lang = localStorage.setItem('lang', 'ru');
            lang = 'ru'
          }else{
            addLayot(LAYOT_RU_SHIFT);
            lang = localStorage.setItem('lang', 'ru');
            lang = 'ru'
          }
        }
      }else{
        if(shift === true) {
          if(caps === true) {
            addLayot(LAYOT_EN_CAPSLOCK_SHIFT);
            lang = localStorage.setItem('lang', 'en');
            lang = 'en'
          }else{
            addLayot(LAYOT_EN_SHIFT);
            lang = localStorage.setItem('lang', 'en');
            lang = 'en'
          }
        }
      }
    });
  });
};


changeLanguage()
pressKeysKeyboard();
pressKeyDeleteKeyboard();
pressKeyBackspaceKeyboard();
pressKeyTabKeyboard();
pressKeyEnterKeyboard();
pressKeySpaceKeyboard();
pressKeyControlKeyboard();
pressKeyAltKeyboard();
pressKeyCapsKeyboard();
pressKeyShiftKeyboard();


function pressEffect(element) {
  element.classList.add('active');
  setTimeout(() => element.classList.remove('active'), 300);
};


