const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
    } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
    }
});

// let spans = document.querySelectorAll('.site-list__item span');
document.body.addEventListener('click', function (e) {
    if(e.target.tagName == 'SPAN' ){
        if(e.target.nextElementSibling){
            e.target.nextElementSibling.style.display = 'block';
        }
    }
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('slider__item');
    var dots = document.getElementsByClassName('dot');

    if(n > slides.length){
        slideIndex = 1;
    }else if (n < 1){
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++){
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace('active', '');
    }
    slides[slideIndex - 1].style.display = 'flex';
    dots[slideIndex - 1].className += ' active';
}

// const slider = document.querySelector('.slider');
//
// function mouseOv(e) {
//     if(e.target.classList.contains('slider')){
//         window.addEventListener('scroll', function (e) {
//             plusSlides(1);
//             return;
//         });
//     }
// }
//
// window.addEventListener('mouseover', mouseOv);

let productsDescript = document.querySelectorAll('.item__description p');

for(let i = 0; i < productsDescript.length; i++){
    let some = [];
    some[i] = productsDescript[i].innerHTML.split('');
    some[i].length = 98;
    productsDescript[i].innerHTML = some[i].join('');
}

const range = document.querySelector('input[type="range"]');
const productsItems = document.querySelector('.products__items');

range.addEventListener('input', function () {
    productsItems.style.marginLeft = -this.value + 'px';
    console.log(this.value);
});

if(document.documentElement.clientWidth > 400){
    range.max = 500;
}
if(document.documentElement.clientWidth > 500){
    range.max = 400;
}
if(document.documentElement.clientWidth > 600){
    range.max = 300;
}
if(document.documentElement.clientWidth > 700){
    range.max = 200;
}
