const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db"); // Import the database connection

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

// GET all notes from the database
app.get("/notes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notes ORDER BY created_at ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// POST a new note to the database
app.post("/notes", async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const [result] = await db.query("INSERT INTO notes (content) VALUES (?)", [content.trim()]);

    // Return the newly created note
    const newNote = { id: result.insertId, content: content.trim() };
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ error: "Failed to add note" });
  }
});

// DELETE a note by id from the database
app.delete("/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const [result] = await db.query("DELETE FROM notes WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
