const myLibrary = [];
const table = document.getElementById("bookTable");


function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function() {
        let str = title + " by " + author + ", " + pages + " pages, ";
        if (read) {
            str += "has been read";
        } else {
            str += "not read yet";
        }
        return str;
    }
}

function addBookToLibrary(title, author, pages, read) {
    if (myLibrary.length > 0) {
        for (let i = myLibrary.length; i > 0; i--) {
            table.deleteRow(i);
        }
    }

    if (arguments.length === 0) {
        const book = new Book(
            document.getElementById("titleInput").value, 
            document.getElementById("authorInput").value, 
            document.getElementById("pagesInput").value, 
            document.getElementById("readInput").checked
        );
        myLibrary.push(book);

        document.getElementById("titleInput").value = '';
        document.getElementById("authorInput").value = '';
        document.getElementById("pagesInput").value = '';
        document.getElementById("readInput").checked = false;
    } else {
        const book = new Book(title, author, pages, read);
        myLibrary.push(book);
    }
    populateTable();
    document.getElementById("formContainer").style.display = "none";
    submitBtn.disabled = true;

}

function populateTable() {
    myLibrary.forEach(book => {
        const row = table.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        const cell3 = row.insertCell();
        const cell4 = row.insertCell();
        const cell5 = row.insertCell();

        cell1.textContent = book.title;
        cell2.textContent = book.author;
        cell3.textContent = book.pages;
        cell4.textContent = book.read ? "Yes" : "No";

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";
        toggleBtn.onclick = () => toggleReadStatus(book.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteBook(book.id);

        cell5.appendChild(toggleBtn);
        cell5.appendChild(deleteBtn);

    })
}

function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index != -1) {
        myLibrary.splice(index, 1);
        refreshTable();
    }
}

function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.read = !book.read;
        refreshTable();
    }
}

function refreshTable() {
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    populateTable();
}

function showForm() {
  document.getElementById("formContainer").style.display = "block";
}

const submitBtn = document.querySelector('#formContainer button');

function checkFormValidity() {
    const title = document.getElementById('titleInput').value.trim();
    const author = document.getElementById('authorInput').value.trim();
    const pages = document.getElementById('pagesInput').value.trim();
    
    submitBtn.disabled = !(title && author && pages);
}

document.getElementById('titleInput').addEventListener('input', checkFormValidity);
document.getElementById('authorInput').addEventListener('input', checkFormValidity);
document.getElementById('pagesInput').addEventListener('input', checkFormValidity);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);