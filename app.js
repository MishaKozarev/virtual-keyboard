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
const LAYOT_RU_CAPSLOCK_SHIFT = LAYOT_EN.capsLockAndShift.split(' ');


let lang = 'en';
let flag = false;
let count = [];
let layot = 'en-normal'
let caps = false;
let shift = false;
DISPLEY.focus();

// Добавить раскладку
function addLayot(layot) {
  for (let i = 0; i < layot.length; i++) {
    keyboardRow.children[i].innerHTML = layot[i];
  }
}

// Инициализация
function init() {
  addLayot(LAYOT_EN_NORMAL);
}
init();


document.onkeydown = function (event) {
  if(event.code === 'Delete') {
    event.stopPropagation();
  }
}

// Ввод с клавиатуры
document.onkeydown = function (event) {
  let current = document.querySelector(`.press[data-key="${event.code}"]`)
  current.classList.add('active');
  setTimeout(() => current.classList.remove('active'), 300);
  event.preventDefault();
    if(lang === 'en') {
      let inner = LAYOT_EN_NORMAL[current.id]
      DISPLEY.value += inner
      count = DISPLEY.value.split('');
    }else if(lang === 'ru') {
      let inner = LAYOT_RU_NORMAL[current.id]
      DISPLEY.value += inner
      count = DISPLEY.value.split('');
    }
}

// document.onkeydown = function (event) {
//   if (event.code === 'Delete') {
//     event.stopPropagation();
//     count.pop();
//     DISPLEY.value = count.join('');
//   }
// }


// Смена языка клавиатурой
window.onkeydown = function (e) {
  if (lang === 'en') {
    if (e.code === 'ShiftLeft') flag = true;
    if (e.code === 'AltLeft' && flag) {
      addLayot(LAYOT_RU_NORMAL);
      flag = false;
      lang = 'ru';
      layot = 'ru-normal'
    }
  } else {
    if (e.code === 'ShiftLeft') flag = true;
    if (e.code === 'AltLeft' && flag) {
      addLayot(LAYOT_EN_NORMAL);
      flag = false;
      lang = 'en';
      layot = 'en-normal'
    }
  }
};

// CapsLock клавиатурой
window.addEventListener('keyup', (event) => {
  if (lang === 'en') {
    if (event.getModifierState('CapsLock')) {
      addLayot(LAYOT_EN_CAPSLOCK);
      caps = true;
      KEY_CAPS.classList.add('active-all')
    } else {
      addLayot(LAYOT_EN_NORMAL);
      caps = false;
      KEY_CAPS.classList.remove('active-all')
    }
  } else if (event.getModifierState('CapsLock')) {
    addLayot(LAYOT_RU_CAPSLOCK);
    caps = true;
    KEY_CAPS.classList.add('active-all')
  } else {
    addLayot(LAYOT_RU_NORMAL);
    caps = false;
    KEY_CAPS.classList.remove('active-all')
  }
});


// // Shift клавиатурой
// window.onkeydown = function (event) {
//     if (lang === 'en') {
//       if (event.code === 'ShiftLeft') {
//         addLayot(LAYOT_EN_SHIFT);
//       } else {
//         addLayot(LAYOT_EN_NORMAL);
//       }
//     }else{
//       if (event.code === 'ShiftLeft') {
//         addLayot(LAYOT_RU_SHIFT);
//       } else {
//         addLayot(LAYOT_RU_NORMAL);
//         }
//     }
//   };



// Shift + CapsLock клавиатурой
// window.onkeydown = function (event) {
//     if (lang === 'en') {
//         if (event.getModifierState('CapsLock')){
//             if (event.code === 'ShiftLeft') {
//                 addLayot(LAYOT_EN_CAPSLOCK_SHIFT);
//             }
//         }
//     }else{
//         if (event.getModifierState('CapsLock')){
//             if (event.code === 'ShiftLeft') {
//                 addLayot(LAYOT_RU_CAPSLOCK_SHIFT);
//             }
//         }
//     }
// }


KEYS.forEach((element) => {
  element.addEventListener('click', ()=> {
  console.log(element)
  DISPLEY.value += element.innerText
  element.classList.add('active');
  setTimeout(() => element.classList.remove('active'), 300);
  count = DISPLEY.value.split('');
  })
});

KEY_DELETE.addEventListener('click',() => {
  KEY_DELETE.classList.add('active');
  setTimeout(() => KEY_DELETE.classList.remove('active'), 300);
  count.pop();
  DISPLEY.value = count.join('');
});

KEY_BACKSPACE.addEventListener('click',() => {
  KEY_BACKSPACE.classList.add('active');
  setTimeout(() => KEY_BACKSPACE.classList.remove('active'), 300);
  count.pop();
  DISPLEY.value = count.join('');
});

KEY_TAB.addEventListener('click',() => {
  KEY_TAB.classList.add('active');
  setTimeout(() => KEY_TAB.classList.remove('active'), 300);
  DISPLEY.value = count.join('');
});

// KEY_ENTER.addEventListener('click',() => {
//   KEY_ENTER.classList.add('active');
//   setTimeout(() => KEY_ENTER.classList.remove('active'), 300);
//   DISPLEY.value = count.join('');
// });

KEY_SPACE.addEventListener('click',() => {
  KEY_SPACE.classList.add('active');
  setTimeout(() => KEY_SPACE.classList.remove('active'), 300);
  DISPLEY.value = count.join('');
});

KEY_CONTROL.forEach((element) => {
  element.addEventListener('click', ()=> {
    element.classList.add('active');
    setTimeout(() => element.classList.remove('active'), 300);
    count = [];
    DISPLEY.value = count.join('');
  })
});

KEY_ALT.forEach((element) => {
  element.addEventListener('click', ()=> {
    element.classList.add('active');
    setTimeout(() => element.classList.remove('active'), 300);
    count = [];
    DISPLEY.value = count.join('');
  })
});


KEY_CAPS.addEventListener('click',() => {
  if(lang === 'en') {
    if(caps === false) {
      addLayot(LAYOT_EN_CAPSLOCK);
      caps = true;
      KEY_CAPS.classList.add('active-all')
    }else{
      addLayot(LAYOT_EN_NORMAL);
      caps = false
      KEY_CAPS.classList.remove('active-all')
    }
  }else{
    if(caps === false) {
      addLayot(LAYOT_RU_CAPSLOCK);
      caps = true;
      KEY_CAPS.classList.add('active-all')
    }else{
      addLayot(LAYOT_RU_NORMAL);
      caps = false
      KEY_CAPS.classList.remove('active-all')
    }
  }
});


KEY_SHIFT.forEach((element) => {
  element.addEventListener('click',() => {
    if(lang === 'en') {
      if(shift === false) {
        addLayot(LAYOT_EN_SHIFT);
        shift = true;
        element.classList.add('active-all')
      }else{
        addLayot(LAYOT_EN_NORMAL);
        shift = false
        element.classList.remove('active-all')
      }
    }else{
      if(shift === false) {
        addLayot(LAYOT_RU_SHIFT);
        shift = true;
        element.classList.add('active-all')
      }else{
        addLayot(LAYOT_RU_NORMAL);
        shift = false
        element.classList.remove('active-all')
      }
    }
  });
});


