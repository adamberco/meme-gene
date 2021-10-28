'use strict'

function init() {

    // resizeCanvas()
    renderGallery()
    // addListeners()
}

function resizeCanvas() {
    var elheader = document.querySelector('.main-header');
    if (elheader.offsetWidth <= 420) {
        gCtxSize = 300

    } else gCtxSize = 450
    // const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = gCtxSize
    gElCanvas.height = gCtxSize
}

function toggleMenu() {
    if (document.querySelector('.main-header').offsetWidth >= 840) return
    document.body.classList.toggle('menu-open');
}