'use strict'

function renderImages() {
    const elMemeGallery = document.querySelector('.meme-gallery')
    const images = getImages()
    const strHTMLs = images.map(image => `<img  data-id="${image.id}" src='${image.url}' class="meme-image" alt="" onclick="onImgSelect(this)">`)

    elMemeGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(elImg) {
    const imgId = elImg.dataset.id
    const imgIdx = getIndexImageById(imgId)

    setImg(imgIdx)
    renderMeme(elImg)
}

function onDisplayGallery() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elMemeGallery = document.querySelector('.meme-gallery')

    elCanvasContainer.style.display = 'none';
    elMemeGallery.style.display = 'grid';
}