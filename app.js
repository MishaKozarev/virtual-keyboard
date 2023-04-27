import KEYBOARD from './js/keyboard.js';
import LAYOT_EN from './js/layot-en.js';
import LAYOT_RU from './js/layot-ru.js';

const body = document.querySelector('.body');
body.insertAdjacentHTML('afterbegin', KEYBOARD);
const DISPLEY = document.querySelector('.input-screen');
const keyboardRow = document.querySelector('.keyboard__row');
const KEYS = document.querySelectorAll('.key');
const KEY_DELETE = document.querySelector('.key-delete');
const SHIFT = document.getElementById('shift');

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
let count  =[];
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

//Подсветка клавиатуро
DISPLEY.onkeydown = function (event) {
  KEYS.forEach((element) => {
    element.classList.remove('active');
  });
  document.querySelector(`.key[data-key="${event.code}"]`).classList.add('active');
};


// Смена языка клавиатурой
window.onkeydown = function (e) {
  if (lang === 'en') {
    if (e.code === 'ShiftLeft') flag = true;
    if (e.code === 'AltLeft' && flag) {
      addLayot(LAYOT_RU_NORMAL);
      flag = false;
      lang = 'ru';
    }
  } else {
    if (e.code === 'ShiftLeft') flag = true;
    if (e.code === 'AltLeft' && flag) {
      addLayot(LAYOT_EN_NORMAL);
      flag = false;
      lang = 'en';
    }
  }
};

// CapsLock клавиатурой
window.addEventListener('keyup', (event) => {
  if (lang === 'en') {
    if (event.getModifierState('CapsLock')) {
      addLayot(LAYOT_EN_CAPSLOCK);
    } else {
      addLayot(LAYOT_EN_NORMAL);
    }
  } else if (event.getModifierState('CapsLock')) {
    addLayot(LAYOT_RU_CAPSLOCK);
  } else {
    addLayot(LAYOT_RU_NORMAL);
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


document.querySelectorAll('.key').forEach((element) => {
    element.onclick = function () {
      document.querySelectorAll('.key').forEach((element) => {
        element.classList.remove('active');
      });
      const code = this.getAttribute('data-key');
      this.classList.add('active');
      DISPLEY.value += element.textContent
      count = DISPLEY.value.split('')
      console.log(code);
    };
});

  KEY_DELETE.addEventListener('click',() => {
    count.pop();
    DISPLEY.value = count.join('');
  });
