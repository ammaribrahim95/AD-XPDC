import React from 'react';

const ModalForm = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalForm;
