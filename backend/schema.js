// Import mongoose and Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a custom blog schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    content: {
        type: String,
        required: true,
        minlength: 20,
    },
});

// Export the created schema as a model
module.exports = mongoose.model("Blogs", blogSchema);