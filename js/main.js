'use strict'

function init() {
    setCanvasSize()
    renderGallery()
    getUserMemes()
}

function toggleMenu() {
    if (document.querySelector('.main-header').offsetWidth >= 840) return
    document.body.classList.toggle('menu-open');
}

function toggleModal() {
    document.body.classList.toggle('menu-open');
    document.querySelector('.modal').classList.toggle('open')
}