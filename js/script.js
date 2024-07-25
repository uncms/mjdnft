function home(){window.scrollTo(0,0);}

const videos = document.querySelectorAll("iframe");
const guides = document.querySelectorAll(".guide");

function changeGuide(_num){
    let num = parseInt(_num);
    guides.forEach(el => {
        el.classList.remove("clicked-tag");
    })
    videos.forEach(el => {
        el.classList.remove("clicked-video");
    })

    guides[num].classList.add("clicked-tag");
    videos[num].classList.add("clicked-video");
}

var swiper = new Swiper(".nftSwiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: false,
    },
    breakpoints: {
        576:{
            slidesPerView: 2,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 18,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1320: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    },
});


var swiper = new Swiper(".donationSwiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: false,
    },
    breakpoints: {
        576:{
            slidesPerView: 2,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 18,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1320: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
});