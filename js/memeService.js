'use strict'

let gElCanvas;

let gCtx;

let gFirstLineY = 50

let gMeme = {
    selectedImgId: 1,
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

// Render gMeme
function renderMeme(gMeme) {
    //render img by id
    let img = new Image();
    let txt = gMeme.lines[0].txt
    let curLine = gMeme.lines[gMeme.selectedLineIdx]
    img.src = getImg(gMeme.selectedImgId).url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gCtx.lineWidth = 2;
        gCtx.textAlign = curLine.align
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = curLine.color;
        gCtx.font = `${curLine.size}px Impact`;
        gCtx.fillText(txt, 225, gFirstLineY);
        gCtx.strokeText(txt, 225, gFirstLineY);
    }
}

// Get img from gallery model
function getImg(id) {
    return gImgs.find((img) => img.id === id)
}

// Set a new image that clicked
function setImg(imgId) {
    gMeme.selectedImgId = +imgId
    renderMeme(gMeme)
}

// Set the text that inputted
function setTxt(txt) {
    gMeme.lines[0].txt = txt
    renderMeme(gMeme)
}

// Change the line pos by button click
function setLinePos(val) {
    switch (val) {
        case 'up':
            gFirstLineY -= 10
            break
        case 'down':
            gFirstLineY += 10
            break
    }
    renderMeme(gMeme)
}

// Change the font size by button click
function setFontSize(val) {
    switch (val) {
        case '+':
            gMeme.lines[gMeme.selectedLineIdx].size += 3
            break
        case '-':
            gMeme.lines[gMeme.selectedLineIdx].size -= 3
            break
    }
    renderMeme(gMeme)
}



// function drawText(x, y) {
//     gCtx.lineWidth = 2;
//     gCtx.strokeStyle = gStrokeColor;
//     gCtx.fillStyle = gFillColor;
//     gCtx.font = `${gSize}px Arial`;
//     gCtx.fillText(gTxt, x, y);
//     gCtx.strokeText(gTxt, x, y);
// }

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