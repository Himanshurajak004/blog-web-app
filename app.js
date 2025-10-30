const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

// Home Page
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Create New Post Page
app.get("/new", (req, res) => {
  res.render("new");
});

// Create Post
app.post("/new", (req, res) => {
  const post = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    content: req.body.content,
  };
  posts.push(post);
  res.redirect("/");
});

// Edit Post
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("edit", { post });
});

// Update Post
app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.author = req.body.author;
  post.category = req.body.category;
  post.content = req.body.content;
  res.redirect("/");
});

// Delete Post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
