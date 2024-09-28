'use strict'

let gCtx
var gCanvas
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

    updateMemeInputs()
    displayCanvas()

    gCanvas.height = elImg.height * gCanvas.width / elImg.width
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

    let x = gCanvas.width / 2
    let y = 40

    getTextPos(x, y)
    drawStyledMultilineText(gCurrMeme.lines)
}


function drawStyledMultilineText(lines) {
    lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px Impact`
        gCtx.fillStyle = line.color
        gCtx.textAlign = 'center'
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2

        gCtx.fillText(line.txt, line.xPos, line.yPos)
        gCtx.strokeText(line.txt, line.xPos, line.yPos)

        if (idx === gCurrMeme.selectedLineIdx) {
            const textWidth = gCtx.measureText(line.txt).width;
            const textHeight = line.size; // Assuming size corresponds to the text height
            gCtx.strokeStyle = 'red'; // Frame color
            gCtx.lineWidth = 2;
            gCtx.strokeRect(line.xPos - textWidth / 2 - 5, line.yPos - line.size, textWidth + 10, line.size + 10);
        }
    });
}


function displayCanvas() {
    const elCanvasContainer = document.querySelector('.meme-container')
    const elMemeGallery = document.querySelector('.meme-gallery')

    elCanvasContainer.style.display = 'flex'
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

function onShareMeme() {

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
    gCurrMeme.selectedLineIdx = gCurrMeme.lines.length - 1
    const elMemeText = document.querySelector(".meme-text")
    createLine()
    gCurrMeme.selectedLineIdx++
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
    const selectedLine = gCurrMeme.lines[gCurrMeme.selectedLineIdx];

    elText.value = gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt
    elColor.value = gCurrMeme.lines[gCurrMeme.selectedLineIdx].color

    if (selectedLine) {
        elText.value = selectedLine.txt;
        elColor.value = selectedLine.color;
    }
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

function onClickLine(ev) {
    const rect = gCanvas.getBoundingClientRect();
    const clickX = ev.clientX - rect.left;
    const clickY = ev.clientY - rect.top;

    gCurrMeme.lines.forEach((line, idx) => {
        const textWidth = gCtx.measureText(line.txt).width;
        const textHeight = line.size; // Assuming size corresponds to text height

        // Check if the click is within the line's frame
        if (
            clickX >= line.xPos - textWidth / 2 - 5 &&
            clickX <= line.xPos + textWidth / 2 + 5 &&
            clickY >= line.yPos - textHeight &&
            clickY <= line.yPos
        ) {
            gCurrMeme.selectedLineIdx = idx;
            updateMemeInputs(); // Update the input values based on the selected line
            renderMeme(gPhotoSelected); // Redraw the canvas with the updated frame
        }
    });
}