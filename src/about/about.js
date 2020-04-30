import './about.css';
import Swiper from 'swiper';

const prevButton = document.querySelector('.swiper-button-prev');
const nextButton = document.querySelector('.swiper-button-next');

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    simulateTouch: false,
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    /* on: {
        slideChange() {
            if (this.activeIndex === 1) {
                prevButton.style.display = 'none';
            }
            else {
                prevButton.style.display = 'flex';
            }

            if (this.activeIndex == this.slides.length - 2) {
                nextButton.style.display = 'none';
            }

            else {
                nextButton.style.display = 'flex';
            }
        }
    } */
});

swiper.slideTo(3)


