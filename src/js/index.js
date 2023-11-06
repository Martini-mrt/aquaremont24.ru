// import mobileNav from './modules/mobile-nav.js';
// mobileNav();




// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// init Swiper:
new Swiper('.work__swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  
  slidesPerView: 3,
  spaceBetween: 26,
  loop: true,
  pagination: {
    el: ".work__swiper-pagination",
    clickable: true
  },

  navigation: {
    nextEl: '.work__arrows-right',
    prevEl: '.work__arrows-left',
    disabledClass: 'swiper__button--disabled',
},


});

new Swiper('.reviews__swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination],
    
    slidesPerView: 4,
    spaceBetween: 50,
    loop: true,
    pagination: {
      el: ".reviews__swiper-pagination",
      clickable: true
    },
  
    navigation: {
      nextEl: '.reviews__arrows-right',
      prevEl: '.reviews__arrows-left',
      disabledClass: 'swiper__button--disabled',
  },
  
  
  });