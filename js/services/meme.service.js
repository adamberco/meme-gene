'use strict'
const key = 'userMemeDB'
let gUserMemes = []
let gNextId = 101

function getUserMemes() {
    gUserMemes = loadFromStorage(key) || []
}

function saveMeme() {
    gNextId = (!gUserMemes.length) ? 101 : gUserMemes.length + 101
    const data = gElCanvas.toDataURL('image/jpeg');
    let newMeme = JSON.parse(JSON.stringify(gMeme));
    gUserMemes.push({ id: gNextId++, data: newMeme, url: data, })
    saveToStorage(key, gUserMemes)
}