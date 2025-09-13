import React, { useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import NoteContext from '../context/notes/NoteContext';

const Noteitem_1 = ({ note, updateNote, setModal, showAlert }) => {
    const { deleteNote } = useContext(NoteContext)
    const [inputVal, setInputVal] = useState({ title: note.title, desc: note.description, tag: note.tag })
    const handleInputModal = ()=>
    {
        setInputVal({ title: note.title, desc: note.description, tag: note.tag })
    }
    // const [showModal,setModal] = useState(false);
    // const ref = useRef(null);
    return (
        <div className="p-4 mx-3 rounded shadow flex flex-row mb-4 justify-between bg-slate-200">
            <div className="">
                <p className="font-semibold w-40 text-slate-800">Title: {inputVal.title}</p>
                <p className="ml-4">Descripton: {inputVal.description}</p>
                <p className="ml-4">Tag: {inputVal.tag}</p>
            </div>
            <div className="flex justify-end items-center">
                <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 cursor-pointer mx-1" onClick={() => { deleteNote(note._id); showAlert("Deleted successfully", "success") }} />
                <FontAwesomeIcon icon={faEdit} className="text-zinc-600 cursor-pointer mx-1" onClick={() => {
                    updateNote(note);
                    setModal(true);
                    handleInputModal();


                }} />
            </div>
        </div>
    );
};

export default Noteitem_1;
