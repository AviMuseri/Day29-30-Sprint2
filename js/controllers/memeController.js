var gCtx
var gCanvas
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderImages()
}

function renderMeme(elImg, text = 'hey') {
    // const meme = getMeme()
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elMemeGallery = document.querySelector('.meme-gallery')

    elCanvasContainer.classList.remove('hide')
    elMemeGallery.classList.add('hide')

    gCanvas.width = elImg.width;
    gCanvas.height = elImg.height;

    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

    setText()

    const x = gCanvas.width / 2;
    const y = 40;

    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);

}

function setText() {
    gCtx.font = '30px Impact';
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 2;
    gCtx.textAlign = 'center';
}

