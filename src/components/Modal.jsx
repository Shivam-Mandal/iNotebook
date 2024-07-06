    import React,{useCallback, useEffect, useState} from 'react';

    const Modal = ({ isVisible, onClose, onupdate, onChange, note }) => {
        if (!isVisible) return null;
        const [formData, setFormData] = useState({
            etitle:note.title||'',
            edescription: note.description||'',
            etag: note.tag||'default'
        })
        const handleClose = (e) => {
            if (e.target.id === 'closeModal') onClose();
        }

        const handleInputChange = useCallback((e) => {
            const {name,value} = e.target
            onChange(e); 
            console.log(value)
            setFormData({
                ...formData, [name]:value
            })
            
        },[onChange])
        // useEffect((e)=>{
        //     const getData = setTimeout((e)=>{
        //         onChange(e)
        //     },2000)
        //     return()=>clearTimeout(getData)
        // },[onChange])
        // useEffect(()=>{
        //     const getData = setTimeout(() => {
        //     //    setFormData({...formData,[e.target.name]:e.target.value})
        //     handleInputChange()
        //       }, 2000)
        //       return()=> clearTimeout(getData)
        // },[setFormData])
        // const handleInputChange = useCallback((e) => {
        //     onChange(e);
        //     // updateNote({ ...note, [e.target.name]: e.target.value });

        // }, [onChange]);

        const handleUpdateNote = useCallback((e) => {
            e.preventDefault();
            // onChange(e);
            onupdate()
            // onupdate(formData);
            // updateNote({ ...note, [e.target.name]: e.target.value });

            onClose();
        },[onupdate,onClose]);

        return (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id='closeModal' onClick={handleClose}>
                    <div className="w-[600px] flex flex-col">
                        <button className="text-white text-xl place-self-end" onClick={onClose}>X</button>
                        <div className="bg-white p-3 rounded">
                            <div className="max-w-lg mx-auto mt-8">
                                <form onSubmit={handleUpdateNote}>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                        <input type="text" id="etitle" name="etitle" value={note.etitle} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea id="edescription" name="edescription" value={note.edescription} onChange={handleInputChange} rows="10" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                                        <input type="text" id="etags" name="etag" value={note.etag} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    export default Modal;
