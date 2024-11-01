import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { Button } from '../components/ui/button';  // Updated import path
import { PlusCircle, Clock, Folder, Trash2, Eye, ArrowLeft } from 'lucide-react';
import { useAuth } from '../AuthContext';  // Add this import


const MagazineDashboard = () => {  // Remove userId prop
    const { user } = useAuth();  // Add this line
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMagazines = async () => {
          if (!user) {  // Check for user instead of userId
            setLoading(false);
            return;
          }
    
          try {
            const db = getDatabase();
            const magazinesRef = dbRef(db, `users/${user.uid}/magazines`);  // Use user.uid
            const snapshot = await get(magazinesRef);
            
            if (snapshot.exists()) {
              const magazinesData = Object.entries(snapshot.val()).map(([id, data]) => ({
                id,
                ...data,
                createdAt: new Date(data.createdAt),
              }));
              setMagazines(magazinesData);
            }
            setLoading(false);
          } catch (error) {
            console.error('Error fetching magazines:', error);
            setLoading(false);
          }
        };
    
        fetchMagazines();
      }, [user]);  // Change dependency to user

  const getTimeAgo = (date) => {
    const diff = Math.floor((new Date() - date) / 1000);
    const days = Math.floor(diff / 86400);
    if (days > 0) return `${days} days ago`;
    const hours = Math.floor(diff / 3600);
    if (hours > 0) return `${hours} hours ago`;
    const minutes = Math.floor(diff / 60);
    return `${minutes} minutes ago`;
  };

  const MagazineCard = ({ magazine }) => (
    <div 
      className="canvas-wrapper"
      onClick={() => navigate(`/gallery/${userId}/${magazine.id}`)}
    >
      <div className="canvas-item hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <div className="p-4 w-full">
          <h3 className="text-xl font-bold mb-2">{magazine.title}</h3>
          <div className="text-sm text-gray-500">
            Created {getTimeAgo(magazine.createdAt)}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {Object.keys(magazine.templates || {}).length} pages
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/editor/${magazine.id}`);
              }}
              style={{ backgroundColor: '#6200ee', color: 'white' }}
              className="hover:opacity-80"
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-content">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/')}
            variant="ghost"
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Your Magazines</h1>
        </div>
        <Button 
          onClick={() => navigate('/')} 
          style={{ backgroundColor: '#6200ee' }}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <PlusCircle className="w-4 h-4" />
          Create New
        </Button>
      </div>

      {/* Tabs Section */}
      <div className="template-buttons mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`template-button ${activeTab === 'all' ? 'selected' : ''}`}
        >
          <Folder className="w-4 h-4 inline mr-2" />
          All Magazines
        </button>
        <button
          onClick={() => setActiveTab('recent')}
          className={`template-button ${activeTab === 'recent' ? 'selected' : ''}`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Recent
        </button>
        <button
          onClick={() => setActiveTab('published')}
          className={`template-button ${activeTab === 'published' ? 'selected' : ''}`}
        >
          <Eye className="w-4 h-4 inline mr-2" />
          Published
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`template-button ${activeTab === 'drafts' ? 'selected' : ''}`}
        >
          <Trash2 className="w-4 h-4 inline mr-2" />
          Drafts
        </button>
      </div>

      {/* Magazine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div>Loading...</div>
        ) : magazines.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No magazines found. Click "Create New" to get started!
          </div>
        ) : (
          magazines
            .filter(magazine => {
              if (activeTab === 'recent') return true;
              if (activeTab === 'published') return !magazine.isDraft;
              if (activeTab === 'drafts') return magazine.isDraft;
              return true;
            })
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(magazine => (
              <MagazineCard key={magazine.id} magazine={magazine} />
            ))
        )}
      </div>
    </div>
  );
};

export default MagazineDashboard;