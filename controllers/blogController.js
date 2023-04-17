// blog_index, blog_details, blog_create_get, blog_create_post,blog_delete
const Blog = require("../models/blog");
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog-Details" });
    })
    .catch((err) => {
      // console.log(err);
      res.status(404).render("404", { title: "Blog not found" });
    });
};
const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create new blog" });
};
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_update_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/update", { blog: result, title: "update-blog" });
    })
    .catch((err) => {
      console.log(err);
    });

  // console.log()
};
const blog_update_put = (req,res)=>{
  const id = req.params.id;
  const{title,snippet,body} = req.body;
  console.log(req.body);
  const newBlog = {title,snippet,body};
  console.log(newBlog);
  Blog.findByIdAndUpdate(id,newBlog).then((result)=>{
    res.redirect(`/blogs/${id}`);
  }).catch((err)=>{
    console.log(err); 
  })
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_update_get,
  blog_update_put
};
