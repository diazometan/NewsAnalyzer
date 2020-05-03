import '../../node_modules/swiper/css/swiper.min.css';
import Swiper from 'swiper';

import './about.css';

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    slideToClickedSlide: true,
    preventClicks: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            centeredSlides: false,
            spaceBetween: 8
        },
        1025: {
            centeredSlides: true,
            spaceBetween: 16
        }
    }
});


