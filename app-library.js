const books = [];

let showFormAddingBook = document.querySelector('.plus');

showFormAddingBook.addEventListener('click', () => { 
    let form = document.querySelector('.addBook');
    form.style.zIndex = '1';
    let container = document.querySelector('.container');
    container.style.blur = '15px';
});

document.addEventListener('mouseup', function(e) {
    let form = document.querySelector('.addBook');
    if(!form.contains(e.target)) {
        form.style.zIndex = '-1';
    }
});

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    books.push(newBook);
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#read').value = 'other';
}

function deleteBookFromLibrary (index) {
    books.splice(index, 1);
}

function displayListBooks() {

    let contents = document.querySelector(".booksContainer");

    for (index = 0; index < books.length; index++) {
        
        let div = document.createElement('div');
        div.classList.add("book");

        let titre = document.createElement("h1");
        titre.textContent = books[index].title;
        div.appendChild(titre);

        let auteur = document.createElement("p");
        auteur.textContent = "By " + books[index].author;
        div.appendChild(auteur);

        let pagesPara = document.createElement("p");
        pagesPara.classList.add("pages");
        pagesPara.textContent = books[index].pages + " pages.";
        div.appendChild(pagesPara);

        let lu = document.createElement("p");
        lu.classList.add("read");
        lu.dataset.index = index;

        if (books[index].read === true) {
            lu.textContent = "Read";
            lu.classList.toggle("yes");
        } else {
            lu.textContent = "Not read";
            lu.classList.toggle("no");
        }
        div.appendChild(lu);

        lu.addEventListener("click", function () {
            console.log(books[index]);
            if (books[lu.dataset.index].read === true) {
                books[lu.dataset.index].read = false;
                lu.classList.toggle("yes");
                lu.classList.toggle("no");
                lu.textContent = "Not read";
            } else {
                books[lu.dataset.index].read = true;
                lu.classList.toggle("yes");
                lu.classList.toggle("no");
                lu.textContent = "Read";
            }
            console.log(books);
        });

        let deletePara = document.createElement("p");
        deletePara.classList.add("delete");
        deletePara.dataset.index = index;
        deletePara.textContent = "Delete this book";

        div.appendChild(deletePara);

        deletePara.addEventListener("click", function () {
            deleteBookFromLibrary(deletePara.dataset.index);
            let parentDelete = deletePara.parentNode;
            parentDelete.remove();
        })

        contents.appendChild(div);
    }

}

function removeBookList() {
    let removeBooks = document.querySelector('.booksContainer');
    for (let i = removeBooks.childNodes.length - 1; i >= 0; i --) {
        if(removeBooks.childNodes[i].nodeType === 1) {
            if (removeBooks.childNodes[i].classList.contains("book") === true) {
                removeBooks.childNodes[i].remove();
            }
        }
    }
}

let addOneBook = document.querySelector('.addBookToLibrary');

addOneBook.addEventListener('click', () => { 

    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').value;

    if (title === '') {
        document.querySelector('#title').style.border = '1px solid red';
    }
    if (author === '') {
        document.querySelector('#author').style.border = '1px solid red';
    }
    if (isNaN(pages) == true) {
        document.querySelector('#pages').style.border = '1px solid red';
    }
    if (read == 'other') {
        document.querySelector('#read').style.border = '1px solid red';
    }

    if (title === '' || author === '' || isNaN(pages) == true || read == 'other') {
        alert("Correctly");
    } else {
        if (read == 'read') {
            addBookToLibrary(title, author, pages, true);
            let addForm = document.querySelector('.addBook');
            addForm.style.zIndex = '-1';
        } else {
            addBookToLibrary(title, author, pages, false);
            let addForm = document.querySelector('.addBook');
            addForm.style.zIndex = '-1';
        }
    }
    
    removeBookList();

    displayListBooks();

    
});