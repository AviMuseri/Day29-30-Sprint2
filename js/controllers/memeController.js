var gCtx
var gCanvas
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gPhotoSelected

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

function setTextProp() {
    gCtx.font = '25px Impact'
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'
}

function onSetLineTxt(elText) {
    setLineTxt(elText.value, gPhotoSelected)
}

function displayCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elMemeGallery = document.querySelector('.meme-gallery')

    elCanvasContainer.style.display = 'block';
    elMemeGallery.style.display = 'none';
}