import React, { useState, useRef, useEffect } from 'react';
import { Clock, Edit2, Eye, MoreVertical, Share2, Trash2 } from "lucide-react";

const MagazineCard = ({ magazine, onEdit, onView, onDelete, onShare }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hasCustomTemplate = magazine.isCustomTemplate || 
                          (magazine.templates && Object.values(magazine.templates)
                            .some(template => template.isCustom));
  const isPublished = !magazine.isDraft;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-lg overflow-visible shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200">
      <div className="relative w-full h-48 bg-gray-100">
        {magazine.previewUrl ? (
          <img 
            src={magazine.previewUrl} 
            alt={`Preview of ${magazine.title}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <img src="/api/placeholder/400/320" alt="Magazine preview placeholder" />
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
          <h3 className="text-lg font-semibold truncate flex-1">{magazine.title}</h3>
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
              <div 
                className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                style={{
                  transform: 'translateX(-80%)'  // This will shift the menu to the left
                }}
              >
                <div className="py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(magazine.id);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
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
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/magazine/${magazine.userId}/${magazine.id}`, '_blank');
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 w-full"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagazineCard;