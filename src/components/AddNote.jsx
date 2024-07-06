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
        if(note.title===''|| note.description===''||note.tag===''){
            showAlert('Fill your notes, then add')
            return;
        }
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });
        showAlert("Notes added successfully", "success");
    };

    return (
        <div className="max-w-screen-lg p-3 rounded-xl bg-white shadow-xl shadow-slate-300">
            <h2 className='py-3 font-bold'>Add a Note</h2>
            <form onSubmit={handleOnClick}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter your title"
                        value={note.title}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                        type="text"
                        id="description"
                        name="description"
                        rows="5"
                        placeholder="Enter your description"
                        value={note.description}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">
                        Tag
                    </label>
                    <input
                        className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                        type="text"
                        id="tag"
                        name="tag"
                        placeholder="Enter your tag"
                        value={note.tag}
                        onChange={onChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        disabled={note.title.length < 5 || note.description.length < 5}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                        type="submit"
                    >
                        Add Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNote;
