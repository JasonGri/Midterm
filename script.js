'use strict';

// Changes the src path of the svg icon 
const sortUp = './imgs/sort-up.svg'
const sortDown = './imgs/sort-down.svg'


function toggleSort(){
    let sortImg = this.firstChild
    sortImg.src === 'file:///C:/Users/jason/OneDrive/Desktop/Midterm/Midterm/imgs/sort-down.svg' ? sortImg.src = sortUp : sortImg.src = sortDown;
}


document.getElementById('title-toggle').addEventListener("click", toggleSort)
document.getElementById('rating-toggle').addEventListener("click", toggleSort)

