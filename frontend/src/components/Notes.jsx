import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';  
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const { notes, fetchNotes, editNote } = useContext(NoteContext);
  const [note, setNote] = useState({_id:"", etitle: "", edescription: "", etag: "" });
  const navigate = useNavigate();
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      console.log('this is note section')
      fetchNotes();
    } else {
      navigate('/login');
    }
  }, []);

  const [showModal, setModal] = useState(false);
  const ref = useRef(null);

  const updateNote = (currentNote) => {
    ref.current && ref.current.focus();
    setModal(true);
    setNote({
      _id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  const handleOnChange = (e) => {
    setNote(prevNote => ({ ...prevNote, [e.target.name]: e.target.value }));
  };

  const handleUpdateNote = () => {
    editNote(note._id, note.etitle, note.edescription, note.etag);
    setModal(false);
    props.showAlert("Updated Successfully", "success");
  };

  const handleNoteClick = (noteId) => {
    setExpandedNoteId(noteId === expandedNoteId ? null : noteId);
  };

  return (
    <>
      <Modal
        isVisible={showModal}
        onClose={() => setModal(false)}
        onupdate={handleUpdateNote}
        onChange={handleOnChange}
        note={note}
      />
      
      <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-12">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-8">
          {notes.length === 0 && (
            <p className="text-sm sm:text-base text-gray-500 mb-4">
              No Notes to Display...
            </p>
          )}
          
          {/* Display notes vertically, one per row */}
          <div className="flex flex-col">
            {notes.map((note) => (
              <Noteitem
                key={note._id}
                note={note}
                updateNote={updateNote}
                showAlert={props.showAlert}
                expanded={expandedNoteId === note._id}
                handleNoteClick={handleNoteClick}
                setModal={setModal}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
