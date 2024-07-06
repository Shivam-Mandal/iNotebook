import React, { useState, useEffect } from 'react'
import NoteContext from './NoteContext'
// import { response } from 'express'

const NoteState = (props) => {
    const host = "http://localhost:5173"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const userInitial = {}
    const [userData, setUserData] = useState(userInitial)

    useEffect(() => {
        fetchUserDetails()
    }, [])
    // loggedin user account
    const fetchUserDetails = async () => {
        try {
            const res = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status code: ${res.status}`);
            }
            const json = await res.json();
            console.log(json)
            setUserData(json);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchNote()
    }, [])
    //fetch notes
    const fetchNote = async () => {
        try {
            const res = await fetch(`${host}/api/notes/fetchNotes`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status code: ${res.status}`);
            }   

            const json = await res.json();
            setNotes(json);
        } catch (error) {
            console.error('Fetch Note Error:', error);
        }
    };

    // add note
    const addNote = async (title, description, tag) => {
        try {
            const res = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
    
            if (!res.ok) {
                throw new Error(`HTTP error! status code: ${res.status}`);
            }
    
            const note = await res.json();
            setNotes([...notes, note]);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }
    // delete note
    const deleteNote = async (id) => {
        //API call
        const res = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    // edit note
    const editNote = async (id, title, description, tag) => {
        try {

            const res = await fetch(`${host}/api/notes/updatenotes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })
            // let newNotes = JSON.parse(JSON.stringify(notes));
            // for (let index = 0; index < notes.length; index++) {
            //     const element = newNotes[index];
            //     if (element._id === id) {
            //         newNotes[index].title = title;
            //         newNotes[index].description = description;
            //         newNotes[index].tag = tag;
            //         break;
            //     }
            // }
            if (!res.ok) {
                throw new Error(`HTTP error! status code: ${res.status}`);
            }
            const newNotes = notes.map((note) =>
                note._id === id ? { ...note, title, description, tag } : note
            );
            setNotes(newNotes);
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNote, fetchUserDetails, userData }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;

