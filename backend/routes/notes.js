// routes/notesRoutes.js
import express from 'express';
import fetchuser from '../middleware/fetchuser.js';
import { body } from 'express-validator';
import { fetchNotes, addNote, updateNote, deleteNote } from '../controller/notescontroller.js';

const router = express.Router();

// Route 1: Get all the notes
router.get("/fetchNotes", fetchuser, fetchNotes);

// Route 2: Add a note
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body('description', 'Enter a valid description').isLength({ min: 1 })
], addNote);

// Route 3: Update a note
router.put("/updatenotes/:id", fetchuser, updateNote);

// Route 4: Delete a note
router.delete("/deletenotes/:id", fetchuser, deleteNote);

export default router;
