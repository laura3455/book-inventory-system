document.getElementById('addBookForm').onsubmit = async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const pubDate = document.getElementById('pubDate').value;
    const isbn = document.getElementById('isbn').value;

    const response = await fetch('/add-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, genre, pubDate, isbn })
    });

    if (response.ok) {
        alert('Book added successfully');
        document.getElementById('addBookForm').reset();
    } else {
        alert('Error adding book');
    }
};

document.getElementById('filterBooksForm').onsubmit = async (e) => {
    e.preventDefault();
    const title = document.getElementById('filterTitle').value;
    const author = document.getElementById('filterAuthor').value;
    const genre = document.getElementById('filterGenre').value;
    const pubDate = document.getElementById('filterPubDate').value;

    const response = await fetch(`/filter-books?title=${title}&author=${author}&genre=${genre}&pubDate=${pubDate}`);
    const books = await response.json();

    const tbody = document.getElementById('booksList').querySelector('tbody');
    tbody.innerHTML = '';  // Clear previous results
    books.forEach(book => {
        const row = `<tr>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.genre}</td>
                        <td>${book.publication_date}</td>
                        <td>${book.isbn}</td>
                    </tr>`;
        tbody.innerHTML += row;
    });
};

document.getElementById('exportCSV').onclick = () => {
    window.location.href = '/export-books?format=csv';
};

document.getElementById('exportJSON').onclick = () => {
    window.location.href = '/export-books?format=json';
};

