'use strict'
const gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Hello Developers !!',
            fontFamily: 'Impact',
            size: 30,
            align: 'center',
            color: '#ffffff',
            xPos: 50,
            yPos: 40
        }
    ]
}

function getMeme() {
    return gMeme
}

function setPos(posX, posY, index) {
    gMeme.lines[index].xPos = posX
    gMeme.lines[index].yPos = posY
}

// update - txt
function createLine(text, size, color, xPos, yPos) {
    const line = {
        txt: text || 'I sometimes eat Falafel',
        fontFamily: 'Impact',
        size: size || 20,
        align: 'center',
        color: color || '#ffffff',
        xPos: xPos || 50,
        yPos: yPos || 40
    }
    gMeme.lines.push(line)
}

function setLineTxt(text, idx = gMeme.selectedLineIdx) {
    gMeme.lines[idx].txt = text
}

function setId(id) {
    gMeme.selectedImgId = id
}

function setLineIdx(idx) {
    gMeme.selectedLineIdx = idx

}

function setColor(color, idx) {
    const currLine = gMeme.lines[idx]
    currLine.color = color
}

function increaseFont(idx) {
    const currLine = gMeme.lines[idx]
    currLine.size += 2
}

function decreaseFont(idx) {
    const currLine = gMeme.lines[idx]
    if (currLine.size > 20) currLine.size -= 2
}

function setFontFamily(elSelect) {
    const fontFamily = elSelect.value
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily
}

function setFontSize(elInput) {
    const fontSize = parseInt(elInput.value)
    gMeme.lines[gMeme.selectedLineIdx].size = fontSize
}

function setTextAlign(elSelect) {
    const textAlign = elSelect.value
    gMeme.lines[gMeme.selectedLineIdx].align = textAlign
}

function deleteLine() {
    console.log()
    if (gMeme.lines.length === 0) return

    gMeme.lines.splice(gMeme.selectedLineIdx, 1)

    if (gMeme.selectedLineIdx > 0) {
        gMeme.selectedLineIdx--
    } else if (gMeme.lines.length > 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }
}