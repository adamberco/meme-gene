
function initGmeme() {
    gMeme = {
        selectedImgId: null,
        selectedLineIdx: 0,

        lines: [
            {
                txt: 'Enter funny line',
                size: 40,
                align: 'center',
                color: 'white',
                strokeColor: 'black',
                font: 'Impact',
                posY: 50,
                posX: gCtxSize / 2,
                isDrag: false
            },
            {
                txt: 'Enter funny line',
                size: 40,
                align: 'center',
                color: 'white',
                strokeColor: 'black',
                font: 'Impact',
                posY: gCtxSize - 20,
                posX: gCtxSize / 2,
                isDrag: false,
            },
        ]
    }
}

function getgMeme() {
    return gMeme
}

// get the selected line
function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

// Change the font size by button click
function setFontSize(val) {
    if (gMeme.selectedLineIdx === null) return
    switch (val) {
        case '+':
            getSelectedLine().size += 3
            break
        case '-':
            getSelectedLine().size -= 3
            break
    }
    renderMeme(gMeme)
}

function setAlign(val) {
    if (gMeme.selectedLineIdx === null) return
    let line = getSelectedLine()
    switch (val) {
        case 'left':
            line.posX = 15 + line.txtLength / 2
            break
        case 'center':
            line.posX = gCtxSize / 2
            break
        case 'right':
            line.posX = gCtxSize - line.txtLength / 2 - 15
            break
    }
    renderMeme(gMeme)
}

function setFont(val) {
    // renderMeme(gMeme)

    if (gMeme.selectedLineIdx === null) return
    switch (val) {
        case 'Impact':
            getSelectedLine().font = 'Impact'
            break
        case 'Apex':
            getSelectedLine().font = 'Apex'
            break
        case 'Comic':
            getSelectedLine().font = 'Comic'
            break
        case 'Gest':
            getSelectedLine().font = 'Gest'
            break
        case 'Sunny':
            getSelectedLine().font = 'Sunny'
            break
    }
    renderMeme(gMeme)
}

function setLineColor(color) {
    if (gMeme.selectedLineIdx === null) return
    let line = getSelectedLine()
    line.color = color
    document.querySelector('.line-color').style.backgroundColor = color
    renderMeme()
    return color
}
function setStrokeColor(color) {
    if (gMeme.selectedLineIdx === null) return
    let line = getSelectedLine()
    line.strokeColor = color
    document.querySelector('.stroke-color').style.backgroundColor = color
    renderMeme()
    return color
}