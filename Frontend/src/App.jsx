import { useState } from "react";
import axios from "axios"

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

  axios.get("http://localhost:3000/api/note") 
  .then((res)=>{
    res.data(setNotes)
  })
  return (
    <>
      <div className="notes">
        {notes.map((note, index) => {
          return (
            <div className="note" key={index}>
              <h1>{note.title}</h1>
              <span>{note.age}</span>
              <p>{note.description}</p>
              <span>{note.place}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
