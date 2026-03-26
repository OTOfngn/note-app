const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/main.html"));
});

// In-memory notes storage
let notes = [];
let nextId = 1;

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST a new note
app.post("/notes", (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content is required" });
  }

  const note = { id: nextId++, content: content.trim() };
  notes.push(note);
  res.status(201).json(note);
});

// DELETE a note by id
app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes.splice(index, 1);
  res.status(200).json({ message: "Note deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
