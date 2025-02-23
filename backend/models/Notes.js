<<<<<<< HEAD
const mongoose = require('mongoose')
const {Schema} = mongoose
const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user' //reference model (from User.js)
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true,
    }, 
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    },
})
const Notes = mongoose.model("notes",NotesSchema)
=======
const mongoose = require('mongoose')
const {Schema} = mongoose
const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user' //reference model (from User.js)
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true,
    }, 
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    },
})
const Notes = mongoose.model("notes",NotesSchema)
>>>>>>> master
module.exports = Notes