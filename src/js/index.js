
// burger
const menuNav = document.querySelector('#box-nav');
const burger = document.querySelector('#burger');
const burgerClose = document.querySelector('#btn-close');
const menuItems = document.querySelectorAll('.nav__link');

burger.addEventListener('click', () => {
    menuNav.classList.add('open');
    disableScroll();
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
    console.log(addBlock)
    addBlock.classList.toggle('information__add-block--show');
});






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
function disableScroll() {
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)}px`;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.paddingRight = paddingOffset;
    setTimeout(() => {
        document.body.classList.add('dis-scroll');
        // анимация закрытия меню .9s
    }, 800);
    document.body.dataset.position = pagePosition;
    // убрал эту функццию не коректно раюотает с posision: fixet и stycky
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