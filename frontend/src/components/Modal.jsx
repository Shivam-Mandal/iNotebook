import React, { useCallback, useState } from 'react';

const Modal = ({ isVisible, onClose, onupdate, onChange, note }) => {
  if (!isVisible) return null;

  const [formData, setFormData] = useState({
    etitle: note.title || '',
    edescription: note.description || '',
    etag: note.tag || 'default',
  });

  const handleClose = (e) => {
    if (e.target.id === 'closeModal') onClose();
  };

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      onChange(e);
      setFormData({ ...formData, [name]: value });
    },
    [onChange, formData]
  );

  const handleUpdateNote = useCallback(
    (e) => {
      e.preventDefault();
      onupdate();
      onClose();
    },
    [onupdate, onClose]
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 px-4"
      id="closeModal"
      onClick={handleClose}
    >
      <div className="w-full max-w-full md:max-w-2xl bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-600 text-xl font-bold hover:text-red-500 transition"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleUpdateNote}>
          <div className="mb-4">
            <label htmlFor="etitle" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="etitle"
              name="etitle"
              value={note.etitle}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="edescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="edescription"
              name="edescription"
              rows="6"
              value={note.edescription}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="etag" className="block text-sm font-medium text-gray-700 mb-1">
              Tag
            </label>
            <input
              type="text"
              id="etag"
              name="etag"
              value={note.etag}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
