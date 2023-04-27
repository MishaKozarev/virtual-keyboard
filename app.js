import KEYBOARD from './js/keyboard.js';
import LAYOT_EN from './js/layot-en.js';
import LAYOT_RU from './js/layot-ru.js';

const body = document.querySelector('.body');
body.insertAdjacentHTML('afterbegin', KEYBOARD);
const inputScreen = document.querySelector('.input-screen');
const keyboardRow = document.querySelector('.keyboard__row');

const LAYOT_EN_NORMAL = LAYOT_EN.normal.split(' ');
const LAYOT_EN_CAPSLOCK = LAYOT_EN.capsLock.split(' ');
const LAYOT_RU_NORMAL = LAYOT_RU.normal.split(' ');
const LAYOT_RU_CAPSLOCK = LAYOT_RU.capsLock.split(' ');
let lang = 'en';
let flag = false;


function init (){
    addLayot(LAYOT_EN_NORMAL);
}
init();

function addLayot(layot) {
    for (let i = 0; i < layot.length; i ++){
        keyboardRow.children[i].innerHTML = layot[i]
    }
}

inputScreen.onkeydown = function (event){
    document.querySelectorAll('.key').forEach((el) => {
        el.classList.remove('active');
    });
    document.querySelector('.key[data-key="'+event.code+'"]').classList.add('active');
}

document.querySelectorAll('.key').forEach((el) =>{
    el.onclick = function (){
        document.querySelectorAll('.key').forEach((el) =>{
            el.classList.remove('active');
        });
        let code = this.getAttribute('data-key')
        this.classList.add('active');
        inputScreen.textContent = el.textContent;
        console.log(el.textContent);
    }
});


inputScreen.onkeydown = function (e){
    if (lang === 'en'){
        if (e.code === "ShiftLeft") flag = true;
        if (e.code === "AltLeft" && flag ) {
            addLayot(LAYOT_RU_NORMAL);
            flag = false;
            lang = 'ru'
        }
    }else{
        if (e.code === "ShiftLeft") flag = true;
        if (e.code === "AltLeft" && flag ) {
            addLayot(LAYOT_EN_NORMAL);
            flag = false;
            lang = 'en'
        }
    }
}


inputScreen.addEventListener("keyup", function(event) {
    if (event.getModifierState("CapsLock")) {
        addLayot(LAYOT_EN_CAPSLOCK);
    } else {
        addLayot(LAYOT_EN_NORMAL);
    }
  });