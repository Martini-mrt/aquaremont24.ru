import Inputmask from "./inputmask.js";
import JustValidate from "./just-validate.production.min.js";



//
const urlPuth = '/send.php';



// form validate
const modalWinForm = document.querySelector('.callme__form');
const requisitionForm = document.querySelector('.requisition__form');


// burger
const menuNav = document.querySelector('#box-nav');
const burger = document.querySelector('#burger');
const burgerClose = document.querySelector('#btn-close');
const menuItems = document.querySelectorAll('.nav__link');

burger.addEventListener('click', () => {
    menuNav.classList.add('open');
    // disableScroll(900);
});
burgerClose.addEventListener('click', () => {
    menuNav.classList.remove('open');
    // enableScroll();
});
menuItems.forEach(el => {
    el.addEventListener('click', () => {
        // burger.setAttribute('aria-expanded', 'false');
        // burger.setAttribute('aria-label', 'Открыть меню');

        menuNav.classList.remove('open');
        // enableScroll();

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










// const telSelector = document.querySelector('#callme__phone');   

// const contactForm = document.querySelector('.requisition__form');
// const telSelector = document.querySelector('#callme__phone'); 


// console.log(document.forms.formTel.elements.phone.value) 

// console.log(contactForm.elements.phone.value = "54454") 



// Inputmask().mask(document.querySelectorAll(".callme__input"));





// input Mask
const inputMask = new Inputmask('+7 (999) 999-99-99');
// ищем и устанавливаем всем type="tel" маску телефона
for (const el of document.querySelectorAll('input[type="tel"]')) {
    inputMask.mask(el);
}

// functions validate

function checkTelLength(el) {
    return (value, fields) => {
        const phone = fields[el].elem.inputmask.unmaskedvalue();
        return Boolean(Number(phone) && phone.length > 0);
    }

}


function checkTelCountLength(el) {
    return (value, fields) => {
        const phone = fields[el].elem.inputmask.unmaskedvalue();
        return Boolean(Number(phone) && phone.length === 10);
    }
}


const setValidate = {
    errorLabelStyle: {
        color: '#D11616',
    },
    errorFieldCssClass: 'form__is-invalid',
};


const modalSetActions = {
    default: 'Заказать звонок',
    defaultBg: '#FFD974',
    defaultColor: '#082D53',
    error: 'Не отправилось :(',
    success: 'Мы вам перезвоним !',
    successBg: '#45c162',
    successColor: '#fff',
    preloader: 'Отправляем ...'
}



const siteSetActions = {
    default: 'Отправить заявку',
    defaultBg: '#082D53',
    defaultColor: '#fff',
    error: 'Не отправилось :(',
    success: 'Заявка отправлена',
    successBg: '#45c162',
    successColor: '#fff',
    preloader: 'Отправляем ...'
}




// modalValidation.refresh();



// modal form
const modalValidation = new JustValidate(modalWinForm, setValidate);
const modalSelectorIdPhone = '#callme__phone';
modalValidation
    .addField(modalSelectorIdPhone, [
        {
            validator: checkTelLength(modalSelectorIdPhone),
            errorMessage: 'Введите телефон',
        },
        {
            validator: checkTelCountLength(modalSelectorIdPhone),
            errorMessage: 'Телефон полностью',
        },
    ])
    .onSuccess((event) => {
        // btnActions();
        // console.log('оправили форму')
        // console.log(event)

        sendForm(event.target, modalSetActions, true)
        // очищаем форму
        event.target.reset();
    });





// requisition form
const requisitionValidation = new JustValidate(requisitionForm, setValidate);
const requisitionSelectorIdPhone = '#requisition__input-tel';

requisitionValidation
    .addField(requisitionSelectorIdPhone, [
        {
            validator: checkTelLength(requisitionSelectorIdPhone),
            errorMessage: 'Введите телефон',
        },
        {
            validator: checkTelCountLength(requisitionSelectorIdPhone),
            errorMessage: 'Телефон полностью',
        },
    ])
    .addField('#requisition__input-name', [
        {
            rule: 'required',
            errorMessage: 'Введите ваше имя',

        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Имя не может быть менее 3 символов',
        },
        {
            rule: 'maxLength',
            value: 15,
            errorMessage: 'Имя не может быть более 15 символов',
        },
    ])

    .onSuccess((event) => {
        // btnActions();
        console.log('оправили форму')
        // console.log(event)


        sendForm(event.target, siteSetActions)
        // очищаем форму
        event.target.reset();
    });





function sendForm(form, setObj, modal) {
    const submitBtn = form.querySelector('button[type="submit"]')
    // preloader
    btnActions(submitBtn, setObj);

    // запрос на сервер для отправки формы
    fetch(urlPuth, {
        method: 'POST',
        body: new FormData(form)
    })
        .then((res) => {
            if (res.status !== 200) {
                console.log('не отправилось')

                btnActions(submitBtn, setObj,'error');

                // btnActions(submitBtn, setObj, 'success', modal);

            } else {

                btnActions(submitBtn, setObj, 'success', modal);

                // setTimeout(closePopUp, 800);
            }

        });







}






// анимация отправки на кнопке
function btnActions(submitBtn, message, status, modal) {
    // анимация отправки на кнопке
    switch (status) {
        case 'success':
            submitBtn.textContent = message.success;
            submitBtn.style.background = message.successBg;
            submitBtn.style.color = message.successColor;
            setTimeout(() => {
                submitBtn.textContent = message.default;
                submitBtn.style.background = message.defaultBg;
                submitBtn.style.color = message.defaultColor;
            }, 3000);

            if (modal) {
                setTimeout(() => {
                    closePopUp();
                }, 500)
            }

            break;

        case 'error':
            submitBtn.textContent = message.error;
            submitBtn.style.background = '#f33c24';
            setTimeout(() => {
                submitBtn.textContent = message.default;
                submitBtn.style.background = message.defaultBg;
            }, 3000);

            break;

        default:
            submitBtn.textContent = message.preloader;
            break;
    }

}






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

// здесь все очищается
function closePopUp() {
    enableScroll();
    modal.classList.remove('open');
    modalValidation.refresh();
    modalWinForm.reset();
}





































// кнопка Up
let backToTop = document.querySelector('.btn-up'); // получаем кнопку

window.addEventListener('scroll', () => { // обработчик на windows получаем позицию скрола
    window.pageYOffset > 250 ? backToTop.classList.add('btn-up--show') : backToTop.classList.remove('btn-up--show');  // условие если больше 100 показываем кнопку
}, { passive: true }); // включаем пассивный режим у обработчика (для производительности)


backToTop.addEventListener('click', () => { // обрабатываем клик по кнопке
    window.scrollTo({   // прокручиваем страницу
        top: 0,       // до какой позиции
        behavior: "smooth" // режим плавности
    });
})




// let work = document.querySelector('.work')

// let reviews = document.querySelector('.reviews')

// window.addEventListener('scroll', () => { 
//     console.log( "work => " + work.clientHeight  )

//     console.log( "reviews => " + reviews.clientHeight  )



//   }, { passive: true });









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