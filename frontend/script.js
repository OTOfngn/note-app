const API_URL = "http://localhost:3000";

const noteInput = document.getElementById("note-input");
const addBtn = document.getElementById("add-btn");
const notesList = document.getElementById("notes-list");

// Fetch and display all notes
async function getNotes() {
  try {
    const response = await fetch(`${API_URL}/notes`);
    const notes = await response.json();
    renderNotes(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
}

// Render notes to the page
function renderNotes(notes) {
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note";

    const p = document.createElement("p");
    p.textContent = note.content;

    const btn = document.createElement("button");
    btn.className = "delete-btn";
    btn.textContent = "Delete";
    btn.addEventListener("click", () => deleteNote(note.id));

    div.appendChild(p);
    div.appendChild(btn);
    notesList.appendChild(div);
  });
}

// Add a new note
async function addNote() {
  const content = noteInput.value.trim();
  if (!content) return;

  try {
    await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    noteInput.value = "";
    getNotes();
  } catch (error) {
    console.error("Error adding note:", error);
  }
}

// Delete a note
async function deleteNote(id) {
  try {
    await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
    });
    getNotes();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}

// Event listeners
addBtn.addEventListener("click", addNote);

// Load notes on page load
getNotes();
