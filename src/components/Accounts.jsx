import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Accounts = () => {
    const { userData, fetchUserDetails,notes } = useContext(NoteContext);

    useEffect(() => {
        fetchUserDetails(); 
    }, []);

    const noteLength = notes.length;
    const formattedDate = new Date(userData.date).toLocaleDateString();

    return (
        <div className="container mx-auto rounded-md px-4 min-h-screen py-8">
            <h1 className='text-2xl text-black font-bold mb-4 my-auto'>Your summary</h1>
            <div className="bg-white rounded shadow p-6">
                <p className="text-lg mb-2">Name: {userData.name}</p>
                <p className="text-lg mb-2">Email: {userData.email}</p>
                <p className="text-lg mb-2">Total Notes: {noteLength}</p>
                <p className="text-lg mb-2">Account created on: {formattedDate}</p>
            </div>
        </div>
    );
};

export default Accounts;
