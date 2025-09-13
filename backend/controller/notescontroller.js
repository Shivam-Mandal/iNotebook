// controllers/notesController.js
import Notes from '../models/Notes.js';
import { validationResult } from 'express-validator';

// Fetch all notes for the logged-in user
export const fetchNotes = async (req, res) => {
    try {
        console.log("req user",req.user)
        const user = req.user.id;
        const notes = await Notes.find({ user});
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Add a new note
export const addNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newNote = new Notes({ title, description, tag, user: req.user.id });
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Update an existing note
export const updateNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        let newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not authorized to update this note");
        }

        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a note
export const deleteNote = async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not authorized to delete this note");
        }

        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: "Deleted successfully", note: deletedNote });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).send("Internal Server Error");
    }
};
