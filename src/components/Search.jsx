import React from 'react'

const Search=()=>{
    return(
        <>
        <div>
      <input className='px-3 py-1 rounded-2xl focus:outline-none text-black'
        type="text"
        placeholder="Search notes..."
        // value={searchQuery}
        // onChange={handleSearchInputChange}
      />
      <ul>
        {/* {filteredNotes.map(note => (
          <li key={note.id}>{note.title}</li>
        ))} */}
        {/* hello */}
      </ul>
    </div>
        </>
    )
}
export default Search;