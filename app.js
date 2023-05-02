import KEYBOARD from './js/keyboard.js';
import LAYOT_EN from './js/layot-en.js';
import LAYOT_RU from './js/layot-ru.js';

const body = document.querySelector('.body');
body.insertAdjacentHTML('afterbegin', KEYBOARD);
const TEXTAREA = document.querySelector('.display');
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
const KEY_WIN = document.querySelector('.key-win');

const LAYOT_EN_NORMAL = LAYOT_EN.normal.split(' ');
const LAYOT_EN_CAPSLOCK = LAYOT_EN.capsLock.split(' ');
const LAYOT_EN_SHIFT = LAYOT_EN.shift.split(' ');
const LAYOT_EN_CAPSLOCK_SHIFT = LAYOT_EN.capsLockAndShift.split(' ');
const LAYOT_RU_NORMAL = LAYOT_RU.normal.split(' ');
const LAYOT_RU_CAPSLOCK = LAYOT_RU.capsLock.split(' ');
const LAYOT_RU_SHIFT = LAYOT_RU.shift.split(' ');
const LAYOT_RU_CAPSLOCK_SHIFT = LAYOT_RU.capsLockAndShift.split(' ');

let lang = localStorage.getItem('lang');
let caps = false;
let shift = false;
let current;
let text;
TEXTAREA.focus();

// Добавить раскладку
function addLayot(layot) {
  for (let i = 0; i < layot.length; i += 1) {
    keyboardRow.children[i].innerHTML = layot[i];
  }
}
// Инициализация
function init() {
  if (lang === 'en') {
    addLayot(LAYOT_EN_NORMAL);
  } else {
    addLayot(LAYOT_RU_NORMAL);
  }
}
init();

document.addEventListener('click', () => {
  TEXTAREA.focus();
});

document.addEventListener('load', () => {
  console.log(lang);
  lang = localStorage.getItem('lang');
});

function insertText(textarea, txt) {
  const textArea = textarea;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const finishText = textArea.value.substring(0, start) + txt + textArea.value.substring(end);
  textArea.value = finishText;
  textArea.focus();
  textArea.selectionEnd = start === end ? end + txt.length : end;
}

function deleteText(textarea) {
  const textArea = textarea;
  const start = textArea.selectionStart;
  const end = textArea.selectionEnd;
  const finishText = textArea.value.substring(0, start) + textArea.value.substring(end + 1);
  textArea.value = finishText;
  textArea.focus();
  textArea.selectionEnd = start === end ? start : end;
}

function backspaceText(textarea) {
  const textArea = textarea;
  const start = textArea.selectionStart;
  const end = textArea.selectionEnd;
  const finishText = textArea.value.substring(0, start - 1) + textArea.value.substring(end);
  textArea.value = finishText;
  textArea.focus();
  textArea.selectionEnd = start !== 0 ? end - 1 : start;
}

window.addEventListener('keydown', (event) => {
  current = document.querySelector(`.press[data-key="${event.code}"]`);
  if (current === true) {
    event.preventDefault();
  } else {
    return true;
  }
  return event;
});

