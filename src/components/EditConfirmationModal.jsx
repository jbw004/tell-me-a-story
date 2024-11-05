import React from 'react';

const EditConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Convert to Draft?</h2>
        <p className="text-gray-600 mb-6">
          This action will convert your published magazine back to a draft state. Any existing unpublished draft will be overwritten. The published version will no longer be viewable.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditConfirmationModal;