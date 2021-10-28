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
    {
        id: 6, url: 'meme-imgs (square)/6.jpg', keywords: ['happy']
    },
    {
        id: 7, url: 'meme-imgs (square)/7.jpg', keywords: ['happy']
    },
    {
        id: 8, url: 'meme-imgs (square)/8.jpg', keywords: ['happy']
    },
    {
        id: 9, url: 'meme-imgs (square)/9.jpg', keywords: ['happy']
    },
    {
        id: 10, url: 'meme-imgs (square)/10.jpg', keywords: ['happy']
    },
    {
        id: 11, url: 'meme-imgs (square)/11.jpg', keywords: ['happy']
    },
    {
        id: 12, url: 'meme-imgs (square)/12.jpg', keywords: ['happy']
    },
    {
        id: 13, url: 'meme-imgs (square)/13.jpg', keywords: ['happy']
    },
    {
        id: 14, url: 'meme-imgs (square)/14.jpg', keywords: ['happy']
    },
    {
        id: 15, url: 'meme-imgs (square)/15.jpg', keywords: ['happy']
    },
    {
        id: 16, url: 'meme-imgs (square)/16.jpg', keywords: ['happy']
    },
    {
        id: 17, url: 'meme-imgs (square)/17.jpg', keywords: ['happy']
    },
    {
        id: 18, url: 'meme-imgs (square)/18.jpg', keywords: ['happy']
    },

];

function renderGallery() {
    let strHtml = ''
    const imgs = gImgs
    strHtml += (imgs.map((img) => `<img data-id=${img.id} src='${img.url}' onclick="renderEditor(this.dataset.id)">`)).join('')
    document.querySelector('.gallary-container').innerHTML = strHtml
}

function openGallery() {
    document.querySelector('.main-contant').style.display = 'none'
    document.querySelector('.memes-container').style.display = 'none'
    document.querySelector('.gallary-container').style.display = 'grid'
}