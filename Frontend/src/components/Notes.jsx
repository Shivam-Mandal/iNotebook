import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const { notes, fetchNote, editNote } = useContext(NoteContext);
  const [note, setNote] = useState({_id:"",etitle: "", edescription: "", etag: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchNote();
    } else {
      navigate('/login');
    }
  }, []);

  const [showModal, setModal] = useState(false);
  const ref = useRef(null);

  const updateNote = (currentNote) => {
    ref.current && ref.current.focus();
    setModal(true);
    console.log(currentNote._id)
    setNote({_id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const handleOnChange = (e) => {
    setNote(prevNote => ({ ...prevNote, [e.target.name]: e.target.value }));
  };

  const handleUpdateNote = () => {
    editNote(note._id, note.etitle, note.edescription, note.etag);
    console.log(note._id)   
    setModal(false);
    props.showAlert("Updated Successfully", "success");
  };

  return (
    <>
      <Modal isVisible={showModal} onClose={() => setModal(false)} onupdate={handleUpdateNote} onChange={handleOnChange} note={note} />
      <div className="py-5 my-8 bg-white shadow-xl shadow-slate-300">
        <h2 className='font-bold px-4 pt-5 py-2'>Your Notes</h2>
        <p className='px-4'>{notes.length === 0 && 'No Notes to Display...'}</p>
        {notes.map((note) => <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} setModal={setModal} note={note} />)}
      </div>
    </>
  );
};

export default Notes;
