'use strict'

function init() {
    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');
    renderMeme()
    renderGallery()
    // resizeCanvas()
}

// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container');
//     var eloptionsBar = document.querySelector('.options-bar');
//     gElCanvas.width = elContainer.offsetWidth - 20;
//     gElCanvas.height = elContainer.offsetHeight - eloptionsBar.offsetHeight - 50
// }