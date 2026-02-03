import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
function App() {
  const [notes, setNotes] = useState([
    {
      title: "test 1",
      age: "25",
      place: "place",
      description: "test description",
    },
    {
      title: "test 2",
      age: "25",
      place: "place",
      description: "test description",
    },
    {
      title: "test 3",
      age: "25",
      place: "place",
      description: "test description",
    },
    {
      title: "test 4",
      age: "25",
      description: "test description",
      place: "place",
    },
  ]);

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
      .then((res) => {
        fetchNotes();
      });
  }

  /**Delete by note ID */
  function handleDeleteNote(noteId) {
    axios
      .delete("http://localhost:3000/api/note/"+noteId, )
      .then((res) => {
        // console.log(res.data)
        fetchNotes();
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
              <h1>{note.title}</h1>
              <span>{note.age}</span>
              <p>{note.description}</p>
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
