const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
require("dotenv").config();

const db = knex(knexConfig.development);

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/api/todos", (req, res) => {
  db("todos")
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
server.post("/api/todos", (req, res) => {
  const todo = req.body;
  db("todos")
    .insert(todo) //resolves to array containing id of new user
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
server.put("/api/todos/:id", (req, res) => {
  let id = req.params.id;
  let todo = req.body;
  db("todos")
    .where({ id })
    .update(todo)
    .then(count => {
      res.status(200).json({ message: "sueccessfully updated todo" });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
server.delete("/api/todos/:id", (req, res) => {
  let id = req.params.id;
  db("todos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ message: "successfully removed todo" });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
