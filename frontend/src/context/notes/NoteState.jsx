import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"; // Backend URL
  const [notes, setNotes] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
  let isMounted = true;
  const token =localStorage.getItem('auth-token');
    console.log("Token from localStorage:", token);

  if (token && isMounted) {
    fetchUserDetails();
    fetchNotes();
  }
  return () => { isMounted = false };
}, []);

  // Get auth token
  const getAuthHeaders = () => ({
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('auth-token') ,
    }
  });

  // Fetch logged-in user details
  const fetchUserDetails = async () => {
    try {
      const res = await axios.post(`${host}/api/auth/getuser`, {}, getAuthHeaders());
      console.log(res)
      setUserData(res.data);
    } catch (error) {
      console.error('Fetch User Error:', error.response?.data || error.message);
    }
  };

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${host}/api/notes/fetchNotes`, getAuthHeaders());
      console.log("fetchnotes detail",res)
      setNotes(res.data);
    } catch (error) {
      console.error('Fetch Notes Error:', error.response?.data || error.message);
    }
  };

  // Add a new note
  const addNote = async (title, description, tag) => {
    try {
      const res = await axios.post(
        `${host}/api/notes/addnote`,
        { title, description, tag },
        getAuthHeaders()
      );
      setNotes((prev) => [...prev, res.data]);
    } catch (error) {
      console.error('Add Note Error:', error.response?.data || error.message);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${host}/api/notes/deletenotes/${id}`, getAuthHeaders());
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Delete Note Error:', error.response?.data || error.message);
    }
  };

  // Edit an existing note
  const editNote = async (id, title, description, tag) => {
    try {
      await axios.put(
        `${host}/api/notes/updatenotes/${id}`,
        { title, description, tag },
        getAuthHeaders()
      );

      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Edit Note Error:', error.response?.data || error.message);
    }
  };

  return (
    <NoteContext.Provider value={{
      notes,
      addNote,
      deleteNote,
      editNote,
      fetchNotes,
      fetchUserDetails,
      userData
    }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
