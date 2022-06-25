'use strict';

// Changes the src path of the svg icon 
function toggleSort(btn, asc){
    const sortUp = './imgs/sort-up.svg'
    const sortDown = './imgs/sort-down.svg'
    let sortImg = btn.firstChild
    asc ? sortImg.src = sortDown : sortImg.src = sortUp;
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

// Sorts table rows by column specified
function sortTableByColumn(table, column, asc=true){
    const dirModifier = asc ? 1:-1;
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Sort each row
    const sortedRows = rows.sort((a,b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();

        // Checks whether column includes text or numbers to prevent issues like '10'<'9'===true or 'Z' < 'a'===true
         if (isNaN(aColText)){

            return aColText.toLowerCase() > bColText.toLowerCase() ? (1 * dirModifier) : (-1 * dirModifier);
        } else {
            
            return parseFloat(aColText) > parseFloat(bColText) ? (1 * dirModifier) : (-1 * dirModifier);
        }
    })

    // Remove all existing table rows from the table
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Re-add the newly sorted rows
    tbody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc); // if asc param is true it places the th-sort-asc class to the th element
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);// if asc param is NOT true it places the th-sort-desc class to the th element

}

document.addEventListener('DOMContentLoaded', () => {
    
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
        `<td>${title.value}</td>
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
        const dltBtns = document.querySelectorAll(".dlt");

        // When the button is clicked go to the table row of the button and delete it
        dltBtns.forEach(
            function(btn){btn.onclick = () =>
            btn.parentElement.parentElement.remove();}
        )
        
        // Stop form from submitting
        return false;
    };
    
    // Sorting 
    document.querySelectorAll("#myTable th #toggle").forEach(btn => {
        btn.addEventListener("click", () => {
            const th = btn.parentElement;
            const tableElement = th.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(th.parentElement.children, th); // Finds the index of each table header
            const currentIsAscending = th.classList.contains("th-sort-asc");
    
            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
            toggleSort(btn, currentIsAscending);
        });
    });
});