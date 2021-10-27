'use strict'

var gElCanvas;

var gCtx;

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 40,
            align: 'center',
            color: 'white'
        }
    ]
}

function getImg(id) {
    return gImgs.find((img) => img.id === id)
}

// Render gMeme
function renderMeme(gMeme) {
    //render img by id
    let img = new Image();
    let txt = gMeme.lines[0].txt
    let curLine = gMeme.lines[gMeme.selectedLineIdx]
    // console.log('curLine', curLine)
    img.src = getImg(gMeme.selectedImgId).url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gCtx.lineWidth = 2;
        gCtx.textAlign = curLine.align
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = curLine.color;
        gCtx.font = `${curLine.size}px Impact`;
        gCtx.fillText(txt, 225, 50);
        gCtx.strokeText(txt, 225, 50);
    }
}

function setImg(imgId) {
    console.log('imgId', imgId);
    gMeme.selectedImgId = +imgId
    renderMeme(gMeme)
}

function setTxt(txt) {
    gMeme.lines[0].txt = txt
    renderMeme(gMeme)
}

function drawText(x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = gStrokeColor;
    gCtx.fillStyle = gFillColor;
    gCtx.font = `${gSize}px Arial`;
    gCtx.fillText(gTxt, x, y);
    gCtx.strokeText(gTxt, x, y);
}

// function renderImg(img) {
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }

// function drawImg() {
//     var img = new Image();
//     img.src = 'img/1.png';
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
//     };
// }