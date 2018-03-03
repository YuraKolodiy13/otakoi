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

document.body.addEventListener('click', function (e) {
    if(e.target.tagName == 'SPAN' ){
        if(e.target.nextElementSibling){
            e.target.nextElementSibling.style.display = 'block';
        }
    }
});


//slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.querySelectorAll('.slider__item');
    const dots = document.querySelectorAll('.dot');

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

const slider = document.querySelector('.slider');

function addOnWheel(elem, handler) {
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            elem.addEventListener("wheel", handler);
        } else if ('onmousewheel' in document) {
            elem.addEventListener("mousewheel", handler);
        } else {
            elem.addEventListener("MozMousePixelScroll", handler);
        }
    } else {
        elem.attachEvent("onmousewheel", handler);
    }
}

let scale = 1;

addOnWheel(slider, function(e) {
    let delta = e.deltaY || e.detail || e.wheelDelta;
    if (delta > 0){
        plusSlides(1);
    }else {
        plusSlides(-1);
    }
    e.preventDefault();
});


//range
const range = document.querySelector('input[type="range"]');
const productsItems = document.querySelector('.products__items');

range.addEventListener('input', function () {
    productsItems.style.marginLeft = -this.value + 'px';
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


//select
function CustomSelect(options) {
    let elem = options.elem;

    elem.addEventListener('click', function (e) {
        if(e.target.className == 'title'){
            toggle();
        }else if(e.target.tagName == 'LI'){
            setValue(e.target.innerHTML, e.target.dataset.value);
            close();
        }
    });

    let isOpen = false;

    function onDocumentClick(e) {
        if(!elem.contains(e.target)){
            close();
        }
    }

    function setValue(title, value) {
        elem.querySelector('.title').innerHTML = title;

        let widgetEvent = new CustomEvent('select', {
            bubbles: true,
            detail: {
                title: title,
                value: value
            }
        });

        elem.dispatchEvent(widgetEvent);
    }

    function toggle() {
        if(isOpen) close();
        else open();
    }

    function open() {
        elem.classList.add('open');
        document.addEventListener('click', onDocumentClick);
        isOpen = true;
    }

    function close() {
        elem.classList.remove('open');
        document.removeEventListener('click', onDocumentClick);
        isOpen = false;
    }
}

const select = new CustomSelect({
    elem: document.querySelector('.customSelect')
});

document.addEventListener('select', function(e) {
    document.getElementById('result').innerHTML = e.detail.value;
});

//slow scroll
const linkNav = document.querySelectorAll('[href^="#top"]');
let V = .5;  // speed

for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) {
        e.preventDefault();
        let w = window.pageYOffset;
        let hash = this.href.replace(/[^#]*(.*)/, '$1');
        let t = document.querySelector(hash).getBoundingClientRect().top;
        let start = null;

        requestAnimationFrame(step);
        function step(time) {
            if (start === null) start = time;
            let progress = time - start;
            let r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash;
            }
        }
    }, false);
}
window.addEventListener('scroll', function() {
    const nav = document.querySelectorAll('section[id^="top"]');
    for (let i = 0; i < nav.length; i++) {
        document
            .querySelector('a[href="#' + nav[i].id + '"]')
            .className=((1 >= nav[i].getBoundingClientRect().top &&
        nav[i]
            .getBoundingClientRect()
            .top >= 1-nav[i].offsetHeight) ? 'red' : ''
        );
    }
}, false);
