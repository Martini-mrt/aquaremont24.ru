
// carusel
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
// import "@fancyapps/ui/dist/carousel/carousel.css";

// fancybox
import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";




// const container = document.getElementById("work__slider");

// const options = {
//   //  infinite: false,
//   //  center: false, 

//   //  classes: {
//   //   list: "f-carousel__dots",
//   //   isDynamic: "is-dynamic",
//   //   hasDots: "has-dots",
//   //   dot: "f-carousel__dot",
//   //   isBeforePrev: "is-before-prev",
//   //   isPrev: "is-prev",
//   //   isCurrent: "is-current",
//   //   isNext: "is-next",
//   //   isAfterNext: "is-after-next",
//   // },

//   // Dots: {
//   //   // minCount: 2,
//   //   dotTpl: '<span class="f-carousel__dot" data-carousel-page="%i  aria-hidden="true"></span>',

//   // },

//   };
// // new Carousel(container, options);


// init slide
document.getElementById("work__slider") && new Carousel(document.getElementById("work__slider"))
document.getElementById("reviews__slider") && new Carousel(document.getElementById("reviews__slider"))

// new Carousel(document.getElementById("work__slider"));
// new Carousel(document.getElementById("reviews__slider"));

// init fancy
Fancybox.bind("[data-fancybox]", {

  Thumbs: false,
  // убераем все инструменты управления
  Toolbar: {
    display: {
      left: [],
      middle: [],
      right: ['close'],
    },
  },

  Carousel: {
    transition: 'slide',
     //  fade
    // slide 
  //  circular -
    // tube -
    // crossfade
    // preload: 3,
  },

});





