import React, { useState, useRef, useEffect } from 'react';
import { Clock, Edit2, Eye, MoreVertical, Share2, Trash2, Type, Image } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import EditConfirmationModal from './EditConfirmationModal';
import RenameModal from './RenameModal';
import UpdatePreviewModal from './UpdatePreviewModal';
import { moveMagazineToDraft, updateMagazineTitle, updateMagazinePreview } from '../firebase';
import { useAuth } from '../AuthContext';  // You'll need this for userId

const MagazineCard = ({ magazine, onDelete, onShare }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();  // Get current user for userId

  
  const hasCustomTemplate = magazine.isCustomTemplate || 
                          (magazine.templates && Object.values(magazine.templates)
                            .some(template => template.isCustom));
  const isPublished = !magazine.isDraft;
  const canEdit = isPublished && !hasCustomTemplate;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleView = (e) => {
    e.stopPropagation();
    if (magazine.isDraft) {
      if (magazine.type === 'custom') {
        navigate('/custom-template');
      } else {
        navigate('/');
      }
    } else {
      const viewUrl = magazine.isCustomTemplate 
        ? `/custom-template/${magazine.userId}/${magazine.id}`
        : `/magazine/${magazine.userId}/${magazine.id}`;
      window.open(viewUrl, '_blank');
    }
  };

  const handleEdit = async () => {
    try {
      await moveMagazineToDraft(magazine.userId, magazine.id);
      navigate('/'); // Redirect to editor
    } catch (error) {
      alert(error.message || "Failed to convert magazine to draft");
    }
    setShowEditModal(false);
  };

  const handleRename = async (newTitle) => {
    try {
      await updateMagazineTitle(user.uid, magazine.id, newTitle);
      // Optionally refresh the dashboard or update local state
      // You might want to pass a refresh function from the parent component
    } catch (error) {
      alert(error.message || "Failed to rename magazine");
    }
  };

  const handleUpdatePreview = async (imageFile) => {
    try {
      await updateMagazinePreview(user.uid, magazine.id, imageFile);
      // Optionally refresh the dashboard or update local state
      // You might want to pass a refresh function from the parent component
    } catch (error) {
      alert(error.message || "Failed to update preview image");
    }
  };


  return (
    <>
    <div className="bg-white rounded-lg overflow-visible shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200">
      <div className="relative w-full h-48 bg-gray-100">
      {magazine.previewImageUrl ? (
          <img 
            src={magazine.previewImageUrl} 
            alt={`Preview of ${magazine.title || 'Untitled Magazine'}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "/api/placeholder/400/320"; // Fallback to placeholder
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <img 
              src="/api/placeholder/400/320" 
              alt="Magazine preview placeholder" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span 
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isPublished 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {isPublished ? "Published" : "Draft"}
          </span>
          
          {hasCustomTemplate && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Custom Template
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold truncate flex-1">
            {magazine.title || (magazine.isDraft ? 'Draft Magazine' : 'Untitled Magazine')}
          </h3>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  {isPublished && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowRenameModal(true);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Type className="w-4 h-4" />
                        Rename
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPreviewModal(true);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Image className="w-4 h-4" />
                        Update Preview
                      </button>
                    </>
                  )}
                {/* Only show edit for published non-custom magazines */}
                {canEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEditModal(true);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare?.(magazine.id);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(magazine.id);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center mt-2 text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>Created {magazine.createdAt}</span>
        </div>

        <div className="mt-4">
          <button 
            onClick={handleView}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 w-full"
          >
            <Eye className="w-4 h-4" />
            {magazine.isDraft ? 'Continue Editing' : 'View'}
          </button>
        </div>
      </div>
    </div>

    <EditConfirmationModal
      isOpen={showEditModal}
      onClose={() => setShowEditModal(false)}
      onConfirm={handleEdit}
      />
    
    <RenameModal
      isOpen={showRenameModal}
      onClose={() => setShowRenameModal(false)}
      onConfirm={handleRename}
      currentTitle={magazine.title}
    />

    <UpdatePreviewModal
      isOpen={showPreviewModal}
      onClose={() => setShowPreviewModal(false)}
      onConfirm={handleUpdatePreview}
      currentPreview={magazine.previewImageUrl}
    />
      </>
  );
};

export default MagazineCard;