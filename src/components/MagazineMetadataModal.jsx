import React, { useState } from 'react';

const MagazineMetadataModal = ({
  isOpen,
  onClose,
  onSave,
  initialTitle = 'My Magazine',
  initialPreviewImage = null,
  showPreviewImageOption = true
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(initialPreviewImage);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }
      setPreviewImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || title.trim() === 'My Magazine') {
      setError('Please provide a custom title for your magazine');
      return;
    }

    try {
      await onSave({ title: title.trim(), previewImage });
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999  // Increase this value to ensure it's above other content
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '500px',
          margin: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Magazine Details</h2>
          <button 
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label 
              style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500' 
              }}
            >
              Magazine Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              placeholder="Enter magazine title"
            />
          </div>

          {showPreviewImageOption && (
            <div style={{ marginBottom: '16px' }}>
              <label 
                style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500' 
                }}
              >
                Preview Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              {previewImageUrl && (
                <div style={{ marginTop: '8px' }}>
                  <img
                    src={previewImageUrl}
                    alt="Preview"
                    style={{ maxHeight: '160px', borderRadius: '4px' }}
                  />
                </div>
              )}
            </div>
          )}

          {error && (
            <div 
              style={{ 
                padding: '12px',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                borderRadius: '4px',
                marginBottom: '16px'
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MagazineMetadataModal;