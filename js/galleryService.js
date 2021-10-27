'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    {
        id: 1, url: 'meme-imgs (square)/1.jpg', keywords: ['happy']
    },
    {
        id: 2, url: 'meme-imgs (square)/2.jpg', keywords: ['happy']
    },
    {
        id: 3, url: 'meme-imgs (square)/3.jpg', keywords: ['happy']
    },
    {
        id: 4, url: 'meme-imgs (square)/4.jpg', keywords: ['happy']
    },
    {
        id: 5, url: 'meme-imgs (square)/5.jpg', keywords: ['happy']
    },

];

function renderGallery() {
    let strHtml = ''
    const imgs = gImgs
    strHtml += (imgs.map((img) => `<img data-id=${img.id} src='${img.url}' onclick="setImg(this.dataset.id)">`)).join('')
    document.querySelector('.gallary-container').innerHTML = strHtml
}