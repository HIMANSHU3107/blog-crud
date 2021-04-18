// Import Express and CORS
const express = require("express");
const cors = require("cors");

// Import mongoose
const mongoose = require("mongoose");

// Import Blog schema
const Blog = require("./schema");

// MongoDB Database URL
const uri = 'mongodb+srv://merncrud:merncrud@cluster0.bjt7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Connecting to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const conn = mongoose.connection;
conn.once("open", () => {
    console.log("MongoDB connected");
});

// Create a Express app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Start the server on port 7000
app.listen(7000, () => {
    console.log("Server listening on port 7000");
});

// POST endpoint to create a blog
app.post("/create", (req, res) => {
    // Get title and content from request body
    title = req.body.title;
    content = req.body.content;

    // Create blog using create()
    Blog.create({
        title: title,
        content: content,
    })
        .then((blog) => {
            // Send the created blog
            res.status(200).json(blog);
        })
        // Return 400 response and error message
        .catch(err => res.status(400).json("Error:" + err));
});

// GET endpoint to get all blogs
app.get("/home", (req, res) => {
    // Get all blogs
    Blog.find()
        .then((blogs) => {
            // Send the blogs as JSON
            res.status(200).json(blogs);
        })
        .catch((err) => res.status(400).json("Error:" + err));
});

// GET endpoint to get a blog by it's id
app.get('/blog/:id', (req, res) => {
    // Get blog by _id
    Blog.findById({ _id: req.params.id })
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json("Error: " + err));
});

// PUT endpoint to edit a blog by it's id
app.put("/edit/:id", (req, res) => {
    // Get title, content and _id from request body
    title = req.body.title;
    content = req.body.content;
    blogId = req.params.id;

    // Find and update blog by it's _id
    Blog.findByIdAndUpdate(req.params.id, {
        title: title,
        content: content
    })
        .then((data) => {
            // Send updated blog as JSON
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).json("Error:" + err));
});


// DELETE endpoint to delete blog by id
app.delete("/delete/:id", (req, res) => {
    // Get _id from request body
    blogId = req.params.id;

    // Find and delete blog by it's _id
    Blog.findByIdAndDelete(req.params.id)
        .then((data) => {
            // Send deleted blog as JSON
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).json("Error:" + err));
});