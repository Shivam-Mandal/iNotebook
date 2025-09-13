import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Accounts = () => {
    const { userData, fetchUserDetails, notes } = useContext(NoteContext);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const noteLength = notes.length;
    console.log(userData)
    const formattedDate = new Date(userData.date).toLocaleDateString();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white text-center p-4 rounded-lg shadow mb-6">
                    <h1 className="text-2xl sm:text-3xl text-black font-bold">Your Summary</h1>
                </div>

                <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-base sm:text-lg font-semibold space-y-2">
                    <p><span className="font-medium">Name:</span> {userData.name}</p>
                    <p><span className="font-medium">Email:</span> {userData.email}</p>
                    <p><span className="font-medium">Total Notes:</span> {noteLength}</p>
                    <p><span className="font-medium">Account created on:</span> {formattedDate}</p>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
