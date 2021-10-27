'use strict'

let gElCanvas;

let gCtx

let gCtxSize = 450

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 40,
            align: 'center',
            color: 'white',
            posY: 50,
        },
        {
            txt: 'But I Love Israel',
            size: 40,
            align: 'center',
            color: 'white',
            posY: 430,
        },
    ]
}

function renderCanvas(imgId) {
    setImg(imgId)
    let strHtml = `
    <div class="canvas-container">
    <canvas class="canvas" height="${gCtxSize}" width="${gCtxSize}"></canvas>
    </div>
    <section class="options-bar">
    <input class="txt-input" type="text" placeholder="Change ME!" oninput="setTxt(this.value)">
    <section class="buttons">
        <button class="increase/decrease" onclick="setFontSize('+')">A+</button>
        <button class="increase/decrease" onclick="setFontSize('-')">A-</button>
        <button class="up/down" onclick="setLinePos('up')">↑</button>
        <button class="up/down" onclick="setLinePos('down')">↓</button>
        <button class="switch-line" onclick="switchLine()">↓↑</button>
        </section>
    </section>
    `
    document.querySelector('.main-contant').innerHTML = strHtml
    document.querySelector('.main-contant').style.display = 'flex'

    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');

    renderMeme()

    document.querySelector('.gallary-container').style.display = 'none'
}

// Render gMeme
function renderMeme() {
    //render img by id
    let img = new Image();
    img.src = getImg(gMeme.selectedImgId).url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        renderLines()
        markLine()
    }
}

// Render each line in the gMeme
function renderLines() {
    gMeme.lines.forEach(line => {
        gCtx.textAlign = line.align
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px Impact`;
        gCtx.fillText(line.txt, gCtxSize / 2, line.posY);
        gCtx.strokeText(line.txt, gCtxSize / 2, line.posY);
    });
}

// Mark the selected line 
function markLine() {
    let markedLine = gMeme.lines[gMeme.selectedLineIdx]
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.moveTo(2, markedLine.posY - markedLine.size);
    gCtx.lineTo(gElCanvas.width - 2, markedLine.posY - markedLine.size);
    gCtx.lineTo(gElCanvas.width - 2, markedLine.posY + 5);
    gCtx.lineTo(2, markedLine.posY + 5);
    gCtx.closePath();
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
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
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    renderMeme(gMeme)
}

// Change the line pos by button click
function setLinePos(val) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx]
    switch (val) {
        case 'up':
            currLine.posY -= 10
            break
        case 'down':
            currLine.posY += 10
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

// switch lines by button click
function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else { gMeme.selectedLineIdx++ }
    document.querySelector('.txt-input').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme()
}


/////////////////draft//////////////////

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