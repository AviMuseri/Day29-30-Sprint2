'use strict'
const gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'white',
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
        size: size || 20,
        color: color || 'red',
        xPos: xPos || 50,
        yPos: yPos || 40
    }
    gMeme.lines.push(line)
}
function setLineTxt(text, idx = gMeme.selectedLineIdx) {
    gMeme.lines[idx].txt = text
}
// update - image
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

