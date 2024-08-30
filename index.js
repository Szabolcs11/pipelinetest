require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 80;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  return res.status(200).json({
    users: [
      { name: "John", age: 25 },
      { name: "Jane", age: 24 },
    ],
  });
});

app.post("/users/add", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({
      message: "Please provide name and age",
    });
  }
  return res.status(201).json({
    success: true,
    message: "User added successfully",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
});

module.exports = app;
