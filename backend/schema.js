const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,

    content: String,

    // image: String
});

module.exports = mongoose.model("Blogs", blogSchema);