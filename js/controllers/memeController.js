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

    displayCanvas()
    gCanvas.height = elImg.height * gCanvas.width / elImg.width
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

    let x = gCanvas.width / 2
    let y = 40

    drawStyledMultilineText(gCurrMeme.lines, x, y)
}


function drawStyledMultilineText(lines, x, y) {
    getTextPos(x, y)
    lines.forEach(line => {
        gCtx.font = `${line.size}px Impact`
        gCtx.fillStyle = line.color
        gCtx.textAlign = 'center'
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2

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

function onAddLine() {

    gLines++
    const elMemeText = document.querySelector(".meme-text")
    createLine()
    gCurrMeme.selectedLineIdx = gLines
    updateMemeInputs()
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
    } else gCurrMeme.selectedLineIdx = gCurrMeme.lines.length - 1
    updateMemeInputs()
}

function onNextLine() {

    if (gCurrMeme.selectedLineIdx < gCurrMeme.lines.length - 1) {
        gCurrMeme.selectedLineIdx++
    } else gCurrMeme.selectedLineIdx = 0

    updateMemeInputs()
}

function clearMemeInput() {
    const elMemeText = document.querySelector(".meme-text")
    elMemeText.value = ''
}

function updateMemeInputs() {
    const elColor = document.querySelector('.color-picker')
    const elText = document.querySelector('.meme-text')
    elText.value = gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt
    elColor.value = gCurrMeme.lines[gCurrMeme.selectedLineIdx].color
}

function getTextPos(x, y) {
    switch (gCurrMeme.selectedLineIdx) {
        case 0:
            gCurrMeme.lines[gCurrMeme.selectedLineIdx].xPos = x
            gCurrMeme.lines[gCurrMeme.selectedLineIdx].yPos = y
            break;

        case 1:
            gCurrMeme.lines[gCurrMeme.selectedLineIdx].xPos = x
            gCurrMeme.lines[gCurrMeme.selectedLineIdx].yPos = x * 2 - y
            break;
        default:
            gCurrMeme.lines[gCurrMeme.selectedLineIdx].xPos = x
            gCurrMeme.lines[gCurrMeme.selectedLineIdx].yPos = x
            break;
    }
}