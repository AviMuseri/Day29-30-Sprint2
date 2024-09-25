'use strict'

var gImgs = [{ id: makeId(), url: "meme-imgs/meme-imgs (square)/1.jpg", keywords: ['funny', 'cat'] },
{ id: makeId(), url: "meme-imgs/meme-imgs (square)/2.jpg", keywords: ['funny', 'cat'] },
{ id: makeId(), url: "meme-imgs/meme-imgs (square)/3.jpg", keywords: ['funny', 'cat'] }]

function getImages() {
    return gImgs
}

function renderImages() {
    const elMemeGallery = document.querySelector('.meme-gallery')
    const images = getImages()
    const strHTMLs = images.map(image => `<img src='${image.url}' class="meme-image" alt="" onclick="onSelectImg(this)">`)

    elMemeGallery.innerHTML = strHTMLs.join('')
}

function onSelectImg(elImg) {
    renderMeme(elImg)
}
