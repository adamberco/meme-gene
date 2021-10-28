'use strict'

function init() {
    renderGallery()
    getUserMemes()
}

function resizeCanvas() {
    var elheader = document.querySelector('.main-header');
    if (elheader.offsetWidth <= 420) {
        gCtxSize = 300

    } else gCtxSize = 450
    gElCanvas.width = gCtxSize
    gElCanvas.height = gCtxSize
}

function toggleMenu() {
    if (document.querySelector('.main-header').offsetWidth >= 840) return
    document.body.classList.toggle('menu-open');
}

function openMemes() {
    renderEditor(1)
    document.querySelector('.main-contant').style.display = 'none'
    document.querySelector('.gallary-container').style.display = 'none'
    document.querySelector('.memes-container').style.display = 'grid'
    let strHtml = ''
    const imgs = gUserMemes
    strHtml += (imgs.map((img) => `<img data-id=0 src='${img.url}' onclick= "userMemeSelect(${img.id})">`)).join('')
    document.querySelector('.memes-container').innerHTML = strHtml
}

function toggleModal() {
    document.body.classList.toggle('menu-open');
    document.querySelector('.modal').classList.toggle('open')
}