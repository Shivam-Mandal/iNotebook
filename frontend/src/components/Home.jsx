import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = ({ showAlert }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 px-4 py-6">
            {/* AddNote Section */}
            <div className="w-full lg:w-1/2">
                <AddNote showAlert={showAlert} />
            </div>

            {/* Notes Section */}
            <div className="w-full lg:w-1/2">
                <div className="w-32 p-3 mx-auto lg:mx-0 text-center bg-white rounded-lg shadow-md mb-4">
                    <h2 className="font-bold text-gray-800">Your Notes</h2>
                </div>
                <div className="h-96 overflow-y-auto">
                    <Notes showAlert={showAlert} />
                </div>
            </div>
        </div>
    );
};

export default Home;
