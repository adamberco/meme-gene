'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
let gElCanvas
let gCtx
let gCtxSize

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
        <button class="save-meme" onclick="onSaveMeme()"></button>
    </section>
    <section class="text-buttons">
        <button class="increase/decrease plus" onclick="setFontSize('+')"></button>
        <button class="increase/decrease minus" onclick="setFontSize('-')"></button>
        <button class="align-left" onclick="setAlign('left')"></button>
        <button class="align-center" onclick="setAlign('center')"></button>      
        <button class="align-right" onclick="setAlign('right')"></button>
    <select id="fonts" name="fonts" onchange="setFont(this.value)">
        <option value="Impact" >Impact</option>
        <option value="Apex">Apex</option>
        <option value="Comic" onclick="setFont(this.value)">Comic</option>
        <option value="Gest">Gest</option>
        <option value="Sunny">Sunny</option>
    </select>
        <button class = "stroke-color"><input type="color" name="" id="" value = "#000000" oninput="setStrokeColor(this.value)"></button>
        <button class = "line-color"> <input type="color" name="" id="" value = "#ffffff" oninput="setLineColor(this.value)"></button>
    </section>
    <section class="finish-buttons flex">
        <button><a class="download" href="#" onclick="downloadMeme(this)" download="myphoto">Download</a></button>
        <button class="" onclick="toggleModal()" onmousedown="uploadImg()">Share</button>
    </section>
    </section>


    `
    document.querySelector('.main-contant').innerHTML = strHtml

    // let strHtml = `<canvas class="canvas" height="${gCtxSize}" width="${gCtxSize}"
    //     onclick = "canvasClicked(event)" ></canvas>`

    // document.querySelector('.canvas-container').innerHTML = strHtml


    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');
    gElCanvas.width = gCtxSize
    gElCanvas.height = gCtxSize
    addListeners()

    document.querySelector('.main-contant').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'
}

// Render gMeme
function renderMeme() {
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
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = line.align
        gCtx.lineWidth = 1.5;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.color;
        gCtx.fillText(line.txt, line.posX, line.posY);
        gCtx.strokeText(line.txt, line.posX, line.posY);
        line.txtLength = gCtx.measureText(line.txt).width
    });
}

// Mark the selected line 
function markLine() {
    if (gMeme.selectedLineIdx === null) return
    let markedLine = getSelectedLine()
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.moveTo(markedLine.posX - markedLine.txtLength / 2 - 10, markedLine.posY - markedLine.size - 3);
    gCtx.lineTo(markedLine.posX + markedLine.txtLength / 2 + 10, markedLine.posY - markedLine.size - 3);
    gCtx.lineTo(markedLine.posX + markedLine.txtLength / 2 + 10, markedLine.posY + 5);
    gCtx.lineTo(markedLine.posX - markedLine.txtLength / 2 - 10, markedLine.posY + 5);
    gCtx.closePath();
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

////Text edit/////

// Set the text that typed
function setTxt(txt) {
    getSelectedLine().txt = txt
    renderMeme()
}

function changeTextKeyboard(ev) {
    const input = document.querySelector('.txt-input');
    if (input === document.activeElement) return
    if (gMeme.selectedLineIdx === null) return
    if (ev.key === 'Enter' || ev.key === 'Shift' || ev.key === 'Alt' ||
        ev.key === 'Control' || ev.key === 'Tab' || ev.key === 'ArrowRight' ||
        ev.key === 'ArrowLeft' || ev.key === 'ArrowUp' || ev.key === 'ArrowDown') return
    if (getSelectedLine().txt === 'Enter funny line') getSelectedLine().txt = ''
    getSelectedLine().txt = (ev.key === 'Backspace') ?
        getSelectedLine().txt.slice(0, getSelectedLine().txt.length - 1)
        : getSelectedLine().txt.concat(ev.key)
    document.querySelector('.txt-input').value = getSelectedLine().txt
    renderMeme()
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

    document.querySelector('.txt-input').value = getSelectedLine().txt
    renderMeme()
}

function addLine() {
    let color = document.querySelector('.line-color input').value
    let strokeColor = document.querySelector('.stroke-color input').value
    let posY
    if (gMeme.lines.length === 0) posY = 50
    else if (gMeme.lines.length === 1) posY = gElCanvas.height - 20
    else posY = gElCanvas.height / 2
    let newLine = {
        txt: `Enter funny line`,
        size: 40,
        align: 'center',
        color,
        strokeColor,
        font: 'Impact',
        posY,
        posX: gCtxSize / 2,
        isDrag: false
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    document.querySelector('.txt-input').value = getSelectedLine().txt
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

function onSaveMeme() {
    saveMeme()
}

// enable line dragging
function setLineDrag(isDrag) {
    let line = getSelectedLine()
    if (!line) return
    line.isDrag = isDrag
}

// handale canvas mousedown/touchstart event
function onDown(ev) {
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        switchLine()
    }
    if (!canvasClicked(ev)) return
    setLineDrag(true)
    document.querySelector('.canvas').style.cursor = 'grabbing'
}

// handale canvas mousemove/touchmove event
function onMove(ev) {
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
    }
    const line = getSelectedLine();
    if (!line) return
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - line.posX
        const dy = pos.y - line.posY
        moveLine(dx, dy)
        renderMeme()
    }
}

// move the line by drag
function moveLine(dx, dy) {
    const line = getSelectedLine();
    line.posX += dx
    line.posY += dy

}

// handale canvas mouseup/touchend event
function onUp() {
    setLineDrag(false)
    document.querySelector('canvas').style.cursor = 'grab'
}

// handale canvas click event
function canvasClicked(ev) {
    let clickedLineIdx = gMeme.lines.findIndex(line => {
        return ev.offsetX >= line.posX - line.txtLength / 2 && ev.offsetX <= line.posX + line.txtLength / 2 &&
            ev.offsetY <= line.posY && ev.offsetY >= line.posY - line.size
    })

    if (gTouchEvs.includes(ev.type)) {
        ev = ev.changedTouches[0]
        let currY = ev.pageY - ev.target.offsetTop - ev.target.clientTop
        let currX = ev.pageX - ev.target.offsetLeft - ev.target.clientTop
        clickedLineIdx = gMeme.lines.findIndex(line => {
            return currX <= line.posX + line.txtLength / 2 && currX >= line.posX - line.txtLength / 2
                && currY <= line.posY && currY >= line.posY - line.size
        })
    }

    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx
        document.querySelector('.txt-input').value = getSelectedLine().txt
        renderMeme()
        return true
    } else {
        gMeme.selectedLineIdx = null
        document.querySelector('.txt-input').value = ''
        renderMeme()
        return false
    }
}

function setCanvasSize() {
    var elheader = document.querySelector('.main-header');
    if (elheader.offsetWidth <= 420) {
        gCtxSize = 300

    } else gCtxSize = 450
    if (gElCanvas) {
        gElCanvas.width = gCtxSize
        gElCanvas.height = gCtxSize
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
    window.addEventListener('keydown', changeTextKeyboard);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

////other options

function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL('image/jpeg');
    elLink.href = data;
    elLink.download = 'my-img.png'
}