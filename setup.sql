CREATE TABLE Inventory (
    entry_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    publication_date DATE NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL
);
