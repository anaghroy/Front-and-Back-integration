const express = require("express");
const noteModel = require("./model/note.model");
const cors = require("cors")

const app = express();

/**Middleware */
app.use(express.json());
app.use(cors())

/**POST method */
app.post("/api/note", async (req, res) => {
  const { title, age, description, place } = req.body;
  const note = await noteModel.create({
    title,
    age,
    description,
    place,
  });
  res.status(201).json({
    message: "Note is created successfully!",
    note,
  });
});

/**GET method */
app.get("/api/note", async (req, res) => {
  const note = await noteModel.find();

  res.status(200).json({
    message: "Fetching all notes",
    note,
  });
});

/**DELETE method
 * Delete note with the id from req.params
 */
app.delete("/api/note/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "note is deleted successfully",
  });
});

/**PATCH /api/note/:id
 * update the description of the note by id
 * req.body = {description}
 */
app.patch("/api/note/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note updated successfully",
  });
});

module.exports = app;
