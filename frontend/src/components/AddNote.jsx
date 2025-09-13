import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = ({ showAlert }) => {
    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: '', description: '', tag: '' });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleOnClick = (e) => {
        e.preventDefault();
        if (note.title === '' || note.description === '' || note.tag === '') {
            showAlert('Fill your notes, then add');
            return;
        }
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });
        showAlert('Note added successfully', 'success');
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Add a Note</h2>
            <form onSubmit={handleOnClick} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter your title"
                        value={note.title}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        placeholder="Enter your description"
                        value={note.description}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="tag" className="block text-sm font-semibold text-gray-700 mb-1">
                        Tag
                    </label>
                    <input
                        type="text"
                        id="tag"
                        name="tag"
                        placeholder="Enter your tag"
                        value={note.tag}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-center sm:justify-end">
                    <button
                        disabled={note.title.length < 5 || note.description.length < 5}
                        type="submit"
                        className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 ease-in-out"
                    >
                        Add Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNote;
