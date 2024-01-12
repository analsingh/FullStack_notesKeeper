import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios"


function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Fetch initial data from the server when the component mounts
        axios.get("http://localhost:3001/api/getAll")
            .then(res => setNotes(res.data))
            .catch(error => console.error(error));
    }, []);

    // function addNote(newNote) {
    //     setNotes(prevNotes => {
    //         return [...prevNotes, newNote];
    //     });
    // }

    // function deleteNote(id) {
    //     setNotes(prevNotes => {
    //         return prevNotes.filter((noteItem, index) => {
    //             return index !== id;
    //         });
    //     });
    // }


    function addNote(newNote) {
        if (newNote.title) {
            axios.post("http://localhost:3001/api/addNew", newNote)
                .then(() => {
                    // Fetch the updated list of notes after adding a new note
                    return axios.get("http://localhost:3001/api/getAll");
                })
                .then(res => {
                    // Update state with the latest data from the server
                    setNotes(res.data);
                })
                .catch(error => console.error(error));
        }
    }

    function deleteNote(id) {
        axios.post("http://localhost:3001/api/delete", { id })
            .then(res => {
                setNotes(res.data);
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />

            {Array.isArray(notes) && notes.length > 0 ? (
                notes.map((noteItem, index) => (
                    <Note
                        key={index}
                        id={noteItem._id}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}

                    />

                ))
            ) : (
                <p>No notes available</p>
            )}
            <Footer />
        </div>
    );
}

export default App;
