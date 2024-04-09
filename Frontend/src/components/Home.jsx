import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote';
// import { prependOnceListener } from '../../backend/models/Notes';
const Home = ({showAlert}) => {
    return (
        <>
            <AddNote showAlert={showAlert} />
            <Notes showAlert={showAlert}/>

        </>
    )
}
export default Home;