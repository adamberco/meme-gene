'use strict'

// Set a new image that clicked

function setImg(imgId) {
    gMeme.selectedImgId = +imgId
    renderMeme()
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    renderGallery();
}