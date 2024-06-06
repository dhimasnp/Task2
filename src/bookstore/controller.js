const pool = require('../../db');
const queries = require('./queries');

const getAuthor = (req, res) => {
    pool.query(queries.getAuthor, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getAuthorById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getAuthorById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const addAuthor = (req, res) => {
    const {AuthorID, AuthorName, Email, Phone } = req.body;
    console.log(req.body);
    pool.query(queries.checkEmailExists, [Email], (error, results) => {
        //check if email exists
        if (results.rows.length) {
            res.send("Email already exists.");
        }

        //add new author
        pool.query(queries.addAuthor, [AuthorID, AuthorName, Email, Phone], (error, results) => {
            if (error) throw error;
            res.status(201).send("Author added successfully");
        });
    });
};

const deleteAuthor = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getAuthorById, [id], (error, results) => {
        if (results.rows.length) {
            pool.query(queries.deleteAuthor, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send(`Author deleted with ID: ${id}`);
            });
        } else {
            res.status(404).send("Author not found.");
        }
    });
}

const updateAuthor = (req, res) => {
    const id = parseInt(req.params.id);
    const { AuthorName } = req.body;
    pool.query(queries.getAuthorById, [id], (error, results) => {
        if (results.rows.length) {
            pool.query(queries.updateAuthor, [AuthorName, id], (error, results) => {
                if (error) throw error;
                res.status(200).send(`Author modified with ID: ${id}`);
            });
        } else {
            res.status(404).send("Author not found.");
        }
    });
}

const getBook = (req, res) => {
    pool.query(queries.getBook, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};


// TCL: Add Multiple New Books with Transaction
const addMultipleNewBooks = (req, res) => {
    const { books } = req.body;
  
    pool.connect((err, client, done) => {
      if (err) throw err;
  
      const handleError = (err) => {
        done();
        console.error(err);
        res.status(500).send("An error occurred");
      };
  
      // Start transaction
      client.query("BEGIN", (err) => {
        if (err) return handleError(err);
  
        const addBookPromises = books.map((book) => {
          const {BookID, BookName, PublicationYear, Pages, PublisherName} = book;
          return client.query(queries.addBook, [
            BookID,
            BookName,
            PublicationYear,
            Pages,
            PublisherName,
          ]);
        });
  
        Promise.all(addBookPromises)
          .then(() => {
            // Commit transaction
            client.query("COMMIT", (err) => {
              if (err) return handleError(err);
              done();
              res.status(201).send("Books added successfully!");
            });
          })
          .catch((err) => {
            // Rollback transaction
            client.query("ROLLBACK", (rollbackErr) => {
              if (rollbackErr) return handleError(rollbackErr);
              handleError(err);
            });
          });
      });
    });
  };
  

module.exports = {
    getAuthor,
    getBook,
    getAuthorById,
    addAuthor,
    deleteAuthor,
    updateAuthor,
    addMultipleNewBooks,
};
