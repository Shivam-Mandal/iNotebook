import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';  
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import Search from './Search'

const Notes = (props) => {
  const { notes, fetchNote, editNote } = useContext(NoteContext);
  const [note, setNote] = useState({_id:"",etitle: "", edescription: "", etag: "" });
  const navigate = useNavigate();
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchNote();
    } else {
      navigate('/login');
    }
  }, []);
  // useEffect(() => {
  //   // Scroll to the first note item when the component mounts
  //   scrollToNoteItem(scrollRef);
  // }, [notes]);

  const [showModal, setModal] = useState(false);
  const ref = useRef(null);

  // const handleSearchInputChange = (e) => {
  //   const inputValue = e.target.value || ''; // Default value to empty string if undefined
  //   setSearchQuery(inputValue.toLowerCase()); // Convert to lowercase
  // };

  // // Filter notes based on search query
  // const filteredNotes = notes.filter(note => {
  //   const lowerSearchQuery = searchQuery ? searchQuery.toLowerCase() : ''; // Convert searchQuery to lowercase or default to empty string
  //   const lowerTitle = note.etitle ? note.etitle.toLowerCase() : ''; // Convert note.etitle to lowercase or default to empty string
  //   const lowerDescription = note.edescription ? note.edescription.toLowerCase() : ''; // Convert note.edescription to lowercase or default to empty string
  //   const lowerTag = note.etag ? note.etag.toLowerCase() : ''; 

  //   return (
  //     lowerTitle.includes(lowerSearchQuery) ||
  //     lowerDescription.includes(lowerSearchQuery) ||
  //     lowerTag.includes(lowerSearchQuery)
  //   );
  // });
  // const scrollToNoteItem = (ref) => {
  //   if (ref.current) {
  //     ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // };

  const updateNote = (currentNote) => {
    ref.current && ref.current.focus();
    setModal(true);
    setNote({_id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    console.log(currentNote._id)
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

  const handleNoteClick = (noteId) => {
    setExpandedNoteId(noteId === expandedNoteId ? null : noteId);
  };

  return (
    <>
      {/* <Modal isVisible={showModal} onClose={() => setModal(false)} onupdate={handleUpdateNote} onChange={handleOnChange} note={note} />
      <div className="py-5 my-2 bg-white shadow-xl shadow-slate-100">
        <h2 className='font-bold px-4'>Your Notes</h2>
        <p className='px-4'>{notes.length === 0 && 'No Notes to Display...'}</p>
        {notes.map((note) => <Noteitem key={note._id} u pdateNote={updateNote} showAlert={props.showAlert} setModal={setModal} note={note} />)}
      </div> */}
     <Modal isVisible={showModal} onClose={() => setModal(false)} onupdate={handleUpdateNote} onChange={handleOnChange} note={note} />
      <div className="py-5 my-2 bg-white shadow-xl shadow-slate-100">
        {/* <h2 className='font-bold px-4'>Your Notes</h2> */}
        <p className='px-4'>{notes.length === 0 && 'No Notes to Display...'}</p>
        {notes.map((note) => (
          <Noteitem
            key={note._id}
            note={note}
            updateNote={updateNote}
            showAlert={props.showAlert}
            expanded={expandedNoteId === note._id}
            handleNoteClick={handleNoteClick}
            setModal={setModal}
            // showTime = {new Date.now}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
