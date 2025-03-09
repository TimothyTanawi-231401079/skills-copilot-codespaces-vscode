// Create web server
// 1. Read all comments from the file
// 2. Add a new comment to the file
// 3. Delete a comment from the file
// 4. Update a comment in the file

const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

const commentsPath = "./comments.json";

// Read all comments from the file
app.get("/comments", (req, res) => {
  const comments = JSON.parse(fs.readFileSync(commentsPath));
  res.json(comments);
});

// Add a new comment to the file
app.post("/comments", (req, res) => {
  const comments = JSON.parse(fs.readFileSync(commentsPath));
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync(commentsPath, JSON.stringify(comments));
  res.json(newComment);
});

// Delete a comment from the file
app.delete("/comments/:id", (req, res) => {
  const comments = JSON.parse(fs.readFileSync(commentsPath));
  const id = Number(req.params.id);
  const filteredComments = comments.filter((comment) => comment.id !== id);
  fs.writeFileSync(commentsPath, JSON.stringify(filteredComments));
  res.json({ id });
});

// Update a comment in the file
app.put("/comments/:id", (req, res) => {
  const comments = JSON.parse(fs.readFileSync(commentsPath));
  const id = Number(req.params.id);
  const updatedComment = req.body;
  const updatedComments = comments.map((comment) => {
    if (comment.id === id) {
      return updatedComment;
    } else {
      return comment;
    }
  });
  fs.writeFileSync(commentsPath, JSON.stringify(updatedComments));
  res.json(updatedComment);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});