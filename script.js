const myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
    const book = new Book(author, title, pages, read);
    myLibrary.push(book);
}

const bookForm = document.querySelector("#bookForm");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const container = document.querySelector(".container");

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    addBookToLibrary(author, title, pages, read);
    displayBooks();
    dialog.close();
    bookForm.reset();
});

function displayBooks() {
    const booksDiv = document.querySelector('.books') || document.createElement('div');
    booksDiv.classList.add('books');
    booksDiv.innerHTML = ''; // Clear previous books

    if (myLibrary.length === 0) {
        booksDiv.innerHTML = '<h1>EMPTY</h1>';
    } else {
        myLibrary.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');

            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Read: ${book.read ? 'Yes' : 'No'}</p>
                <div class="book-actions">
                    <button class="toggle-read" onclick="toggleRead(${index})">
                        ${book.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button class="remove-book" onclick="removeBook(${index})">Remove</button>
                </div>
            `;

            booksDiv.appendChild(bookCard);
        });
    }

    // Replace or add books div to container
    const existingBooksDiv = container.querySelector('.books');
    if (existingBooksDiv) {
        container.replaceChild(booksDiv, existingBooksDiv);
    } else {
        container.appendChild(booksDiv);
    }
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

const dialog = document.querySelector("dialog");
const addButton = document.querySelector(".add");
const cancelButton = document.querySelector(".cancel");

addButton.addEventListener("click", () => {
    dialog.showModal();
});

cancelButton.addEventListener("click", () => {
    dialog.close();
});

myLibrary.push( new Book("Franz Kafka","Metamorphosis",78,true));
myLibrary.push(new Book("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 309, true));
displayBooks();