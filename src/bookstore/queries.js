const getAuthor = 'SELECT * FROM "Author"';
const getBook = 'SELECT * FROM "Book"';
const getAuthorById = 'SELECT * FROM "Author" WHERE "AuthorID" = $1';
const checkEmailExists = 'SELECT i FROM "Author" i WHERE i."Email" = $1';
const addAuthor = 'INSERT INTO "Author" ("AuthorID", "AuthorName", "Email", "Phone") VALUES ($1, $2, $3, $4)';
const deleteAuthor = 'DELETE FROM "Author" WHERE "AuthorID" = $1';
const updateAuthor = 'UPDATE "Author" SET "AuthorName" = $1 WHERE "AuthorID" = $2';
const checkBookExists = 'SELECT i FROM "Book" i WHERE i."BookName" = $1';
const addBook = 'INSERT INTO "Book" ("BookID", "BookName", "PublicationYear", "Pages", "PublisherName") VALUES ($1, $2, $3, $4, $5)';

module.exports = {
    getAuthor,
    getBook,
    getAuthorById,
    checkEmailExists,
    addAuthor,
    deleteAuthor,
    updateAuthor,
    checkBookExists,
    addBook,
};