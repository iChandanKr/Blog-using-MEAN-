const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride=require("method-override");
app.use(methodOverride('_method'));

const blogRoutes = require("./routes/blogRoutes");
// --connecting to mongodb database.--
mongoose
  .connect("mongodb://localhost:27017/ninjaBlogs")
  .then((result) => {
    app.listen(3003, () => {
      console.log("listenint on port 3003");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
//---middlewares and static files---
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 2",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// app.get('/added-blogs',(req,res)=>{
//   Blog.find().then((result)=>{
//     res.send(result);
//   }).catch((err)=>{
//     console.log(err);
//   })
// })

app.get("/", (req, res) => {
  // const blogs = [
  //   {
  //     title: "yoshi finds egges",
  //     snippet: "Lorem ipsum dolor, sit amet consectetur",
  //   },
  //   {
  //     title: "mario finds stars",
  //     snippet: "Lorem ipsum dolor, sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat browser",
  //     snippet: "Lorem ipsum dolor, sit amet consectetur",
  //   },
  // ];
  // res.sendFile("./docs/index.html", { root: __dirname });
  // res.render("index", { title: "Home", blogs });

  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.sendFile("./docs/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});
//---REDIRECT -----
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
// BLOG ROUTES
app.use("/blogs", blogRoutes);
app.use((req, res) => {
  
  // if there is no match of rout then this statement would execte
  // res.status(404).sendFile('./docs/error.html',{root:__dirname});
  res.status(404).render("404", { title: "404" });
});
