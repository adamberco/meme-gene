// 'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const key = 'userMemeDB'

let gElCanvas
let gCtx
let gCtxSize
let gUserMemes = []
let gNextId = 101

function initGmeme() {
    gMeme = {
        selectedImgId: null,
        selectedLineIdx: 0,

        lines: [
            {
                txt: 'Click to enter funny line',
                size: 28,
                align: 'center',
                color: 'white',
                posY: 50,
                posX: gCtxSize / 2,
                isDrag: false
            },
            {
                txt: 'Click to enter funny line',
                size: 28,
                align: 'center',
                color: 'white',
                posY: gCtxSize - 20,
                posX: gCtxSize / 2,
                isDrag: false
            },
        ]
    }
}

function renderEditor(imgId) {
    initGmeme()
    setImg(imgId)
    let strHtml = `
    <div class="canvas-container">
    <canvas class="canvas" height="${gCtxSize}" width="${gCtxSize}"
     onclick = "canvasClicked(event)" ></canvas>
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
        <input class="color" type="color" name="" id="" value = "#ffffff" oninput="setLineColor(this.value)">
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
    gElCanvas.width = gCtxSize
    gElCanvas.height = gCtxSize
    addListeners()

    document.querySelector('.gallery-container').style.display = 'none'
}


function setLineColor(color) {
    if (gMeme.selectedLineIdx === null) return
    let line = getLine()
    line.color = color
    renderMeme()
    return color
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
        gCtx.fillText(line.txt, line.posX, line.posY);
        gCtx.strokeText(line.txt, line.posX, line.posY);
        line.txtLength = gCtx.measureText(line.txt).width
    });
}

// Mark the selected line 
function markLine() {
    if (gMeme.selectedLineIdx === null) return
    let markedLine = getLine()
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.moveTo(markedLine.posX - markedLine.txtLength / 2 - 10, markedLine.posY - markedLine.size + 3);
    gCtx.lineTo(markedLine.posX + markedLine.txtLength / 2 + 10, markedLine.posY - markedLine.size + 3);
    gCtx.lineTo(markedLine.posX + markedLine.txtLength / 2 + 10, markedLine.posY + 5);
    gCtx.lineTo(markedLine.posX - markedLine.txtLength / 2 - 10, markedLine.posY + 5);
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
    renderMeme()
}

// Set the text that inputted
function setTxt(txt) {
    getLine().txt = txt
    renderMeme()
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
    // markLine()

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
    let color = document.querySelector('.color').value
    let posY
    if (gMeme.lines.length === 0) posY = 50
    else if (gMeme.lines.length === 1) posY = gElCanvas.height - 20
    else posY = gElCanvas.height / 2
    let newLine = {
        txt: `Click to enter funny line`,
        size: 28,
        align: 'center',
        color: color,
        posY: posY,
        posX: gCtxSize / 2,
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
        const dx = pos.x - line.posX
        const dy = pos.y - line.posY
        // gStartPos = pos
        moveLine(dx, dy)
        // moveCircle(dx, dy)
        // renderCanvas()
        renderMeme()
    }
}

// move the line by drag
function moveLine(dx, dy) {
    const line = getLine();
    line.posX += dx
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
        // gMeme.selectedLineIdx = clickedLineIdx
        gMeme.lines.push(gMeme.lines[clickedLineIdx])
        console.log('gMeme.lines', gMeme.lines[clickedLineIdx])
        gMeme.lines.splice(clickedLineIdx, 1)
        gMeme.selectedLineIdx = gMeme.lines.length - 1
        document.querySelector('.txt-input').value = getLine().txt
        renderMeme()
        return true
    } else {
        gMeme.selectedLineIdx = null
        document.querySelector('.txt-input').value = ''
        renderMeme()
        return false

    }
}
///*******  Adding Listeners *******///

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        setCanvasSize()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
    window.addEventListener('keydown', changeText);


}

function changeText(ev) {
    const input = document.querySelector('.txt-input');
    if (input === document.activeElement) return
    if (gMeme.selectedLineIdx === null) return
    console.log('ev', ev.key)
    if (ev.key === 'Enter' || ev.key === 'Shift' || ev.key === 'Alt' || ev.key === 'Control' || ev.key === 'Tab' || ev.key === 'ArrowRight' || ev.key === 'ArrowLeft' || ev.key === 'ArrowUp' || ev.key === 'ArrowDown') return
    if (getLine().txt === 'Click to enter funny line') getLine().txt = ''
    getLine().txt = (ev.key === 'Backspace') ? getLine().txt.slice(0, getLine().txt.length - 1) : getLine().txt.concat(ev.key)
    document.querySelector('.txt-input').value = getLine().txt
    renderMeme()
}


function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}