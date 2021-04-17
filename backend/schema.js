// Import mongoose and Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a custom blog schema
const blogSchema = new Schema({
    title: String,
    content: String,
});

// Export the created schema as a model
module.exports = mongoose.model("Blogs", blogSchema);