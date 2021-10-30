'use strict'

function openMemes() {
    renderEditor(1)
    document.querySelector('.main-contant').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.memes-container').style.display = 'grid'
    let strHtml = ''
    const userMemes = gUserMemes
    strHtml += (userMemes.map((meme) => `<div><img data-id=0 src='${meme.url}' onclick= "userMemeSelect(${meme.id})">
    <button class="del-meme" onclick="deleteMeme(${meme.id})">X</button></div>`)).join('')
    document.querySelector('.memes-container').innerHTML = strHtml
}

function userMemeSelect(memeId) {
    let meme = gUserMemes.find((meme) => meme.id === memeId)
    gMeme = JSON.parse(JSON.stringify(meme.data))
    document.querySelector('.main-contant').style.display = 'flex'
    document.querySelector('.memes-container').style.display = 'none'
    renderMeme()
}

function deleteMeme(id) {
    console.log('hi!')
    console.log('meme!', id)
    let idx = gUserMemes.findIndex(meme => meme.id === id)
    console.log('idx', idx)
    gUserMemes.splice(idx, 1)
    saveToStorage(key, gUserMemes)
    openMemes()
}
