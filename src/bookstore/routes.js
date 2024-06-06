const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getAuthor);
router.get("/books", controller.getBook);
router.post("/addauthor", controller.addAuthor);
router.get("/:id", controller.getAuthorById);
router.put("/:id", controller.updateAuthor);
router.delete("/:id", controller.deleteAuthor);
router.post('/addBook', controller.addMultipleNewBooks);

module.exports = router;