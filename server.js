const express = require("express");
const bookstoreRoutes = require("./src/bookstore/routes");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/v1/bookstore", bookstoreRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
