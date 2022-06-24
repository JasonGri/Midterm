'use strict';

// Changes the src path of the svg icon 
function toggleSort(){
    const sortUp = './imgs/sort-up.svg'
    const sortDown = './imgs/sort-down.svg'
    let sortImg = this.firstChild
    sortImg.src === 'file:///C:/Users/jason/OneDrive/Desktop/Midterm/Midterm/imgs/sort-down.svg' ? sortImg.src = sortUp : sortImg.src = sortDown;
}

// Validates Input of the form, displays a message in case of error
function formValidation2(title, rating, comment){
    // Clear error messages
    title.parentElement.querySelector('span').innerHTML = '';
    rating.parentElement.querySelector('span').innerHTML = '';
    comment.parentElement.querySelector('span').innerHTML = '';
    let isValid = true;

    if (title.value === ''){
        title.parentElement.querySelector('span').innerHTML = 'Enter a game title!';
        isValid=false;
    }
    if (rating.value === ''){
        rating.parentElement.querySelector('span').innerHTML = 'Enter a rating!';
        isValid=false;
    }
    if (comment.value === ''){
        comment.parentElement.querySelector('span').innerHTML = 'Enter a comment!';
        isValid=false;
    }
    if (!(rating.value >= 0 && rating.value <=10 )){
        rating.parentElement.querySelector('span').innerHTML = 'The rating has to be from 0 - 10!';
        isValid=false;
    }
    return isValid;
}



document.addEventListener('DOMContentLoaded', () => {

    // Toggling Sorting Icon 
    document.getElementById('title-toggle').onclick = toggleSort;
    document.getElementById('rating-toggle').onclick = toggleSort;
    
    // Submission of the form
    document.querySelector('form').onsubmit = () => {
        let title = document.getElementById('title');
        let rating = document.getElementById('rating');
        let comment = document.getElementById('comment');
        
        // Stop code execution if input is invalid
        if (formValidation2(title,rating,comment)===false){
            return false;
        }
        
        // Create new table row
        const tr = document.createElement('tr');
        // Customize the format of the tr html code
        tr.innerHTML =
        `<th scope="row">2</th>
        <td>${title.value}</td>
        <td>${rating.value}</td>
        <td>${comment.value}</td>
        <td id="td-dlt">
        <button type="button" class="btn btn-danger btn-sm dlt"><img class="filter-white" src="./imgs/trash.svg" alt="trashcan" width="30" height="24"></button>
        </td>`;
        // Add the row to the table body
        document.querySelector('tbody').appendChild(tr);
        
        // Clear form fields
        title.value = '';
        rating.value = '';
        comment.value = '';
        
        // Delete Table Row 
            // Gather all the delete buttons
        var dltBtns = document.getElementsByClassName("dlt");

        // When the button is clicked go to the table row of the button and delete it
        dltBtns.forEach(
            function(btn){btn.onclick = () =>
            btn.parentElement.parentElement.remove();}
        )

        // Stop form from submitting
        return false;
    };
    
});