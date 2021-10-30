'use strict'

function openMemes() {
    renderEditor(1)
    document.querySelector('.main-contant').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.memes-container').style.display = 'grid'
    let strHtml = ''
    const imgs = gUserMemes
    strHtml += (imgs.map((img) => `<img data-id=0 src='${img.url}' onclick= "userMemeSelect(${img.id})">`)).join('')
    document.querySelector('.memes-container').innerHTML = strHtml
}

function userMemeSelect(memeId) {
    let meme = gUserMemes.find((meme) => meme.id === memeId)
    gMeme = JSON.parse(JSON.stringify(meme.data))
    document.querySelector('.main-contant').style.display = 'flex'
    document.querySelector('.memes-container').style.display = 'none'
    renderMeme()
}
