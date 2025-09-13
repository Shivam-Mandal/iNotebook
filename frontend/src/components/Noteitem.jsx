import React, { useContext, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import NoteContext from '../context/notes/NoteContext';

const Noteitem = forwardRef(
  ({ note, updateNote, showAlert, expanded, handleNoteClick, setModal }, ref) => {
    const { deleteNote } = useContext(NoteContext);

    return (
      <div
        ref={ref}
        className="w-full mb-4"
      >
        <div
          className="bg-white w-full p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
        >
          {/* Header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleNoteClick(note._id)}
          >
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={expanded ? faChevronUp : faChevronDown}
                className="text-gray-500"
              />
              <h3 className="font-semibold text-lg text-gray-800">{note.title}</h3>
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon
                icon={faEdit}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  updateNote(note);
                  setModal(true);
                }}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note._id);
                  showAlert('Deleted successfully', 'success');
                }}
              />
            </div>
          </div>

          {/* Expanded Content */}
          {expanded && (
            <div className="mt-4 space-y-2 text-sm text-gray-700 pl-6">
              <p>
                <span className="font-semibold text-gray-600">Description:</span> {note.description}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Tag:</span> {note.tag}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Noteitem;
