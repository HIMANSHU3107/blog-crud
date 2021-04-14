const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const uri = '***REMOVED***';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
// ***REMOVED***

const conn = mongoose.connection;
conn.once("open", () => {
    console.log("MongoDB connected");
})

const Blog = require("./schema");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.listen(8000, () => {
    console.log("Server listening on port 8000");
});

app.post("/create", (req, res) => {
    // Create blogs
    title = req.body.title;
    content = req.body.content;

    Blog.create({
        title: title,
        content: content,
    })
        .then((blog) => {
            res.status(200).json(blog);
        })
        .catch(err => res.status(400).json("Error:" + err));
});

app.get("/home", (req, res) => {
    // Read blogs
    Blog.find()
        .then((blogs) => {
            res.status(200).json(blogs);
        })
        .catch((err) => res.status(400).json("Error:" + err));
});

app.get('/blog/:id', (req, res) => {
    Blog.findById({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch((err) => res.status(400).json("Error: " + err));
});

app.put("/edit/:id", (req, res) => {
    // Update blogs
    title = req.body.title;
    content = req.body.content;
    blogId = req.params.id;

    Blog.findByIdAndUpdate(req.params.id, {
        title: title,
        content: content
    })
        .then((data) => {
            res.status(200).json(data); 
        })
        .catch((err) => res.status(400).json("Error:" + err));
});

app.delete("/delete/:id", (req, res) => {
    // Delete blogs
    blogId = req.params.id;

    Blog.findByIdAndDelete(req.params.id)
        .then((data) => {
            res.status(200).json(data); 
        })
        .catch((err) => res.status(400).json("Error:" + err));
}); 