'use strict'

function renderGallery() {
    let strHtml = ``
    const imgs = getImgForDisplay()
    strHtml += (imgs.map((img) => `<img data-id=${img.id} src='${img.url}' onclick="renderEditor(this.dataset.id)">`)).join('')
    strHtml += `</div>`
    document.querySelector('.gallery-image').innerHTML = strHtml
}

function openGallery() {
    document.querySelector('.main-contant').style.display = 'none'
    document.querySelector('.memes-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'block'
    document.querySelector('.gallery-image').style.display = 'grid'
}


// Set a new image that clicked

function setImg(imgId) {
    gMeme.selectedImgId = +imgId
    renderMeme()
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    renderGallery();
}