'use strict'

function init() {
    resizeCanvas()
    renderGallery()
}

function resizeCanvas() {
    var elheader = document.querySelector('.main-header');
    if (elheader.offsetWidth <= 420) {
        gCtxSize = 300

    } else gCtxSize = 450
}

function toggleMenu() {
    if (document.querySelector('.main-header').offsetWidth >= 840) return
    document.body.classList.toggle('menu-open');
}