// import React, { useContext, useRef} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt,faEdit } from '@fortawesome/free-regular-svg-icons';
// import NoteContext from '../context/notes/NoteContext';

// const Noteitem = ({ note,updateNote,setModal,showAlert }) => {
//   const {deleteNote} = useContext(NoteContext)
//   // const [showModal,setModal] = useState(false);
//   // const ref = useRef(null);
//   return (
//     <div className="p-4 mx-3 rounded shadow flex flex-row mb-4 justify-between bg-slate-200">
//       <div className="">
//         <p className="font-semibold w-40 text-slate-800">Title: {note.title}</p>
//         <p className="ml-4"><span className="font-semibold">Descripton: </span>{note.description}</p>
//         <p className="ml-4"><span className="font-semibold">Tag: </span>{note.tag}</p>
//       </div>
//       <div className="flex justify-end items-center">
//         <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 cursor-pointer mx-1" onClick={()=>{deleteNote(note._id);showAlert("Deleted successfully","success")}} />
//         <FontAwesomeIcon icon={faEdit} className="text-zinc-600 cursor-pointer mx-1" onClick={()=>{
//           updateNote(note);
//           setModal(true);
//           }} />
//       </div>
//     </div>
//   );
// };

// export default Noteitem;

// import React, { useContext, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
// import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

// import NoteContext from '../context/notes/NoteContext';

// const Noteitem = ({ note, updateNote, showAlert }) => {
//   const { deleteNote } = useContext(NoteContext);
//   const [expandedNoteId, setExpandedNoteId] = useState(null);

//   const handleNoteClick = (noteId) => {
//     setExpandedNoteId(noteId === expandedNoteId ? null : noteId);
//   };

//   return (
//     <div className="p-4 mx-3 rounded shadow flex flex-row mb-4 justify-between bg-slate-200" onClick={() => handleNoteClick(note._id)} style={{ cursor: 'pointer' }}>
//       <div >
//         <div className="flex items-center">
//           {expandedNoteId === note._id ? (
//             <FontAwesomeIcon icon={faChevronUp} className="text-zinc-600 mr-2" />
//           ) : (
//             <FontAwesomeIcon icon={faChevronDown} className="text-zinc-600 mr-2" />
//           )}
//           <p className="font-semibold w-40 text-slate-800">Title: {note.title}</p>
//         </div>
//         {expandedNoteId === note._id && (
//           <div>
//             <p className="ml-4"><span className="font-semibold">Description: </span>{note.description}</p>
//             <p className="ml-4"><span className="font-semibold">Tag: </span>{note.tag}</p>
//           </div>
//         )}
//       </div>
//       <div className="flex justify-end items-center">
//         <FontAwesomeIcon
//           icon={faEdit}
//           className="text-zinc-600 cursor-pointer mx-1"
//           onClick={() => updateNote(note)}
//         />
//         <FontAwesomeIcon
//           icon={faTrashAlt}
//           className="text-red-500 cursor-pointer mx-1"
//           onClick={() => {
//             deleteNote(note._id);
//             showAlert("Deleted successfully", "success");
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Noteitem;


// import React, { useContext, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
// import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import NoteContext from '../context/notes/NoteContext';

// const Noteitem = ({ note, updateNote, showAlert }) => {
//   const { deleteNote } = useContext(NoteContext);
//   const [expandedNoteId, setExpandedNoteId] = useState(null);

//   const handleNoteClick = (noteId) => {
//     setExpandedNoteId(noteId === expandedNoteId ? null : noteId);
//   };

//   return (
//     <div className="p-4 mx-3 rounded shadow flex flex-row mb-4 justify-between bg-slate-200">
//       <div className="">
//         <div className="flex items-center cursor-pointer" onClick={() => handleNoteClick(note._id)}>
//           {expandedNoteId === note._id ? (
//             <FontAwesomeIcon icon={faChevronUp} className="text-zinc-600 mr-2" />
//           ) : (
//             <FontAwesomeIcon icon={faChevronDown} className="text-zinc-600 mr-2" />
//           )}
//           <p className="font-semibold w-40 text-slate-800">Title: {note.title}</p>
//         </div>
//         {expandedNoteId === note._id && (
//           <div>
//             <p className="ml-4"><span className="font-semibold">Description: </span>{note.description}</p>
//             <p className="ml-4"><span className="font-semibold">Tag: </span>{note.tag}</p>
//           </div>
//         )}
//       </div>
//       <div className="flex justify-end items-center">
//         <FontAwesomeIcon
//           icon={faTrashAlt}
//           className="text-red-500 cursor-pointer mx-1"
//           onClick={() => {
//             deleteNote(note._id);
//             showAlert("Deleted successfully", "success");
//           }}
//         />
//         <FontAwesomeIcon
//           icon={faEdit}
//           className="text-zinc-600 cursor-pointer mx-1"
//           onClick={() => updateNote(note)}
//         />
//       </div>
//     </div>
//   );
// };

// export default Noteitem;

import React,{useContext,useState,useRef, forwardRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import NoteContext from '../context/notes/NoteContext';

const Noteitem = forwardRef(({ note, updateNote, showAlert, expanded, handleNoteClick, setModal},ref) => {
  const {deleteNote} = useContext(NoteContext)
  // const [showModal,setModal] = useState(false);
  // const ref = useRef(null);
  return (
    <div className="p-4 mx-3 rounded shadow flex flex-row mb-4 justify-between bg-slate-200" ref={ref} >
      <div onClick={() => handleNoteClick(note._id)} style={{ cursor: 'pointer' }}>
        <div className="flex items-center">
          {expanded ? (
            <FontAwesomeIcon icon={faChevronUp} className="text-zinc-600 mr-2" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} className="text-zinc-600 mr-2" />
          )}
          <p className="font-semibold w-64 text-slate-800">Title: {note.title}</p>
        </div>
        {expanded && (
          <div>
            <p className="ml-4"><span className="font-semibold">Description: </span>{note.description}</p>
            <p className="ml-4"><span className="font-semibold">Tag: </span>{note.tag}</p>
            {/* <p className="ml-4"><span className="">Note added on: </span>{showTime}</p> */}
          </div>
        )}
      </div>
      <div className="flex justify-end items-center">
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="text-red-500 cursor-pointer mx-1"
          onClick={() => {
            deleteNote(note._id)
            showAlert("Deleted successfully", "success");
          }}
        />
        <FontAwesomeIcon
          icon={faEdit}
          className="text-zinc-600 cursor-pointer mx-1"
          onClick={() => {
            updateNote(note);
            setModal(true);
          }}
        />
      </div>
    </div>
  );
});

export default Noteitem;