// Ввод с клавиатуры
window.addEventListener('keydown', (event) => {
  TEXTAREA.focus();
  event.preventDefault();
  current = document.querySelector(`.press[data-key="${event.code}"]`);
  current.classList.add('active');
  setTimeout(() => current.classList.remove('active'), 300);
  if (event.code === 'Delete') {
    deleteText(TEXTAREA);
  } else if (event.code === 'Backspace') {
    backspaceText(TEXTAREA);
  } else if (event.code === 'Enter') {
    insertText(TEXTAREA, '\n');
  } else if (event.code === 'Tab') {
    insertText(TEXTAREA, '\t');
  } else if (event.code === 'Space') {
    insertText(TEXTAREA, ' ');
  } else if (event.code === 'CapsLock') {
    if (lang === 'en') {
      if (caps === false) {
        KEY_CAPS.classList.add('active-all');
        addLayot(LAYOT_EN_CAPSLOCK);
        caps = true;
      } else {
        KEY_CAPS.classList.remove('active-all');
        addLayot(LAYOT_EN_NORMAL);
        caps = false;
      }
    } else if (caps === false) {
      KEY_CAPS.classList.add('active-all');
      addLayot(LAYOT_RU_CAPSLOCK);
      caps = true;
    } else {
      KEY_CAPS.classList.remove('active-all');
      addLayot(LAYOT_RU_NORMAL);
      caps = false;
    }
    insertText(TEXTAREA, '');
  } else if (event.key === 'Shift') {
    if (lang === 'en') {
      addLayot(LAYOT_EN_SHIFT);
    } else {
      addLayot(LAYOT_RU_SHIFT);
    }
    insertText(TEXTAREA, '\n');
    shift = true;
  } else if (event.key === 'Alt') {
    if (lang === 'en') {
      if (shift === true) {
        if (caps === true) {
          addLayot(LAYOT_RU_CAPSLOCK);
          lang = localStorage.setItem('lang', 'ru');
          lang = 'ru';
        } else {
          lang = localStorage.setItem('lang', 'ru');
          addLayot(LAYOT_RU_NORMAL);
          lang = 'ru';
        }
      } else {
        addLayot(LAYOT_EN_NORMAL);
        lang = localStorage.setItem('lang', 'en');
        lang = 'en';
      }
    } else if (shift === true) {
      lang = localStorage.setItem('lang', 'en');
      addLayot(LAYOT_EN_NORMAL);
      lang = 'en';
    } else {
      addLayot(LAYOT_RU_NORMAL);
      lang = localStorage.setItem('lang', 'ru');
      lang = 'ru';
    }
    insertText(TEXTAREA, '\n');
  } else if (event.key === 'Control') {
    insertText(TEXTAREA, '\n');
  } else if (event.code === 'MetaLeft') {
    insertText(TEXTAREA, '\n');
  } else if (lang === 'en') {
    if (caps === true) {
      if (shift === true) {
        addLayot(LAYOT_EN_CAPSLOCK_SHIFT);
        text = LAYOT_EN_CAPSLOCK_SHIFT[current.id];
        insertText(TEXTAREA, text);
      } else {
        addLayot(LAYOT_EN_CAPSLOCK);
        text = LAYOT_EN_CAPSLOCK[current.id];
        insertText(TEXTAREA, text);
      }
    } else if (shift === true) {
      addLayot(LAYOT_EN_SHIFT);
      text = LAYOT_EN_SHIFT[current.id];
      insertText(TEXTAREA, text);
    } else {
      addLayot(LAYOT_EN_NORMAL);
      text = LAYOT_EN_NORMAL[current.id];
      insertText(TEXTAREA, text);
    }
  } else if (caps === true) {
    if (shift === true) {
      addLayot(LAYOT_RU_CAPSLOCK_SHIFT);
      text = LAYOT_RU_CAPSLOCK_SHIFT[current.id];
      insertText(TEXTAREA, text);
    } else {
      addLayot(LAYOT_RU_CAPSLOCK);
      text = LAYOT_RU_CAPSLOCK[current.id];
      insertText(TEXTAREA, text);
    }
  } else if (shift === true) {
    addLayot(LAYOT_RU_SHIFT);
    text = LAYOT_RU_SHIFT[current.id];
    insertText(TEXTAREA, text);
  } else {
    addLayot(LAYOT_RU_NORMAL);
    text = LAYOT_RU_NORMAL[current.id];
    insertText(TEXTAREA, text);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    if (lang === 'en') {
      if (caps === true) {
        addLayot(LAYOT_EN_CAPSLOCK);
      } else {
        addLayot(LAYOT_EN_NORMAL);
      }
    } else if (caps === true) {
      addLayot(LAYOT_RU_CAPSLOCK);
    } else {
      addLayot(LAYOT_RU_NORMAL);
    }
    shift = false;
    insertText(TEXTAREA, '');
  }
});

// -------------------ВИРТУАЛЬНАЯ КЛАВИАТУРА
function pressEffect(element) {
  element.classList.add('active');
  setTimeout(() => element.classList.remove('active'), 300);
}

function pressKeysKeyboard() {
  KEYS.forEach((element) => {
    element.addEventListener('click', () => {
      console.log(element);
      pressEffect(element);
      text = element.innerText;
      insertText(TEXTAREA, text);
    });
  });
}

function pressKeyDeleteKeyboard() {
  KEY_DELETE.addEventListener('click', () => {
    pressEffect(KEY_DELETE);
    deleteText(TEXTAREA);
  });
}

function pressKeyBackspaceKeyboard() {
  KEY_BACKSPACE.addEventListener('click', () => {
    pressEffect(KEY_BACKSPACE);
    backspaceText(TEXTAREA);
  });
}

function pressKeyTabKeyboard() {
  KEY_TAB.addEventListener('click', () => {
    pressEffect(KEY_TAB);
    insertText(TEXTAREA, '\t');
  });
}

function pressKeyEnterKeyboard() {
  KEY_ENTER.addEventListener('click', () => {
    pressEffect(KEY_ENTER);
    insertText(TEXTAREA, '\n');
  });
}

