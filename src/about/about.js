import '../../node_modules/swiper/css/swiper.min.css';
import Swiper from 'swiper';

import './about.css';

import {config} from '../js/constants/config';
import {displayStyles} from '../js/constants/constants';

import GithubApi from '../js/modules/GithubApi';
import CommitCardList from '../js/components/CommitCardList';
import CommitCard from '../js/components/CommitCard';

const githubCardTemplate = document.querySelector('[data-component="GitHubCardTemplate"]');
const errorElem = document.querySelector('.error-block');

const isDev = NODE_ENV === 'development';

const githubApi = new GithubApi({
    baseUrl: isDev ? config.githubUrl : config.prodGithubUrl,
    headers: {}
});

const swiper = new Swiper('.swiper-container', {
    init: false,
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

const githubCardFactory = (commitInfo, githubCardTemplate) => new CommitCard(commitInfo, githubCardTemplate);

const commitCardList = new CommitCardList(githubCardFactory, githubApi, githubCardTemplate);
commitCardList.render()
    .then(slides => {
        swiper.appendSlide(slides);
        swiper.init();
    })
    .catch(() => {
        errorElem.style.display = displayStyles.flex;
        swiper.el.style.display = displayStyles.none;
    });
