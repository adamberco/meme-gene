'use strict'
let gFilterBy = ''

let gKeywords = { 'happy': 12, 'funny puk': 1 }

let gImgs = [
    {
        id: 1, url: 'meme-imgs (square)/1.jpg', keywords: ['political', 'funny']
    },
    {
        id: 2, url: 'meme-imgs (square)/2.jpg', keywords: ['animals', 'dogs',]
    },
    {
        id: 3, url: 'meme-imgs (square)/3.jpg', keywords: ['happy', 'dogs', 'animals', 'kids', 'baby']
    },
    {
        id: 4, url: 'meme-imgs (square)/4.jpg', keywords: ['cats', 'animals']
    },
    {
        id: 5, url: 'meme-imgs (square)/5.jpg', keywords: ['baby', 'kids']
    },
    {
        id: 6, url: 'meme-imgs (square)/6.jpg', keywords: ['happy', 'funny']
    },
    {
        id: 7, url: 'meme-imgs (square)/7.jpg', keywords: ['happy', 'kids', 'baby', 'surprised', 'funny']
    },
    {
        id: 8, url: 'meme-imgs (square)/8.jpg', keywords: ['happy']
    },
    {
        id: 9, url: 'meme-imgs (square)/9.jpg', keywords: ['baby']
    },
    {
        id: 10, url: 'meme-imgs (square)/10.jpg', keywords: ['political']
    },
    {
        id: 11, url: 'meme-imgs (square)/11.jpg', keywords: ['fight']
    },
    {
        id: 12, url: 'meme-imgs (square)/12.jpg', keywords: ['funny']
    },
    {
        id: 13, url: 'meme-imgs (square)/13.jpg', keywords: ['happy']
    },
    {
        id: 14, url: 'meme-imgs (square)/14.jpg', keywords: ['matrix']
    },
    {
        id: 15, url: 'meme-imgs (square)/15.jpg', keywords: ['surprised']
    },
    {
        id: 16, url: 'meme-imgs (square)/16.jpg', keywords: ['funny']
    },
    {
        id: 17, url: 'meme-imgs (square)/17.jpg', keywords: ['political']
    },
    {
        id: 18, url: 'meme-imgs (square)/18.jpg', keywords: ['cartoon']
    },

];

function setFilter(filterBy) {
    let filter = filterBy.toLowerCase()
    if (filter === 'all') filter = ''
    gFilterBy = filter
}

function getImgForDisplay() {
    var imgs
    if (!gFilterBy) imgs = gImgs;
    else imgs = gImgs.filter(function (img) {
        return (img.keywords.find((keyword) => keyword.includes(gFilterBy)))
    })
    return imgs
}

// Get img from gallery model
function getImg(id) {
    return gImgs.find((img) => img.id === id)
}