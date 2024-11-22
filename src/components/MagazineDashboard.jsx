import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { Button } from '../components/ui/button';
import { 
  PlusCircle, 
  Clock, 
  Folder, 
  Pencil,  // Using Pencil for drafts
  Eye, 
  ArrowLeft 
} from 'lucide-react';
import { Oval } from 'react-loader-spinner';
import { useAuth } from '../AuthContext';
import MagazineCard from './MagazineCard';
import EarningsPanel from './EarningsPanel';

const MagazineDashboard = () => {
  const { user } = useAuth();
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // In MagazineDashboard.jsx, update the fetchAllMagazines function:

const fetchAllMagazines = async () => {
  if (!user) {
    setLoading(false);
    return;
  }

  try {
    const db = getDatabase();
    
    // Fetch published magazines
    const publishedMagazinesRef = dbRef(db, `users/${user.uid}/magazines`);
    const publishedSnapshot = await get(publishedMagazinesRef);
    
    // Fetch regular template draft
    const draftRef = dbRef(db, `users/${user.uid}/draft`);
    const draftSnapshot = await get(draftRef);
    
    // Fetch custom template draft
    const customDraftRef = dbRef(db, `users/${user.uid}/customTemplates/draft`);
    const customDraftSnapshot = await get(customDraftRef);
    
    // Fetch custom template magazines
    const customTemplatesRef = dbRef(db, `users/${user.uid}/customTemplates/published`);
    const customTemplatesSnapshot = await get(customTemplatesRef);

    let allMagazines = [];

    if (publishedSnapshot.exists()) {
      const publishedMagazines = Object.entries(publishedSnapshot.val()).map(([id, data]) => ({
        id,
        ...data,
        title: data.title || 'My Magazine', // Ensure title exists
        previewImageUrl: data.previewImageUrl || null, // Include preview image
        createdAt: new Date(data.createdAt || Date.now()),
        isDraft: false,
        type: 'template' // Add type identifier
      }));
      allMagazines = [...allMagazines, ...publishedMagazines];
    }

    if (draftSnapshot.exists()) {
      const draftData = draftSnapshot.val();
      allMagazines.push({
        id: 'current-draft',
        ...draftData,
        title: draftData.title || 'Draft Magazine', // Ensure title exists
        previewImageUrl: draftData.previewImageUrl || null, // Include preview image
        createdAt: new Date(draftData.createdAt || Date.now()),
        isDraft: true,
        type: 'template' // Add type identifier
      });
    }

    // Add custom template draft
    if (customDraftSnapshot.exists()) {
      const customDraftData = customDraftSnapshot.val();
      allMagazines.push({
        id: 'custom-template-draft',
        ...customDraftData,
        title: customDraftData.name || 'Custom Template Draft',
        previewImageUrl: customDraftData.previewImageUrl || null,
        createdAt: new Date(customDraftData.createdAt || Date.now()),
        isDraft: true,
        type: 'custom'
      });
    }

    if (customTemplatesSnapshot.exists()) {
      const customMagazines = Object.entries(customTemplatesSnapshot.val()).map(([id, data]) => ({
        id,
        ...data,
        title: data.name || data.title || 'Custom Template', // Handle both name and title fields
        previewImageUrl: data.previewImageUrl || null, // Include preview image
        createdAt: new Date(data.publishedAt || Date.now()),
        isCustomTemplate: true,
        isDraft: false,
        type: 'custom' // Add type identifier
      }));
      allMagazines = [...allMagazines, ...customMagazines];
    }

    const sortedMagazines = allMagazines
      .sort((a, b) => b.createdAt - a.createdAt)
      .map(magazine => ({
        ...magazine,
        createdAt: getTimeAgo(magazine.createdAt)
      }));

    console.log('Processed magazines:', sortedMagazines); // Add this for debugging
    setMagazines(sortedMagazines);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching magazines:', error);
    setLoading(false);
  }
};

    fetchAllMagazines();
  }, [user]);

  const getTimeAgo = (date) => {
    const diff = Math.floor((new Date() - date) / 1000);
    const days = Math.floor(diff / 86400);
    if (days > 0) return `${days} days ago`;
    const hours = Math.floor(diff / 3600);
    if (hours > 0) return `${hours} hours ago`;
    const minutes = Math.floor(diff / 60);
    return minutes <= 0 ? 'just now' : `${minutes} minutes ago`;
  };

  const handleEdit = (magazineId) => {
    navigate(`/editor/${magazineId}`);
  };

  const handleView = (magazineId) => {
    window.open(`/magazine/${user.uid}/${magazineId}`, '_blank');
  };

  const handleShare = (magazineId) => {
    const shareUrl = `/magazine/${user.uid}/${magazineId}`;
    if (navigator.share) {
      navigator.share({
        title: 'Check out my magazine',
        url: window.location.origin + shareUrl
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + shareUrl);
    }
  };

  const handleDelete = async (magazineId) => {
    if (window.confirm('Are you sure you want to delete this magazine?')) {
      // Add deletion logic here
    }
  };

  const FilterButton = ({ value, icon: Icon, children }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`filter-button ${activeTab === value ? 'active' : ''}`}
    >
      <Icon className={`w-4 h-4 ${activeTab === value ? 'text-[#6200ee]' : 'text-gray-600'}`} />
      <span className={activeTab === value ? 'text-[#6200ee] font-medium' : 'text-gray-600'}>
        {children}
      </span>
    </button>
  );

  return (
    <div className="main-content">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/editor')}
            variant="ghost"
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Your Magazines</h1>
        </div>
        <Button 
          onClick={() => navigate('/editor')} 
          style={{ backgroundColor: '#6200ee' }}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <PlusCircle className="w-4 h-4" />
          Create New
        </Button>
      </div>

      {/* Add this grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Earnings Panel */}
        <div className="lg:col-span-1">
          <EarningsPanel />
        </div>
        
        {/* Magazines section */}
        <div className="lg:col-span-2"> 
      <div className="flex gap-2 mb-6 p-1">
        <FilterButton value="all" icon={Folder}>
          All Magazines
        </FilterButton>
        <FilterButton value="recent" icon={Clock}>
          Recent
        </FilterButton>
        <FilterButton value="published" icon={Eye}>
          Published
        </FilterButton>
        <FilterButton value="drafts" icon={Pencil}>
          Drafts
        </FilterButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <Oval
              height={40}
              width={40}
              color="#6200ee"
              secondaryColor="#d4b5ff"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
          </div>
        ) : magazines.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No magazines found. Click "Create New" to get started!
          </div>
        ) : (
          magazines
            .filter(magazine => {
              switch (activeTab) {
                case 'recent':
                  return true;
                case 'published':
                  return !magazine.isDraft;
                case 'drafts':
                  return magazine.isDraft;
                default:
                  return true;
              }
            })
            .map(magazine => (
              <MagazineCard
                key={magazine.id}
                magazine={magazine}
                onEdit={handleEdit}
                onView={handleView}
                onShare={handleShare}
                onDelete={handleDelete}
              />
            ))
        )}
      </div>
    </div>
  </div>
</div>
  );
};

export default MagazineDashboard;