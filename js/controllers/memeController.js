'use strict'

let gCtx
var gCanvas
let gLines = 0
let gPhotoSelected
let gCurrMeme

const gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderImages()
}

function renderMeme(elImg) {
    gCurrMeme = getMeme()
    gPhotoSelected = elImg
    const lineIdx = gCurrMeme.selectedLineIdx
    const currLine = gCurrMeme.lines[lineIdx]

    displayCanvas()
    gCanvas.height = elImg.height * gCanvas.width / elImg.width
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

    let x = gCanvas.width / 2
    let y = 40
    switch (gCurrMeme.lines.length) {
        case 1:
            setPos(x, y, 0)
            break;

        case 2:
            setPos(x, y, 0)
            setPos(x, y + 40, 1)
            break;

        case 3:
            setPos(x, y, 0)
            setPos(x, y + 40, 1)
            setPos(x, y + 80, 2)
            break;
    }
    _setTextProp(currLine.size, currLine.color)
    gCurrMeme.lines.forEach((line) => {
        gCtx.fillText(line.txt, line.xPos, line.yPos)
        gCtx.strokeText(line.txt, line.xPos, line.yPos)
    });
}

function displayCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elMemeGallery = document.querySelector('.meme-gallery')

    elCanvasContainer.style.display = 'block'
    elMemeGallery.style.display = 'none'
}

function onSetLineTxt(elText) {
    setLineTxt(elText.value, gCurrMeme.selectedLineIdx)
    renderMeme(gPhotoSelected, elText.value)
}


function onDownloadMeme() {
    const link = document.createElement('a')
    link.href = gCanvas.toDataURL('image/png')
    link.download = 'my-meme.png'
    link.click()
}

function onColorPicker(elColor) {
    setColor(elColor.value, gCurrMeme.selectedLineIdx)
    renderMeme(gPhotoSelected)
}

function onIncreaseFont() {
    increaseFont(gCurrMeme.selectedLineIdx)
    renderMeme(gPhotoSelected)
}

function onDecreaseFont() {
    decreaseFont(gCurrMeme.selectedLineIdx)
    renderMeme(gPhotoSelected)
}

function _setTextProp(size = 25, color = 'white') {
    gCtx.font = `${size}px Impact`
    gCtx.fillStyle = color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'
}

function clearMemeInput() {
    const elMemeText = document.querySelector(".meme-text")
    elMemeText.value = ''
}

function onAddLine() {
    clearMemeInput()
    gLines++
    const elMemeText = document.querySelector(".meme-text")
    createLine()
    gCurrMeme.selectedLineIdx = gLines
    setLineIdx(gCurrMeme.selectedLineIdx)
    setLineTxt(elMemeText.value, gCurrMeme.selectedLineIdx)
    renderMeme(gPhotoSelected)
}

function setImgId(id) {
    setId(id)
}

function setSelectedLineIdx() {

}

function onPreviousLine() {
    if (gCurrMeme.selectedLineIdx > 0) {
        gCurrMeme.selectedLineIdx--
    }
}

function onNextLine() {
    if (gCurrMeme.selectedLineIdx < gCurrMeme.lines.length - 1) {
        gCurrMeme.selectedLineIdx++
    }
}