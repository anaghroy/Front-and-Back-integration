import { useEffect, useState } from "react";
import axios from "axios";
import { Save, SquarePen, Trash2 } from "lucide-react";
function App() {
  const [notes, setNotes] = useState([]);
  const [editNoteID, setEditNoteID] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  /**All Notes */
  function fetchNotes() {
    axios
      .get(
        "http://localhost:3000/api/note",
      ) /**Fetching all data from backend */
      .then((res) => {
        setNotes(res.data.note);
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  /**Create notes */
  function createNotes(e) {
    e.preventDefault();

    const { title, age, description, place } = e.target.elements;

    axios
      .post("http://localhost:3000/api/note", {
        title: title.value,
        age: age.value,
        description: description.value,
        place: place.value,
      })
      .then(() => {
        fetchNotes();
      });
  }

  /**Delete by note ID */
  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/note/" + noteId).then((res) => {
      // console.log(res.data)
      fetchNotes();
    });
  }
  /**Start editing */
  function handleEditClick(note) {
    setEditNoteID(note._id);
    setEditDescription(note.description);
  }

  /**Update note only description */
  function handleUpdateNote() {
    axios
      .patch("http://localhost:3000/api/note/" + editNoteID, {
        description: editDescription,
      })

      .then(() => {
        // console.log(res.data)
        fetchNotes();
        setEditNoteID(null);
        setEditDescription("");
      });
  }
  return (
    <>
      <form className="create-note-form" onSubmit={createNotes}>
        <input
          name="title"
          type="text"
          placeholder="Enter your title"
          required
        />
        <input name="age" type="number" placeholder="Enter your age" required />
        <input
          name="description"
          type="text"
          placeholder="Enter your description"
          required
        />
        <input
          name="place"
          type="text"
          placeholder="Enter your place"
          required
        />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note, index) => {
          return (
            <div className="note" key={index}>
              <div className="title">
                <h1>{note.title}</h1>
                <div className="edit">
                  <button
                    onClick={() => {
                      handleEditClick(note);
                    }}
                    className="pen"
                  >
                    <SquarePen />
                  </button>
                </div>
              </div>
              <span>{note.age}</span>
              {editNoteID === note._id ? (
                <>
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button onClick={handleUpdateNote}>
                    <Save />
                  </button>
                </>
              ) : (
                <p>{note.description}</p>
              )}
              <span>{note.place}</span>
              <div className="del">
                <button
                  onClick={() => {
                    handleDeleteNote(note._id);
                  }}
                  className="delete"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
