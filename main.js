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

const animalSelect = new CustomSelect({
    elem: document.querySelector('.customSelect')
});

document.addEventListener('select', function(e) {
    document.getElementById('result').innerHTML = e.detail.value;
});

//плавна прокрутка
const linkNav = document.querySelectorAll('[href^="#top"]');
let V = 1;  // швидкість

for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) {
        e.preventDefault();
        let w = window.pageYOffset;  // прокрутка
        let hash = this.href.replace(/[^#]*(.*)/, '$1');  // id элемента, до якого треба перейти
        let t = document.querySelector(hash).getBoundingClientRect().top; //відступ від вікна браузера до id
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
                location.hash = hash;  // URL с хэшем
            }
        }
    }, false);
}
window.addEventListener('scroll', function() {
    const nav = document.querySelectorAll('section[id^="top"]');
    for (let i = 0; i < nav.length; i++) {
        document.querySelector('a[href="#' + nav[i].id + '"]').className=((1 >= nav[i].getBoundingClientRect().top && nav[i].getBoundingClientRect().top >= 1-nav[i].offsetHeight) ? 'red' : '');
    }
}, false);

window.addEventListener('scroll', function () {
    if(pageYOffset > 0){
        nav.style.boxShadow = '0 1px 5px 0 #ccc';
    }else {
        nav.style.boxShadow = '';
    }
});


//slider again
const $slider = $(".slider");
$slider
    .on('init', () => {
        mouseWheel($slider)
    })
    .slick({
        dots: true,
        vertical: true,
        infinite: false,
    })
function mouseWheel($slider) {
    $(window).on('wheel', { $slider: $slider }, mouseWheelHandler)
}
function mouseWheelHandler(event) {
    event.preventDefault()
    const $slider = event.data.$slider
    const delta = event.originalEvent.deltaY
    if(delta > 0) {
        $slider.slick('slickPrev')
    }
    else {
        $slider.slick('slickNext')
    }
}