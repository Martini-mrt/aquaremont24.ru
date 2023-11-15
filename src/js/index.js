// import { Inputmask } from "./inputmask.min.js";
// import { JustValidate } from "./just-validate.production.min.js";







// burger
const menuNav = document.querySelector('#box-nav');
const burger = document.querySelector('#burger');
const burgerClose = document.querySelector('#btn-close');
const menuItems = document.querySelectorAll('.nav__link');

burger.addEventListener('click', () => {
    menuNav.classList.add('open');
    disableScroll(800);
});
burgerClose.addEventListener('click', () => {
    menuNav.classList.remove('open');
    enableScroll();
});
menuItems.forEach(el => {
    el.addEventListener('click', () => {
        // burger.setAttribute('aria-expanded', 'false');
        // burger.setAttribute('aria-label', 'Открыть меню');

        menuNav.classList.remove('open');
        enableScroll();

    });
});



// раскрытие блока с информацией
const addBlock = document.querySelector('#add-block');
const informationBtn = document.querySelector('#information-btn');


informationBtn.addEventListener('click', () => {
    addBlock.classList.toggle('information__add-block--show');
    addBlock.classList.contains('information__add-block--show') ? 
    informationBtn.textContent = 'скрыть' : informationBtn.textContent = 'показать еще';

});



// modal
const btn = document.querySelectorAll('.--call-form-open')
const modal = document.querySelector('.modal')

document.querySelector('.modal__close-btn').addEventListener('click', () => {
    closePopUp();
})

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('open')) {
        closePopUp();
    }
});

btn.forEach(e => {
    e.addEventListener('click', () => {
        modal.classList.add('open');
        disableScroll(0);
    })
});

function closePopUp() {
    enableScroll();
    modal.classList.remove('open');
    // contactForm.reset();
}




// form
// input Mask
// const inputMask = new Inputmask('+7 (999) 999-99-99');
// inputMask.mask(telSelector);

// const validation = new JustValidate(contactForm, {
//     errorLabelStyle: {
//         color: '#D11616',
//     },
//     errorFieldCssClass: 'form__is-invalid',
// });

// validation
//     .addField('#callme__phone', [
//         {
//             validator: () => {
//                 const phone = telSelector.inputmask.unmaskedvalue();
//                 return Boolean(Number(phone) && phone.length > 0);
//             },
//             errorMessage: 'Введите телефон',
//         },
//         {
//             validator: () => {
//                 const phone = telSelector.inputmask.unmaskedvalue();
//                 return Boolean(Number(phone) && phone.length === 10);
//             },
//             errorMessage: 'Телефон полностью',
//         },

//     ])
//     .onSuccess((event) => {
//         btnActions();
//         // хапрос на сервер для отправки формы
//         fetch(urlPuth, {
//             method: 'POST',
//             body: new FormData(event.target)
//         })
//             .then((res) => {
//                 if (res.status !== 200) {
//                     console.log('не отправилось')

//                     btnActions('error');

//                 } else {
//                     // 
//                     btnActions('success');

//                     setTimeout(closePopUp, 800);
//                 }

//             });

//         // очищаем форму
//         //   event.target.reset();
//     });



// // анимация отправки на кнопке
// function btnActions(status) {

//     switch (status) {
//         case 'success':
//             callBtn.textContent = "Мы вам перезвоним !";
//             callBtn.style.background = '#01c82f';
//             // loader.style.display = 'none';
//             setTimeout(() => {
//                 callBtn.textContent = "Заказать звонок";
//                 callBtn.style.background = '#FFD974';
//             }, 1000);

//             break;

//         case 'error':
//             callBtn.textContent = "Не отправилось :(";
//             callBtn.style.background = '#f33c24';
//             // loader.style.display = 'none';
//             setTimeout(() => {
//                 callBtn.textContent = "Заказать звонок";
//                 callBtn.style.background = '#FFD974';
//             }, 2000);

//             break;



//         default:
//             callBtn.textContent = "Отрпавляем ...";
//             // loader.style.display = 'block';
//             break;
//     }

// }

















// кнопка Up
let backToTop = document.querySelector('.btn-up'); // получаем кнопку

window.addEventListener('scroll', () => { // обработчик на windows получаем позицию скрола
  window.pageYOffset > 250 ? backToTop.classList.add('btn-up--show') : backToTop.classList.remove('btn-up--show') ;  // условие если больше 100 показываем кнопку
}, { passive: true }); // включаем пассивный режим у обработчика (для производительности)


backToTop.addEventListener('click', () => { // обрабатываем клик по кнопке
  window.scrollTo({   // прокручиваем страницу
        top: 0,       // до какой позиции
        behavior: "smooth" // режим плавности
    });
})
















//############ Служебные

// подстройка меню mobile под окно
const changeHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

changeHeight();
window.addEventListener('resize', () => {
    changeHeight();
    // menu.style.height = `${(window.innerHeight * 0.01) * 100}px`;
});


//  скрол
// в CSS добавить /* js style scroll*/
function disableScroll(time) {
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)}px`;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.paddingRight = paddingOffset;
    setTimeout(() => {
        document.body.classList.add('dis-scroll');
        // анимация закрытия меню .9s
    }, time);
    document.body.dataset.position = pagePosition;
    // убрал эту функццию не коректно раюотает с posision: fixed и stycky
    // добавио таймаут что бы дождаться закрытия меню и только потом фиксируем боди (точней онуляем и фиксируем)
    // document.body.style.top = `-${pagePosition}px`;

}

function enableScroll() {
    const body = document.body;
    const pagePosition = parseInt(document.body.dataset.position, 10);
    document.body.style.paddingRight = '0px';
    const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)}px`;
    document.body.style.top = 'auto';
    document.body.classList.remove('dis-scroll');
    window.scroll({
        top: pagePosition,
        left: 0
    });
    document.body.removeAttribute('data-position');
    document.documentElement.style.scrollBehavior = 'smooth';
}