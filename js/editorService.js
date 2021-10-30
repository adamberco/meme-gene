
function initGmeme() {
    gMeme = {
        selectedImgId: null,
        selectedLineIdx: null,

        lines: [
            {
                txt: 'Click to enter funny line',
                size: 28,
                align: 'center',
                color: 'white',
                strokeColor: 'black',
                font: 'Impact',
                posY: 50,
                posX: gCtxSize / 2,
                isDrag: false
            },
            {
                txt: 'Click to enter funny line',
                size: 28,
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
function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
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

function setAlign(val) {
    if (gMeme.selectedLineIdx === null) return
    switch (val) {
        case 'left':
            getLine().posX = 0 + getLine().txtLength / 2
            break
        case 'center':
            getLine().posX = gCtxSize / 2
            break
        case 'right':
            getLine().posX = gCtxSize - getLine().txtLength / 2
            break
    }
    renderMeme(gMeme)
}

function setFont(val) {
    // renderMeme(gMeme)

    if (gMeme.selectedLineIdx === null) return
    switch (val) {
        case 'Impact':
            getLine().font = 'Impact'
            break
        case 'Apex':
            getLine().font = 'Apex'
            break
        case 'Comic':
            getLine().font = 'Comic'
            break
        case 'Gest':
            getLine().font = 'Gest'
            break
        case 'Sunny':
            getLine().font = 'Sunny'
            break
    }
    renderMeme(gMeme)
}

function setLineColor(color) {
    if (gMeme.selectedLineIdx === null) return
    let line = getLine()
    line.color = color
    renderMeme()
    return color
}
function setStrokeColor(color) {
    if (gMeme.selectedLineIdx === null) return
    let line = getLine()
    line.strokeColor = color
    renderMeme()
    return color
}