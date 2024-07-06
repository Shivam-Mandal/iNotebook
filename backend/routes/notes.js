const express = require("express")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: get all the notes
router.get("/fetchNotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: add the notes 
router.post("/addnote", fetchuser, [
    body("title", "enter valid title").isLength({min:1}),
    body('description', 'enter valid description').isLength({min:1})
], async (req, res) => {
    try {

        // destructuring from Notes.js
        const { title, description, tag } = req.body;

        //if their is any error
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const notes = new Notes({ title, description, tag, user: req.user.id })
        const savenotes = await notes.save();
        res.json(savenotes);
    } catch (error) {
        // console.error("Error creating user:", error);
        console.error("Yeh nhi kam karega:", error);
        res.status(500).send("Internal Server Error");
    }
})

// Route3: update the notes for particular user
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    try {

        // destructuring from Notes.js
        const { title, description, tag } = req.body;

        // create newNote object
        let newNote = {}
        if (title) { newNote.title = title } // if title will present then it will add to newNote
        if (description) { newNote.description = description } // if description will present then it will add to newNote
        if (tag) { newNote.tag = tag } // if tag will present then it will add to newNote

        // find the notes to be updated and update it
        let notes = await Notes.findById(req.params.id)

        if (!notes) { return res.status(404).send("Not found") }

        if (notes.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

        //updating the notes of particular user
        // notes = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        const updateNotes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json(updateNotes)
    }
    catch (error) {
        console.log('error update status', error)
    }
})

// Route 4: delete the notes for particular user
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {

    // destructuring from Notes.js
    // const {title,description,tag} = req.body;



    // find the notes to be updated and update it
    let notes = await Notes.findById(req.params.id)

    if (!notes) { return res.status(404).send("Not found") }

    if (notes.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

    //updating the notes of particular user
    notes = await Notes.findByIdAndDelete(req.params.id)
    // console.log(notes);

    res.json({ "success": "deleted successfuly", note: notes })
})

module.exports = router