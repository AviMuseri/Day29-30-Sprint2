'use strict'

const gImgs = [{ id: makeId(), url: "meme-imgs/meme-imgs (square)/1.jpg", keywords: ['funny', 'cat'] },
{ id: makeId(), url: "meme-imgs/meme-imgs (square)/2.jpg", keywords: ['funny', 'cat'] },
{ id: makeId(), url: "meme-imgs/meme-imgs (square)/3.jpg", keywords: ['funny', 'cat'] }]
//create
function getImages() {
    return gImgs
}

function getIndexImageById(imgId) {
    return gImgs.findIndex(image => image.id === imgId)
}

