'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const key = 'userMemeDB'

let gElCanvas
let gCtx
let gCtxSize = 300
let gUserMemes = []
let gNextId = 101

let gMeme = {
    selectedImgId: null,
    selectedLineIdx: null,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 40,
            align: 'center',
            color: 'white',
            posY: 50,
            isDrag: false

        },
    ]
}

function renderEditor(imgId) {
    setImg(imgId)
    let strHtml = `
    <div class="canvas-container">
    <canvas class="canvas" height="${gCtxSize}" width="${gCtxSize}"
     onclick = "canvasClicked(event)"></canvas>
    </div>
    <section class="options-bar">
    <input class="txt-input" type="text" placeholder="Change ME!"
     oninput="setTxt(this.value)">
    <section class="line-buttons flex">
        <button class="switch-line" onclick="switchLine()"></button>
        <button class="add-line" onclick="addLine()"></button>
        <button class="delete-line" onclick="deleteLine()"></button>
        <button class="save-meme" onclick="saveMeme()"></button>
    </section>
    <section class="text-buttons">
        <button class="increase/decrease plus" onclick="setFontSize('+')"></button>
        <button class="increase/decrease minus" onclick="setFontSize('-')"></button>
        <button class="up/down up" onclick="setLinePos('up')"></button>
        <button class="up/down down" onclick="setLinePos('down')"></button>
    </section>
    <section class="finish-buttons flex">
        <button><a class="download" href="#" onclick="downloadMeme(this)" download="myphoto">Download</a></button>
        <button class="" onclick="toggleModal()" onmousedown="uploadImg()">Share</button>
    </section>
    </section>
    `
    document.querySelector('.main-contant').innerHTML = strHtml
    document.querySelector('.main-contant').style.display = 'flex'
    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas()
    addListeners()

    document.querySelector('.gallary-container').style.display = 'none'
}

function getUserMemes() {
    gUserMemes = loadFromStorage(key) || []
}

function userMemeSelect(memeId) {
    let meme = gUserMemes.find((meme) => meme.id === memeId)
    gMeme = JSON.parse(JSON.stringify(meme.data))
    document.querySelector('.main-contant').style.display = 'flex'
    document.querySelector('.memes-container').style.display = 'none'
    renderMeme()
}

function saveMeme() {
    console.log('saved')
    gNextId = (!gUserMemes.length) ? 101 : gUserMemes.length + 101
    const data = gElCanvas.toDataURL('image/jpeg');
    let newMeme = JSON.parse(JSON.stringify(gMeme));
    gUserMemes.push({ id: gNextId++, data: newMeme, url: data, })
    saveToStorage(key, gUserMemes)
}

function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL('image/jpeg');
    elLink.href = data;
    elLink.download = 'my-img.png'
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
    if (!gMeme.lines.length) return
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
    if (gMeme.selectedLineIdx === null) return
    let markedLine = getLine()
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
    getLine().txt = txt
    renderMeme(gMeme)
}

// Change the font size by button click
function setFontSize(val) {
    if (gMeme.selectedLineIdx === null) return
    switch (val) {
        case '+':
            getLine().size += 3
            break
        case '-':
            getLine().size -= 3
            break
    }
    renderMeme(gMeme)
}

// get the coord on the canvas
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
// MEME LINES HANDLE

function switchLine() {
    if (gMeme.lines.length === 0) return
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1 || gMeme.selectedLineIdx === null) {
        gMeme.selectedLineIdx = 0
    } else { gMeme.selectedLineIdx++ }

    document.querySelector('.txt-input').value = getLine().txt
    renderMeme()
}

function deleteLine() {
    if (gMeme.selectedLineIdx === null) return
    let lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
    if (gMeme.lines.length === 0) gMeme.selectedLineIdx = null
    else gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}

function addLine() {
    let posY
    if (gMeme.lines.length === 0) posY = 50
    else if (gMeme.lines.length === 1) posY = gElCanvas.height - 20
    else posY = gElCanvas.height / 2 - 20
    let newLine = {
        txt: `I'm a new line!! `,
        size: 40,
        align: 'center',
        color: 'white',
        posY: posY,
        isDrag: false
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    document.querySelector('.txt-input').value = getLine().txt
    renderMeme()
}

// get the selected line
function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

// Change the line pos by button click
function setLinePos(val) {
    if (gMeme.selectedLineIdx === null) return
    let currLine = getLine()
    switch (val) {
        case 'up':
            currLine.posY -= 15
            break
        case 'down':
            currLine.posY += 15
            break
    }
    renderMeme(gMeme)
}

// enable line dragging
function setLineDrag(isDrag) {
    let line = getLine()
    if (!line) return
    line.isDrag = isDrag
}

// handale canvas mousedown/touchstart event
function onDown(ev) {
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        switchLine()
    }
    // const pos = getEvPos(ev)
    if (!canvasClicked(ev)) return
    setLineDrag(true)
    // gStartPos = pos
    // document.querySelector('canvas').style.cursor = 'grabbing'
}

// handale canvas mousemove/touchmove event
function onMove(ev) {
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
    }
    const line = getLine();
    if (!line) return
    if (line.isDrag) {
        const pos = getEvPos(ev)
        // const dx = pos.x - gStartPos.x
        const dy = pos.y - line.posY
        // gStartPos = pos
        moveLine(dy)
        // moveCircle(dx, dy)
        // renderCanvas()
        renderMeme()
    }
}

// move the line by drag
function moveLine(dy) {
    const line = getLine();
    line.posY += dy
}

// handale canvas mouseup/touchend event
function onUp() {
    setLineDrag(false)
    // document.querySelector('canvas').style.cursor = 'grab'
}

// handale canvas click event
function canvasClicked(ev) {
    let clickedLineIdx = gMeme.lines.findIndex(line => {
        return ev.offsetY <= line.posY && ev.offsetY >= line.posY - line.size
    })

    if (gTouchEvs.includes(ev.type)) {
        ev = ev.changedTouches[0]
        let currY = ev.pageY - ev.target.offsetTop - ev.target.clientTop
        clickedLineIdx = gMeme.lines.findIndex(line => {
            return currY <= line.posY && currY >= line.posY - line.size
        })
    }

    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx
        document.querySelector('.txt-input').value = getLine().txt
        renderMeme()
        return true
    } else {
        gMeme.selectedLineIdx = null
        renderMeme()
        return false

    }
}
///*******  Adding Listeners *******///

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}