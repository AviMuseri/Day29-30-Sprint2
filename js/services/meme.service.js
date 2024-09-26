'use strict'
const gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

// update - txt
function setLineTxt(img, text) {
    gMeme.lines[0].txt = text
}

// update - image
function setImg(idx) {
    gMeme.selectedImgId = idx
}