function pressKeySpaceKeyboard() {
  KEY_SPACE.addEventListener('click', () => {
    pressEffect(KEY_SPACE);
    insertText(TEXTAREA, ' ');
  });
}

function pressKeyControlKeyboard() {
  KEY_CONTROL.forEach((element) => {
    element.addEventListener('click', () => {
      pressEffect(element);
      insertText(TEXTAREA, '');
    });
  });
}

function pressKeyWinKeyboard() {
  KEY_WIN.addEventListener('click', () => {
    pressEffect(KEY_WIN);
    insertText(TEXTAREA, '');
  });
}

function pressKeyAltKeyboard() {
  KEY_ALT.forEach((element) => {
    element.addEventListener('click', () => {
      pressEffect(element);
      insertText(TEXTAREA, '');
    });
  });
}

function pressKeyCapsKeyboard() {
  KEY_CAPS.addEventListener('click', () => {
    if (lang === 'en') {
      if (caps === false) {
        if (shift === false) {
          addLayot(LAYOT_EN_CAPSLOCK);
          caps = true;
          KEY_CAPS.classList.add('active-all');
        } else {
          addLayot(LAYOT_EN_CAPSLOCK_SHIFT);
          KEY_CAPS.classList.add('active-all');
          caps = true;
          shift = true;
        }
      } else if (shift === false) {
        addLayot(LAYOT_EN_NORMAL);
        caps = false;
        shift = false;
        KEY_CAPS.classList.remove('active-all');
      } else {
        addLayot(LAYOT_EN_SHIFT);
        KEY_CAPS.classList.remove('active-all');
        caps = false;
      }
    } else if (caps === false) {
      if (shift === false) {
        addLayot(LAYOT_RU_CAPSLOCK);
        caps = true;
        KEY_CAPS.classList.add('active-all');
      } else {
        addLayot(LAYOT_RU_CAPSLOCK_SHIFT);
        KEY_CAPS.classList.add('active-all');
        caps = true;
        shift = true;
      }
    } else if (shift === false) {
      addLayot(LAYOT_RU_NORMAL);
      caps = false;
      shift = false;
      KEY_CAPS.classList.remove('active-all');
    } else {
      addLayot(LAYOT_RU_SHIFT);
      KEY_CAPS.classList.remove('active-all');
      caps = false;
    }
  });
}

function pressKeyShiftKeyboard() {
  KEY_SHIFT.forEach((element) => {
    element.addEventListener('click', () => {
      if (lang === 'en') {
        if (shift === false) {
          if (caps === false) {
            addLayot(LAYOT_EN_SHIFT);
            shift = true;
            element.classList.add('active-all');
          } else {
            addLayot(LAYOT_EN_CAPSLOCK_SHIFT);
            element.classList.add('active-all');
            shift = true;
            caps = true;
          }
        } else if (caps === false) {
          addLayot(LAYOT_EN_NORMAL);
          shift = false;
          caps = false;
          element.classList.remove('active-all');
        } else {
          addLayot(LAYOT_EN_CAPSLOCK);
          element.classList.remove('active-all');
          shift = false;
        }
      } else if (shift === false) {
        if (caps === false) {
          addLayot(LAYOT_RU_SHIFT);
          shift = true;
          element.classList.add('active-all');
        } else {
          addLayot(LAYOT_RU_CAPSLOCK_SHIFT);
          element.classList.add('active-all');
          shift = true;
          caps = true;
        }
      } else if (caps === false) {
        addLayot(LAYOT_RU_NORMAL);
        shift = false;
        caps = false;
        element.classList.remove('active-all');
      } else {
        addLayot(LAYOT_RU_CAPSLOCK);
        element.classList.remove('active-all');
        shift = false;
      }
    });
  });
}

function changeLanguage() {
  KEY_ALT.forEach((element) => {
    element.addEventListener('click', () => {
      console.log(lang);
      if (lang === 'en') {
        if (shift === true) {
          if (caps === true) {
            addLayot(LAYOT_RU_CAPSLOCK_SHIFT);
            lang = localStorage.setItem('lang', 'ru');
            lang = 'ru';
          } else {
            addLayot(LAYOT_RU_SHIFT);
            lang = localStorage.setItem('lang', 'ru');
            lang = 'ru';
          }
        }
      } else if (shift === true) {
        if (caps === true) {
          addLayot(LAYOT_EN_CAPSLOCK_SHIFT);
          lang = localStorage.setItem('lang', 'en');
          lang = 'en';
        } else {
          addLayot(LAYOT_EN_SHIFT);
          lang = localStorage.setItem('lang', 'en');
          lang = 'en';
        }
      }
    });
  });
}

changeLanguage();
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
pressKeyWinKeyboard();
