var gCtx
var gCanvas
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gPhotoSelected

let gCurrentFontSize = 25
let gCurrentColor = 'white'


function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderImages()
}

function renderMeme(elImg) {
    displayCanvas()
    const meme = getMeme()
    const firstLineMeme = meme.lines[0]
    gPhotoSelected = elImg
    gCanvas.height = elImg.height * gCanvas.width / elImg.width
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

    const x = gCanvas.width / 2
    const y = 40
    setTextProp()
    gCtx.fillText(firstLineMeme.txt, x, y)
    gCtx.strokeText(firstLineMeme.txt, x, y)
}


function onSetLineTxt(elText) {
    setLineTxt(gPhotoSelected, elText.value)
    renderMeme(gPhotoSelected, elText.value)
}

function displayCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elMemeGallery = document.querySelector('.meme-gallery')

    elCanvasContainer.style.display = 'block';
    elMemeGallery.style.display = 'none';
}

function onDownloadMeme() {
    const link = document.createElement('a')
    link.href = gCanvas.toDataURL('image/png')
    link.download = 'my-meme.png'
    link.click()
}

function onColorPicker(elColor) {
    gCurrentColor = elColor.value
    renderMeme(gPhotoSelected)
}

function onIncreaseFont(elBtn) {
    gCurrentFontSize += 2
    renderMeme(gPhotoSelected)
}

function onDecreaseFont(elBtn) {
    if (gCurrentFontSize > 20) {
        gCurrentFontSize -= 2
        renderMeme(gPhotoSelected)
    }
}


function setTextProp() {
    gCtx.font = `${gCurrentFontSize}px Impact`
    gCtx.fillStyle = gCurrentColor
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'
}