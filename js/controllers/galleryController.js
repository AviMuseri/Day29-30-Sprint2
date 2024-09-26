'use strict'
const gImgs = [{ id: makeId(), url: "meme-imgs/meme-imgs (square)/1.jpg", keywords: ['funny', 'cat'] },
{ id: makeId(), url: "meme-imgs/meme-imgs (square)/2.jpg", keywords: ['funny', 'cat'] },
{ id: makeId(), url: "meme-imgs/meme-imgs (square)/3.jpg", keywords: ['funny', 'cat'] }]

function getImages() {
    return gImgs
}

function renderImages() {
    const elMemeGallery = document.querySelector('.meme-gallery')
    const images = getImages()
    const strHTMLs = images.map(image => `<img  data-id="${image.id}" src='${image.url}' class="meme-image" alt="" onclick="onImgSelect(this)">`)

    elMemeGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(elImg) {
    const imgId = elImg.dataset.id
    const imgIdx = gImgs.findIndex(gImg => gImg.id === imgId)

    setImg(imgIdx)
    renderMeme(elImg)
}

function onDisplayGallery() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elMemeGallery = document.querySelector('.meme-gallery')

    elCanvasContainer.style.display = 'none';
    elMemeGallery.style.display = 'grid';
}