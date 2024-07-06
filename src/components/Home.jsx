import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = ({ showAlert }) => {
    const token = localStorage.getItem('token');

    return token?(
        
        <div className="flex">
            <div className="w-3/5 p-4 border-r">
                <AddNote showAlert={showAlert} />
            </div>
            <div className="w-3/5 mx-auto p-4 overflow-hidden">
                <h2 className='font-bold pb-4'>Your Notes</h2>
                <div className="h-96 rounded-xl overflow-y-auto shadow-xl">
                    <Notes showAlert={showAlert} />
                </div>
            </div>
        </div>
    ):null;
};

export default Home;
