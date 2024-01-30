const express = require("express");
const ejs = require("ejs");
const data = require("./data");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { posts: data.posts });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  console.log(newPost);
  data.posts.push(newPost);
  res.redirect("/");
});

app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = data.posts.find((post) => post.id === postId);
  if (!post) {
    res.status(404).send("Post not found.");
  } else {
    res.render("show", { post });
  }
});

app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = data.posts.find((post) => post.id === postId);
  if (!post) {
    res.status(404).send("Post not found.");
  } else {
    res.render("edit", { post });
  }
});

app.post("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = data.posts.find((post) => post.id === postId);
  if (!post) {
    res.status(404).send("Post not found.");
  } else {
    const { title, content } = req.body;
    post.title = title;
    post.content = content;
    res.redirect("/");
  }
});

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const index = data.posts.findIndex((post) => post.id === postId);
  if (index === -1) {
    res.status(404).send("Post not found.");
  } else {
    data.posts.splice(index, 1);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
