'use strict';

const scrollContent = document.querySelectorAll('.custom-scroll');

var scrollContentItem = Array.prototype.slice.call(scrollContent);

if ( scrollContentItem ) {
    scrollContentItem.forEach(function(element, key){
        new PerfectScrollbar(element, {
            suppressScrollX: true,
        });
    });
}

const scrollContentWidth = document.querySelectorAll('.custom-scroll-width');

var scrollContentWidthItem = Array.prototype.slice.call(scrollContentWidth);

if ( scrollContentWidthItem ) {
    scrollContentWidthItem.forEach(function(element, key){
        new PerfectScrollbar(element, {
            suppressScrollY: true,
        });
    });
}

let previewModeForm = document.getElementById('preview-mode-form');
if ( previewModeForm ) {
    let previewModeBtn = previewModeForm.querySelector('.btn');
    let previewModeInput = previewModeForm.querySelector('.inputblock-input input');
    let errorMessage = previewModeForm.querySelector('.error-message');

    function locationUserIdPage() {
        document.location.href = './account.html';
    }

    previewModeBtn.addEventListener('click', function(){
        if ( previewModeInput.value != 0 ) {
            console.log(previewModeInput.value);
            locationUserIdPage();
        } else {
            errorMessage.style.display = 'flex';
            return false;
        }
    });
    errorMessage.addEventListener('click', function(){
        this.style.display = 'none';
    });
    
    previewModeInput.addEventListener('focus', function(){
        errorMessage.style.display = 'none';
    });
}

customSelect('select', {
    panelClass: 'custom-select-panel custom-scroll',
});

let videoPlug = document.getElementsByClassName('video-plug')[0];
let videoBlock = document.getElementsByClassName('video-block')[0];
let videoEl = document.getElementsByTagName('video')[0];

if ( videoBlock ) {
    videoBlock.addEventListener('click', function() {
        videoPlug.style.opacity = 0;
        if (videoEl.paused) {
            videoEl.play();
        } else {
            videoEl.pause();
        }
    });
}


let dropDownItemNode = document.querySelectorAll('.dropdownParent');
// var dropDownItem = Array.from(dropDownItemNode);

// console.log(dropDownItem);

function showDropdow(el) {
    el.classList.add('dropdown-show');
    el.querySelector('.dropdownBlock').style.maxHeight = el.querySelector('.dropdownBlock').scrollHeight + "px";
    el.querySelector('.dropdownBlock').style.opacity = 1;
    if ( el.querySelector('.dropdownItem img') ) {
        el.querySelector('.dropdownItem img').style.transform = 'rotate(180deg)';
        el.querySelector('.dropdownItem img').style.transition = '.2s ease-in';
    }
    
}

function hideDropdow(el) {
    el.classList.remove('dropdown-show');
    el.querySelector('.dropdownBlock').style.maxHeight = "0px";
    el.querySelector('.dropdownBlock').style.opacity = 0;
    if ( el.querySelector('.dropdownItem img') ) {
        el.querySelector('.dropdownItem img').style.transform = 'rotate(0)';
    }
}

dropDownItemNode.forEach(function(element, key){
    const elementBtn = element.querySelector('.dropdownItem');
    const dropdownBlock = element.querySelector('.dropdownBlock');
    if ( window.screen.width < 992 ) {
        hideDropdow(element);
    }
    elementBtn.addEventListener('click', function(){
        if ( element.classList.contains('dropdown-show') ) {
            hideDropdow(element);
        } else {
            showDropdow(element);
        }
    });

    dropdownBlock.addEventListener('click', function(e){
        if ( window.screen.width < 992 ) {
            if ( e.target.closest('.aside-item') ||  e.target.classList.contains('.aside-item') ) {
                hideDropdow(e.target.closest('.dropdownParent'));
            }
        }
    });

});

window.addEventListener('resize', function(){
    if ( window.screen.width >= 992 ) {
        dropDownItemNode.forEach(function(element, key){
            showDropdow(element);
            element.querySelector('.dropdownBlock').style.maxHeight = 'initial';
        });
    } else {
        dropDownItemNode.forEach(function(element, key){
            hideDropdow(element);
        });
    }
});