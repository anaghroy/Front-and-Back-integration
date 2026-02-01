const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: String,
    age: Number,
    description: String,
    place: String,
})

const noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel