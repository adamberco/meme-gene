'use strict'
let gFilterBy = ''
//happy surprised animals dogs cats baby kids funny cartoon matrix
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

function renderGallery() {
    let strHtml = ``
    //     <div class="gallery-bar flex">
    //     <div class="search-bar flex">
    //         <input type="text" placeholder="Search" value='${gFilterBy}' oninput="onSetFilter(this.value)" autofocus>
    //     </div>
    //     <div class="keyword-filter flex">
    //         <span>Funny</span><span>Political</span><span>Kids</span>
    //         <span>Animals</span><span>Cats</span><span>Cartoon</span>
    //     </div>

    // </div>
    // <div class="gallery-image gallery">

    // const imgs = gImgs
    const imgs = getImgForDisplay()
    strHtml += (imgs.map((img) => `<img data-id=${img.id} src='${img.url}' onclick="renderEditor(this.dataset.id)">`)).join('')
    strHtml += `
    </div>
    
    `
    document.querySelector('.gallery-image').innerHTML = strHtml

}


function openGallery() {
    document.querySelector('.main-contant').style.display = 'none'
    document.querySelector('.memes-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'block'
    document.querySelector('.gallery-image').style.display = 'flex'
}

function onSetFilter(filterBy) {
    console.log('onSetFilter Filtering By:', filterBy);
    setFilter(filterBy);
    renderGallery();
}

function setFilter(filterBy) {
    let filter = filterBy.toLowerCase()
    console.log('setFilter filterBy', filter)
    gFilterBy = filter
}

function getImgForDisplay() {
    console.log('getImgForDisplay')
    var imgs
    if (!gFilterBy) imgs = gImgs;
    else imgs = gImgs.filter(function (img) {
        return (img.keywords.find((keyword) => keyword.includes(gFilterBy)))
    })
    return imgs
}