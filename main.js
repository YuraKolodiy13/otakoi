/*!
 * fonoApi v1.0.0 (https://fonoapi.freshpixl.com/)
 * Author : @shakee93
 * Licensed under the MIT license
 */
"function"!=typeof Object.create&&(Object.create=function(t){function e(){}return e.prototype=t,new e}),function(t,e,n,o){var i={init:function(e,n){var o=this;o.elem=n,o.$elem=t(n),"string"==typeof e?o.device=e:(o.device=e.device,o.brand=e.brand,o.position=e.position),o.options=t.extend({},t.fn.fonoApi.options,e),null==o.options.token&&console.error("Token Missing. Generate a Token at fonoapi.freshpixl.com"),o.refresh()},refresh:function(){var t=this;t.fetch().done(function(e){if(e.status)"function"==typeof t.options.onFailed?t.options.onFailed.apply(t.elem,arguments):t.displayError(e);else{if(e=t.limit(e,t.options.limit),"function"==typeof t.options.template){var n=t.options.template.apply(t.elem,e);t.setTemplate(n)}else t.setDefaultTemplate(e);t.display()}"function"==typeof t.options.onComplete&&t.options.onComplete.apply(t.elem,arguments)}).fail(function(e,n){console.log(e),"function"==typeof t.options.onFailed?t.options.onFailed.apply(t.elem,arguments):t.displayError(n)})},fetch:function(){return t.ajax({url:this.options.url,data:{token:this.options.token,device:this.device,brand:this.brand,position:self.position},dataType:"json"})},setDefaultTemplate:function(e){var n=this;n.devices=t.map(e,function(e,n){content="<h3>"+e.DeviceName+"</h3>",content+='<table class="table table-striped" style="width:100%">',content+="<tr><th>info</th><th>Description</th></tr>";for(var o in e)content+="<tr><td>"+o+"</td><td>"+e[o]+"</td><tr>";return content+="</table>",t('<div class="table-responsive"></div>').append(content)})},setTemplate:function(t){var e=this;e.devices=t},display:function(){var t=this;"function"==typeof t.options.onDisplay&&t.options.onDisplay.apply(t.elem,arguments),this.$elem.html(this.devices)},limit:function(t,e){return t.slice(0,e)},displayError:function(e){e.status?this.$elem.html(t("<span></span>").append(e.message+"<br>")):this.$elem.html(e)}};t.fn.fonoApi=function(e){return this.each(function(){var n=Object.create(i);n.init(e,this),t.data(this,"fonoApi",n)})},t.fn.fonoApi.options={url:"https://fonoapi.freshpixl.com/v1/getdevice",token:null,limit:5,onComplete:null,onFailed:null,onDisplay:null,template:null}}(jQuery,window,document);


$('.submit').on('click', function() {

  // set token globally
  //$.fn.fonoApi.options.token = "xxx";

  $('.api').fonoApi({
    token : "86b89476caaf66eda3f21279b7711afc",
    device : $('.devname').val(),
    limit : 50,
    template : function() {

      // argument contains the data object // *returns html content
      return $.map(arguments, function(obj, i) {
        console.log(obj)

        content  = '<h3>'+ obj.DeviceName + '</h3>';
        content += '<table class="table table-striped" style="width:100%">';
        content += '<tr><th>info</th><th>Description</th></tr>';

        for(var key in obj){
          content += "<tr><td>" + key + "</td><td>" + obj[key] + "</td><tr>";
        }

        content += "</table>";
        return $('<div class="table-responsive"></div>').append(content);
      });

    }
  });

});

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
